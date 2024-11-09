import { useState } from 'react'
import { surah_no_shapes } from '../../data/surah_no_shapes/surah_no_shapes';
import { allSurah_s } from '../../data/surah_name/surah_name';
// import { surah_nass } from '../../data/surah/surah_nass';
import '../../App.css'

export function Search() {

    const [searchValue, setSearchValue] = useState<string>('');
    const [currentSurahName, setCurrentSurahName] = useState<string>('');


    function search() {
        surah_no_shapes.map((surah, i) => {
            if (surah.includes(searchValue)) {
                const el = document.createElement('div');
                el.innerHTML = allSurah_s[i];
                el.className = 'result';
                el.addEventListener("click", () => {
                    setCurrentSurahName('سورة ' + el.innerHTML);
                    const newElement = document.createElement('span') as HTMLSpanElement;
                    newElement.innerHTML = searchValue;
                    newElement.className = 'selected';
                    let interval0 = setInterval(() => {
                      const ele = document.getElementsByClassName('selected')[0] as HTMLDivElement;
                      ele.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      setTimeout(() => {
                        clearInterval(interval0);
                      }, 100);
                    }, 1);
                    let interval = setInterval(() => {
                      document.getElementsByClassName('search-result-text')[0].innerHTML = replaceTextWithElement(surah_no_shapes[i], searchValue, newElement);
                      if (document.getElementsByClassName('search-result-text')[0] != undefined) {
                        clearInterval(interval);
                      }
                    }, 1);
                });
                document.getElementsByClassName('all-results')[0]?.append(el);
            }
        })
    }

    function replaceTextWithElement(originalText: string, searchTerm: string, element: HTMLElement): string {
        const tempDiv = document.createElement('div');
        
        const modifiedText = originalText.replace(new RegExp(searchTerm, 'gi'), searchValue);
    
        tempDiv.innerHTML = modifiedText;
    
        const placeholder = tempDiv.innerHTML.replace(searchValue, element.outerHTML);
        
        return placeholder;
    }

        

    return (
        <>
            <div className="search-title">الباحث القرآني</div>
            <div className="search-container">
              <div className="search-surah">
                <input type="text" placeholder="ابحث في القرآن الكريم" onChange={e => {setSearchValue(e.target.value)}} />
                <div className="enter" onClick={() => {const el = document.getElementsByClassName('all-results')[0];el.innerHTML = '';search()}}>
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 26 26" fill="rgba(0, 0, 0, 0.5)">
                    <path d="M 10 0.1875 C 4.578125 0.1875 0.1875 4.578125 0.1875 10 C 0.1875 15.421875 4.578125 19.8125 10 19.8125 C 12.289063 19.8125 14.394531 19.003906 16.0625 17.6875 L 16.9375 18.5625 C 16.570313 19.253906 16.699219 20.136719 17.28125 20.71875 L 21.875 25.34375 C 22.589844 26.058594 23.753906 26.058594 24.46875 25.34375 L 25.34375 24.46875 C 26.058594 23.753906 26.058594 22.589844 25.34375 21.875 L 20.71875 17.28125 C 20.132813 16.695313 19.253906 16.59375 18.5625 16.96875 L 17.6875 16.09375 C 19.011719 14.421875 19.8125 12.300781 19.8125 10 C 19.8125 4.578125 15.421875 0.1875 10 0.1875 Z M 10 2 C 14.417969 2 18 5.582031 18 10 C 18 14.417969 14.417969 18 10 18 C 5.582031 18 2 14.417969 2 10 C 2 5.582031 5.582031 2 10 2 Z M 4.9375 7.46875 C 4.421875 8.304688 4.125 9.289063 4.125 10.34375 C 4.125 13.371094 6.566406 15.8125 9.59375 15.8125 C 10.761719 15.8125 11.859375 15.433594 12.75 14.8125 C 12.511719 14.839844 12.246094 14.84375 12 14.84375 C 8.085938 14.84375 4.9375 11.695313 4.9375 7.78125 C 4.9375 7.675781 4.933594 7.574219 4.9375 7.46875 Z"></path>
                  </svg>
                </div>
              </div>
              <div className="all-results"></div>
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