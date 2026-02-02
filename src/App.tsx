import { Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import SurahPage from './components/pages/SurahPage';
import PartPage from './components/pages/PartPage';
import PhoneHome from './components/phone-home/PhoneHome';
import Werd from './components/pages/Werd';
import Saved from './components/pages/Saved';
import { Search } from './components/search/Search';
import { Counter } from './components/counter/Counter';
import { PhoneAzkar } from './components/phone-azkar/PhoneAzkar';
import ToolsLayout from './layouts/ToolsLayout';
import Morning from './components/pages/azkar/Morning';
import Night from './components/pages/azkar/Night';
import PrayProphet from './components/pages/azkar/PrayProphet';
import AfterPray from './components/pages/azkar/AfterPray';
import Sleep from './components/pages/azkar/Sleep';
import WakeUp from './components/pages/azkar/WakeUp';
import SearchResult from './components/pages/SearchResult';
import ReadingMode from './components/pages/ReadingMode';

const phoneRegEx = /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i;
const userAgent = navigator.userAgent;

export default function App() {

  if (phoneRegEx.test(userAgent)) {
    return (
      <>
        <Routes>
          <Route element={<ToolsLayout />}>
            <Route path="/" element={<PhoneHome />} />
            <Route path="/azkar" element={<PhoneAzkar />} />
            <Route path="/counter" element={<Counter />} />
            <Route path="/search" element={<Search />} />
          </Route>

          <Route path="/surah/:surahId" element={<SurahPage />} />
          <Route path="/part/:partId" element={<PartPage />} />
          <Route path="/werd/:currentWerd" element={<Werd />} />
          <Route path="/saved/:surahId/:partId" element={<Saved />} />
          <Route path="/search/result" element={<SearchResult />} />
          <Route path="/reading-mode/:type/:id" element={<ReadingMode />} />

          <Route path="/azkar/morning" element={<Morning />} />
          <Route path="/azkar/night" element={<Night />} />
          <Route path="/azkar/pray-prophet" element={<PrayProphet />} />
          <Route path="/azkar/after-pray" element={<AfterPray />} />
          <Route path="/azkar/sleep" element={<Sleep />} />
          <Route path="/azkar/wake-up" element={<WakeUp />} />
        </Routes>
      </>
    )
  } else return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/reading-mode/:type/:id" element={<ReadingMode />} />
    </Routes>
  )
}