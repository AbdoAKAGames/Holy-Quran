import { useNavigate } from "react-router-dom";
import { sleepAzkar } from "../../azkar/data/sleep"
import { Helmet } from "react-helmet-async";

export default function Sleep() {
    const navigate = useNavigate();

    return (<>
        <Helmet>
            <title>أذكار النوم - تطبيق القرآن الكريم</title>
            <meta name="description" content="أذكار النوم مكتوبة للمتابعة بسهولة داخل تطبيق القرآن الكريم."></meta>
        </Helmet>
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
                        أذكار النوم
                    </div>
                    <div className="azkar-result-text">
                        {sleepAzkar.map((zekr, i) => (
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
        </>
    )
}