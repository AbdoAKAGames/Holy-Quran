import { useState } from 'react';
import { morningAzkar } from './data/morning';
import { nightAzkar } from './data/night';
import { afterPrayAzkar } from './data/afterPray';
import { prayOurSirMohammedSegha_s } from './data/prayOurSirMohammed';
import { sleepAzkar } from './data/sleep';
import { wakeupAzkar } from './data/wakeup';
import '../../App.css'

export function Azkar() {

    const [currentAzkar, setCurrentAzkar] = useState<string>('');

    const firstRow = [
        {
            name: "أذكار الصباح",
            src: "https://github.com/AbdoAKAGames/Holy-Quran/blob/main/src/assets/sun.png?raw=true",
            type: "morning",
        },
        {
            name: "أذكار المساء",
            src: "https://github.com/AbdoAKAGames/Holy-Quran/blob/main/src/assets/moon.png?raw=true",
            type: "night",
        }
    ];
    const secondRow = [
        {
            name: "الصلاة على الرسول",
            src: "https://github.com/AbdoAKAGames/Holy-Quran/blob/main/src/assets/parying-our-sir-muhammed.png?raw=true",
            type: "parying-our-sir-mohammed",
        },
        {
            name: "أذكار بعد الصلاة",
            src: "https://github.com/AbdoAKAGames/Holy-Quran/blob/main/src/assets/mosque.png?raw=true",
            type: "praying",
        }
    ];
    const thirdRow = [
        {
            name: "أذكار النوم",
            src: "https://github.com/AbdoAKAGames/Holy-Quran/blob/main/src/assets/sleep.png?raw=true",
            type: "sleep",
        },
        {
            name: "أذكار الاستيقاظ",
            src: "https://github.com/AbdoAKAGames/Holy-Quran/blob/main/src/assets/wake.png?raw=true",
            type: "wake",
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
                                <div className={"type " + type.type} key={i} onClick={() => setCurrentAzkar(type.name)}>
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
                                <div className={"type " + type.type} key={i} onClick={() => setCurrentAzkar(type.name)}>
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
                                <div className={"type " + type.type} key={i} onClick={() => setCurrentAzkar(type.name)}>
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
                {currentAzkar == "أذكار الصباح" &&
                    <div className="azkar-result-container">
                        <div className="azkar-result">
                            <div className="azkar-result-title">
                                {currentAzkar}
                            </div>
                            <div className="azkar-result-text">
                                {morningAzkar.map((zekr, i) => (
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
                }
                {currentAzkar == "أذكار المساء" &&
                    <div className="azkar-result-container">
                        <div className="azkar-result">
                            <div className="azkar-result-title">
                                {currentAzkar}
                            </div>
                            <div className="azkar-result-text">
                                {nightAzkar.map((zekr, i) => (
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
                }
                {currentAzkar == "أذكار بعد الصلاة" &&
                    <div className="azkar-result-container">
                        <div className="azkar-result">
                            <div className="azkar-result-title">
                                {currentAzkar}
                            </div>
                            <div className="azkar-result-text">
                                {afterPrayAzkar.map((zekr, i) => (
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
                }
                {currentAzkar == "الصلاة على الرسول" &&
                    <div className="azkar-result-container">
                        <div className="azkar-result">
                            <div className="azkar-result-title">
                                {currentAzkar}
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
                }
                {currentAzkar == "أذكار النوم" &&
                    <div className="azkar-result-container">
                        <div className="azkar-result">
                            <div className="azkar-result-title">
                                {currentAzkar}
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
                }
                {currentAzkar == "أذكار الاستيقاظ" &&
                    <div className="azkar-result-container">
                        <div className="azkar-result">
                            <div className="azkar-result-title">
                                {currentAzkar}
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
                }
            </div>
        </>
    )
}