import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StarsBackground from "../StarsBackground";
import "../../styles/ramadan.css";

const TOTAL_PAGES = 604;
const RAMADAN_DAYS = 30;

// ⚠️ عدّل التاريخ يدويًا كل سنة حسب بداية رمضان
const RAMADAN_START = new Date("2025-03-01");

type RamadanPlan = {
  startDate: string;
  readPages: number[];
  streak: number;
  lastCompletedDay: string;
  khatmas: number;
};

export default function RamadanDashboard() {
  const navigate = useNavigate();
  const [plan, setPlan] = useState<RamadanPlan | null>(null);
  const [khatmas, setKhatmas] = useState(1);

  useEffect(() => {
    const saved = localStorage.getItem("ramadan_plan_v3");
    if (saved) {
      setPlan(JSON.parse(saved));
    }
  }, []);

  const startRamadan = () => {
    if (plan) return;

    const normalized = new Date(
      RAMADAN_START.getFullYear(),
      RAMADAN_START.getMonth(),
      RAMADAN_START.getDate()
    ).toISOString();

    const newPlan: RamadanPlan = {
      startDate: normalized,
      readPages: [],
      streak: 0,
      lastCompletedDay: "",
      khatmas,
    };

    localStorage.setItem("ramadan_plan_v3", JSON.stringify(newPlan));
    setPlan(newPlan);
  };

  if (!plan) {
    return (
      <div className="ramadan-container">
        <StarsBackground />
        <h1 className="ramadan-title">🌙 خطة ختمة رمضان</h1>

        <div className="card">
          <h2>اختر عدد الختمات</h2>

          <select
            value={khatmas}
            onChange={(e) => setKhatmas(Number(e.target.value))}
            className="khatma-select"
          >
            {[1, 2, 3, 4].map((n) => (
              <option key={n} value={n}>
                {n} ختمة
              </option>
            ))}
          </select>

          <p>
            الصفحات يوميًا:{" "}
            {Math.ceil((TOTAL_PAGES * khatmas) / RAMADAN_DAYS)}
          </p>

          <button className="gold-btn" onClick={startRamadan}>
            ابدأ خطة رمضان
          </button>
        </div>
      </div>
    );
  }

  const totalTarget = TOTAL_PAGES * plan.khatmas;
  const currentPages = plan.readPages.length;

  const progress = Math.min(
    (currentPages / totalTarget) * 100,
    100
  ).toFixed(1);

  const pagesPerDay = Math.ceil(totalTarget / RAMADAN_DAYS);

  return (
    <div className="ramadan-container">
      <StarsBackground />
      <h1 className="ramadan-title">🌙 خطة ختمة رمضان</h1>

      <div className="card">
        <h2>التقدم الكلي</h2>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p>
          {currentPages} / {totalTarget} صفحة
        </p>
        <p>نسبة الإنجاز: {progress}%</p>
        <p>عدد الصفحات اليومية: {pagesPerDay}</p>
        <p>عدد الختمات: {plan.khatmas}</p>
      </div>

      <div className="card">
        <h3>سلسلة التقدم</h3>
        <p>{plan.streak} يوم متتالي</p>
      </div>

      <button
        className="gold-btn"
        onClick={() => navigate("/ramadan-daily")}
      >
        فتح ورد اليوم
      </button>
    </div>
  );
}
