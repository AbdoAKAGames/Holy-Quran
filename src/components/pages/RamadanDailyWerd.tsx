import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/ramadan.css";

const TOTAL_PAGES = 604;
const RAMADAN_DAYS = 30;
const RAMADAN_START = new Date("2025-03-01");

type RamadanPlan = {
  startDate: string;
  readPages: number[];
  streak: number;
  lastCompletedDay: string;
  khatmas: number;
};

export default function RamadanDailyWerd() {
  const navigate = useNavigate();
  const [plan, setPlan] = useState<RamadanPlan | null>(null);
  const [todayPages, setTodayPages] = useState<number[]>([]);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("ramadan_plan_v3");
    if (!saved) {
      navigate("/ramadan-dashboard");
      return;
    }

    const parsed: RamadanPlan = JSON.parse(saved);
    setPlan(parsed);

    const today = new Date();

    let diffDays =
      Math.floor(
        (today.getTime() - RAMADAN_START.getTime()) /
          (1000 * 60 * 60 * 24)
      ) + 1;

    if (diffDays < 1) diffDays = 1;
    if (diffDays > RAMADAN_DAYS) diffDays = RAMADAN_DAYS;

    const totalTarget = TOTAL_PAGES * parsed.khatmas;
    const pagesPerDay = Math.ceil(totalTarget / RAMADAN_DAYS);

    const startPage = (diffDays - 1) * pagesPerDay + 1;
    const endPage = Math.min(diffDays * pagesPerDay, totalTarget);

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    setTodayPages(pages);

    const todayStr = today.toDateString();
    if (parsed.lastCompletedDay === todayStr) {
      setCompleted(true);
    }
  }, [navigate]);

  const completeToday = () => {
    if (!plan || completed) return;

    const todayStr = new Date().toDateString();

    const updatedPages = [
      ...new Set([...plan.readPages, ...todayPages]),
    ];

    let newStreak = 1;

    if (plan.lastCompletedDay) {
      const last = new Date(plan.lastCompletedDay);
      const diff =
        (new Date().getTime() - last.getTime()) /
        (1000 * 60 * 60 * 24);

      if (Math.floor(diff) === 1) {
        newStreak = plan.streak + 1;
      }
    }

    const updatedPlan: RamadanPlan = {
      ...plan,
      readPages: updatedPages,
      streak: newStreak,
      lastCompletedDay: todayStr,
    };

    localStorage.setItem(
      "ramadan_plan_v3",
      JSON.stringify(updatedPlan)
    );

    setPlan(updatedPlan);
    setCompleted(true);
  };

  if (!plan) return null;

  return (
    <div className="ramadan-container">
      <h1 className="ramadan-title">📖 ورد اليوم</h1>

      <div className="card">
        <p>الصفحات المطلوبة اليوم:</p>

        <p>
          {todayPages.length > 0
            ? `${todayPages[0]} - ${
                todayPages[todayPages.length - 1]
              }`
            : "انتهت الخطة 🎉"}
        </p>
      </div>

      <button
        className="gold-btn"
        onClick={completeToday}
        disabled={completed}
      >
        {completed ? "تم الإكمال ✅" : "إتمام ورد اليوم"}
      </button>

      <button
        className="gold-btn"
        style={{ marginTop: 10 }}
        onClick={() => navigate("/ramadan-dashboard")}
      >
        العودة للوحة التحكم
      </button>
    </div>
  );
}
