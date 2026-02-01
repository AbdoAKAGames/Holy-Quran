import { useNavigate } from 'react-router-dom';
import '../../App.css'

export function PhoneAzkar() {
    const navigate = useNavigate();

    const firstRow = [
        {
            name: "أذكار الصباح",
            src: "https://github.com/AbdoAKAGames/Holy-Quran/blob/main/src/assets/sun.png?raw=true",
            type: "morning",
            navigationName: "morning"
        },
        {
            name: "أذكار المساء",
            src: "https://github.com/AbdoAKAGames/Holy-Quran/blob/main/src/assets/moon.png?raw=true",
            type: "night",
            navigationName: "night"
        }
    ];
    const secondRow = [
        {
            name: "الصلاة على الرسول",
            src: "https://github.com/AbdoAKAGames/Holy-Quran/blob/main/src/assets/parying-our-sir-muhammed.png?raw=true",
            type: "parying-our-sir-mohammed",
            navigationName: "pray-prophet"
        },
        {
            name: "أذكار بعد الصلاة",
            src: "https://github.com/AbdoAKAGames/Holy-Quran/blob/main/src/assets/mosque.png?raw=true",
            type: "praying",
            navigationName: "after-pray"
        }
    ];
    const thirdRow = [
        {
            name: "أذكار النوم",
            src: "https://github.com/AbdoAKAGames/Holy-Quran/blob/main/src/assets/sleep.png?raw=true",
            type: "sleep",
            navigationName: "sleep"
        },
        {
            name: "أذكار الاستيقاظ",
            src: "https://github.com/AbdoAKAGames/Holy-Quran/blob/main/src/assets/wake.png?raw=true",
            type: "wake",
            navigationName: "wake-up"
        }
    ];

    return (
        <>
            <div className="azkar-title">الأذكار</div>
            <div className="azkar-container">
                <div className="azkar-types">
                    <div className="type-row">
                        {
                            firstRow.map((type, i) => (
                                <div className={"type " + type.type} key={i} onClick={() => navigate(type.navigationName)}>
                                    <div className="type-img">
                                        <img src={type.src} alt="sun" draggable={false} />
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
                                        <img src={type.src} alt="sun" draggable={false} />
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
                                        <img src={type.src} alt="sun" draggable={false} />
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