import { useState, useEffect, useRef } from 'react';
import { supabase } from '../home/Home';
import { allSurah_s } from '../../data/surah_name/surah_name';
import { useNavigate } from 'react-router-dom';
import './PhoneApp.css';

export default function PhoneHome() {
  const [startedWerd, setStartedWerd] = useState<boolean>(false);
  const [currentWerd, setCurrentWerd] = useState<number>(0);
  const [werdModal, setWerdModal] = useState<boolean>(false);
  const [surahSearchValue, setSurahSearchValue] = useState<string>('');
  const [animated, setAnimated] = useState<boolean>(false);

  const noSavedRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  // 1. تهيئة التطبيق وإعداد القيم الافتراضية
  useEffect(() => {
    if (!localStorage.getItem("id")) {
      localStorage.setItem("id", crypto.randomUUID());
    }
    if (!localStorage.getItem("current_surah")) {
      localStorage.setItem("current_surah", JSON.stringify([{ surah_num: null, scroll_top: null }]));
    }
    if (!localStorage.getItem("current_part")) {
      localStorage.setItem("current_part", JSON.stringify([{ part_num: null, scroll_top: null }]));
    }
    if (!localStorage.getItem("werd")) {
      localStorage.setItem("werd", JSON.stringify([{ started: false, current_werd: '', last_time: null, index: null }]));
    }
  }, []);

  // 2. تحميل حالة الورد والتحقق من التحديث اليومي
  useEffect(() => {
    const checkWerdUpdate = async () => {
      if (!localStorage.werd) return;

      const localWerd = JSON.parse(localStorage.werd)[0];
      
      // تحديث الحالة المحلية
      setStartedWerd(localWerd.started);
      setCurrentWerd(localWerd.index);

      // التحقق من مرور 24 ساعة
      const currentTime = new Date().getTime();
      const lastTime = localWerd.last_time || 0;
      
      // محاولة جلب آخر وقت من Supabase للتحقق الأدق (اختياري، يعتمد على LocalStorage كاحتياطي)
      let remoteTime = lastTime;
      try {
        const { data } = await supabase.from('werd').select('last_time').eq('id', localStorage.id).single();
        if (data) remoteTime = data.last_time;
      } catch (err) { console.log('Offline check'); }

      if (currentTime - remoteTime >= 24 * 60 * 60 * 1000 && localWerd.started) {
        const limits: { [key: string]: number } = {
          'phone-page': 603,
          'phone-hezb': 59,
          'phone-part': 29
        };

        const currentType = localWerd.current_werd;
        let newIndex = localWerd.index + 1;

        // إعادة التعيين للصفر عند الوصول للحد الأقصى
        if (limits[currentType] !== undefined && localWerd.index === limits[currentType]) {
          newIndex = 0;
        }

        // تحديث البيانات
        const updateData = { last_time: currentTime, index: newIndex };
        const newLocalData = [{ ...localWerd, ...updateData }];
        
        localStorage.setItem("werd", JSON.stringify(newLocalData));
        setCurrentWerd(newIndex);
        
        // تحديث السيرفر (بدون انتظار الاستجابة لتحسين الأداء)
        supabase.from('werd').update([updateData]).eq('id', localStorage.id).then();
      }
    };

    checkWerdUpdate();
  }, []);

  // دالة عرض رسالة "لا يوجد محفوظات"
  function animateToast() {
    if (!animated && noSavedRef.current) {
      noSavedRef.current.style.display = "flex";
      setAnimated(true);
      setTimeout(() => {
        if (noSavedRef.current) noSavedRef.current.style.display = "none";
        setAnimated(false);
      }, 3000);
    }
  }

  // بدء الورد الجديد
  async function startWerd(werdType: string) {
    const date = new Date().getTime();
    const werdData = { started: true, current_werd: werdType, last_time: date, index: 0 };
    
    localStorage.setItem("werd", JSON.stringify([werdData]));
    await supabase.from('werd').upsert([{ id: localStorage.id, ...werdData }]); // استخدام Upsert لضمان الإنشاء أو التحديث

    setWerdModal(false);
    setStartedWerd(true);
    setCurrentWerd(0);
  }

  // إلغاء الورد
  async function cancelWerd() {
    const emptyWerd = { started: false, current_werd: '', last_time: 0, index: 0 };
    localStorage.setItem("werd", JSON.stringify([emptyWerd]));
    await supabase.from("werd").update(emptyWerd).eq("id", localStorage.id);
    setStartedWerd(false);
  }

  // التنقل للمحفوظات
  function openSaved() {
    const savedSurah = JSON.parse(localStorage.getItem("current_surah") || "[]")[0];
    const savedPart = JSON.parse(localStorage.getItem("current_part") || "[]")[0];

    if (savedSurah?.surah_num != null && savedPart?.part_num != null) {
      navigate(`/saved/${savedSurah.surah_num}/${savedPart.part_num}`);
    } else if (savedSurah?.surah_num != null) {
      navigate(`/surah/${savedSurah.surah_num}`);
    } else if (savedPart?.part_num != null) {
      navigate(`/part/${savedPart.part_num}`);
    } else {
      animateToast();
    }
  }

  return (
    <div id="phone-app" className="phone-app">
      <div className="phone-app-title">
        <h1>وَرَتَّلْنَاهُ تَرْتِيلًا</h1>
      </div>

      <div className="phone-content">
        <div className="phone-quran">
          
          {/* قسم فهرس السور */}
          <div className="phone-fehres">
            <h1>فهرس سور القرآن الكريم</h1>
            <div className="phone-search-surah-names">
              <input 
                type="text" 
                className="phone-search-surah-names-input" 
                value={surahSearchValue} 
                onChange={e => setSurahSearchValue(e.target.value)} 
                placeholder="البحث في السور" 
              />
            </div>
            <div className="phone-surah-list-container">
              {allSurah_s
                .filter(surah => surah.replace("أ", "ا").replace("آ", "ا").includes(surahSearchValue.replace("أ", "ا").replace("آ", "ا")))
                .map((surah, i) => (
                  <div className="phone-surah" key={i} onClick={() => navigate(`/surah/${allSurah_s.indexOf(surah) + 1}`)}>
                    <div className="phone-surah-number">{allSurah_s.indexOf(surah) + 1}</div>
                    <div className="phone-surah-name">سورة {surah}</div>
                  </div>
              ))}
            </div>
          </div>

          {/* قسم فهرس الأجزاء */}
          <div className="phone-parts">
            <div className="phone-quran-parts">
              <h1>فهرس أجزاء القرآن الكريم</h1>
              <div className="phone-parts-list-container">
                {Array.from({ length: 30 }).map((_, i) => (
                  <div className="phone-quran-part" key={i} onClick={() => navigate(`/part/${i + 1}`)}>
                    الجزء {i + 1}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* رسالة التنبيه (Toast) */}
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center', pointerEvents: 'none', position: 'fixed', top: '50%', zIndex: 1000 }}>
            <div className="phone-unsaved phone-saved_part" ref={noSavedRef}>
              !لا يوجد سور أو أجزاء محفوظة
            </div>
          </div>

          {/* نافذة اختيار الورد */}
          {werdModal && (
            <div className="phone-werd-modal-container" onClick={() => setWerdModal(false)}>
              <div className="phone-werd-modal" onClick={e => e.stopPropagation()}>
                <div className="phone-werd-title">اختر وردك اليومي</div>
                <div className="phone-werd-options">
                  <div className="phone-werd-option" onClick={() => startWerd('phone-page')}>صفحة</div>
                  <div className="phone-werd-option" onClick={() => startWerd('phone-hezb')}>حزب</div>
                  <div className="phone-werd-option" onClick={() => startWerd('phone-part')}>جزء</div>
                </div>
              </div>
            </div>
          )}

          {/* الأزرار السفلية */}
          <div className="phone-werd-buttons">
            {startedWerd ? (
              <>
                <div className="phone-open-daily-werd" onClick={() => navigate(`/werd/${currentWerd}`)}>ورد اليوم</div>
                <div className="phone-cancel-werd">
                  <div onClick={cancelWerd}>إلغاء الورد اليومي</div>
                </div>
              </>
            ) : (
              <button className="phone-start-werd-btn" onClick={() => setWerdModal(true)}>إبدأ الورد اليومي</button>
            )}
            <div className="phone-open-saved" onClick={openSaved}>المحفوظة</div>
          </div>

        </div>
      </div>
    </div>
  );
}