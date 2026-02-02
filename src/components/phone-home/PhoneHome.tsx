import { useState, useRef, useEffect } from 'react';
import { supabase } from '../home/Home';
import { allSurah_s } from '../../data/surah_name/surah_name';
import { useNavigate } from 'react-router-dom';
import './PhoneApp.css'

export default function PhoneHome() {
  const [startedWerd, setStartedWerd] = useState<boolean>(false);
  const [currentWerd, setCurrentWerd] = useState<number>(0);
  const [werdModal, setWerdModal] = useState<boolean>(false);
  const [surahSearchValue, setSurahSearchValue] = useState<string>('');
  
  const ref = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);
  const savedRef = useRef<HTMLDivElement>(null);
  const unsavedRef = useRef<HTMLDivElement>(null);
  const savedRefPart = useRef<HTMLDivElement>(null);
  const unsavedRefPart = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("current_surah") || localStorage.getItem("current_surah") == null) {
      localStorage.setItem("current_surah", JSON.stringify([{ surah_num: null, scroll_top: null }]));
    };
    if (!localStorage.getItem("current_part") || localStorage.getItem("current_part") == null) {
      localStorage.setItem("current_part", JSON.stringify([{ part_num: null, scroll_top: null }]));
    };
    if (!localStorage.getItem("werd") || localStorage.getItem("werd") == null) {
      localStorage.setItem("werd", JSON.stringify([{ started: false, current_werd: '', last_time: null, index: null }]));
    };
  }, []);

  useEffect(() => {
    if (!localStorage.id) {
      localStorage.setItem("id", crypto.randomUUID());
    }
  })
async function startWerd(werd: string) {
  const date = new Date().getTime();
  const stringifiedData = JSON.stringify([{ started: true, current_werd: werd, last_time: date, index: 0 }])
  localStorage.setItem("werd", stringifiedData);
  setWerdModal(false);
  setStartedWerd(true);
  setCurrentWerd(0);
}

window.addEventListener("load", async () => {
  setCurrentWerd(JSON.parse(localStorage.werd)[0].index);
  const currentTime = new Date().getTime();
  // console.log(currentTime - (await supabase.from('werd').select().eq('id', localStorage.id)).data?.at(0).last_time >= 24*60*60*1000);
  if (currentTime - (await supabase.from('werd').select().eq('id', localStorage.id)).data?.at(0).last_time >= 24*60*60*1000) {
    if ((await supabase.from('werd').select().eq('id', localStorage.id)).data?.at(0).current_werd == 'phone-page') {
      if ((await supabase.from('werd').select().eq('id', localStorage.id)).data?.at(0).index != 603) {
        await supabase.from('werd').update([{ last_time: new Date().getTime(), index: (await supabase.from('werd').select().eq('id', localStorage.id)).data?.at(0).index + 1 }]).eq('id', localStorage.id);
      } else {
        await supabase.from('werd').update([{ last_time: new Date().getTime(), index: 0 }]).eq('id', localStorage.id);
      }
    }
    if ((await supabase.from('werd').select().eq('id', localStorage.id)).data?.at(0).current_werd == 'phone-hezb') {
      if ((await supabase.from('werd').select().eq('id', localStorage.id)).data?.at(0).index != 59) {
        await supabase.from('werd').update([{ last_time: new Date().getTime(), index: (await supabase.from('werd').select().eq('id', localStorage.id)).data?.at(0).index + 1 }]).eq('id', localStorage.id);
      } else {
        await supabase.from('werd').update([{ last_time: new Date().getTime(), index: 0 }]).eq('id', localStorage.id);
      }
    }
    if ((await supabase.from('werd').select().eq('id', localStorage.id)).data?.at(0).current_werd == 'phone-part') {
      if ((await supabase.from('werd').select().eq('id', localStorage.id)).data?.at(0).index != 29) {
        await supabase.from('werd').update([{ last_time: new Date().getTime(), index: (await supabase.from('werd').select().eq('id', localStorage.id)).data?.at(0).index + 1 }]).eq('id', localStorage.id);
      } else {
        await supabase.from('werd').update([{ last_time: new Date().getTime(), index: 0 }]).eq('id', localStorage.id);
      }
    }
    setCurrentWerd((await supabase.from('werd').select().eq('id', localStorage.id)).data?.at(0).index);
  }
})

function openSaved() {
  if (JSON.parse(localStorage.current_surah)[0].surah_num != null && JSON.parse(localStorage.current_part)[0].part_num == null) {
    navigate(`/surah/${JSON.parse(localStorage.current_surah)[0].surah_num}`);
  } else if (JSON.parse(localStorage.current_part)[0].part_num != null && JSON.parse(localStorage.current_surah)[0].surah_num == null) {
    navigate(`/part/${JSON.parse(localStorage.current_part)[0].part_num}`);
  } else if (JSON.parse(localStorage.current_part)[0].part_num != null && JSON.parse(localStorage.current_surah)[0].surah_num != null) {
    navigate(`/saved/${JSON.parse(localStorage.current_surah)[0].surah_num}/${JSON.parse(localStorage.current_part)[0].part_num}`);
  }
}

