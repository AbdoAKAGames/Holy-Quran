import { useParams, useNavigate } from "react-router-dom";
import { allSurah_s } from "../../data/surah_name/surah_name";
import { surah_nass } from "../../data/surah/surah_nass";
import { useEffect, useRef, useState } from "react";
import { quraa } from "../../data/quraa";

export default function SurahPage() {
    const { surahId } = useParams();
    const { partId } = useParams();
    const navigate = useNavigate();

    const [animated, setAnimated] = useState<boolean>(false);
    const [animatedUns, setAnimatedUns] = useState<boolean>(false);
    const [listen, setListen] = useState<boolean>(false);

    const savedRef = useRef<HTMLDivElement>(null);
    const unsavedRef = useRef<HTMLDivElement>(null);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (partId) {
        const element = document.getElementsByClassName("phone-surah-nass")[0] as HTMLDivElement;
        if (element) element.scrollTo({ top: JSON.parse(localStorage.current_surah)[0].scroll_top, behavior: "smooth" });
      }
    }, []);

    async function listenSurah(qaree: string) {
      if (!navigator.onLine) {
        console.log("offline: trying cache");
      }
      if (document.querySelector('audio')) {
        document.querySelector('audio')?.remove();
      }
      const Surah = document.createElement('audio');
      if (qaree == 'عبد الباسط عبد الصمد') {
        if (Number(surahId) < 10) {
          Surah.src = `https://server7.mp3quran.net/basit/Almusshaf-Al-Mojawwad/00${Number(surahId)}.mp3`;
        }
        else if (Number(surahId) >= 10 && Number(surahId) < 100) {
          Surah.src = `https://server7.mp3quran.net/basit/Almusshaf-Al-Mojawwad/0${Number(surahId)}.mp3`;
        } else if (Number(surahId) >= 100) {
          Surah.src = `https://server7.mp3quran.net/basit/Almusshaf-Al-Mojawwad/${Number(surahId)}.mp3`;
        }
      }
      else if (qaree == 'محمود خليل الحصري') {
        if (Number(surahId) < 10) {
          Surah.src = `https://server13.mp3quran.net/husr/00${Number(surahId)}.mp3`;
        }
        else if (Number(surahId) >= 10 && Number(surahId) < 100) {
          Surah.src = `https://server13.mp3quran.net/husr/0${Number(surahId)}.mp3`;
        } else if (Number(surahId) >= 100) {
          Surah.src = `https://server13.mp3quran.net/husr/${Number(surahId)}.mp3`;
        }
      }
      else if (qaree == 'محمد صديق المنشاوي') {
        if (Number(surahId) < 10) {
          Surah.src = `https://server10.mp3quran.net/minsh/00${Number(surahId)}.mp3`;
        }
        else if (Number(surahId) >= 10 && Number(surahId) < 100) {
          Surah.src = `https://server10.mp3quran.net/minsh/0${Number(surahId)}.mp3`;
        } else if (Number(surahId) >= 100) {
          Surah.src = `https://server10.mp3quran.net/minsh/${Number(surahId)}.mp3`;
        }
      }
      else if (qaree == 'ياسر الدوسري') {
        if (Number(surahId) < 10) {
          Surah.src = `https://server11.mp3quran.net/yasser/00${Number(surahId)}.mp3`;
        }
        else if (Number(surahId) >= 10 && Number(surahId) < 100) {
          Surah.src = `https://server11.mp3quran.net/yasser/0${Number(surahId)}.mp3`;
        } else if (Number(surahId) >= 100) {
          Surah.src = `https://server11.mp3quran.net/yasser/${Number(surahId)}.mp3`;
        }
      }
      Surah.controls = true;
      ref.current?.append(Surah);
      await Surah.play();
      Surah.scrollIntoView({ block: "center", behavior: 'smooth' });
    };

    const handleBack = () => {
      navigate("/");
    }

    async function save() {
      let el = document.getElementsByClassName('phone-surah-nass')[0] as HTMLDivElement;
      const stringifiedData = JSON.stringify([{ surah_num: Number(surahId), scroll_top: el.scrollTop }])
      localStorage.setItem("current_surah", stringifiedData);

      if (!animated) {
        setAnimated(true);
        setTimeout(() => {
          savedRef.current?.setAttribute('style', 'display: none;');
          setAnimated(false);
        }, 3000);
      }
    }
    async function unsave() {
      const stringifiedData = JSON.stringify([{ surah_num: null, scroll_top: null }])
      localStorage.setItem("current_surah", stringifiedData);

      if (!animatedUns) {
        setAnimatedUns(true);
        setTimeout(() => {
          unsavedRef.current?.setAttribute('style', 'display: none;');
          setAnimatedUns(false);
        }, 3000);
      }
    }

    function openReadingMode() {
      navigate(`/reading-mode/surah/${surahId}`);
    }

  return (
    <div className="phone-view">
        <div className="phone-reading-view">
                <div className="phone-reading-header">
                    <button className="phone-back-btn" onClick={handleBack}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                        رجوع
                    </button>
                  <span>سورة {allSurah_s[Number(surahId) - 1]}</span>
                </div>
        
            <div className="phone-nass">
                  <div className="phone-surah-nass-name">
                      سورة {allSurah_s[Number(surahId) - 1]}
                  </div>
                  <div className="phone-surah-nass">
                      {Number(surahId) == 1 || Number(surahId) == 9 ? surah_nass[Number(surahId) - 1] : <><div className="phone-basmalah">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div> {surah_nass[Number(surahId) - 1]}</>}
                  </div>
            </div>

            <div className="phone-listen-surah">
              <div className="phone-save-button">
                  <button onClick={() => {save();savedRef.current?.setAttribute('style', 'display: flex;');}}>حفظ</button>
                  <button onClick={() => {unsave();unsavedRef.current?.setAttribute('style', 'display: flex;');}}>إلغاء</button>
              </div>
              <div className="phone-buttons">
                  <div className="phone-next">
                    <button disabled={Number(surahId) == 114 ? true : false} onClick={() => {location.href.includes("/saved") ? navigate(`/saved/${Number(surahId) + 1}/${partId}`) : navigate(`/surah/${Number(surahId) + 1}`);let el = document.getElementsByClassName('phone-nass')[0] as HTMLDivElement;if(el) el.scrollTo({ top: 0, behavior: 'smooth' })}}>التالية</button>
                  </div>
                  <div className="phone-prev">
                    <button disabled={Number(surahId) == 1 ? true : false} onClick={() => {location.href.includes("/saved") ? navigate(`/saved/${Number(surahId) - 1}/${partId}`) : navigate(`/surah/${Number(surahId) - 1}`);let el = document.getElementsByClassName('phone-nass')[0] as HTMLDivElement;if(el) el.scrollTo({ top: 0, behavior: 'smooth' })}}>السابقة</button>
                  </div>
              </div>
              <div className="phone-bottom-buttons">
                <div className="phone-open-reading-mode" onClick={openReadingMode}>
                  وضع القراءة
                </div>
                <div className="phone-listen" onClick={() => setListen(true)}>
                  استماع
                </div>
              </div>
            </div>
        </div>
        
        <div style={{width: '100%', display: 'flex', justifyContent: 'center', pointerEvents: 'none', position: 'fixed', top: '50%', zIndex: 1000}}>
        <div className="phone-saved" ref={savedRef}>
          !تم حفظ السورة بنجاح
        </div>
      </div>

      <div style={{width: '100%', display: 'flex', justifyContent: 'center', pointerEvents: 'none', position: 'fixed', top: '50%', zIndex: 1000}}>
        <div className="phone-unsaved" ref={unsavedRef}>
          !تم إلغاء حفظ السورة بنجاح
        </div>
      </div>

      {listen && <div className="phone-choose-qaree-modal" onClick={() => setListen(false)}>
        <div className="phone-choose-qaree">
          <div className="phone-choose-qaree-title">
            اختر أحد القراء
          </div>
          <div className="phone-quraa">
            {quraa.map((qaree, i) => (
              <div className="phone-qaree" key={i} onClick={() => listenSurah(qaree.name)}>
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