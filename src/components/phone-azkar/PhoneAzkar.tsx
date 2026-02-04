import { useNavigate } from 'react-router-dom';
import { firstRow, secondRow, thirdRow } from '../../data/azkar-rows';
import { Helmet } from 'react-helmet-async';

export function PhoneAzkar() {
    const navigate = useNavigate();


    return (
        <>
            <Helmet>
                <title>الأذكار - تطبيق القرآن الكريم</title>
                <meta name="description" content="تطبيق القرآن الكريم لقراءة الأذكار اليومية بسهولة، مع أذكار الصباح والمساء والنوم والاستيقاظ والأذكار بعد الصلاة."></meta>
            </Helmet>
            <div className="azkar-title">الأذكار</div>
            <div className="azkar-container">
                <div className="azkar-types">
                    <div className="type-row">
                        {
                            firstRow.map((type, i) => (
                                <div className={"type " + type.type} key={i} onClick={() => navigate(type.navigationName)}>
                                    <div className="type-img">
                                        <img src={type.src} alt={type.type} draggable={false} />
                                    </div>
                                    <div className="type-name">
                                        {type.name}
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className="type-row">
                        {
                            secondRow.map((type, i) => (
                                <div className={"type " + type.type} key={i} onClick={() => navigate(type.navigationName)}>
                                    <div className="type-img">
                                        <img src={type.src} alt={type.type} draggable={false} />
                                    </div>
                                    <div className="type-name">
                                        {type.name}
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className="type-row">
                        {
                            thirdRow.map((type, i) => (
                                <div className={"type " + type.type} key={i} onClick={() => navigate(type.navigationName)}>
                                    <div className="type-img">
                                        <img src={type.src} alt={type.type} draggable={false} />
                                    </div>
                                    <div className="type-name">
                                        {type.name}
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}