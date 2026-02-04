import { useNavigate } from "react-router-dom";
import { prayOurSirMohammedSegha_s } from "../../azkar/data/prayOurSirMohammed";
import { Helmet } from "react-helmet-async";

export default function PrayProphet() {
    const navigate = useNavigate();

    return (<>
        <Helmet>
            <title>صيغ الصلاة على الرسول ﷺ - تطبيق القرآن الكريم</title>
            <meta name="description" content="صيغ الصلاة على النبي ﷺ مكتوبة للمتابعة والقراءة داخل تطبيق القرآن الكريم."></meta>
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
                        صيغ الصلاة على الرسول ﷺ
                    </div>
                    <div className="azkar-result-text">
                        {prayOurSirMohammedSegha_s.map((zekr, i) => (
                            <div className="zekr pray-our-sir-mohammed" key={i}>
                                <div className="zekr-text">
                                    {zekr.name}
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