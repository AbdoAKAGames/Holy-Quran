import { useNavigate, useParams } from "react-router-dom"
import { allHezb } from "../../data/hezb/hezb";
import { allParts } from "../../data/parts/parts";
import { useEffect, useState } from "react";

export default function Werd() {
    const [dailyWerd, setDailyWerd] = useState<string>("");

    const { currentWerd } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        setDailyWerd(JSON.parse(localStorage.werd)[0].current_werd);
    }, []);

    const handleBack = () => navigate("/");

    const getPageWerd = () => {
        if (Number(currentWerd) < 10) {
            return  <img src={`https://github.com/AbdoAKAGames/Holy-Quran/blob/main/src/data/werd/pages/page00${Number(currentWerd) + 1}.png?raw=true`} alt="werd" className="phone-werd-img" />
        }
        else if (Number(currentWerd) >= 10 && Number(currentWerd) < 100) {
            return  <img src={`https://github.com/AbdoAKAGames/Holy-Quran/blob/main/src/data/werd/pages/page0${Number(currentWerd) + 1}.png?raw=true`} alt="werd" className="phone-werd-img" />
        }
        else if (Number(currentWerd) >= 100) {
            return  <img src={`https://github.com/AbdoAKAGames/Holy-Quran/blob/main/src/data/werd/pages/page${Number(currentWerd) + 1}.png?raw=true`} alt="werd" className="phone-werd-img" />
        }
    }

    return (
        <div className="phone-reading-view">
            <div className="phone-reading-header">
                <button className="phone-back-btn" onClick={handleBack}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                    رجوع
                </button>
                <span>ورد اليوم</span>
           </div>
              <div className="phone-daily-werd">
              <div className="phone-werd-container">
                <div className="phone-werd-title">
                  ورد اليوم
                </div>
                <div className="phone-werd-text">
                  {dailyWerd == 'phone-page' && getPageWerd()}
                  {dailyWerd == 'phone-hezb' && allHezb[Number(currentWerd)]}
                  {dailyWerd == 'phone-part' && allParts[Number(currentWerd)]}
                </div>
              </div>
            </div>
        </div>
    )
}