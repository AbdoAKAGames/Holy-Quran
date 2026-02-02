import { useParams, useNavigate } from "react-router-dom";
import { allParts } from "../../data/parts/parts";
import { useEffect, useRef, useState } from "react";

export default function PartPage() {
    const { partId } = useParams();
    const { surahId } = useParams();
    const navigate = useNavigate();

    const [animated, setAnimated] = useState<boolean>(false);
    const [animatedUns, setAnimatedUns] = useState<boolean>(false);
    const [listen, setListen] = useState<boolean>(false);
    const [listening, setListening] = useState<boolean>(false);

    const savedRef = useRef<HTMLDivElement>(null);
    const unsavedRef = useRef<HTMLDivElement>(null);
    const ref = useRef<HTMLDivElement>(null);

    const quraa = [
        {
          name: 'عبد الباسط عبد الصمد',
          image: 'https://github.com/AbdoAKAGames/Holy-Quran/blob/main/src/quraa-images/Abd-Elbaset-Abd-Elsamad.png?raw=true',
        },
        {
          name: 'محمود خليل الحصري',
          image: 'https://github.com/AbdoAKAGames/Holy-Quran/blob/main/src/quraa-images/Al-Hussary.png?raw=true',
        },
        {
          name: 'محمد صديق المنشاوي',
          image: 'https://github.com/AbdoAKAGames/Holy-Quran/blob/main/src/quraa-images/Al-Minshawi.png?raw=true',
        },
        {
          name: 'ياسر الدوسري',
          image: 'https://github.com/AbdoAKAGames/Holy-Quran/blob/main/src/quraa-images/Al-Dossari.png?raw=true',
        },
    ];

    useEffect(() => {
      if (surahId) {
        const element = document.getElementsByClassName("phone-surah-nass")[1] as HTMLDivElement;
        if (element) element.scrollTo({ top: JSON.parse(localStorage.current_part)[0].scroll_top, behavior: "smooth" });
      }
    }, []);
    
    function listenPart(qaree: string) {
      if (!listening) {
          const Surah = document.createElement('audio');
          if (qaree == 'محمود خليل الحصري') {
            if (Number(partId) < 10) {
              Surah.src = `https://ia902906.us.archive.org/20/items/AlHossarry/0${Number(partId)}.mp3`;
            }
            else if (Number(partId) >= 10) {
              Surah.src = `https://ia902906.us.archive.org/20/items/AlHossarry/${Number(partId)}.mp3`;
            }
          }
          else if (qaree == 'محمد صديق المنشاوي') {
            if (Number(partId) < 10) {
              Surah.src = `https://ia801903.us.archive.org/33/items/12_202007xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx31/%D8%A7%D9%84%D9%85%D9%86%D8%B4%D8%A7%D9%88%D9%8A%20%20%D9%85%D8%B1%D8%AA%D9%84%20%D9%85%D8%B5%D8%AD%D9%81%20%20%D9%85%D9%82%D8%B3%D9%85%20%D8%A3%D8%AC%D8%B2%D8%A7%D8%A1%20%D8%AC%D8%B2%D8%A1%20%D8%B1%D9%82%D9%85%200${Number(partId)}.mp3`;
            }
            else if (Number(partId) >= 10) {
              Surah.src = `https://ia801903.us.archive.org/33/items/12_202007xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx31/%D8%A7%D9%84%D9%85%D9%86%D8%B4%D8%A7%D9%88%D9%8A%20%20%D9%85%D8%B1%D8%AA%D9%84%20%D9%85%D8%B5%D8%AD%D9%81%20%20%D9%85%D9%82%D8%B3%D9%85%20%D8%A3%D8%AC%D8%B2%D8%A7%D8%A1%20%D8%AC%D8%B2%D8%A1%20%D8%B1%D9%82%D9%85%20${Number(partId)}.mp3`;
            }
          }
          else if (qaree == 'عبد الباسط عبد الصمد') {
            if (Number(partId) < 10) {
              Surah.src = `https://ia803201.us.archive.org/6/items/aaaaaaaaaaaaaaaaaaaaaa812_20200812_1445/%D9%85%D8%B5%D8%AD%D9%81%20%D8%B9%D8%A8%D8%AF%D8%A7%D9%84%D8%A8%D8%A7%D8%B3%D8%B7%20%D8%A7%D9%84%D9%85%D8%AC%D9%88%D8%AF%20%D9%85%D9%82%D8%B3%D9%85%20%D8%A3%D8%AC%D8%B2%D8%A7%D8%A1%20%D8%AC%D8%B2%D8%A1%20%D8%B1%D9%82%D9%85%200${Number(partId)}.mp3`;
            }
            else if (Number(partId) >= 10) {
              Surah.src = `https://ia803201.us.archive.org/6/items/aaaaaaaaaaaaaaaaaaaaaa812_20200812_1445/%D9%85%D8%B5%D8%AD%D9%81%20%D8%B9%D8%A8%D8%AF%D8%A7%D9%84%D8%A8%D8%A7%D8%B3%D8%B7%20%D8%A7%D9%84%D9%85%D8%AC%D9%88%D8%AF%20%D9%85%D9%82%D8%B3%D9%85%20%D8%A3%D8%AC%D8%B2%D8%A7%D8%A1%20%D8%AC%D8%B2%D8%A1%20%D8%B1%D9%82%D9%85%20${Number(partId)}.mp3`;
            }
          }
          else if (qaree == 'ياسر الدوسري') {
            if (Number(partId) < 10) {
              Surah.src = `https://ia801909.us.archive.org/19/items/a2aaaaaaaaaaaaaaaaaaaaaaaaaaaaa0200813/%D9%85%D8%B5%D8%AD%D9%81%20%D9%8A%D8%A7%D8%B3%D8%B1%20%D8%A7%D9%84%D8%AF%D9%88%D8%B3%D8%B1%D9%8A%20%D9%85%D9%82%D8%B3%D9%85%20%D8%A3%D8%AC%D8%B2%D8%A7%D8%A1%20%D8%AC%D8%B2%D8%A1%20%D8%B1%D9%82%D9%85%200${Number(partId)}.mp3`;
            }
            else if (Number(partId) >= 10) {
              Surah.src = `https://ia801909.us.archive.org/19/items/a2aaaaaaaaaaaaaaaaaaaaaaaaaaaaa0200813/%D9%85%D8%B5%D8%AD%D9%81%20%D9%8A%D8%A7%D8%B3%D8%B1%20%D8%A7%D9%84%D8%AF%D9%88%D8%B3%D8%B1%D9%8A%20%D9%85%D9%82%D8%B3%D9%85%20%D8%A3%D8%AC%D8%B2%D8%A7%D8%A1%20%D8%AC%D8%B2%D8%A1%20%D8%B1%D9%82%D9%85%20${Number(partId)}.mp3`;
            }
          }
          Surah.controls = true;
          ref.current?.append(Surah);
          Surah.play();
          setListening(true);
          Surah.scrollIntoView({ block: "center", behavior: 'smooth' });
        };
        if (listening) {
          document.querySelector('audio')?.remove();
          const Surah = document.createElement('audio');
          if (qaree == 'محمود خليل الحصري') {
            if (Number(partId) < 10) {
              Surah.src = `https://ia902906.us.archive.org/20/items/AlHossarry/0${Number(partId)}.mp3`;
            }
            else if (Number(partId) >= 10) {
              Surah.src = `https://ia902906.us.archive.org/20/items/AlHossarry/${Number(partId)}.mp3`;
            }
          }
          else if (qaree == 'محمد صديق المنشاوي') {
            if (Number(partId) < 10) {
              Surah.src = `https://ia801903.us.archive.org/33/items/12_202007xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx31/%D8%A7%D9%84%D9%85%D9%86%D8%B4%D8%A7%D9%88%D9%8A%20%20%D9%85%D8%B1%D8%AA%D9%84%20%D9%85%D8%B5%D8%AD%D9%81%20%20%D9%85%D9%82%D8%B3%D9%85%20%D8%A3%D8%AC%D8%B2%D8%A7%D8%A1%20%D8%AC%D8%B2%D8%A1%20%D8%B1%D9%82%D9%85%200${Number(partId)}.mp3`;
            }
            else if (Number(partId) >= 10) {
              Surah.src = `https://ia801903.us.archive.org/33/items/12_202007xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx31/%D8%A7%D9%84%D9%85%D9%86%D8%B4%D8%A7%D9%88%D9%8A%20%20%D9%85%D8%B1%D8%AA%D9%84%20%D9%85%D8%B5%D8%AD%D9%81%20%20%D9%85%D9%82%D8%B3%D9%85%20%D8%A3%D8%AC%D8%B2%D8%A7%D8%A1%20%D8%AC%D8%B2%D8%A1%20%D8%B1%D9%82%D9%85%20${Number(partId)}.mp3`;
            }
          }
          else if (qaree == 'عبد الباسط عبد الصمد') {
            if (Number(partId) < 10) {
              Surah.src = `https://ia803201.us.archive.org/6/items/aaaaaaaaaaaaaaaaaaaaaa812_20200812_1445/%D9%85%D8%B5%D8%AD%D9%81%20%D8%B9%D8%A8%D8%AF%D8%A7%D9%84%D8%A8%D8%A7%D8%B3%D8%B7%20%D8%A7%D9%84%D9%85%D8%AC%D9%88%D8%AF%20%D9%85%D9%82%D8%B3%D9%85%20%D8%A3%D8%AC%D8%B2%D8%A7%D8%A1%20%D8%AC%D8%B2%D8%A1%20%D8%B1%D9%82%D9%85%200${Number(partId)}.mp3`;
            }
            else if (Number(partId) >= 10) {
              Surah.src = `https://ia803201.us.archive.org/6/items/aaaaaaaaaaaaaaaaaaaaaa812_20200812_1445/%D9%85%D8%B5%D8%AD%D9%81%20%D8%B9%D8%A8%D8%AF%D8%A7%D9%84%D8%A8%D8%A7%D8%B3%D8%B7%20%D8%A7%D9%84%D9%85%D8%AC%D9%88%D8%AF%20%D9%85%D9%82%D8%B3%D9%85%20%D8%A3%D8%AC%D8%B2%D8%A7%D8%A1%20%D8%AC%D8%B2%D8%A1%20%D8%B1%D9%82%D9%85%20${Number(partId)}.mp3`;
            }
          }
          else if (qaree == 'ياسر الدوسري') {
            if (Number(partId) < 10) {
              Surah.src = `https://ia801909.us.archive.org/19/items/a2aaaaaaaaaaaaaaaaaaaaaaaaaaaaa0200813/%D9%85%D8%B5%D8%AD%D9%81%20%D9%8A%D8%A7%D8%B3%D8%B1%20%D8%A7%D9%84%D8%AF%D9%88%D8%B3%D8%B1%D9%8A%20%D9%85%D9%82%D8%B3%D9%85%20%D8%A3%D8%AC%D8%B2%D8%A7%D8%A1%20%D8%AC%D8%B2%D8%A1%20%D8%B1%D9%82%D9%85%200${Number(partId)}.mp3`;
            }
            else if (Number(partId) >= 10) {
              Surah.src = `https://ia801909.us.archive.org/19/items/a2aaaaaaaaaaaaaaaaaaaaaaaaaaaaa0200813/%D9%85%D8%B5%D8%AD%D9%81%20%D9%8A%D8%A7%D8%B3%D8%B1%20%D8%A7%D9%84%D8%AF%D9%88%D8%B3%D8%B1%D9%8A%20%D9%85%D9%82%D8%B3%D9%85%20%D8%A3%D8%AC%D8%B2%D8%A7%D8%A1%20%D8%AC%D8%B2%D8%A1%20%D8%B1%D9%82%D9%85%20${Number(partId)}.mp3`;
            }
          }
          Surah.controls = true;
          ref.current?.append(Surah);
          Surah.play();
          setListening(true);
          Surah.scrollIntoView({ block: "center", behavior: 'smooth' });
        }
    };

    const handleBack = () => {
      navigate("/");
    }

    async function save() {
      let el = document.getElementsByClassName('phone-surah-nass')[0] as HTMLDivElement;
      const stringifiedData = JSON.stringify([{ part_num: Number(partId), scroll_top: el.scrollTop }])
      localStorage.setItem("current_part", stringifiedData);

      if (!animated) {
        setAnimated(true);
        setTimeout(() => {
          savedRef.current?.setAttribute('style', 'display: none;');
          setAnimated(false);
        }, 3000);
      }
    }
    async function unsave() {
      const stringifiedData = JSON.stringify([{ part_num: null, scroll_top: null }])
      localStorage.setItem("current_part", stringifiedData);

      if (!animatedUns) {
        setAnimatedUns(true);
        setTimeout(() => {
          unsavedRef.current?.setAttribute('style', 'display: none;');
          setAnimatedUns(false);
        }, 3000);
      }
    }

  return (
    <div className="phone-view">
        <div className="phone-reading-view">
                <div className="phone-reading-header">
                    <button className="phone-back-btn" onClick={handleBack}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                        رجوع
                    </button>
                  <span>الجزء {Number(partId)}</span>
                </div>
        
            <div className="phone-nass">
                  <div className="phone-surah-nass-name">
                      الجزء {Number(partId)}
                  </div>
                  <div className="phone-surah-nass">
                      {Number(partId) == 1 || Number(partId) == 9 ? allParts[Number(partId) - 1] : <><div className="phone-basmalah">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div> {allParts[Number(partId) - 1]}</>}
                  </div>
            </div>

            <div className="phone-listen-surah">
              <div className="phone-save-button">
                  <button onClick={() => {save();savedRef.current?.setAttribute('style', 'display: flex;');}}>حفظ</button>
                  <button onClick={() => {unsave();unsavedRef.current?.setAttribute('style', 'display: flex;');}}>إلغاء</button>
              </div>
              <div className="phone-buttons">
                  <div className="phone-next">
                    <button disabled={Number(partId) == 114 ? true : false} onClick={() => {location.href.includes("/saved") ? navigate(`/saved/${surahId}/${Number(partId) + 1}`) : navigate(`/part/${Number(partId) + 1}`);let el = document.getElementsByClassName('phone-nass')[0] as HTMLDivElement;if(el) el.scrollTo({ top: 0, behavior: 'smooth' })}}>التالية</button>
                  </div>
                  <div className="phone-prev">
                    <button disabled={Number(partId) == 1 ? true : false} onClick={() => {location.href.includes("/saved") ? navigate(`/saved/${surahId}/${Number(partId) - 1}`) : navigate(`/part/${Number(partId) - 1}`);let el = document.getElementsByClassName('phone-nass')[0] as HTMLDivElement;if(el) el.scrollTo({ top: 0, behavior: 'smooth' })}}>السابقة</button>
                  </div>
              </div>
              <div className="phone-listen" onClick={() => setListen(true)}>
                  استماع
              </div>
            </div>
        </div>
        
        <div style={{width: '100%', display: 'flex', justifyContent: 'center', pointerEvents: 'none', position: 'fixed', top: '50%', zIndex: 1000}}>
        <div className="phone-saved" ref={savedRef}>
          !تم حفظ الجزء بنجاح
        </div>
      </div>

      <div style={{width: '100%', display: 'flex', justifyContent: 'center', pointerEvents: 'none', position: 'fixed', top: '50%', zIndex: 1000}}>
        <div className="phone-unsaved" ref={unsavedRef}>
          !تم إلغاء حفظ الجزء بنجاح
        </div>
      </div>

      {listen && <div className="phone-choose-qaree-modal" onClick={() => setListen(false)}>
        <div className="phone-choose-qaree">
          <div className="phone-choose-qaree-title">
            اختر أحد القراء
          </div>
          <div className="phone-quraa">
            {quraa.map((qaree, i) => (
              <div className="phone-qaree" key={i} onClick={() => listenPart(qaree.name)}>
              <div className="phone-qaree-image">
                <img src={qaree.image} />
              </div>
              <div className="phone-qaree-name">
                {qaree.name}
              </div>
            </div>
            ))}
          </div>
        </div>
      </div>
      }
        <div className="phone-audio" ref={ref}></div>
    </div>
  );
}