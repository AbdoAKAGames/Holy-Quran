import { useState, useEffect, useRef, useMemo } from 'react';
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

  // Memoize filtered surahs to avoid recalculation every render
  const filteredSurahs = useMemo(() => {
    const normalizedSearch = surahSearchValue.replace(/[أآ]/g, 'ا');
    return allSurah_s.filter(surah =>
      surah.replace(/[أآ]/g, 'ا').includes(normalizedSearch)
    );
  }, [surahSearchValue]);

  // Initialize localStorage once
  useEffect(() => {
    if (!localStorage.id) localStorage.setItem('id', crypto.randomUUID());

    if (!localStorage.getItem('current_surah')) {
      localStorage.setItem('current_surah', JSON.stringify([{ surah_num: null, scroll_top: null }]));
    }
    if (!localStorage.getItem('current_part')) {
      localStorage.setItem('current_part', JSON.stringify([{ part_num: null, scroll_top: null }]));
    }
    if (!localStorage.getItem('werd')) {
      localStorage.setItem('werd', JSON.stringify([{ started: false, current_werd: '', last_time: null, index: null }]));
    }
  }, []);

  // Handle daily werd logic asynchronously after initial render
  useEffect(() => {
    const updateWerd = async () => {
      const currentTime = Date.now();
      const werdDataRaw = localStorage.getItem('werd');
      if (!werdDataRaw) return;

      const werdData = JSON.parse(werdDataRaw)[0];

      // Initialize state from localStorage
      setStartedWerd(!!werdData.started);
      if (werdData.started) setCurrentWerd(werdData.index ?? 0);

      // Check if 24h passed
      if ((werdData.last_time || 0) && currentTime - werdData.last_time >= 24 * 60 * 60 * 1000) {
        const limits: Record<string, number> = {
          'phone-page': 603,
          'phone-hezb': 59,
          'phone-part': 29,
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

          localStorage.setItem('werd', newData);
          setCurrentWerd(nextIndex);
        }
      }
    };

    // Run async logic after paint
    const timeoutId = setTimeout(updateWerd, 0);
    return () => clearTimeout(timeoutId);
  }, []);

  // Animation for empty saved
  const animate = () => {
    if (!animated) {
      setAnimated(true);
      setTimeout(() => setAnimated(false), 3000);
    }
  };

  // Start daily werd
  const startWerd = (werd: string) => {
    const date = Date.now();
    const stringifiedData = JSON.stringify([{ started: true, current_werd: werd, last_time: date, index: 0 }]);
    localStorage.setItem('werd', stringifiedData);
    setWerdModal(false);
    setStartedWerd(true);
    setCurrentWerd(0);
  };

  // Cancel daily werd
  const cancelWerd = () => {
    const stringifiedData = JSON.stringify([{ started: false, current_werd: '', last_time: 0, index: 0 }]);
    localStorage.setItem('werd', stringifiedData);
    setStartedWerd(false);
  };

  // Open saved surah / part
  const openSaved = () => {
    const currentSurah = JSON.parse(localStorage.current_surah)[0];
    const currentPart = JSON.parse(localStorage.current_part)[0];

    if (currentSurah.surah_num != null && currentPart.part_num == null) {
      navigate(`/surah/${currentSurah.surah_num}`);
    } else if (currentPart.part_num != null && currentSurah.surah_num == null) {
      navigate(`/part/${currentPart.part_num}`);
    } else if (currentPart.part_num != null && currentSurah.surah_num != null) {
      navigate(`/saved/${currentSurah.surah_num}/${currentPart.part_num}`);
    } else {
      animate();
    }
  };

  return (
    <div id="phone-app" className="phone-app">
      <style>
        {`
          .phone-app {
            width: 100%;
            height: 100vh;
            display: flex;
            flex-direction: column;
            background-color: #1f2937; /* Dark background */
            color: white;
            font-family: Uthmani; /* Or any Arabic font you prefer */
            overflow: hidden; /* Prevent body scroll */
            padding-bottom: 70px; /* Space for bottom nav */
        }
                
        /* 2. Scrollable Content Area */
        .phone-content {
            flex: 1;
            overflow-y: auto;
            overflow-x: hidden;
            padding: 10px;
            -webkit-overflow-scrolling: touch; /* Smooth scrolling on iOS */
        }
                
        /* 3. Header & Title */
        .phone-app-title {
            text-align: center;
            padding: 15px 0;
            background-color: #111827;
            border-bottom: 1px solid #374151;
            position: sticky;
            top: 0;
            z-index: 100;
        }
                
        .phone-app-title h1 {
            margin: 0;
            font-size: 1.5rem;
            color: #fbbf24;
        }
        `}
      </style>
      <div className="phone-app-title">
        <h1>وَرَتَّلْنَاهُ تَرْتِيلًا</h1>
      </div>

      <div className="phone-content">
        <div className="phone-quran">
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
              {filteredSurahs.map((surah, i) => (
                <div
                  className="phone-surah"
                  key={i}
                  onClick={() => navigate(`/surah/${allSurah_s.indexOf(surah) + 1}`)}
                >
                  <div className="phone-surah-number">{allSurah_s.indexOf(surah) + 1}</div>
                  <div className="phone-surah-name">سورة {surah}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="phone-parts">
            <div className="phone-quran-parts">
              <h1>فهرس أجزاء القرآن الكريم</h1>
              <div className="phone-parts-list-container">
                {Array.from({ length: 30 }).map((_x, i) => (
                  <div
                    className="phone-quran-part"
                    key={i}
                    onClick={() => navigate(`/part/${i + 1}`)}
                  >
                    الجزء {i + 1}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              pointerEvents: 'none',
              position: 'fixed',
              top: '50%',
              zIndex: 1000
            }}
          >
            {animated && (
              <div className="phone-unsaved phone-saved_part" ref={noSavedRef}>
                !لا يوجد سور أو أجزاء محفوظة
              </div>
            )}
          </div>

          {werdModal && (
            <div
              className="phone-werd-modal-container"
              onClick={() => setWerdModal(false)}
            >
              <div
                className="phone-werd-modal"
                onClick={e => e.stopPropagation()}
              >
                <div className="phone-werd-title">اختر وردك اليومي</div>
                <div className="phone-werd-options">
                  <div
                    className="phone-werd-option"
                    onClick={() => startWerd('phone-page')}
                  >
                    صفحة
                  </div>
                  <div
                    className="phone-werd-option"
                    onClick={() => startWerd('phone-hezb')}
                  >
                    حزب
                  </div>
                  <div
                    className="phone-werd-option"
                    onClick={() => startWerd('phone-part')}
                  >
                    جزء
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="phone-werd-buttons">
            {startedWerd ? (
              <>
                <div
                  className="phone-open-daily-werd"
                  onClick={() => navigate(`/werd/${currentWerd}`)}
                >
                  ورد اليوم
                </div>
                <div className="phone-cancel-werd">
                  <div onClick={cancelWerd}>إلغاء الورد اليومي</div>
                </div>
              </>
            ) : (
              <button
                className="phone-start-werd-btn"
                onClick={() => setWerdModal(true)}
              >
                إبدأ الورد اليومي
              </button>
            )}
            <div className="phone-open-saved" onClick={openSaved}>
              المحفوظة
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}