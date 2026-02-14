import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StarsBackground from "../StarsBackground";
import "../../styles/ramadan.css";

const TOTAL_PAGES = 604;
const TOTAL_DAYS = 30;
const BASE_PAGES_PER_DAY = Math.ceil(TOTAL_PAGES / TOTAL_DAYS);

export default function RamadanDailyWerd() {
    const navigate = useNavigate();
    
    const [pagesToShow, setPagesToShow] = useState<number[]>([]);
    const [readPages, setReadPages] = useState<number[]>([]);
    const [plan, setPlan] = useState<any>(null);
    
    useEffect(() => {
      let saved = JSON.parse(
        localStorage.getItem("ramadan_plan_v3") || "null"
      );
    
      if (!saved) {
        saved = {
          startDate: new Date().toISOString(),
          readPages: [],
          streak: 0,
          lastCompletedDay: ""
        };
        localStorage.setItem("ramadan_plan_v3", JSON.stringify(saved));
      }
    
      setPlan(saved);
      setReadPages(saved.readPages || []);
    
      const startDate = new Date(saved.startDate);
      const today = new Date();
    
      const diffDays = Math.floor(
        (today.getTime() - startDate.getTime()) /
          (1000 * 60 * 60 * 24)
      ) + 1;
    
      const currentDay = Math.min(diffDays, TOTAL_DAYS);
    
      const expectedMaxPage = Math.min(
        currentDay * BASE_PAGES_PER_DAY,
        TOTAL_PAGES
      );
    
      const pages = [];
      for (let i = 1; i <= expectedMaxPage; i++) {
        if (!saved.readPages.includes(i)) {
          pages.push(i);
        }
      }
    
      setPagesToShow(pages);
    }, []);
  
    const markPageAsRead = (pageNumber: number) => {
      if (!plan.readPages.includes(pageNumber)) {
        const updatedPages = [...plan.readPages, pageNumber];
        
        const todayKey = new Date().toDateString();
        
        let newStreak = plan.streak;
        if (plan.lastCompletedDay !== todayKey) {
          newStreak += 1;
          plan.lastCompletedDay = todayKey;
        }
      
        const updatedPlan = {
          ...plan,
          readPages: updatedPages,
          streak: newStreak
        };
      
        localStorage.setItem(
          "ramadan_plan_v3",
          JSON.stringify(updatedPlan)
        );
      
        setPlan(updatedPlan);
        setReadPages(updatedPages);
        setPagesToShow(pagesToShow.filter(p => p !== pageNumber));
      }
    };
  
    const pad = (num: number) => String(num).padStart(3, "0");
  
    return (
      <div className="ramadan-container">
        <StarsBackground />
        <h1 className="ramadan-title">📖 ورد رمضان اليومي</h1>
        <div className="ramadan-werd-return" onClick={() => navigate("/ramadan")}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          رجوع
        </div>
    
        <div className="pages-container">
              {pagesToShow.length === 0 ? (
                <p className="done-text">✔ لا يوجد صفحات متبقية اليوم</p>
              ) : (
                pagesToShow.map(page => (
                  <div key={page} className="page-card-large">
                    <img
                      src={`../../src/data/werd/pages/page${pad(page)}.png`}
                      alt={`page-${page}`}
                      loading="lazy"
                    />
    
                    <button
                      className="gold-btn large-btn"
                      onClick={() => markPageAsRead(page)}
                    >
                      أتممت قراءة الصفحة {page}
                    </button>
                  </div>
                ))
              )}
          </div>
      </div>
    );
}