useEffect(() => {
  if (!localStorage.current_surah) {
    localStorage.setItem("current_surah", JSON.stringify([{ surah_num: null, scroll_top: null }]))
  } else {
    if (JSON.parse(localStorage.current_surah)[0].surah_num != null) {
      let int = setInterval(() => {
        let el = document.getElementsByClassName('phone-nass')[0] as HTMLDivElement;
        if(el) el.scrollTo({ top: JSON.parse(localStorage.current_surah)[0].scroll_top, behavior: 'smooth' });
        if (el) {
          clearInterval(int);
        }
      }, 100);
    }
  }
  if (!localStorage.current_part) {
    localStorage.setItem("current_part", JSON.stringify([{ part_num: null, scroll_top: null }]))
  } else {
    if (JSON.parse(localStorage.current_part)[0].part_num != null) {
      let int = setInterval(() => {
        let el = document.getElementsByClassName('phone-quran-part-nass')[0] as HTMLDivElement;
        if(el) el.scrollTo({ top: JSON.parse(localStorage.current_part)[0].scroll_top, behavior: 'smooth' });
        if (el) {
          clearInterval(int);
        }
      }, 100);
    }
  }
}, []);

useEffect(() => {
  const currentTime = new Date().getTime();
  if (localStorage.werd != null) {
    if (currentTime - JSON.parse(localStorage.werd)[0].last_time >= 24*60*60*1000) {
      if (JSON.parse(localStorage.werd)[0].current_werd == 'phone-page') {
        if (JSON.parse(localStorage.werd)[0].index != 603) {
          const stringifiedData = JSON.stringify([{ started: true, current_werd: 'phone-page', last_time: new Date().getTime(), index: JSON.parse(localStorage.werd)[0].index + 1 }])
          localStorage.setItem("werd", stringifiedData);
        } else {
          const stringifiedData = JSON.stringify([{ started: true, current_werd: 'phone-page', last_time: new Date().getTime(), index: 0 }])
          localStorage.setItem("werd", stringifiedData);
        }
      }
      if (JSON.parse(localStorage.werd)[0].current_werd == 'phone-hezb') {
        if (JSON.parse(localStorage.werd)[0].index != 59) {
          const stringifiedData = JSON.stringify([{ started: true, current_werd: 'phone-hezb', last_time: new Date().getTime(), index: JSON.parse(localStorage.werd)[0].index + 1 }])
          localStorage.setItem("werd", stringifiedData);
        } else {
          const stringifiedData = JSON.stringify([{ started: true, current_werd: 'phone-hezb', last_time: new Date().getTime(), index: 0 }])
          localStorage.setItem("werd", stringifiedData);
        }
      }
      if (JSON.parse(localStorage.werd)[0].current_werd == 'phone-part') {
        if (JSON.parse(localStorage.werd)[0].index != 29) {
          const stringifiedData = JSON.stringify([{ started: true, current_werd: 'phone-part', last_time: new Date().getTime(), index: JSON.parse(localStorage.werd)[0].index + 1 }])
          localStorage.setItem("werd", stringifiedData);
        } else {
          const stringifiedData = JSON.stringify([{ started: true, current_werd: 'phone-part', last_time: new Date().getTime(), index: 0 }])
          localStorage.setItem("werd", stringifiedData);
        }
      }
      setCurrentWerd(JSON.parse(localStorage.werd)[0].index);
    }
  }
}, []);

useEffect(() => {
  const data = localStorage.getItem("werd");
  if (data == null) {
    const stringifiedData = JSON.stringify([{ id: localStorage.id, started: false, current_werd: '', index: null, last_time: null }]);
    localStorage.setItem("werd", stringifiedData);
  } else {
    setStartedWerd(JSON.parse(data)[0].started);
  }
}, []);


useEffect(() => {
  if (localStorage.werd && JSON.parse(localStorage.werd)[0].started) {
    setStartedWerd(JSON.parse(localStorage.werd)[0].started);
    setCurrentWerd(JSON.parse(localStorage.werd)[0].index);
  }
}, []);
useEffect(() => {
  const element = document.getElementsByClassName('phone-first')[0] as HTMLDivElement;
  if(element) element.click();
}, []);


useEffect(() => {
  let int = setInterval(() => {
    let el = document.getElementsByClassName('phone-nass')[0] as HTMLDivElement;
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start', });
      clearInterval(int);
    }
  }, 1);
  let int2 = setInterval(() => {
    let el = document.getElementsByClassName('phone-quran-part-nass')[0] as HTMLDivElement;
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start', });
      clearInterval(int2);
    }
  }, 1);
}, []);

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
                    {allSurah_s.filter(surah => surah.replace("أ", "ا").replace("آ", "ا").includes(surahSearchValue.replace("أ", "ا").replace("آ", "ا"))).map((surah, i) => (
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
        <div className="phone-saved" ref={savedRef}>
          !تم حفظ السورة بنجاح
        </div>
      </div>
      <div style={{width: '100%', display: 'flex', justifyContent: 'center', pointerEvents: 'none', position: 'fixed', top: '50%', zIndex: 1000}}>
        <div className="phone-unsaved" ref={unsavedRef}>
          !تم إلغاء حفظ السورة بنجاح
        </div>
      </div>

       <div style={{width: '100%', display: 'flex', justifyContent: 'center', pointerEvents: 'none', position: 'fixed', top: '50%', zIndex: 1000}}>
        <div className="phone-saved phone-saved_part" ref={savedRefPart}>
          !تم حفظ الجزء بنجاح
        </div>
      </div>
      <div style={{width: '100%', display: 'flex', justifyContent: 'center', pointerEvents: 'none', position: 'fixed', top: '50%', zIndex: 1000}}>
        <div className="phone-unsaved phone-saved_part" ref={unsavedRefPart}>
          !تم إلغاء حفظ الجزء بنجاح
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
        <div className="phone-audio" ref={ref}></div>
        <div className="phone-audio" ref={ref2}></div>
        
      </div>

    </div>
    </>
  )
}