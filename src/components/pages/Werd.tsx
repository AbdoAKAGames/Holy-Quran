import { useNavigate, useParams } from "react-router-dom"
import { allHezb } from "../../data/hezb/hezb";
import { allParts } from "../../data/parts/parts";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

export default function Werd() {
    const [dailyWerd, setDailyWerd] = useState<string>("");

    const { currentWerd } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        setDailyWerd(JSON.parse(localStorage.werd)[0].current_werd);
    }, []);

    const handleBack = () => navigate("/");

    function getPageImage(index: number) {
      if (Number(currentWerd) < 10) {
        return new URL(`/pages/pages/page00${index + 1}.png`, import.meta.url).href;
      } else if (Number(currentWerd) >= 10 && Number(currentWerd) < 100) {
        return new URL(`/pages/pages/page0${index + 1}.png`, import.meta.url).href;
      } else if (Number(currentWerd) >= 100) {
        return  new URL(`/pages/pages/page${index + 1}.png`, import.meta.url).href;
      }
    }

    function getPageWerd() {
      return  <img src={getPageImage(Number(currentWerd))} alt="werd" className="phone-werd-img" loading="lazy" />
    }

    return (<>
        <Helmet>
          <title>ورد اليوم - تطبيق القرآن الكريم</title>
          <meta name="description" content="ابدأ وردك اليومي من القرآن الكريم بسهولة داخل تطبيق القرآن الكريم، وتابع تقدمك اليومي في القراءة والحفظ."></meta>
        </Helmet>
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
        </>
    )
}