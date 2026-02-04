import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

export default function SearchResult() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [currentMawdee, setCurrentMawdee] = useState(0);
  const currentSurahRepeats = state?.repeats;

  useEffect(() => {
    console.log(state);
  }, []);

  const TASHKEEL = "[\\u064B-\\u065F\\u0670\\u0654\\u06D6-\\u06ED\\u0610-\\u061A\\u06D6-\\u06DC\\u06DF-\\u06E8\\u06EA\\u06ED\\u0654\\u0640]*"

    const escapeRegExp = (string: string) => {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    function arabicFlexibleRegex(word: string) {
        const safeWord = escapeRegExp(word);

        return safeWord.replace(/./g, (char: string) => {
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

  const flexible = arabicFlexibleRegex(state.searchValue);

  const highlighted = state.surahText.replace(
    new RegExp(flexible, "g"),
    (match: string) => `<span class="selected">${match}</span>`
  );

  useEffect(() => {
    document.getElementsByClassName("selected")[currentMawdee]?.scrollIntoView({ behavior: "smooth", block: "center" });
    document.getElementsByClassName("current-selected")[0]?.classList.remove("current-selected");
    document.getElementsByClassName("selected")[currentMawdee]?.classList.add("current-selected");
  }, [currentMawdee]);

  const handleBack = () => {
    navigate(`/search`, {
      state: {
        back: true,
      }
    })
  }

  return (<>
  <Helmet>
    <title>نتائج البحث - تطبيق القرآن الكريم</title>
    <meta name="description" content="ابحث عن السور، الأجزاء، أو الأذكار داخل تطبيق القرآن الكريم بسهولة وسرعة واحصل على نتائج دقيقة."></meta>
  </Helmet>
    <div className="phone-view">
        <div className="phone-reading-view">
            <div className="phone-reading-header">
                <button className="phone-back-btn" onClick={handleBack}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                    رجوع
                </button>
              <span>نتائج البحث</span>
            </div>
            <div className="mawdee">
                <span>الموضع: <span style={{ color: "#dbdf06" }}>{currentMawdee + 1}</span></span>
                <span className="prev-mawdee change-mawdee" style={{ opacity: currentMawdee == 0 ? 0.6 : 1, cursor: currentMawdee == 0 ? "no-drop" : "pointer" }} onClick={() => setCurrentMawdee(m => (m == 0 ? 0 : m - 1))}>السابق</span>
                <span className="next-mawdee change-mawdee" style={{ opacity: currentMawdee + 1 == currentSurahRepeats ? 0.6 : 1, cursor: currentMawdee + 1 == currentSurahRepeats ? "no-drop" : "pointer" }} onClick={() => {if (currentMawdee != currentSurahRepeats - 1) setCurrentMawdee(m => m + 1)}}>التالي</span>
            </div>
            <div className="search-result" id="search-result">
              <div className="search-result-surah-name surrah">
                سورة {state.surahName}
              </div>
              <div className="search-result-text" dangerouslySetInnerHTML={{ __html: highlighted }} />
            </div>
        </div>
    </div>
    </>
  );
}
