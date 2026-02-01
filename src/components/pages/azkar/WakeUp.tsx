import { useNavigate } from "react-router-dom";
import { wakeupAzkar } from "../../azkar/data/wakeup"

export default function WakeUp() {
    const navigate = useNavigate();

    return (
        <div className="phone-reading-view">
            <div className="phone-reading-header">
                <button className="phone-back-btn" onClick={() => navigate("/azkar")}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                    رجوع
                </button>
                <span>الأذكار</span>
            </div>
            <div className="azkar-result-container">
                <div className="azkar-result">
                    <div className="azkar-result-title">
                        أذكار الاستيقاظ
                    </div>
                    <div className="azkar-result-text">
                        {wakeupAzkar.map((zekr, i) => (
                            <div className="zekr" key={i}>
                                <div className="zekr-text">
                                    {zekr.name}
                                </div>
                                <div className="zekr-number">
                                    {zekr.count}
                                </div>
                                <div className="zekr-done">
                                    <input type="checkbox" className="zekr-done-checkbox" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}