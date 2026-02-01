import React, { useEffect, useState } from 'react'
import { allSurah_s } from '../../data/surah_name/surah_name';
import { surah_nass } from '../../data/surah/surah_nass';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../App.css'

export function Search() {

    const [searchValue, setSearchValue] = useState<string>('');
    const [currentSurahName, setCurrentSurahName] = useState<string>('');
    const [showAdvancedSearch, setShowAdvancedSearch] = useState<boolean>(false);
    const [currentType, setCurrentType] = useState<string>('');
    const [advancedSearchValue, setAdvancedSearchValue] = useState<string>('');
    const [currentMawdee, setCurrentMawdee] = useState<number>(0);
    const [mawdee, setMawdee] = useState<boolean>(false);
    const [currentSurahRepeats, setCurrentSurahRepeats] = useState<number>(0);
    const [showAllTimes, setShowAllTimes] = useState<boolean>(false);
    const [allTimes, setAllTimes] = useState<React.ReactNode>(<></>);

    const navigate = useNavigate();
    const { state } = useLocation();
    const phoneRegEx = /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i;
    const userAgent = navigator.userAgent;

    const SURAH_NASS = surah_nass.map(surah => surah.replace(/۞/g, ""))

    const TASHKEEL = "[\\u064B-\\u065F\\u0670\\u0654\\u06D6-\\u06ED\\u0610-\\u061A\\u06D6-\\u06DC\\u06DF-\\u06E8\\u06EA\\u06ED\\u0654\\u0640]*"

    let total = 0;

    useEffect(() => {
      if (state && state.back) {
        if (localStorage.lastSearch != null && localStorage.lastType != null) {
          setSearchValue(localStorage.lastType == "" ? localStorage.lastSearch : "");
          search(localStorage.lastSearch, localStorage.lastType);
        }
      } else if (!state || (state && !state.back)) {
        localStorage.setItem("lastSearch", "");
        localStorage.setItem("lastType", "");
      }
    }, []);

    useEffect(() => {
      document.getElementsByClassName("selected")[currentMawdee]?.scrollIntoView({ behavior: "smooth" });
      document.getElementsByClassName("current-selected")[0]?.classList.remove("current-selected");
      document.getElementsByClassName("selected")[currentMawdee]?.classList.add("current-selected");
    }, [currentMawdee]);

    const escapeRegExp = (string: string) => {
      return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    const times: Record<number, string> = {
      1: "مرة واحدة",
      2: "مرتين",
    };

    const replaces: Record<string, string> = {
      "بايات": "بئايات",
      "بآيات": "بئايات",
      "امنوا": "ءامنوا",
      "آمنوا": "ءامنوا",
      "يسالون": "يَسۡـَٔلُونَ",
      "يسألون": "يَسۡـَٔلُونَ",
      "يسئلون": "يَسۡـَٔلُونَ",
      "يسءلون": "يَسۡـَٔلُونَ",
      "أولئك": "أُوْلَٰٓئِكَ",
      "اولئك": "أُوْلَٰٓئِكَ",
      "هؤلاء": "هاؤلاء",
      "هذان": "هاذان",
      "الغاوون": "الغاون",
      "يستوون": "يستون",
      "الرحمن": "الرحمٰن",
      "رحمن": "رحمٰن",
    }

    const advancedSearchOptions = [
      {
        name: "ayah-start",
        arName: "بداية آية",
        description: "البحث عن لفظ تبدأ به آية"
      },
      {
        name: "no-add",
        arName: "اللفظ دون إضافة",
        description: "البحث عن اللفظ دون إضافة واو أو غيرها"
      }
    ]

    function normalizeArabic(text: string, searchType: string) {
      const newText = text
        .replace(/ىٰ/g, "ا")
        .replace(/ـٔ/g, "ئ")
        .replace(/ـۧ/g, "ي")
        .replace(/[إأٱآا]/g, "ا")
        .replace(/\u0670/g, "ا")
        .replace(/[يى]/g, "ي")
        .replace(/[ؤ]/g, "ء")
        .replace(/[\u064B-\u065F\u06D6-\u06ED]/g, "")
        .replace(/ـ/g, "");

      if (searchType == "no-add") {
        return newText;
      } else {
        return newText.trim();
      }
    }
    
    function arabicFlexibleRegex(word: string) {
      const safeWord = escapeRegExp(word);
    
      return safeWord.replace(/./g, (char) => {
        if (char === "ا") {
          return `(?:[اأإآٱ\\u0670]|\\u0649\\u0670)${TASHKEEL}`;
        }
      
        if (char === "ي" || char === "ى") {
          return `[يىۦـ]${TASHKEEL}`;
        }
      
        if (char === "و") {
          return `[وؤ](?:ـ?ٔ)?${TASHKEEL}`;
        }
      
        if (char === "ء" || char === "ئ" || char === "ـٔ") {
          return `(?:[ئـٔء])${TASHKEEL}`;
        }
      
        if (/[\u0621-\u064A]/.test(char)) {
          return `${char}${TASHKEEL}`;
        }
      
        return char;
      });
    }

    function replaceValues(value: string) {
      let newValue = value;
      Object.keys(replaces).map(key => {
        if (newValue == key) {
          newValue = newValue.replace(key, replaces[key]);
        }
      })

      return newValue.replace("آ", "ءا").replace("ـ", "");
    }

    function search(value: string, type?: string) {
      total = 0;
      document.getElementsByClassName('all-results')[0].innerHTML = "";
      localStorage.setItem("lastSearch", value);
      localStorage.setItem("lastType", type || "");
      SURAH_NASS.map((surah, i) => {
        const cleanSurah = normalizeArabic(surah, type || "");
        const cleanSearch = normalizeArabic(value, type || "");
        if (cleanSurah.includes(cleanSearch)) {
              const el = document.createElement('div');
              const safeCleanSearch = escapeRegExp(cleanSearch);
              const searchValueRepeatCount =
              (cleanSurah.match(new RegExp(safeCleanSearch, 'g')) || []).length;
              total += searchValueRepeatCount;
              el.innerHTML = `<span>${allSurah_s[i]} - ذكرت <span style="color: #dbdf06;">${times[searchValueRepeatCount] || (searchValueRepeatCount < 11 ? searchValueRepeatCount + ' مرات' : searchValueRepeatCount + ' مرة')}</span></span>`;
              el.className = 'result';
              el.addEventListener("click", () => {
                if (phoneRegEx.test(userAgent)) {
                  navigate(`/search/result`, {
                    state: {
                      searchValue: value,
                      surahText: surah,
                      surahName: allSurah_s[i],
                      currentSurahRepeats,
                      currentMawdee
                    }
                  });
                } else {
                  setCurrentSurahName('سورة ' + allSurah_s[i]);
                  setCurrentSurahRepeats(searchValueRepeatCount);
                  setMawdee(true);
                  setCurrentMawdee(0);
                  const flexible = arabicFlexibleRegex(value);
                  const nass = surah.replace(
                    new RegExp(flexible, "g"),
                    match => `<span class="selected">${match}</span>`
                  );
                  const interval = setInterval(() => {
                      document.getElementsByClassName('search-result-text')[0].innerHTML = nass;
                      if (document.getElementsByClassName('selected')[0]) document.getElementsByClassName('selected')[0].scrollIntoView({ behavior: "smooth" });
                      if (document.getElementsByClassName('selected')[0]) document.getElementsByClassName('selected')[0].classList.add("current-selected");
                      if (document.getElementsByClassName('search-result-text')[0]) clearInterval(interval);
                  }, 1)
                }
              });
              document.getElementsByClassName('all-results')[0]?.append(el);
              if (total == 0) setMawdee(false);
          }
      })

      setShowAllTimes(true);
      setAllTimes(<>ذكرت في القرآن الكريم {value.startsWith(")") ? "في أول آية" : (value.startsWith(" ") && value.endsWith(" ")) ? "دون إضافة" : ""}<span className="all-times-span"><span>&nbsp;{total}&nbsp;</span>{times[total] || (total < 11 ? 'مرات' : 'مرة')} </span></>)
    }

    function advancedSearch(type: string, value: string) {
      if (type == "ayah-start") {
        search(`) ${value}`, type);
      }
      else if (type == "no-add") {
        search(` ${value} `, type);
      }
      setShowAdvancedSearch(false);
    }

    return (
        <>
            <div className="search-title">الباحث القرآني</div>
            <div className="search-container">
              <div className="search-surah">
                <input type="text" placeholder="ابحث في القرآن الكريم" value={searchValue} onChange={e => {setSearchValue(e.target.value)}} />
                <div className="enter" onClick={() => {const el = document.getElementsByClassName('all-results')[0];el.innerHTML = '';search(replaceValues(searchValue))}}>
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 26 26" fill="rgba(0, 0, 0, 0.5)">
                    <path d="M 10 0.1875 C 4.578125 0.1875 0.1875 4.578125 0.1875 10 C 0.1875 15.421875 4.578125 19.8125 10 19.8125 C 12.289063 19.8125 14.394531 19.003906 16.0625 17.6875 L 16.9375 18.5625 C 16.570313 19.253906 16.699219 20.136719 17.28125 20.71875 L 21.875 25.34375 C 22.589844 26.058594 23.753906 26.058594 24.46875 25.34375 L 25.34375 24.46875 C 26.058594 23.753906 26.058594 22.589844 25.34375 21.875 L 20.71875 17.28125 C 20.132813 16.695313 19.253906 16.59375 18.5625 16.96875 L 17.6875 16.09375 C 19.011719 14.421875 19.8125 12.300781 19.8125 10 C 19.8125 4.578125 15.421875 0.1875 10 0.1875 Z M 10 2 C 14.417969 2 18 5.582031 18 10 C 18 14.417969 14.417969 18 10 18 C 5.582031 18 2 14.417969 2 10 C 2 5.582031 5.582031 2 10 2 Z M 4.9375 7.46875 C 4.421875 8.304688 4.125 9.289063 4.125 10.34375 C 4.125 13.371094 6.566406 15.8125 9.59375 15.8125 C 10.761719 15.8125 11.859375 15.433594 12.75 14.8125 C 12.511719 14.839844 12.246094 14.84375 12 14.84375 C 8.085938 14.84375 4.9375 11.695313 4.9375 7.78125 C 4.9375 7.675781 4.933594 7.574219 4.9375 7.46875 Z"></path>
                  </svg>
                </div>
                <div className="show-advanced-search-button" onClick={() => setShowAdvancedSearch(true)}>البحث المتقدم</div>
              </div>
              {showAdvancedSearch && <div className="advanced-search-modal">
                <div className="advanced-search">
                  <div className="advanced-search-title">
                    اختر نوعًا للبحث المتقدم
                  </div>
                  <div className="advanced-search-options">
                    {advancedSearchOptions.map((option, i) => (
                      <div className="advanced-search-option" onClick={e => {if (document.getElementsByClassName("selected-option")[0]) document.getElementsByClassName("selected-option")[0].classList.remove("selected-option");e.currentTarget.classList.add("selected-option");setCurrentType(option.name)}} key={i}>
                        {option.arName}
                        <div className="option-description">{option.description}</div>
                      </div>
                    ))}
                  </div>
                  <div className="advanced-search-inputs">
                    <input type="text" className="advanced-search-input" value={advancedSearchValue} onChange={e => setAdvancedSearchValue(e.target.value)} placeholder="أدخل اللفظ القرآني" />
                  </div>
                  <div className="advanced-search-buttons">
                    <div className="advanced-search-button" onClick={() => advancedSearch(currentType, advancedSearchValue)}>بحث</div>
                    <div className="advanced-search-button" onClick={() => {setShowAdvancedSearch(false);setAdvancedSearchValue("");setCurrentType("");}}>إغلاق</div>
                  </div>
                </div>
              </div>}
              <div className="all-results"></div>
              <div className="result-details">
                {showAllTimes && <div className="result reverse">{allTimes}</div>}
                {mawdee && <>
                  <div className="mawdee">
                    <span>الموضع: <span style={{ color: "#dbdf06" }}>{currentMawdee + 1}</span></span>
                    <span className="prev-mawdee change-mawdee" style={{ opacity: currentMawdee == 0 ? 0.6 : 1, cursor: currentMawdee == 0 ? "no-drop" : "pointer" }} onClick={() => setCurrentMawdee(m => (m == 0 ? 0 : m - 1))}>السابق</span>
                    <span className="next-mawdee change-mawdee" style={{ opacity: currentMawdee + 1 == currentSurahRepeats ? 0.6 : 1, cursor: currentMawdee + 1 == currentSurahRepeats ? "no-drop" : "pointer" }} onClick={() => {if (currentMawdee != currentSurahRepeats - 1) setCurrentMawdee(m => m + 1)}}>التالي</span>
                  </div>
                </>}
              </div>
              {currentSurahName.length > 0 &&
              <div className="search-result" id="search-result">
                <div className="search-result-surah-name surrah">
                  {currentSurahName}
                </div>
                <div className="search-result-text">
                  
                </div>
              </div>
              }
            </div>
        </>
    )
}