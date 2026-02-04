import { useState, useEffect, useRef, useMemo } from 'react';
import { allSurah_s } from '../../data/surah_name/surah_name';
import { useNavigate } from 'react-router-dom';
import './PhoneApp.css'

export default function PhoneHome() {
  const [startedWerd, setStartedWerd] = useState<boolean>(false);
  const [currentWerd, setCurrentWerd] = useState<number>(0);
  const [werdModal, setWerdModal] = useState<boolean>(false);
  const [surahSearchValue, setSurahSearchValue] = useState<string>('');
  const [animated, setAnimated] = useState<boolean>(false);

  const noSavedRef = useRef<HTMLDivElement | null>(null);

  const filteredSurahs = useMemo(() => {
    return allSurah_s.filter(surah => 
      surah.replace("أ", "ا")
      .replace("آ", "ا")
      .includes(surahSearchValue.replace("أ", "ا").replace("آ", "ا"))
    )
  }, [surahSearchValue]);

  const navigate = useNavigate();

  useEffect(() => {
    const createId = () => {
      if (!localStorage.id) {
        localStorage.setItem("id", crypto.randomUUID());
      }
    }

    const werdFunction = async () => {
      const currentTime = Date.now();
      const werdDataRaw = localStorage.getItem("werd");

      if (werdDataRaw) {
        const werdData = JSON.parse(werdDataRaw)[0];
        if (currentTime - (werdData.last_time || 0) >= 24 * 60 * 60 * 1000) {
        
          const limits: Record<string, number> = {
            "phone-page": 603,
            "phone-hezb": 59,
            "phone-part": 29
          };
        
          if (werdData.current_werd in limits) {
            const maxIndex = limits[werdData.current_werd];
            const nextIndex = (werdData.index ?? 0) < maxIndex ? (werdData.index ?? 0) + 1 : 0;
          
            const newData = JSON.stringify([{
              started: true,
              current_werd: werdData.current_werd,
              last_time: currentTime,
              index: nextIndex
            }]);
          
            localStorage.setItem("werd", newData);
            setCurrentWerd(nextIndex);
          }
        }
      }
    }

    const hasStartedWerd = () => {
      const data = localStorage.getItem("werd");
      if (data == null) {
        const stringifiedData = JSON.stringify([{ id: localStorage.id, started: false, current_werd: '', index: null, last_time: null }]);
        localStorage.setItem("werd", stringifiedData);
      } else {
        setStartedWerd(JSON.parse(data)[0].started);
        if (JSON.parse(data)[0].started) {
          setCurrentWerd(JSON.parse(localStorage.werd)[0].index);
        }
      }
    }

    const createSaveData = () => {
      if (!localStorage.getItem("current_surah") || localStorage.getItem("current_surah") == null) {
        localStorage.setItem("current_surah", JSON.stringify([{ surah_num: null, scroll_top: null }]));
      };
      if (!localStorage.getItem("current_part") || localStorage.getItem("current_part") == null) {
        localStorage.setItem("current_part", JSON.stringify([{ part_num: null, scroll_top: null }]));
      };
      if (!localStorage.getItem("werd") || localStorage.getItem("werd") == null) {
        localStorage.setItem("werd", JSON.stringify([{ started: false, current_werd: '', last_time: null, index: null }]));
    };
    }

    werdFunction();
    createId();
    hasStartedWerd();
    createSaveData();
  }, []);

  function animate() {
    if (!animated) {
      if (noSavedRef.current) noSavedRef.current.style.display = "flex";
      setAnimated(true);
      setTimeout(() => {
        if (noSavedRef.current) noSavedRef.current.style.display = "none";
        setAnimated(false);
      }, 3000);
    }
  }

  async function startWerd(werd: string) {
    const date = new Date().getTime();
    const stringifiedData = JSON.stringify([{ started: true, current_werd: werd, last_time: date, index: 0 }])
    localStorage.setItem("werd", stringifiedData);
    setWerdModal(false);
    setStartedWerd(true);
    setCurrentWerd(0);
  }

  function openSaved() {
    if (JSON.parse(localStorage.current_surah)[0].surah_num != null && JSON.parse(localStorage.current_part)[0].part_num == null) {
      navigate(`/surah/${JSON.parse(localStorage.current_surah)[0].surah_num}`);
    } else if (JSON.parse(localStorage.current_part)[0].part_num != null && JSON.parse(localStorage.current_surah)[0].surah_num == null) {
      navigate(`/part/${JSON.parse(localStorage.current_part)[0].part_num}`);
    } else if (JSON.parse(localStorage.current_part)[0].part_num != null && JSON.parse(localStorage.current_surah)[0].surah_num != null) {
      navigate(`/saved/${JSON.parse(localStorage.current_surah)[0].surah_num}/${JSON.parse(localStorage.current_part)[0].part_num}`);
    } else if (JSON.parse(localStorage.current_part)[0].part_num == null && JSON.parse(localStorage.current_surah)[0].surah_num == null) {
      animate()
    }
  }

  async function cancelWerd() {
    const stringifiedData = JSON.stringify([{ started: false, current_werd: '', last_time: 0, index: 0 }]);
    localStorage.setItem("werd", stringifiedData);
    setStartedWerd(false);
  }

  return (
    <>
    <div id="phone-app" className="phone-app">
      <div className="phone-app-title">
        <h1>وَرَتَّلْنَاهُ تَرْتِيلًا</h1>
      </div>

      <div className="phone-content">
      <div className="phone-quran">        
            <div className="phone-fehres">
                <h1>فهرس سور القرآن الكريم</h1>
                <div className="phone-search-surah-names">
                    <input type="text" className="phone-search-surah-names-input" value={surahSearchValue} onChange={e => setSurahSearchValue(e.target.value)} placeholder="البحث في السور" />
                </div>
                <div className="phone-surah-list-container">
                    {filteredSurahs.map((surah, i) => (
                        <div className="phone-surah" key={i} onClick={() => {
                            navigate(`/surah/${allSurah_s.indexOf(surah) + 1}`);
                        }}>
                        <div className="phone-surah-number">
                        {allSurah_s.indexOf(surah) + 1}
                        </div>
                        <div className="phone-surah-name">
                        سورة {surah}
                        </div>
                    </div>
                    ))}
                </div>
            </div>

        <div className="phone-parts">
            <div className="phone-quran-parts">
                <h1>فهرس أجزاء القرآن الكريم</h1>
                <div className="phone-parts-list-container">
                    {Array.from({ length: 30}).map((_x, i) => (
                    <div className="phone-quran-part" key={i} onClick={() => {
                        navigate(`/part/${i + 1}`);
                    }}>
                        الجزء {i + 1}
                    </div>
                    ))}
                </div>
            </div>
        </div>

      <div style={{width: '100%', display: 'flex', justifyContent: 'center', pointerEvents: 'none', position: 'fixed', top: '50%', zIndex: 1000}}>
        <div className="phone-unsaved phone-saved_part" ref={noSavedRef}>
          !لا يوجد سور أو أجزاء محفوظة
        </div>
      </div>
      
      {werdModal && 
      <div className="phone-werd-modal-container" onClick={() => setWerdModal(false)}>
        <div className="phone-werd-modal" onClick={e => e.stopPropagation()}>
          <div className="phone-werd-title">
            اختر وردك اليومي
          </div>
          <div className="phone-werd-options">
            <div className="phone-werd-option" onClick={() => startWerd('phone-page')}>
              صفحة
            </div>
            <div className="phone-werd-option" onClick={() => startWerd('phone-hezb')}>
              حزب
            </div>
            <div className="phone-werd-option" onClick={() => startWerd('phone-part')}>
              جزء
            </div>
          </div>
        </div>
      </div>
      }
      
      <div className="phone-werd-buttons">
        {startedWerd ? <><div className="phone-open-daily-werd" onClick={() => navigate(`/werd/${currentWerd}`)}>ورد اليوم</div>
          <div className="phone-cancel-werd">
            <div onClick={() => cancelWerd()}>إلغاء الورد اليومي</div>
          </div></> : <button className="phone-start-werd-btn" onClick={() => setWerdModal(true)}>إبدأ الورد اليومي</button>}
          <div className="phone-open-saved" onClick={openSaved}>المحفوظة</div>
      </div>

      </div>        
      </div>

    </div>
    </>
  )
}