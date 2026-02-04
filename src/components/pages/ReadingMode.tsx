import { useNavigate, useParams } from "react-router-dom";
import { allSurah_s } from "../../data/surah_name/surah_name";
import { allParts } from "../../data/parts/parts";
import { surah_nass } from "../../data/surah/surah_nass";
import { Helmet } from "react-helmet-async";

export default function ReadingMode() {
    const { type, id } = useParams();
    const navigate = useNavigate();

    const handleBack = () => navigate(-1);

    return (
        <>
            <Helmet>
                <title>وضع القراءة - {type == "surah" ? `سورة ${allSurah_s[Number(id) - 1]}` : `الجزء ${Number(id)}`} - تطبيق القرآن الكريم</title>
                <meta name="description" content="وضع قراءة مريح للقرآن الكريم مع تكبير الخط وتصفح الصفحات بسهولة داخل تطبيق القرآن الكريم."></meta>
            </Helmet>
            <div className="phone-view reading-mode-phone-view">
                <div className="phone-reading-view reading-mode-phone-reading-view">
                        <div className="phone-reading-header">
                            <button className="phone-back-btn" onClick={handleBack}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                                رجوع
                            </button>
                          <span>{type == "surah" ? `سورة ${allSurah_s[Number(id) - 1]}` : `الجزء ${Number(id)}`}</span>
                        </div>
                
                    <div className="phone-nass reading-mode-phone-nass">
                        <div className="phone-surah-nass-name">
                            {type == "surah" ? `سورة ${allSurah_s[Number(id) - 1]}` : `الجزء ${Number(id)}`}
                        </div>
                        <div className="reading-mode-nass">
                            {type == "surah" && <>
                                {Number(id) == 1 || Number(id) == 9 ? surah_nass[Number(id) - 1] : <><div className="phone-basmalah">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div> {surah_nass[Number(id) - 1]}</>}
                            </>}
                            {type == "part" && <>
                                {allParts[Number(id) - 1]}
                            </>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}