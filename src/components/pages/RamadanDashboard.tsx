import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StarsBackground from "../StarsBackground";
import "../../styles/ramadan.css";

const TOTAL_PAGES = 604;

export default function RamadanDashboard() {
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(0);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem("ramadan_plan_v2");
    if (saved) {
      const plan = JSON.parse(saved);
      setCurrentPage(plan.currentPage);
      setStartDate(plan.startDate);
      setStreak(plan.streak);
    }
  }, []);

  const startRamadan = () => {
    const existing = localStorage.getItem("ramadan_plan_v3");

    // منع إعادة التهيئة لو الخطة موجودة
    if (existing) return;

    // نخزن التاريخ بصيغة محلية بدون وقت
    const today = new Date();
    const localDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    ).toISOString();

    const plan = {
      startDate: localDate,
      readPages: [],        // بدل currentPage
      streak: 0,
      lastCompletedDay: ""
    };

    localStorage.setItem("ramadan_plan_v3", JSON.stringify(plan));

    setStartDate(localDate);
    setCurrentPage(0);
    setStreak(0);
  };

  const progress = Math.min(
    (currentPage / TOTAL_PAGES) * 100,
    100
  ).toFixed(1);

  return (
    <div className="ramadan-container">
      <StarsBackground />

      <h1 className="ramadan-title">🌙 خطة ختمة رمضان</h1>

      <div className="ramadan-werd-return" onClick={() => navigate("/")}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        رجوع
      </div>

      {!startDate ? (
        <button className="gold-btn" onClick={startRamadan}>
          ابدأ خطة رمضان
        </button>
      ) : (
        <>
          <div className="card">
            <h2>التقدم الكلي</h2>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p>{currentPage} / 604 صفحة</p>
            <p>نسبة الإنجاز: {progress}%</p>
          </div>

          <div className="card">
            <h3>سلسلة التقدم</h3>
            <p>{streak} يوم متتالي</p>
          </div>

          <button
            className="gold-btn"
            onClick={() => navigate("/ramadan-daily")}
          >
            فتح ورد رمضان اليومي
          </button>
        </>
      )}
    </div>
  );
}