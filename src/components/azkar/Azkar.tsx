import { useState } from 'react';
import { morningAzkar } from './data/morning';
import { nightAzkar } from './data/night';
import { afterPrayAzkar } from './data/afterPray';
import { prayOurSirMohammedSegha_s } from './data/prayOurSirMohammed';
import { sleepAzkar } from './data/sleep';
import '../../App.css'
import { wakeupAzkar } from './data/wakeup';

export function Azkar() {

    const [currentAzkar, setCurrentAzkar] = useState<string>('');

    const firstRow = [
        {
            name: "أذكار الصباح",
            src: "src/assets/sun.png",
            type: "morning",
        },
        {
            name: "أذكار المساء",
            src: "src/assets/moon.png",
            type: "night",
        }
    ];
    const secondRow = [
        {
            name: "الصلاة على الرسول ﷺ",
            src: "src/assets/parying-our-sir-muhammed.png",
            type: "parying-our-sir-mohammed",
        },
        {
            name: "أذكار بعد الصلاة",
            src: "src/assets/mosque.png",
            type: "praying",
        }
    ];
    const thirdRow = [
        {
            name: "أذكار النوم",
            src: "src/assets/sleep.png",
            type: "sleep",
        },
        {
            name: "أذكار الاستيقاظ",
            src: "src/assets/wake.png",
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
                {currentAzkar == "الصلاة على الرسول ﷺ" &&
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