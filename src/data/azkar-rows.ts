import Sun from "../assets/sun.png";
import Night from "../assets/moon.png";
import PrayProphet from "../assets/parying-our-sir-muhammed.png";
import AfterPray from "../assets/mosque.png";
import Sleep from "../assets/sleep.png";
import Wake from "../assets/wake.png";

export const firstRow = [
    {
        name: "أذكار الصباح",
        src: Sun,
        type: "morning",
        navigationName: "morning"
    },
    {
        name: "أذكار المساء",
        src: Night,
        type: "night",
        navigationName: "night"
    }
];
export const secondRow = [
    {
        name: "الصلاة على الرسول",
        src: PrayProphet,
        type: "parying-our-sir-mohammed",
        navigationName: "pray-prophet"
    },
    {
        name: "أذكار بعد الصلاة",
        src: AfterPray,
        type: "praying",
        navigationName: "after-pray"
    }
];
export const thirdRow = [
    {
        name: "أذكار النوم",
        src: Sleep,
        type: "sleep",
        navigationName: "sleep"
    },
    {
        name: "أذكار الاستيقاظ",
        src: Wake,
        type: "wake",
        navigationName: "wake-up"
    }
];