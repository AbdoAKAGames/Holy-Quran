import { Helmet } from "react-helmet-async";
import PartPage from "./PartPage";
import SurahPage from "./SurahPage";

export default function Saved() {
    return (
        <>
            <Helmet>
                <title>السور المحفوظة - تطبيق القرآن الكريم</title>
                <meta name="description" content="استئناف قراءة السور والأجزاء المحفوظة بسهولة داخل تطبيق القرآن الكريم، متابعة ورد اليوم وحفظ التقدم."></meta>
            </Helmet>
            <SurahPage />
            <PartPage />
        </>
    )
}