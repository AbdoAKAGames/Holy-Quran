import { useState, useRef, useEffect } from 'react';
// import { ReactNode } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Search } from './components/search/Search';
import { allParts } from './data/parts/parts';
import { surah_nass } from './data/surah/surah_nass';
import { allSurah_s } from './data/surah_name/surah_name';
import { Azkar } from './components/azkar/Azkar';
import { Counter } from './components/counter/Counter';
import { allHezb } from './data/hezb/hezb';
import './App.css'
// import { shaarawy_tafseer } from './data/tafseer/shaarawy';
export const supabase = createClient("https://qyaesdyfffwhzckftdsy.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF5YWVzZHlmZmZ3aHpja2Z0ZHN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg2Nzk0NzcsImV4cCI6MjA0NDI1NTQ3N30.QIxNcaBBYwwK_By_X4_QEElgjpTp3NyYQMETrWDOB10");

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('');
  const [currentSurahNass, setCurrentSurahNass] = useState<number>(0);
  const [currentPartNass, setCurrentPartNass] = useState<number>(0);
  const [listen, setListen] = useState<boolean>(false);
  const [listenPart, setListenPart] = useState<boolean>(false);
  const [listening, setListening] = useState<boolean>(false);
  const [animated, setAnimated] = useState<boolean>(false);
  const [animatedUns, setAnimatedUns] = useState<boolean>(false);
  const [animatedPart, setAnimatedPart] = useState<boolean>(false);
  const [animatedUnsPart, setAnimatedUnsPart] = useState<boolean>(false);
  const [startedWerd, setStartedWerd] = useState<boolean>(false);
  const [currentWerd, setCurrentWerd] = useState<number>(0);
  const [werdModal, setWerdModal] = useState<boolean>(false);
  const [dailyWerd, setDailyWerd] = useState<string>('');
  // const [currentTafseer, setCurrentTafseer] = useState<ReactNode>();
  // const [currentTafseerName, setCurrentTafseerName] = useState<string>('');
  const ref = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);
  const savedRef = useRef<HTMLDivElement>(null);
  const unsavedRef = useRef<HTMLDivElement>(null);
  const savedRefPart = useRef<HTMLDivElement>(null);
  const unsavedRefPart = useRef<HTMLDivElement>(null);


  useEffect(() => {
    if (!localStorage.getItem("current_surah") || localStorage.getItem("current_surah") == null) {
      localStorage.setItem("current_surah", JSON.stringify([{ surah_num: null, scroll_top: null }]));
    };
    if (!localStorage.getItem("current_part") || localStorage.getItem("current_part") == null) {
      localStorage.setItem("current_part", JSON.stringify([{ part_num: null, scroll_top: null }]));
    };
    if (!localStorage.getItem("werd") || localStorage.getItem("werd") == null) {
      localStorage.setItem("werd", JSON.stringify([{ started: false, current_werd: '', last_time: null, index: null }]));
    };
  }, []);



  const phoneRegEx = /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i;
  const userAgent = navigator.userAgent;




const quraa = [
  {
    name: 'عبد الباسط عبد الصمد',
    image: 'https://github.com/AbdoAKAGames/Holy-Quran/blob/main/src/quraa-images/Abd-Elbaset-Abd-Elsamad.png?raw=true',
  },
  {
    name: 'محمود خليل الحصري',
    image: 'https://github.com/AbdoAKAGames/Holy-Quran/blob/main/src/quraa-images/Al-Hussary.png?raw=true',
  },
  {
    name: 'محمد صديق المنشاوي',
    image: 'https://github.com/AbdoAKAGames/Holy-Quran/blob/main/src/quraa-images/Al-Minshawi.png?raw=true',
  },
  {
    name: 'ياسر الدوسري',
    image: 'https://github.com/AbdoAKAGames/Holy-Quran/blob/main/src/quraa-images/Al-Dossari.png?raw=true',
  },
  // {
  //   name: 'محمد صديق المنشاوي',
  //   image: 'https://github.com/AbdoAKAGames/Holy-Quran/blob/main/src/quraa-images/Al-Minshawi.png?raw=true',
  // },
  // {
  //   name: 'محمد صديق المنشاوي',
  //   image: 'https://github.com/AbdoAKAGames/Holy-Quran/blob/main/src/quraa-images/Al-Minshawi.png?raw=true',
  // },
];
// const tafaseer = [
//   {
//     name: 'الشيخ الشعراوي',
//     taf: shaarawy_tafseer,
//   },
// ]

function listenSurah(qaree: string) {
  if (!listening) {
    const Surah = document.createElement('audio');
    if (qaree == 'عبد الباسط عبد الصمد') {
      if (currentSurahNass < 10) {
        Surah.src = `https://server7.mp3quran.net/basit/Almusshaf-Al-Mojawwad/00${currentSurahNass}.mp3`;
      }
      else if (currentSurahNass >= 10 && currentSurahNass < 100) {
        Surah.src = `https://server7.mp3quran.net/basit/Almusshaf-Al-Mojawwad/0${currentSurahNass}.mp3`;
      } else if (currentSurahNass >= 100) {
        Surah.src = `https://server7.mp3quran.net/basit/Almusshaf-Al-Mojawwad/${currentSurahNass}.mp3`;
      }
    }
    else if (qaree == 'محمود خليل الحصري') {
      if (currentSurahNass < 10) {
        Surah.src = `https://server13.mp3quran.net/husr/00${currentSurahNass}.mp3`;
      }
      else if (currentSurahNass >= 10 && currentSurahNass < 100) {
        Surah.src = `https://server13.mp3quran.net/husr/0${currentSurahNass}.mp3`;
      } else if (currentSurahNass >= 100) {
        Surah.src = `https://server13.mp3quran.net/husr/${currentSurahNass}.mp3`;
      }
    }
    else if (qaree == 'محمد صديق المنشاوي') {
      if (currentSurahNass < 10) {
        Surah.src = `https://server10.mp3quran.net/minsh/00${currentSurahNass}.mp3`;
      }
      else if (currentSurahNass >= 10 && currentSurahNass < 100) {
        Surah.src = `https://server10.mp3quran.net/minsh/0${currentSurahNass}.mp3`;
      } else if (currentSurahNass >= 100) {
        Surah.src = `https://server10.mp3quran.net/minsh/${currentSurahNass}.mp3`;
      }
    }
    else if (qaree == 'ياسر الدوسري') {
      if (currentSurahNass < 10) {
        Surah.src = `https://server11.mp3quran.net/yasser/00${currentSurahNass}.mp3`;
      }
      else if (currentSurahNass >= 10 && currentSurahNass < 100) {
        Surah.src = `https://server11.mp3quran.net/yasser/0${currentSurahNass}.mp3`;
      } else if (currentSurahNass >= 100) {
        Surah.src = `https://server11.mp3quran.net/yasser/${currentSurahNass}.mp3`;
      }
    }
    Surah.controls = true;
    ref.current?.append(Surah);
    Surah.play();
    setListening(true);
    Surah.scrollIntoView({ block: "center", behavior: 'smooth' });
  };
  if (listening) {
    document.querySelector('audio')?.remove();
    const Surah = document.createElement('audio');
    if (qaree == 'عبد الباسط عبد الصمد') {
      if (currentSurahNass < 10) {
        Surah.src = `https://server7.mp3quran.net/basit/Almusshaf-Al-Mojawwad/00${currentSurahNass}.mp3`;
      }
      else if (currentSurahNass >= 10 && currentSurahNass < 100) {
        Surah.src = `https://server7.mp3quran.net/basit/Almusshaf-Al-Mojawwad/0${currentSurahNass}.mp3`;
      } else if (currentSurahNass >= 100) {
        Surah.src = `https://server7.mp3quran.net/basit/Almusshaf-Al-Mojawwad/${currentSurahNass}.mp3`;
      }
    }
    else if (qaree == 'محمود خليل الحصري') {
      if (currentSurahNass < 10) {
        Surah.src = `https://server13.mp3quran.net/husr/00${currentSurahNass}.mp3`;
      }
      else if (currentSurahNass >= 10 && currentSurahNass < 100) {
        Surah.src = `https://server13.mp3quran.net/husr/0${currentSurahNass}.mp3`;
      } else if (currentSurahNass >= 100) {
        Surah.src = `https://server13.mp3quran.net/husr/${currentSurahNass}.mp3`;
      }
    }
    else if (qaree == 'محمد صديق المنشاوي') {
      if (currentSurahNass < 10) {
        Surah.src = `https://server10.mp3quran.net/minsh/00${currentSurahNass}.mp3`;
      }
      else if (currentSurahNass >= 10 && currentSurahNass < 100) {
        Surah.src = `https://server10.mp3quran.net/minsh/0${currentSurahNass}.mp3`;
      } else if (currentSurahNass >= 100) {
        Surah.src = `https://server10.mp3quran.net/minsh/${currentSurahNass}.mp3`;
      }
    }
    else if (qaree == 'ياسر الدوسري') {
      if (currentSurahNass < 10) {
        Surah.src = `https://server11.mp3quran.net/yasser/00${currentSurahNass}.mp3`;
      }
      else if (currentSurahNass >= 10 && currentSurahNass < 100) {
        Surah.src = `https://server11.mp3quran.net/yasser/0${currentSurahNass}.mp3`;
      } else if (currentSurahNass >= 100) {
        Surah.src = `https://server11.mp3quran.net/yasser/${currentSurahNass}.mp3`;
      }
    }
    Surah.controls = true;
    ref.current?.append(Surah);
    Surah.play();
    Surah.scrollIntoView({ block: "center", behavior: 'smooth' });
  }
};
function listenParts(qaree: string){
  if (!listening) {
    const Surah = document.createElement('audio');
    if (qaree == 'محمود خليل الحصري') {
      if (currentPartNass < 10) {
        Surah.src = `https://ia902906.us.archive.org/20/items/AlHossarry/0${currentPartNass}.mp3`;
      }
      else if (currentPartNass >= 10) {
        Surah.src = `https://ia902906.us.archive.org/20/items/AlHossarry/${currentPartNass}.mp3`;
      }
    }
    else if (qaree == 'محمد صديق المنشاوي') {
      if (currentPartNass < 10) {
        Surah.src = `https://ia801903.us.archive.org/33/items/12_202007xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx31/%D8%A7%D9%84%D9%85%D9%86%D8%B4%D8%A7%D9%88%D9%8A%20%20%D9%85%D8%B1%D8%AA%D9%84%20%D9%85%D8%B5%D8%AD%D9%81%20%20%D9%85%D9%82%D8%B3%D9%85%20%D8%A3%D8%AC%D8%B2%D8%A7%D8%A1%20%D8%AC%D8%B2%D8%A1%20%D8%B1%D9%82%D9%85%200${currentPartNass}.mp3`;
      }
      else if (currentPartNass >= 10) {
        Surah.src = `https://ia801903.us.archive.org/33/items/12_202007xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx31/%D8%A7%D9%84%D9%85%D9%86%D8%B4%D8%A7%D9%88%D9%8A%20%20%D9%85%D8%B1%D8%AA%D9%84%20%D9%85%D8%B5%D8%AD%D9%81%20%20%D9%85%D9%82%D8%B3%D9%85%20%D8%A3%D8%AC%D8%B2%D8%A7%D8%A1%20%D8%AC%D8%B2%D8%A1%20%D8%B1%D9%82%D9%85%20${currentPartNass}.mp3`;
      }
    }
    else if (qaree == 'عبد الباسط عبد الصمد') {
      if (currentPartNass < 10) {
        Surah.src = `https://ia803201.us.archive.org/6/items/aaaaaaaaaaaaaaaaaaaaaa812_20200812_1445/%D9%85%D8%B5%D8%AD%D9%81%20%D8%B9%D8%A8%D8%AF%D8%A7%D9%84%D8%A8%D8%A7%D8%B3%D8%B7%20%D8%A7%D9%84%D9%85%D8%AC%D9%88%D8%AF%20%D9%85%D9%82%D8%B3%D9%85%20%D8%A3%D8%AC%D8%B2%D8%A7%D8%A1%20%D8%AC%D8%B2%D8%A1%20%D8%B1%D9%82%D9%85%200${currentPartNass}.mp3`;
      }
      else if (currentPartNass >= 10) {
        Surah.src = `https://ia803201.us.archive.org/6/items/aaaaaaaaaaaaaaaaaaaaaa812_20200812_1445/%D9%85%D8%B5%D8%AD%D9%81%20%D8%B9%D8%A8%D8%AF%D8%A7%D9%84%D8%A8%D8%A7%D8%B3%D8%B7%20%D8%A7%D9%84%D9%85%D8%AC%D9%88%D8%AF%20%D9%85%D9%82%D8%B3%D9%85%20%D8%A3%D8%AC%D8%B2%D8%A7%D8%A1%20%D8%AC%D8%B2%D8%A1%20%D8%B1%D9%82%D9%85%20${currentPartNass}.mp3`;
      }
    }
    else if (qaree == 'ياسر الدوسري') {
      if (currentPartNass < 10) {
        Surah.src = `https://ia801909.us.archive.org/19/items/a2aaaaaaaaaaaaaaaaaaaaaaaaaaaaa0200813/%D9%85%D8%B5%D8%AD%D9%81%20%D9%8A%D8%A7%D8%B3%D8%B1%20%D8%A7%D9%84%D8%AF%D9%88%D8%B3%D8%B1%D9%8A%20%D9%85%D9%82%D8%B3%D9%85%20%D8%A3%D8%AC%D8%B2%D8%A7%D8%A1%20%D8%AC%D8%B2%D8%A1%20%D8%B1%D9%82%D9%85%200${currentPartNass}.mp3`;
      }
      else if (currentPartNass >= 10) {
        Surah.src = `https://ia801909.us.archive.org/19/items/a2aaaaaaaaaaaaaaaaaaaaaaaaaaaaa0200813/%D9%85%D8%B5%D8%AD%D9%81%20%D9%8A%D8%A7%D8%B3%D8%B1%20%D8%A7%D9%84%D8%AF%D9%88%D8%B3%D8%B1%D9%8A%20%D9%85%D9%82%D8%B3%D9%85%20%D8%A3%D8%AC%D8%B2%D8%A7%D8%A1%20%D8%AC%D8%B2%D8%A1%20%D8%B1%D9%82%D9%85%20${currentPartNass}.mp3`;
      }
    }
    Surah.controls = true;
    ref2.current?.append(Surah);
    Surah.play();
    setListening(true);
    Surah.scrollIntoView({ block: "center", behavior: 'smooth' });
  };
  if (listening) {
    document.querySelector('audio')?.remove();
    const Surah = document.createElement('audio');
    if (qaree == 'محمود خليل الحصري') {
      if (currentPartNass < 10) {
        Surah.src = `https://ia902906.us.archive.org/20/items/AlHossarry/0${currentPartNass}.mp3`;
      }
      else if (currentPartNass >= 10) {
        Surah.src = `https://ia902906.us.archive.org/20/items/AlHossarry/${currentPartNass}.mp3`;
      }
    }
    else if (qaree == 'محمد صديق المنشاوي') {
      if (currentPartNass < 10) {
        Surah.src = `https://ia801903.us.archive.org/33/items/12_202007xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx31/%D8%A7%D9%84%D9%85%D9%86%D8%B4%D8%A7%D9%88%D9%8A%20%20%D9%85%D8%B1%D8%AA%D9%84%20%D9%85%D8%B5%D8%AD%D9%81%20%20%D9%85%D9%82%D8%B3%D9%85%20%D8%A3%D8%AC%D8%B2%D8%A7%D8%A1%20%D8%AC%D8%B2%D8%A1%20%D8%B1%D9%82%D9%85%200${currentPartNass}.mp3`;
      }
      else if (currentPartNass >= 10) {
        Surah.src = `https://ia801903.us.archive.org/33/items/12_202007xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx31/%D8%A7%D9%84%D9%85%D9%86%D8%B4%D8%A7%D9%88%D9%8A%20%20%D9%85%D8%B1%D8%AA%D9%84%20%D9%85%D8%B5%D8%AD%D9%81%20%20%D9%85%D9%82%D8%B3%D9%85%20%D8%A3%D8%AC%D8%B2%D8%A7%D8%A1%20%D8%AC%D8%B2%D8%A1%20%D8%B1%D9%82%D9%85%20${currentPartNass}.mp3`;
      }
    }
    else if (qaree == 'عبد الباسط عبد الصمد') {
      if (currentPartNass < 10) {
        Surah.src = `https://ia803201.us.archive.org/6/items/aaaaaaaaaaaaaaaaaaaaaa812_20200812_1445/%D9%85%D8%B5%D8%AD%D9%81%20%D8%B9%D8%A8%D8%AF%D8%A7%D9%84%D8%A8%D8%A7%D8%B3%D8%B7%20%D8%A7%D9%84%D9%85%D8%AC%D9%88%D8%AF%20%D9%85%D9%82%D8%B3%D9%85%20%D8%A3%D8%AC%D8%B2%D8%A7%D8%A1%20%D8%AC%D8%B2%D8%A1%20%D8%B1%D9%82%D9%85%200${currentPartNass}.mp3`;
      }
      else if (currentPartNass >= 10) {
        Surah.src = `https://ia803201.us.archive.org/6/items/aaaaaaaaaaaaaaaaaaaaaa812_20200812_1445/%D9%85%D8%B5%D8%AD%D9%81%20%D8%B9%D8%A8%D8%AF%D8%A7%D9%84%D8%A8%D8%A7%D8%B3%D8%B7%20%D8%A7%D9%84%D9%85%D8%AC%D9%88%D8%AF%20%D9%85%D9%82%D8%B3%D9%85%20%D8%A3%D8%AC%D8%B2%D8%A7%D8%A1%20%D8%AC%D8%B2%D8%A1%20%D8%B1%D9%82%D9%85%20${currentPartNass}.mp3`;
      }
    }
    else if (qaree == 'ياسر الدوسري') {
      if (currentPartNass < 10) {
        Surah.src = `https://ia801909.us.archive.org/19/items/a2aaaaaaaaaaaaaaaaaaaaaaaaaaaaa0200813/%D9%85%D8%B5%D8%AD%D9%81%20%D9%8A%D8%A7%D8%B3%D8%B1%20%D8%A7%D9%84%D8%AF%D9%88%D8%B3%D8%B1%D9%8A%20%D9%85%D9%82%D8%B3%D9%85%20%D8%A3%D8%AC%D8%B2%D8%A7%D8%A1%20%D8%AC%D8%B2%D8%A1%20%D8%B1%D9%82%D9%85%200${currentPartNass}.mp3`;
      }
      else if (currentPartNass >= 10) {
        Surah.src = `https://ia801909.us.archive.org/19/items/a2aaaaaaaaaaaaaaaaaaaaaaaaaaaaa0200813/%D9%85%D8%B5%D8%AD%D9%81%20%D9%8A%D8%A7%D8%B3%D8%B1%20%D8%A7%D9%84%D8%AF%D9%88%D8%B3%D8%B1%D9%8A%20%D9%85%D9%82%D8%B3%D9%85%20%D8%A3%D8%AC%D8%B2%D8%A7%D8%A1%20%D8%AC%D8%B2%D8%A1%20%D8%B1%D9%82%D9%85%20${currentPartNass}.mp3`;
      }
    }
    Surah.controls = true;
    ref2.current?.append(Surah);
    Surah.play();
    Surah.scrollIntoView({ block: "center", behavior: 'smooth' });
  }
}

window.addEventListener("load", () => {
  if (!localStorage.id) {
    localStorage.setItem("id", crypto.randomUUID());
  }
  (async () => {
    const { data } = await supabase.from('current_surah').select().eq('id', localStorage.id);
    if (data?.length == 0) {
      await supabase.from('current_surah').insert([{ id: localStorage.id, surah_num: null, scroll_top: null, }]);
    } else {
      if (data?.at(0).surah_num != null) {
        setCurrentSurahNass(data?.at(0).surah_num);
        let int = setInterval(() => {
          let el = document.getElementsByClassName('nass')[0] as HTMLDivElement;
          el.scrollTo({ top: data?.at(0).scroll_top, behavior: 'smooth' });
          if (el) {
            clearInterval(int);
          }
        }, 100);
      }
    }
  })();
  (async () => {
    const { data } = await supabase.from('current_part').select().eq('id', localStorage.id);
    if (data?.length == 0) {
      await supabase.from('current_part').insert([{ id: localStorage.id, part_num: null, scroll_top: null, }]);
    } else {
      if (data?.at(0).part_num != null) {
        setCurrentPartNass(data?.at(0).part_num);
        let int = setInterval(() => {
          let el = document.getElementsByClassName('quran-part-nass')[0] as HTMLDivElement;
          el.scrollTo({ top: data?.at(0).scroll_top, behavior: 'smooth' });
          if (el) {
            clearInterval(int);
          }
        }, 100);
      }
    }
  })();
  (async () => {
    const { data } = await supabase.from('werd').select().eq('id', localStorage.id);
    if (data?.length == 0) {
      await supabase.from('werd').insert([{ id: localStorage.id, started: false, current_werd: '', index: null, last_time: null }]);
    } else {
      setStartedWerd(data?.at(0).started);
    }
  })();
});

async function save() {
  let el = document.getElementsByClassName('nass')[0] as HTMLDivElement;
  if (phoneRegEx.test(userAgent)) {
    const stringifiedData = JSON.stringify([{ surah_num: currentSurahNass, scroll_top: el.scrollTop }])
    localStorage.setItem("current_surah", stringifiedData);
  }
  await supabase.from('current_surah').update({ surah_num: currentSurahNass, scroll_top: el.scrollTop }).eq('id', localStorage.id)
  if (!animated) {
    setAnimated(true);
    setTimeout(() => {
      savedRef.current?.setAttribute('style', 'display: none;');
      setAnimated(false);
    }, 3000);
  }
}
async function unsave() {
  await supabase.from('current_surah').update({ surah_num: null, scroll_top: null }).eq('id', localStorage.id)
  if (phoneRegEx.test(userAgent)) {
    const stringifiedData = JSON.stringify([{ surah_num: null, scroll_top: null }])
    localStorage.setItem("current_surah", stringifiedData);
  }
  if (!animatedUns) {
    setAnimatedUns(true);
    setTimeout(() => {
      unsavedRef.current?.setAttribute('style', 'display: none;');
      setAnimatedUns(false);
    }, 3000);
  }
}
async function savePart() {
  let el = document.getElementsByClassName('quran-part-nass')[0] as HTMLDivElement;
  await supabase.from('current_part').update({ part_num: currentPartNass, scroll_top: el.scrollTop }).eq('id', localStorage.id)
  if (phoneRegEx.test(userAgent)) {
    const stringifiedData = JSON.stringify([{ part_num: currentPartNass, scroll_top: el.scrollTop }])
    localStorage.setItem("current_part", stringifiedData);
  }
  if (!animatedPart) {
    setAnimatedPart(true);
    setTimeout(() => {
      savedRefPart.current?.setAttribute('style', 'display: none;');
      setAnimatedPart(false);
    }, 3000);
  }
}
async function unsavePart() {
  await supabase.from('current_part').update({ part_num: null, scroll_top: null }).eq('id', localStorage.id)
  if (phoneRegEx.test(userAgent)) {
    const stringifiedData = JSON.stringify([{ part_num: null, scroll_top: null }])
    localStorage.setItem("current_part", stringifiedData);
  }
  if (!animatedUnsPart) {
    setAnimatedUnsPart(true);
    setTimeout(() => {
      unsavedRefPart.current?.setAttribute('style', 'display: none;');
      setAnimatedUnsPart(false);
    }, 3000);
  }
}
async function startWerd(werd: string) {
  const date = new Date().getTime();
  await supabase.from('werd').update([{ started: true, current_werd: werd, last_time: date, index: 0 }]).eq('id', localStorage.id);
  if (phoneRegEx.test(userAgent)) {
    const stringifiedData = JSON.stringify([{ started: true, current_werd: werd, last_time: date, index: 0 }])
    localStorage.setItem("werd", stringifiedData);
  }
  setWerdModal(false);
  setStartedWerd(true);
  setCurrentWerd(0);
  setDailyWerd(werd);
}
window.addEventListener("load", async () => {
  setDailyWerd((await supabase.from('werd').select().eq('id', localStorage.id)).data?.at(0).current_werd)
  setCurrentWerd((await supabase.from('werd').select().eq('id', localStorage.id)).data?.at(0).index);
  if (phoneRegEx.test(userAgent)) {
    setDailyWerd(JSON.parse(localStorage.werd)[0].current_werd);
    setCurrentWerd(JSON.parse(localStorage.werd)[0].index);
  };
  const currentTime = new Date().getTime();
  // console.log(currentTime - (await supabase.from('werd').select().eq('id', localStorage.id)).data?.at(0).last_time >= 24*60*60*1000);
  if (currentTime - (await supabase.from('werd').select().eq('id', localStorage.id)).data?.at(0).last_time >= 24*60*60*1000) {
    if ((await supabase.from('werd').select().eq('id', localStorage.id)).data?.at(0).current_werd == 'page') {
      if ((await supabase.from('werd').select().eq('id', localStorage.id)).data?.at(0).index != 603) {
        await supabase.from('werd').update([{ last_time: new Date().getTime(), index: (await supabase.from('werd').select().eq('id', localStorage.id)).data?.at(0).index + 1 }]).eq('id', localStorage.id);
      } else {
        await supabase.from('werd').update([{ last_time: new Date().getTime(), index: 0 }]).eq('id', localStorage.id);
      }
    }
    if ((await supabase.from('werd').select().eq('id', localStorage.id)).data?.at(0).current_werd == 'hezb') {
      if ((await supabase.from('werd').select().eq('id', localStorage.id)).data?.at(0).index != 59) {
        await supabase.from('werd').update([{ last_time: new Date().getTime(), index: (await supabase.from('werd').select().eq('id', localStorage.id)).data?.at(0).index + 1 }]).eq('id', localStorage.id);
      } else {
        await supabase.from('werd').update([{ last_time: new Date().getTime(), index: 0 }]).eq('id', localStorage.id);
      }
    }
    if ((await supabase.from('werd').select().eq('id', localStorage.id)).data?.at(0).current_werd == 'part') {
      if ((await supabase.from('werd').select().eq('id', localStorage.id)).data?.at(0).index != 29) {
        await supabase.from('werd').update([{ last_time: new Date().getTime(), index: (await supabase.from('werd').select().eq('id', localStorage.id)).data?.at(0).index + 1 }]).eq('id', localStorage.id);
      } else {
        await supabase.from('werd').update([{ last_time: new Date().getTime(), index: 0 }]).eq('id', localStorage.id);
      }
    }
    setCurrentWerd((await supabase.from('werd').select().eq('id', localStorage.id)).data?.at(0).index);
  }
})
window.addEventListener("load", () => {
  const element = document.getElementsByClassName('first')[0] as HTMLDivElement;
  element.click();
})

function handleClick(className: string, newPage: string) {
  const allElements = [
    document.getElementsByClassName('home')[0] as SVGElement,
    document.getElementsByClassName('home')[1] as HTMLDivElement,
    document.getElementsByClassName('search')[0] as SVGElement,
    document.getElementsByClassName('search')[1] as HTMLDivElement,
    document.getElementsByClassName('azkar')[0] as SVGElement,
    document.getElementsByClassName('azkar')[1] as HTMLDivElement,
    document.getElementsByClassName('counter')[0] as SVGElement,
    document.getElementsByClassName('counter')[1] as HTMLDivElement,
  ];
  allElements.map(element => {
    element.setAttribute("fill", "#fff");
    element.style.color = '#fff';
  })
  const el1 = document.getElementsByClassName(className)[0] as SVGElement;
  const el2 = document.getElementsByClassName(className)[1] as HTMLDivElement;
  el1.setAttribute("fill", "#0f0");
  el2.style.color = '#0f0';
  setCurrentPage(newPage);
}

function getPageWerd() {
  if (currentWerd < 10) {
    return  <img src={`https://github.com/AbdoAKAGames/Holy-Quran/blob/main/src/data/werd/pages/page00${currentWerd + 1}.png?raw=true`} alt="werd" className="werd-img" />
  }
  else if (currentWerd >= 10 && currentWerd < 100) {
    return  <img src={`https://github.com/AbdoAKAGames/Holy-Quran/blob/main/src/data/werd/pages/page0${currentWerd + 1}.png?raw=true`} alt="werd" className="werd-img" />
  }
  else if (currentWerd >= 100) {
    return  <img src={`https://github.com/AbdoAKAGames/Holy-Quran/blob/main/src/data/werd/pages/page${currentWerd + 1}.png?raw=true`} alt="werd" className="werd-img" />
  }
}



useEffect(() => {
  if (phoneRegEx.test(userAgent)) {
    if (!localStorage.current_surah) {
      localStorage.setItem("current_surah", JSON.stringify([{ surah_num: null, scroll_top: null }]))
    } else {
      if (JSON.parse(localStorage.current_surah)[0].surah_num != null) {
        setCurrentSurahNass(JSON.parse(localStorage.current_surah)[0].surah_num);
        let int = setInterval(() => {
          let el = document.getElementsByClassName('nass')[0] as HTMLDivElement;
          el.scrollTo({ top: JSON.parse(localStorage.current_surah)[0].scroll_top, behavior: 'smooth' });
          if (el) {
            clearInterval(int);
          }
        }, 100);
      }
    }
    if (!localStorage.current_part) {
      localStorage.setItem("current_part", JSON.stringify([{ part_num: null, scroll_top: null }]))
    } else {
      if (JSON.parse(localStorage.current_part)[0].part_num != null) {
        setCurrentPartNass(JSON.parse(localStorage.current_part)[0].part_num);
        let int = setInterval(() => {
          let el = document.getElementsByClassName('quran-part-nass')[0] as HTMLDivElement;
          el.scrollTo({ top: JSON.parse(localStorage.current_part)[0].scroll_top, behavior: 'smooth' });
          if (el) {
            clearInterval(int);
          }
        }, 100);
      }
    }
  }
}, []);

useEffect(() => {
  const currentTime = new Date().getTime();
  if (phoneRegEx.test(userAgent)) {
    if (localStorage.werd != null) {
      if (currentTime - JSON.parse(localStorage.werd)[0].last_time >= 24*60*60*1000) {
        if (JSON.parse(localStorage.werd)[0].current_werd == 'page') {
          if (JSON.parse(localStorage.werd)[0].index != 603) {
            const stringifiedData = JSON.stringify([{ started: true, current_werd: 'page', last_time: new Date().getTime(), index: JSON.parse(localStorage.werd)[0].index + 1 }])
            localStorage.setItem("werd", stringifiedData);
          } else {
            const stringifiedData = JSON.stringify([{ started: true, current_werd: 'page', last_time: new Date().getTime(), index: 0 }])
            localStorage.setItem("werd", stringifiedData);
          }
        }
        if (JSON.parse(localStorage.werd)[0].current_werd == 'hezb') {
          if (JSON.parse(localStorage.werd)[0].index != 59) {
            const stringifiedData = JSON.stringify([{ started: true, current_werd: 'hezb', last_time: new Date().getTime(), index: JSON.parse(localStorage.werd)[0].index + 1 }])
            localStorage.setItem("werd", stringifiedData);
          } else {
            const stringifiedData = JSON.stringify([{ started: true, current_werd: 'hezb', last_time: new Date().getTime(), index: 0 }])
            localStorage.setItem("werd", stringifiedData);
          }
        }
        if (JSON.parse(localStorage.werd)[0].current_werd == 'part') {
          if (JSON.parse(localStorage.werd)[0].index != 29) {
            const stringifiedData = JSON.stringify([{ started: true, current_werd: 'part', last_time: new Date().getTime(), index: JSON.parse(localStorage.werd)[0].index + 1 }])
            localStorage.setItem("werd", stringifiedData);
          } else {
            const stringifiedData = JSON.stringify([{ started: true, current_werd: 'part', last_time: new Date().getTime(), index: 0 }])
            localStorage.setItem("werd", stringifiedData);
          }
        }
        setCurrentWerd(JSON.parse(localStorage.werd)[0].index);
      }
    }
  };
}, []);

useEffect(() => {
  if (phoneRegEx.test(userAgent)) {
    const data = localStorage.getItem("werd");
    if (data == null) {
      const stringifiedData = JSON.stringify([{ id: localStorage.id, started: false, current_werd: '', index: null, last_time: null }]);
      localStorage.setItem("werd", stringifiedData);
    } else {
      setStartedWerd(JSON.parse(data)[0].started);
    }
  }
}, []);


useEffect(() => {
  if (phoneRegEx.test(userAgent)) {
    if (localStorage.werd && JSON.parse(localStorage.werd)[0].started) {
      setStartedWerd(JSON.parse(localStorage.werd)[0].started);
      setDailyWerd(JSON.parse(localStorage.werd)[0].current_werd);
      setCurrentWerd(JSON.parse(localStorage.werd)[0].index);
    }
  } else {
    (async () => {
      setStartedWerd((await supabase.from("werd").select()).data?.at(0).started);
      setDailyWerd((await supabase.from("werd").select()).data?.at(0).current_werd);
      setCurrentWerd((await supabase.from("werd").select()).data?.at(0).index);
    })();
  }
}, []);
useEffect(() => {
  if (phoneRegEx.test(userAgent)) {
    const element = document.getElementsByClassName('first')[0] as HTMLDivElement;
    element.click();
  }
}, []);


useEffect(() => {
  let int = setInterval(() => {
    let el = document.getElementsByClassName('nass')[0] as HTMLDivElement;
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start', });
      clearInterval(int);
    }
  }, 1);
  let int2 = setInterval(() => {
    let el = document.getElementsByClassName('quran-part-nass')[0] as HTMLDivElement;
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start', });
      clearInterval(int2);
    }
  }, 1);
}, []);

async function cancelWerd() {
  await supabase.from("werd").update({ started: false, current_werd: '', last_time: 0, index: 0 }).eq("id", localStorage.id);
  if (phoneRegEx.test(userAgent)) {
    const stringifiedData = JSON.stringify([{ started: false, current_werd: '', last_time: 0, index: 0 }]);
    localStorage.setItem("werd", stringifiedData);
  }
  setStartedWerd(false);
}


  return (
    <>
    <div id="app">
      <div className="app-title">
        <h1>وَرَتَّلْنَاهُ تَرْتِيلًا</h1>
      </div>
      {currentPage == 'home' && <>
      <div className="quran">
        <div className="fehres">
          <h1>فهرس سور القرآن الكريم</h1>
          {allSurah_s.map((surah, i) => (
            <div className="surah" key={i} onClick={() => {setCurrentSurahNass(i + 1);let el = document.getElementsByClassName('nass')[0] as HTMLDivElement;el.scrollTo({ top: 0, behavior: 'smooth' });el.scrollIntoView({ behavior: 'smooth', block: 'start', });}}>
            <div className="surah-number">
              {i + 1}-
            </div>
            <div className="surah-name">
              سورة {surah}
            </div>
          </div>
          ))}
        </div>
        {currentSurahNass > 0 &&
        <>
        <div className="nass">
          <div className="surah-nass-name">
            سورة {allSurah_s[currentSurahNass - 1]}
          </div>
          <div className="surah-nass">
            {currentSurahNass == 1 || currentSurahNass == 9 ? surah_nass[currentSurahNass - 1] : <><div className="basmalah">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div> {surah_nass[currentSurahNass - 1]}</>}
          </div>
        </div>
        
        </>
        }
      </div>
      {currentSurahNass > 0 &&
      <>
        <div className="listen-surah">
          <div className="save-button">
            <button onClick={() => {save();savedRef.current?.setAttribute('style', 'display: flex;');}}>حفظ السورة</button>
            <button onClick={() => {unsave();unsavedRef.current?.setAttribute('style', 'display: flex;');}}>إلغاء حفط السورة</button>
          </div>
          <div className="buttons">
            <div className="next">
              <button disabled={currentSurahNass == 114 ? true : false} onClick={() => {setCurrentSurahNass(cu => cu + 1);let el = document.getElementsByClassName('nass')[0] as HTMLDivElement;el.scrollTo({ top: 0, behavior: 'smooth' })}}>السورة التالية</button>
            </div>
            <div className="prev">
              <button disabled={currentSurahNass == 1 ? true : false} onClick={() => {setCurrentSurahNass(cu => cu - 1);let el = document.getElementsByClassName('nass')[0] as HTMLDivElement;el.scrollTo({ top: 0, behavior: 'smooth' })}}>السورة السابقة</button>
            </div>
          </div>
          <div className="listen" onClick={() => setListen(true)}>
            الاستماع إلى سورة {allSurah_s[currentSurahNass - 1]}
          </div>
        </div>
        {/* <div className="see-tafseer">
          {tafaseer.map((tafseer, i) => (
            <div className="sheekh" key={i} onClick={() => {setCurrentTafseer(tafseer.taf[currentSurahNass - 1]);setCurrentTafseerName(tafseer.name)}}>تفسير {tafseer.name}</div>
          ))}
        </div>
        {currentTafseerName.length > 0 && 
        <div className="tafseer-container">
          <div className="tafseer">
            <div className="tafseer-name">
              {'تفسير ' + currentTafseerName}
            </div>
            {currentTafseer}
          </div>
        </div>
        } */}
      </>
      }



      <div style={{width: '100%', display: 'flex', justifyContent: 'center',}}>
        <div className="saved" ref={savedRef}>
          !تم حفظ السورة بنجاح
        </div>
      </div>
      <div style={{width: '100%', display: 'flex', justifyContent: 'center',}}>
        <div className="unsaved" ref={unsavedRef}>
          !تم إلغاء حفظ السورة بنجاح
        </div>
      </div>
      <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
        <div className="saved saved_part" ref={savedRefPart}>
          !تم حفظ الجزء بنجاح
        </div>
      </div>
      <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
        <div className="unsaved saved_part" ref={unsavedRefPart}>
          !تم إلغاء حفظ الجزء بنجاح
        </div>
      </div>

      {listen && <div className="choose-qaree-modal" onClick={() => setListen(false)}>
        <div className="choose-qaree">
          <div className="choose-qaree-title">
            اختر أحد القراء
          </div>
          <div className="quraa">
            {quraa.map((qaree, i) => (
              <div className="qaree" key={i} onClick={() => listenSurah(qaree.name)}>
              <div className="qaree-image">
                <img src={qaree.image} />
              </div>
              <div className="qaree-name">
                {qaree.name}
              </div>
            </div>
            ))}
          </div>
        </div>
      </div>
      }
      </>
    }
        {currentPage == 'home' ? <div className="audio" ref={ref} style={{ background: '#0f0', }}>

</div> : <div className="audio" ref={ref}>

        </div>
}
{currentPage == 'home' ? <div className="audio" ref={ref2} style={{ background: '#0f0', }}>

</div> : <div className="audio" ref={ref2}>

        </div>
}
        {currentPage == 'home' && <>
      <div className="parts">
        <div className="quran-parts">
            <h1>فهرس أجزاء القرآن الكريم</h1>
            {Array.from({ length: 30}).map((_x, i) => (
              <>
                <div className="quran-part" key={i} onClick={() => {setCurrentPartNass(i + 1); let el = document.getElementsByClassName('quran-part-nass')[0] as HTMLDivElement;el.scrollTo({ top: 0, behavior: 'smooth' });el.scrollIntoView({ behavior: 'smooth', block: 'start', });}}>
                  الجزء {i + 1}
                  
                </div>
              </>
            ))}
        </div>
            {
            currentPartNass > 0 &&
              <div className="quran-part-nass">
                <div className="quran-part-nass-name">
                الجزء {currentPartNass}
                </div>
                <div className="quran-part-nass-text">
                  {allParts[currentPartNass - 1]}
                </div>
              </div>
              }
      </div>
      {currentPartNass > 0 &&
      <div className="listen-surah" style={{background: '#79ff79'}}>
        <div className="save-button">
            <button onClick={() => {savePart();savedRefPart.current?.setAttribute('style', 'display: flex;');}}>حفظ الجزء</button>
            <button onClick={() => {unsavePart();unsavedRefPart.current?.setAttribute('style', 'display: flex;');}}>إلغاء حفط الجزء</button>
          </div>
        <div className="buttons">
            <div className="next">
              <button disabled={currentPartNass == 30 ? true : false} onClick={() => {setCurrentPartNass(cu => cu + 1);let el = document.getElementsByClassName('quran-part-nass')[0] as HTMLDivElement;el.scrollTo({ top: 0, behavior: 'smooth', })}}>الجزء التالي</button>
            </div>
            <div className="prev">
              <button disabled={currentPartNass == 1 ? true : false} onClick={() => {setCurrentPartNass(cu => cu - 1);let el = document.getElementsByClassName('quran-part-nass')[0] as HTMLDivElement;el.scrollTo({ top: 0, behavior: 'smooth', })}}>الجزء السابق</button>
            </div>
          </div>
        <div className="listen" onClick={() => setListenPart(true)}>
          الاستماع إلى الجزء {currentPartNass}
        </div>
      </div>
      }
      {listenPart && 
      <div className="choose-qaree-modal" onClick={() => setListenPart(false)}>
      <div className="choose-qaree">
        <div className="choose-qaree-title">
          اختر أحد القراء
        </div>
        <div className="quraa">
          {quraa.map((qaree, i) => (
            <div className="qaree" key={i} onClick={() => listenParts(qaree.name)}>
            <div className="qaree-image">
              <img src={qaree.image} />
            </div>
            <div className="qaree-name">
              {qaree.name}
            </div>
          </div>
          ))}
        </div>
      </div>
    </div>
      }
      {!startedWerd && 
      <div className="start-werd">
        <button className="start-werd-btn" onClick={() => setWerdModal(true)}>إبدأ الورد اليومي</button>
      </div>
      }
      {werdModal && 
      <div className="werd-modal-container">
        <div className="werd-modal">
          <div className="werd-modal-title">
            اختر وردك اليومي
          </div>
          <div className="werd-options">
            <div className="werd-option" onClick={() => startWerd('page')}>
              صفحة
            </div>
            <div className="werd-option" onClick={() => startWerd('hezb')}>
              حزب
            </div>
            <div className="werd-option" onClick={() => startWerd('part')}>
              جزء
            </div>
          </div>
        </div>
      </div>
      }
      {startedWerd && <>
      <div className="daily-werd">
        <div className="werd-container">
          <div className="werd-title">
            ورد اليوم
          </div>
          <div className="werd-text">
            {dailyWerd == 'page' && getPageWerd()}
            {dailyWerd == 'hezb' && allHezb[currentWerd]}
            {dailyWerd == 'part' && allParts[currentWerd]}
          </div>
        </div>
      </div>
        <div className="cancel-werd">
          <div onClick={() => cancelWerd()}>إلغاء الورد اليومي</div>
        </div>
        </>
      }
      </>
}
{currentPage == 'search' && <Search /> }
{currentPage == 'azkar' && <Azkar />}
{currentPage == 'counter' && <Counter />}
       <div className="tools">
       <div className="tool" onClick={() => {handleClick('counter', 'counter')}}>
          <div className="tool-img">
          <svg className="counter" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="120" height="50" fill="#fff">
  <path d="M438.5,182.5a37.56,37.56,0,0,0-23.37-34.73A32.47,32.47,0,0,0,392.6,95.62,37.49,37.49,0,0,0,342.88,45.9a32.47,32.47,0,0,0-52.15-22.53,37.49,37.49,0,0,0-69.46,0A32.47,32.47,0,0,0,169.12,45.9,37.49,37.49,0,0,0,119.4,95.62a32.47,32.47,0,0,0-22.53,52.15,37.49,37.49,0,0,0,0,69.46,32.47,32.47,0,0,0,22.53,52.15,37.49,37.49,0,0,0,49.72,49.72,32.47,32.47,0,0,0,52.15,22.53,37.69,37.69,0,0,0,12.23,15.85v21H221a22.5,22.5,0,0,0-4.29,44.58l-18,79.77A7.51,7.51,0,0,0,206,512h50a7.5,7.5,0,0,0,6.66-4.06l4.85-9.37L275.33,509a7.5,7.5,0,0,0,6,3H306a7.51,7.51,0,0,0,7.32-9.15l-18-79.77A22.5,22.5,0,0,0,291,378.5H278.5v-21a37.69,37.69,0,0,0,12.23-15.85,32.47,32.47,0,0,0,52.15-22.53,37.49,37.49,0,0,0,49.72-49.72,32.47,32.47,0,0,0,22.53-52.15A37.56,37.56,0,0,0,438.5,182.5Zm-79.86,65h-.11A37.54,37.54,0,0,0,321,285v.11A32.44,32.44,0,0,0,282,300.46a37.42,37.42,0,0,0-51.9,0A32.44,32.44,0,0,0,191,285.14V285a37.54,37.54,0,0,0-37.5-37.5h-.11A32.44,32.44,0,0,0,138,208.45a37.42,37.42,0,0,0,0-51.9,32.44,32.44,0,0,0,15.32-39.08h.11A37.54,37.54,0,0,0,191,80v-.11a32.44,32.44,0,0,0,39.08-15.32,37.42,37.42,0,0,0,51.9,0A32.44,32.44,0,0,0,321,79.86V80a37.54,37.54,0,0,0,37.5,37.5h.11A32.44,32.44,0,0,0,374,156.55a37.42,37.42,0,0,0,0,51.9,32.44,32.44,0,0,0-15.32,39.08ZM406.89,128a17.5,17.5,0,1,1-17.5-17.5A17.52,17.52,0,0,1,406.89,128ZM381,80a22.5,22.5,0,1,1-22.5-22.5A22.52,22.52,0,0,1,381,80ZM310.54,31.61A17.5,17.5,0,1,1,293,49.11,17.52,17.52,0,0,1,310.54,31.61ZM256,15a22.5,22.5,0,1,1-22.5,22.5A22.52,22.52,0,0,1,256,15ZM201.46,31.61A17.5,17.5,0,1,1,184,49.11,17.52,17.52,0,0,1,201.46,31.61Zm-48,25.86A22.5,22.5,0,1,1,131,80,22.52,22.52,0,0,1,153.47,57.47Zm-30.86,53a17.5,17.5,0,1,1-17.5,17.5A17.53,17.53,0,0,1,122.61,110.46Zm-34.11,72A22.5,22.5,0,1,1,111,205,22.52,22.52,0,0,1,88.5,182.5ZM105.11,237a17.5,17.5,0,1,1,17.5,17.5A17.52,17.52,0,0,1,105.11,237ZM131,285a22.5,22.5,0,1,1,22.5,22.5A22.52,22.52,0,0,1,131,285Zm70.49,48.36a17.5,17.5,0,1,1,17.5-17.5A17.52,17.52,0,0,1,201.46,333.39ZM285.08,497l-12.75-17a7.5,7.5,0,0,0-12.66,1.06L251.43,497H215.38L232,423.5H248.5V446a7.5,7.5,0,0,0,15,0V423.5H280L296.62,497Zm13.42-96a7.5,7.5,0,0,1-7.5,7.5H221a7.5,7.5,0,0,1,0-15h70A7.5,7.5,0,0,1,298.5,401Zm-35-22.5h-15V364.25a37.88,37.88,0,0,0,15,0ZM256,350a22.5,22.5,0,1,1,22.5-22.5A22.52,22.52,0,0,1,256,350Zm54.54-16.61a17.5,17.5,0,1,1,17.5-17.5A17.52,17.52,0,0,1,310.54,333.39Zm48-25.86A22.5,22.5,0,1,1,381,285,22.52,22.52,0,0,1,358.53,307.53Zm30.86-53a17.5,17.5,0,1,1,17.5-17.5A17.53,17.53,0,0,1,389.39,254.54ZM401,205a22.5,22.5,0,1,1,22.5-22.5A22.52,22.52,0,0,1,401,205Z"></path>
</svg>
          </div>
          <div className="tool-name counter">
            المسبحة الإلكترونية
          </div>
        </div>
        <div className="tool" onClick={() => {handleClick('azkar', 'azkar')}}>
          <div className="tool-img">
          <svg xmlns="http://www.w3.org/2000/svg" className="azkar" y="2px" version="1.0" width="120" height="50" viewBox="0 0 1280.000000 1118.000000" preserveAspectRatio="xMidYMid meet" fill="#fff">
            <g transform="translate(0.000000,1118.000000) scale(0.100000,-0.100000)" stroke="none">
              <path d="M2403 11164 c-42 -21 -77 -91 -68 -134 9 -42 49 -87 90 -100 31 -10 35 -16 35 -46 0 -20 -9 -47 -21 -64 -21 -27 -21 -30 -5 -54 22 -34 20 -82 -5 -123 -20 -33 -20 -34 -3 -61 21 -32 20 -45 -9 -84 -19 -25 -20 -32 -8 -63 11 -31 8 -52 -23 -187 -42 -183 -60 -287 -81 -472 l-16 -139 -49 -55 c-56 -63 -62 -87 -25 -104 23 -10 25 -16 25 -83 l0 -71 -50 -38 c-48 -36 -134 -136 -159 -183 -27 -53 -1 -91 81 -119 l48 -16 0 -219 0 -219 -70 0 -70 0 0 -79 c0 -71 -2 -80 -20 -86 -30 -9 -79 -53 -95 -86 -23 -43 -18 -90 13 -140 33 -51 50 -66 114 -102 64 -37 109 -126 115 -230 3 -40 -2 -686 -11 -1437 -9 -751 -16 -1434 -16 -1517 0 -147 -1 -153 -20 -153 -24 0 -29 -9 -34 -70 l-4 -45 -48 -5 c-35 -4 -50 -10 -52 -22 -2 -9 17 -54 43 -101 l45 -84 -25 -1029 c-13 -566 -27 -1162 -30 -1324 -3 -162 -8 -319 -11 -348 l-5 -52 -110 0 -109 0 0 456 0 457 -36 33 -35 34 17 35 c9 19 13 43 9 52 -3 10 -8 61 -9 113 -2 102 -19 156 -71 224 -33 44 -111 96 -190 126 -63 25 -99 55 -91 76 3 7 1 25 -4 41 -8 26 -8 25 -9 -13 -1 -55 -22 -76 -101 -104 -188 -66 -271 -176 -274 -365 -1 -49 -6 -98 -10 -108 -6 -11 -3 -24 6 -35 28 -32 27 -40 -7 -75 l-35 -36 0 -1066 0 -1065 -45 0 c-25 0 -45 1 -46 3 -1 1 -5 232 -9 512 l-8 510 23 25 c29 32 45 81 45 136 0 42 0 43 -38 46 l-37 3 -8 351 -9 351 31 55 c45 80 71 192 71 310 0 78 -3 98 -14 98 -9 0 -16 -13 -19 -32 l-4 -33 -1 33 c-2 24 -7 32 -21 32 -15 0 -21 -8 -24 -32 l-4 -33 -1 33 c-2 25 -6 32 -22 32 -20 0 -20 7 -20 280 l0 279 30 47 c48 77 64 138 65 249 l0 100 -58 3 -57 3 0 122 c1 178 14 263 48 312 44 61 52 98 52 226 0 112 -1 119 -20 119 -17 0 -20 -7 -20 -50 0 -38 -4 -50 -15 -50 -11 0 -15 12 -15 51 0 47 -2 50 -23 47 -19 -3 -22 -10 -25 -55 -4 -70 -22 -68 -22 2 0 53 -1 55 -26 55 l-26 0 3 79 c4 71 7 83 32 109 28 29 28 30 8 44 -20 14 -19 15 9 42 67 63 43 144 -62 209 -16 10 -25 23 -22 31 3 8 -3 34 -14 58 -12 27 -16 51 -11 63 4 12 1 29 -8 43 -13 22 -13 26 6 46 26 28 27 57 1 98 -18 29 -20 43 -14 111 4 51 2 92 -6 122 -12 42 -11 47 6 61 19 15 19 16 0 10 -29 -10 -66 20 -66 52 0 16 6 34 13 42 6 8 2 6 -10 -4 -31 -26 -29 -59 6 -95 28 -29 29 -31 15 -68 -16 -46 -17 -86 -3 -136 9 -33 7 -45 -15 -92 -31 -65 -31 -63 -4 -92 19 -20 20 -26 8 -47 -7 -14 -10 -36 -6 -50 4 -16 0 -38 -9 -56 -8 -16 -15 -42 -15 -57 0 -22 -9 -33 -41 -51 -81 -47 -103 -134 -49 -195 25 -29 28 -36 16 -46 -12 -10 -11 -18 10 -48 20 -30 24 -48 24 -109 0 -68 -2 -73 -23 -76 -19 -3 -22 -10 -25 -55 -4 -71 -22 -68 -22 3 0 52 -1 55 -22 52 -20 -3 -23 -10 -26 -50 -4 -62 -20 -62 -24 -1 -3 40 -6 48 -23 48 -18 0 -20 -8 -23 -94 -4 -118 11 -188 49 -241 39 -54 49 -112 49 -291 l0 -149 -54 0 -55 0 -7 -45 c-11 -78 11 -191 56 -280 l40 -80 0 -276 c0 -265 -1 -277 -19 -282 -12 -3 -21 -16 -24 -33 -4 -28 -4 -28 -6 4 -1 43 -31 45 -31 2 0 -16 -4 -30 -10 -30 -5 0 -10 14 -10 31 0 20 -4 29 -13 27 -19 -7 -20 -141 -2 -233 9 -44 33 -116 54 -160 l38 -80 -8 -290 c-4 -159 -8 -316 -8 -347 l-1 -58 -40 0 c-38 0 -40 -1 -40 -32 0 -50 19 -109 46 -145 28 -37 29 -59 17 -685 l-6 -368 -139 0 -138 0 0 -200 0 -200 6400 0 6400 0 0 200 0 200 -60 0 -60 0 -1 173 c0 94 -4 422 -8 727 l-8 555 28 35 c41 51 60 105 66 187 l6 73 -57 0 -56 0 0 43 c0 23 -5 243 -11 489 l-11 448 30 47 c75 120 112 271 112 458 0 118 -1 125 -20 125 -17 0 -20 -7 -20 -45 0 -25 -4 -45 -10 -45 -5 0 -10 20 -10 45 0 41 -2 45 -24 45 -22 0 -25 -5 -29 -48 l-3 -47 -2 48 c-2 45 -3 47 -32 47 l-30 0 0 390 0 389 40 62 c55 85 90 200 97 320 3 53 3 112 -1 132 l-7 37 -74 0 -75 0 0 208 c0 246 10 322 49 377 73 103 76 114 79 308 l4 177 -31 0 -31 0 0 -65 c0 -51 -3 -65 -15 -65 -12 0 -15 14 -15 63 0 35 -2 66 -5 69 -3 2 -18 3 -35 0 l-30 -4 0 -69 c0 -55 -3 -69 -15 -69 -12 0 -15 14 -15 69 l0 70 -32 3 -33 3 -3 90 c-3 103 15 166 55 192 l25 17 -26 23 -27 22 40 40 c26 26 42 53 47 76 14 77 -35 160 -121 206 -41 22 -45 27 -45 62 0 21 -9 56 -20 78 -16 31 -19 50 -14 87 5 37 2 51 -10 61 -22 18 -20 34 5 57 43 39 43 51 5 134 l-37 77 16 59 c21 81 19 96 -20 220 -5 16 1 28 22 48 28 27 28 27 3 18 -30 -11 -48 -6 -77 21 -31 27 -30 71 2 102 13 14 20 25 14 25 -5 0 -21 -11 -35 -25 -20 -20 -25 -33 -22 -67 2 -35 8 -46 35 -63 40 -25 43 -39 21 -98 -21 -55 -23 -108 -6 -189 12 -57 11 -60 -20 -123 -39 -79 -39 -95 -7 -133 29 -35 30 -44 9 -77 -13 -21 -14 -30 -5 -53 10 -24 8 -36 -15 -85 -16 -37 -24 -67 -20 -82 5 -19 -1 -27 -32 -46 -88 -53 -132 -112 -132 -179 0 -49 19 -89 59 -122 l29 -25 -26 -21 -27 -20 26 -28 c43 -47 49 -68 49 -178 l0 -106 -30 0 c-29 0 -29 0 -32 -67 -2 -42 -8 -68 -15 -71 -10 -3 -13 15 -13 65 0 39 -2 72 -5 75 -3 2 -18 3 -35 0 -30 -4 -30 -5 -30 -68 0 -49 -3 -64 -15 -64 -11 0 -15 16 -17 67 l-3 67 -30 0 -30 0 0 -165 c0 -184 6 -208 65 -297 22 -32 44 -78 50 -103 7 -24 14 -148 17 -276 l5 -232 -78 -3 -79 -3 -3 -105 c-5 -163 27 -285 104 -396 l35 -51 -3 -384 -3 -384 -27 -3 c-26 -3 -28 -7 -28 -48 0 -24 -4 -44 -10 -44 -5 0 -10 20 -10 45 0 41 -2 45 -24 45 -22 0 -25 -5 -29 -47 l-3 -48 -2 48 c-2 39 -5 47 -22 47 -27 0 -34 -49 -27 -179 8 -139 36 -244 96 -366 l49 -100 -9 -440 c-6 -242 -12 -459 -15 -482 l-5 -43 -51 0 -51 0 5 -82 c5 -87 26 -145 67 -182 18 -17 21 -30 21 -108 0 -48 -3 -88 -7 -88 -3 0 -14 7 -24 16 -10 9 -55 29 -101 45 -71 24 -83 32 -83 51 0 13 8 29 18 36 21 16 22 50 3 71 -11 13 -12 28 -5 71 18 103 -13 252 -69 340 -62 97 -165 169 -331 231 -71 27 -81 42 -81 119 0 58 -19 79 -21 23 -1 -21 -1 -46 0 -55 4 -37 -29 -65 -107 -93 -217 -77 -315 -161 -373 -320 -18 -48 -23 -84 -24 -180 -1 -75 -7 -130 -15 -147 -11 -24 -10 -30 14 -58 33 -40 33 -58 -2 -65 -15 -4 -43 -12 -63 -19 l-36 -13 -7 120 c-10 196 -8 243 11 258 25 21 43 73 43 123 0 43 -1 45 -32 48 l-33 3 -7 300 -8 300 34 70 c42 85 56 151 56 255 0 63 -3 80 -14 80 -8 0 -17 -12 -19 -27 l-4 -28 -2 28 c-1 36 -28 36 -34 0 l-4 -28 -2 28 c0 17 -7 27 -16 27 -13 0 -15 34 -15 243 l0 242 37 73 c34 67 38 83 41 172 l4 99 -48 3 -49 3 1 162 1 163 31 50 c42 67 52 109 52 213 0 80 -2 87 -20 87 -17 0 -20 -7 -20 -40 0 -22 -4 -40 -10 -40 -5 0 -10 18 -10 40 0 36 -3 40 -24 40 -22 0 -25 -5 -29 -47 l-3 -48 -2 47 c-2 40 -5 47 -24 50 -21 3 -23 9 -26 63 -2 51 1 67 22 97 20 30 22 39 11 48 -11 9 -9 15 11 35 50 50 35 122 -37 169 -24 17 -39 34 -39 47 0 11 -5 30 -12 42 -6 12 -10 37 -10 56 1 19 -3 40 -8 46 -7 8 -3 21 11 40 l22 27 -21 44 c-18 36 -20 54 -15 107 3 40 1 78 -7 102 -11 34 -11 40 6 53 12 9 13 13 4 10 -8 -3 -25 -2 -37 3 -26 9 -32 55 -10 79 6 8 2 6 -10 -4 -30 -25 -29 -51 3 -81 24 -22 25 -26 14 -61 -8 -23 -10 -60 -6 -99 5 -50 2 -71 -14 -109 l-21 -46 20 -27 c16 -20 18 -29 10 -39 -6 -8 -9 -26 -6 -42 3 -15 -1 -38 -8 -52 -8 -14 -14 -36 -15 -50 0 -19 -9 -31 -35 -44 -59 -32 -83 -88 -60 -142 7 -17 21 -37 32 -43 17 -11 17 -11 0 -22 -18 -10 -18 -12 5 -36 18 -20 23 -38 26 -99 4 -70 3 -74 -17 -74 -18 0 -21 -6 -21 -39 0 -22 -4 -43 -10 -46 -6 -4 -10 12 -10 39 0 42 -2 46 -25 46 -22 0 -25 -4 -25 -40 0 -22 -4 -40 -10 -40 -5 0 -10 18 -10 40 0 29 -4 40 -15 40 -12 0 -15 -19 -15 -112 0 -102 3 -117 25 -153 45 -74 48 -87 53 -252 l4 -163 -51 0 -51 0 0 -73 c0 -82 20 -161 56 -223 24 -40 24 -45 24 -287 0 -208 -2 -247 -14 -247 -8 0 -17 -12 -19 -27 l-4 -28 -2 28 c0 16 -7 27 -15 27 -8 0 -17 -12 -19 -27 l-4 -28 -2 28 c0 17 -7 27 -16 27 -12 0 -15 -15 -15 -77 0 -96 21 -189 61 -266 l30 -59 -7 -304 -7 -304 -34 0 c-32 0 -33 -1 -33 -42 0 -43 29 -120 49 -132 12 -8 16 -289 5 -345 l-6 -31 -139 0 c-137 0 -139 0 -139 23 0 12 -14 551 -30 1197 -16 646 -30 1229 -30 1295 l0 120 45 69 c25 38 45 77 45 86 0 16 -22 31 -62 44 -15 4 -18 17 -18 66 l0 60 -35 0 -35 0 0 1595 c0 1418 2 1600 15 1633 9 20 56 78 105 128 98 99 110 121 110 196 0 48 -3 54 -45 95 -43 41 -45 45 -45 102 0 88 -2 91 -75 91 l-62 0 -6 83 c-4 45 -7 141 -7 214 l0 132 47 21 c63 28 93 57 93 91 0 32 -47 98 -128 181 l-55 57 -5 76 c-4 69 -3 78 17 91 33 23 25 51 -29 108 -42 45 -50 59 -50 92 0 116 -63 557 -96 670 -11 39 -12 58 -4 79 9 24 8 33 -8 54 -26 37 -33 68 -16 82 16 13 19 65 4 74 -13 8 -13 96 -1 129 8 19 6 30 -10 49 -10 14 -19 40 -19 59 0 29 5 36 44 57 25 12 47 29 50 36 3 9 -7 6 -30 -7 -71 -42 -164 10 -164 92 0 52 13 76 53 100 18 11 25 20 17 20 -27 0 -79 -38 -96 -71 -19 -37 -15 -96 10 -134 8 -13 33 -31 56 -41 38 -17 40 -20 40 -60 0 -25 -6 -47 -15 -54 -19 -16 -19 -44 0 -60 17 -14 11 -82 -11 -115 -18 -26 -18 -50 1 -65 21 -18 19 -54 -6 -76 -16 -15 -19 -26 -15 -54 4 -19 7 -42 8 -50 1 -8 -16 -89 -36 -180 -35 -153 -85 -475 -86 -546 0 -23 -12 -45 -43 -80 -64 -71 -74 -94 -51 -111 10 -7 21 -13 26 -13 4 0 8 -33 8 -73 l0 -73 -61 -54 c-34 -29 -81 -80 -105 -113 -72 -97 -56 -147 54 -176 l43 -12 -1 -219 -1 -219 -72 -3 -72 -3 -3 -75 -3 -75 -45 -27 c-60 -37 -92 -103 -75 -157 14 -48 73 -117 121 -141 67 -34 112 -102 129 -196 6 -33 -22 -3137 -28 -3151 -1 -1 -11 -3 -23 -5 -20 -3 -24 -10 -28 -58 l-5 -55 -42 -3 c-64 -5 -69 -19 -28 -93 20 -35 42 -77 49 -94 11 -25 7 -251 -20 -1340 -18 -720 -33 -1311 -33 -1312 -1 -2 -19 -3 -41 -3 l-39 0 -3 348 -3 348 -28 42 c-15 24 -49 58 -76 77 -47 34 -48 37 -41 70 4 19 5 36 2 39 -2 3 9 19 27 35 38 35 40 69 7 108 -22 26 -24 34 -16 69 15 62 12 257 -5 339 -40 191 -144 356 -290 460 -74 53 -235 133 -356 176 -53 19 -93 39 -96 48 -3 9 -9 25 -13 36 -5 11 -12 66 -16 123 -5 86 -4 102 9 102 8 0 25 9 38 20 l24 19 -31 -11 c-45 -16 -82 -3 -100 36 -14 29 -15 37 -3 62 8 16 25 34 39 41 23 12 23 13 4 13 -35 0 -74 -47 -74 -89 1 -40 14 -62 48 -80 23 -12 24 -16 19 -109 -3 -53 -9 -108 -15 -122 -6 -14 -13 -32 -15 -41 -3 -10 -48 -30 -119 -53 -62 -20 -168 -64 -235 -97 -97 -47 -137 -74 -197 -130 -182 -170 -267 -415 -237 -682 8 -79 9 -113 1 -115 -6 -2 -17 -17 -25 -33 -13 -25 -14 -33 -1 -63 8 -19 23 -37 34 -40 19 -6 36 -52 25 -68 -2 -5 -75 -8 -161 -8 l-157 0 38 31 c102 84 102 224 1 307 l-36 30 67 73 c81 89 164 213 205 302 91 201 113 493 54 720 -38 148 -138 312 -258 424 -95 90 -165 140 -403 294 -120 77 -250 165 -289 194 -129 96 -238 216 -306 335 -39 69 -42 87 -17 93 17 4 20 11 16 28 -4 14 1 31 14 47 38 49 14 140 -42 157 -15 5 -19 13 -15 28 3 12 -1 28 -10 38 -12 13 -14 51 -12 220 l3 203 45 8 c25 4 59 13 75 20 34 13 111 65 80 53 -11 -4 -36 -14 -55 -21 -52 -20 -151 -17 -210 5 -78 30 -134 81 -172 159 -29 58 -33 76 -32 142 0 90 23 147 84 214 43 46 130 95 172 97 13 0 32 5 43 10 14 6 -3 8 -54 5 -136 -9 -242 -81 -300 -205 -22 -47 -26 -70 -26 -141 0 -73 4 -93 28 -142 51 -104 147 -177 259 -196 l43 -8 3 -202 c2 -162 0 -207 -12 -223 -7 -11 -12 -29 -9 -40 4 -13 0 -19 -10 -19 -8 0 -27 -14 -41 -31 -34 -40 -35 -96 -2 -136 12 -15 21 -34 18 -42 -3 -8 3 -20 13 -27 16 -12 15 -17 -15 -71 -49 -87 -109 -160 -202 -249 -98 -91 -180 -152 -403 -295 -365 -234 -490 -350 -587 -542 -127 -254 -128 -623 -2 -896 51 -110 108 -196 241 -359 26 -33 26 -34 8 -45 -69 -38 -107 -129 -86 -206 14 -52 52 -107 81 -116 11 -3 20 -11 20 -17 0 -5 -7 -7 -16 -4 -9 3 -70 6 -135 6 -109 0 -120 2 -117 17 1 10 -1 24 -5 31 -5 7 -3 12 3 12 20 0 60 49 60 74 0 13 -11 37 -24 53 -22 27 -23 32 -14 83 6 30 8 114 5 185 -4 110 -9 145 -35 223 -87 268 -264 425 -623 553 -53 19 -93 39 -96 48 -2 9 -8 23 -13 32 -5 9 -12 64 -16 123 -6 91 -5 106 9 106 8 0 25 9 38 20 l24 19 -31 -11 c-46 -17 -82 -3 -101 38 -16 32 -16 38 -2 62 8 15 26 32 39 39 23 12 24 13 4 13 -12 0 -33 -12 -48 -26 -47 -47 -28 -129 34 -149 14 -5 19 -12 15 -28 -3 -12 -7 -56 -9 -97 -2 -41 -8 -86 -14 -100 -6 -14 -12 -32 -15 -40 -3 -9 -51 -31 -118 -54 -63 -21 -170 -65 -239 -99 -114 -55 -133 -68 -215 -151 -73 -73 -99 -107 -133 -176 -76 -155 -105 -333 -83 -504 10 -76 10 -90 -3 -100 -41 -31 -33 -116 13 -131 12 -4 22 -16 23 -28 2 -36 3 -41 11 -54 5 -7 -1 -16 -14 -23 -39 -21 -100 -83 -120 -121 -18 -36 -19 -63 -19 -439 0 -386 -1 -400 -19 -400 -17 0 -20 11 -25 122 -5 98 -67 2526 -66 2604 0 11 20 52 45 90 57 88 58 111 5 131 l-40 16 0 59 0 58 -35 0 -35 0 2 1603 3 1602 27 47 c15 25 57 72 92 103 69 60 116 137 116 188 0 44 -29 96 -66 120 -33 22 -34 23 -34 100 l0 77 -70 0 -70 0 0 214 0 215 56 28 c31 15 63 40 71 54 14 23 14 29 -1 60 -9 20 -52 75 -95 124 l-79 88 -4 71 c-5 65 -3 73 20 98 23 25 24 29 10 50 -9 13 -31 39 -51 59 -29 30 -36 46 -41 90 -3 30 -13 119 -21 199 -19 177 -50 366 -74 454 -10 37 -14 70 -10 78 14 22 10 54 -11 81 -24 31 -25 50 -3 83 15 24 15 27 0 54 -20 33 -22 98 -5 134 9 21 8 29 -5 44 -10 11 -17 35 -17 61 0 36 4 43 27 52 32 12 63 38 63 52 0 6 -8 3 -18 -6 -65 -59 -182 0 -182 93 0 33 27 78 58 94 36 20 15 20 -25 0z m-93 -1759 c0 -69 -3 -85 -15 -85 -12 0 -15 16 -15 85 0 69 3 85 15 85 12 0 15 -16 15 -85z m90 0 c0 -69 -3 -85 -15 -85 -12 0 -15 16 -15 85 0 69 3 85 15 85 12 0 15 -16 15 -85z m90 0 c0 -78 -2 -85 -20 -85 -18 0 -20 7 -20 85 0 78 2 85 20 85 18 0 20 -7 20 -85z m70 0 c0 -69 -3 -85 -15 -85 -12 0 -15 16 -15 85 0 69 3 85 15 85 12 0 15 -16 15 -85z m80 0 c0 -69 -3 -85 -15 -85 -12 0 -15 16 -15 85 0 69 3 85 15 85 12 0 15 -16 15 -85z m6690 0 c0 -69 -3 -85 -15 -85 -12 0 -15 16 -15 85 0 69 3 85 15 85 12 0 15 -16 15 -85z m85 11 c7 -78 3 -96 -21 -96 -11 0 -14 18 -14 85 0 67 3 85 14 85 10 0 16 -20 21 -74z m85 -11 c0 -69 -3 -85 -15 -85 -12 0 -15 16 -15 85 0 69 3 85 15 85 12 0 15 -16 15 -85z m80 0 c0 -69 -3 -85 -15 -85 -12 0 -15 16 -15 85 0 69 3 85 15 85 12 0 15 -16 15 -85z m80 0 c0 -69 -3 -85 -15 -85 -12 0 -15 16 -15 85 0 69 3 85 15 85 12 0 15 -16 15 -85z m-7532 -1062 c-3 -103 -4 -108 -25 -111 -23 -3 -23 -2 -23 107 l0 111 25 0 26 0 -3 -107z m130 0 c-3 -103 -4 -108 -25 -111 -23 -3 -23 -2 -23 107 l0 111 25 0 26 0 -3 -107z m132 -4 c0 -109 0 -110 -22 -107 -22 3 -23 8 -26 111 l-3 107 26 0 25 0 0 -111z m118 4 c-3 -108 -3 -108 -28 -108 -25 0 -25 0 -28 108 l-3 107 31 0 31 0 -3 -107z m110 0 c-3 -103 -4 -108 -25 -111 -23 -3 -23 -2 -23 107 l0 111 25 0 26 0 -3 -107z m112 -4 c0 -109 0 -110 -22 -107 -22 3 -23 8 -26 111 l-3 107 26 0 25 0 0 -111z m108 4 c-3 -108 -3 -108 -28 -108 -25 0 -25 0 -28 108 l-3 107 31 0 31 0 -3 -107z m6302 -4 c0 -109 0 -110 -22 -107 -22 3 -23 8 -26 111 l-3 107 26 0 25 0 0 -111z m138 4 c-3 -108 -3 -108 -28 -108 -25 0 -25 0 -28 108 l-3 107 31 0 31 0 -3 -107z m130 0 c-3 -103 -4 -108 -25 -111 -23 -3 -23 -2 -23 107 l0 111 25 0 26 0 -3 -107z m112 -4 c0 -109 0 -110 -22 -107 -22 3 -23 8 -26 111 l-3 107 26 0 25 0 0 -111z m118 4 c-3 -108 -3 -108 -28 -108 -25 0 -25 0 -28 108 l-3 107 31 0 31 0 -3 -107z m110 0 c-3 -103 -4 -108 -25 -111 -23 -3 -23 -2 -23 107 l0 111 25 0 26 0 -3 -107z m102 -3 l0 -110 -25 0 -25 0 0 110 0 110 25 0 25 0 0 -110z m-7355 -474 c61 -26 65 -46 65 -316 l0 -241 -112 3 -113 3 0 242 c0 230 1 243 21 270 38 51 80 63 139 39z m7042 -18 c39 -36 44 -78 41 -313 l-3 -220 -112 -3 -113 -3 0 241 c0 199 3 246 16 271 30 59 121 74 171 27z m-7037 -913 c56 -29 60 -50 60 -315 l0 -240 -115 0 -115 0 0 239 c0 231 1 239 23 272 38 57 91 73 147 44z m7044 -24 l31 -31 0 -248 0 -247 -112 -3 -113 -3 0 241 c0 196 3 247 15 270 35 67 123 77 179 21z m-7044 -986 c56 -29 60 -50 60 -310 l0 -235 -115 0 -115 0 0 230 c0 250 3 267 56 309 31 25 74 27 114 6z m7038 -19 l37 -34 3 -246 3 -246 -115 0 -116 0 0 235 c0 258 4 280 58 309 47 26 88 20 130 -18z m2793 -351 c7 -39 13 -157 13 -265 l1 -195 -42 -3 -43 -3 0 186 c0 177 11 300 32 354 13 35 24 15 39 -74z m-162 -18 c6 -43 11 -161 11 -262 l0 -185 -36 0 -36 0 5 228 c5 217 20 343 37 311 4 -8 13 -49 19 -92z m311 28 c7 -33 15 -153 17 -267 l5 -208 -36 0 -36 0 0 206 c0 196 14 354 31 337 4 -4 13 -35 19 -68z m-10292 -1052 l3 -123 -31 0 -30 0 0 118 c0 65 3 122 7 126 4 4 16 6 28 4 19 -3 20 -11 23 -125z m140 115 c8 -8 12 -50 12 -125 l0 -113 -29 0 -29 0 -4 113 c-3 63 0 117 5 125 12 15 30 15 45 0z m142 -7 c5 -11 10 -67 10 -125 l0 -106 -35 0 -35 0 0 118 c0 65 3 122 7 125 13 14 43 7 53 -12z m128 7 c8 -8 12 -50 12 -125 l0 -113 -29 0 -30 0 -3 111 c-2 61 1 117 5 125 10 17 29 18 45 2z m150 0 c8 -8 12 -50 12 -125 l0 -113 -29 0 -28 0 -6 113 c-5 110 0 137 27 137 7 0 17 -5 24 -12z m6450 0 c8 -8 12 -50 12 -125 l0 -113 -32 0 -33 0 0 113 c0 61 4 118 8 125 10 15 29 16 45 0z m152 -7 c5 -11 10 -67 10 -125 l0 -106 -35 0 -35 0 0 118 c0 65 3 122 7 125 13 14 43 7 53 -12z m124 13 c13 -5 16 -26 16 -125 l0 -119 -29 0 -30 0 -3 111 c-4 132 3 150 46 133z m144 -6 c8 -8 12 -50 12 -125 l0 -113 -35 0 -35 0 0 113 c0 110 7 137 35 137 6 0 16 -5 23 -12z m152 -14 c6 -14 10 -70 10 -125 l0 -99 -35 0 -35 0 0 118 c0 65 3 122 7 125 15 16 44 6 53 -19z m648 -316 l4 -158 -26 0 -26 0 0 125 c0 68 5 147 11 176 19 88 33 34 37 -143z m-100 -5 l5 -153 -28 0 -28 0 7 143 c3 78 9 155 12 171 14 61 27 -8 32 -161z m199 -10 l6 -143 -28 0 -28 0 6 148 c3 81 9 158 13 172 l8 25 9 -30 c4 -17 11 -94 14 -172z m-9939 -345 l4 -178 -31 0 -31 0 0 128 c0 118 13 242 27 265 16 26 27 -53 31 -215z m110 0 l4 -178 -27 0 -28 0 6 173 c3 94 9 185 13 201 l7 30 10 -25 c6 -13 12 -104 15 -201z m-234 160 c3 -29 6 -117 6 -195 l0 -143 -25 0 -25 0 0 120 c0 121 16 270 30 270 4 0 10 -24 14 -52z m11910 21 c26 -30 26 -33 26 -195 0 -139 -2 -164 -15 -164 -11 0 -15 -13 -17 -47 l-2 -48 -3 48 -4 47 -45 0 -44 0 -1 -47 -1 -48 -9 45 c-5 24 -15 48 -24 52 -12 7 -15 33 -15 141 0 73 5 150 10 172 18 78 96 102 144 44z m-1936 -585 c20 -14 22 -23 22 -125 0 -66 -4 -109 -10 -109 -5 0 -11 -12 -11 -27 l-2 -28 -4 28 c-3 21 -10 27 -29 27 -19 0 -24 -5 -25 -27 l-2 -28 -4 28 c-2 15 -9 27 -14 27 -5 0 -9 47 -9 105 0 92 3 108 20 125 24 24 38 25 68 4z m-7183 -363 c7 -12 -12 -24 -25 -16 -11 7 -4 25 10 25 5 0 11 -4 15 -9z m291 -18 c-4 -8 5 -28 19 -44 26 -32 55 -115 55 -161 l0 -28 -86 0 -86 0 6 38 c14 73 26 110 51 146 14 21 23 42 20 47 -8 13 4 31 16 23 6 -3 8 -13 5 -21z m319 -2 c-3 -10 1 -23 9 -30 20 -17 53 -99 60 -153 l7 -48 -85 0 c-83 0 -86 1 -86 23 0 39 27 116 55 158 14 22 23 44 20 49 -8 14 4 32 16 24 5 -3 7 -14 4 -23z m311 2 c-3 -8 3 -28 14 -43 29 -40 46 -87 54 -142 l7 -48 -85 0 c-83 0 -86 1 -86 23 0 39 28 122 55 161 14 21 23 42 20 47 -8 13 4 31 16 23 6 -3 8 -13 5 -21z m300 1 c-3 -8 8 -36 25 -63 22 -35 32 -66 36 -110 l6 -61 -82 0 c-78 0 -81 1 -81 23 0 39 28 122 55 161 14 21 23 42 20 47 -8 13 4 31 16 23 6 -3 8 -12 5 -20z m2929 17 c7 -12 -12 -24 -25 -16 -11 7 -4 25 10 25 5 0 11 -4 15 -9z m291 -16 c-2 -7 6 -28 20 -46 27 -37 54 -117 54 -161 l0 -28 -86 0 -86 0 6 38 c14 73 26 110 51 146 14 21 23 42 20 47 -8 13 4 31 16 23 6 -3 8 -12 5 -19z m319 -4 c-3 -10 1 -23 9 -30 20 -17 53 -99 60 -153 l7 -48 -85 0 c-75 0 -86 2 -86 18 0 37 30 126 55 163 14 22 23 44 20 49 -8 14 4 32 16 24 5 -3 7 -14 4 -23z m313 1 c-1 -10 10 -38 25 -63 22 -37 47 -122 47 -160 0 -5 -38 -9 -85 -9 -82 0 -85 1 -85 23 0 39 28 122 55 161 14 21 23 42 20 47 -8 13 4 31 16 23 6 -3 9 -13 7 -22z m298 2 c-3 -8 8 -36 25 -63 22 -35 32 -66 36 -110 l6 -61 -82 0 c-78 0 -81 1 -81 23 0 39 28 122 55 161 14 21 23 42 20 47 -8 13 4 31 16 23 6 -3 8 -12 5 -20z m-5352 -52 c28 -45 46 -103 46 -149 l0 -33 -79 0 c-44 0 -82 4 -85 8 -12 20 33 158 66 200 16 19 26 15 52 -26z m4147 7 c26 -37 49 -110 49 -156 l0 -33 -79 0 c-44 0 -82 4 -85 8 -12 20 33 158 66 200 16 18 25 15 49 -19z m-6815 -50 c26 -29 35 -244 11 -262 -9 -7 -18 -23 -20 -37 -4 -21 -5 -20 -6 8 -1 29 -4 32 -31 32 -27 0 -30 -3 -32 -32 l-1 -33 -4 33 c-2 17 -8 32 -14 32 -5 0 -9 52 -9 120 0 107 2 122 20 140 26 26 62 25 86 -1z m504 -291 c0 -14 -8 -18 -39 -18 -38 0 -39 1 -31 28 4 15 13 40 21 55 l13 28 17 -38 c10 -21 18 -46 19 -55z m134 5 c7 -21 4 -23 -33 -23 -23 0 -41 3 -41 8 0 4 8 29 17 55 l17 48 17 -33 c9 -18 20 -43 23 -55z m146 -15 c0 -16 -6 -19 -37 -16 -43 3 -45 15 -15 79 l16 36 18 -39 c10 -22 18 -49 18 -60z m140 0 c0 -16 -6 -19 -37 -16 -43 3 -44 12 -15 79 l16 37 18 -40 c10 -22 18 -49 18 -60z m114 70 c8 -18 16 -44 18 -58 3 -22 -1 -25 -35 -28 l-39 -3 7 33 c4 18 14 42 21 54 8 11 11 24 7 27 -3 4 -4 7 0 7 3 0 13 -15 21 -32z m1556 -34 c0 -8 5 -12 10 -9 15 9 12 -9 -5 -31 -11 -14 -14 -15 -9 -3 3 10 1 20 -5 24 -14 8 -14 35 -1 35 6 0 10 -7 10 -16z m207 -16 c-3 -7 -5 -2 -5 12 0 14 2 19 5 13 2 -7 2 -19 0 -25z m223 17 c0 -8 -4 -15 -10 -15 -5 0 -10 7 -10 15 0 8 5 15 10 15 6 0 10 -7 10 -15z m207 -17 c-3 -7 -5 -2 -5 12 0 14 2 19 5 13 2 -7 2 -19 0 -25z m223 16 c0 -8 5 -12 10 -9 6 3 10 1 10 -5 0 -7 -8 -9 -20 -5 -12 4 -20 2 -20 -5 0 -18 29 -42 41 -34 7 4 9 3 6 -3 -4 -6 -19 -10 -34 -10 -16 0 -22 2 -15 4 9 3 6 13 -10 36 -18 25 -19 29 -5 24 11 -4 17 -1 17 8 0 8 5 15 10 15 6 0 10 -7 10 -16z m207 -16 c-3 -7 -5 -2 -5 12 0 14 2 19 5 13 2 -7 2 -19 0 -25z m220 0 c-3 -7 -5 -2 -5 12 0 14 2 19 5 13 2 -7 2 -19 0 -25z m2863 17 c0 -8 -2 -15 -4 -15 -2 0 -11 -3 -20 -6 -9 -3 -16 -1 -16 6 0 6 5 8 10 5 6 -3 10 1 10 9 0 9 5 16 10 16 6 0 10 -7 10 -15z m208 -30 c-1 -25 -5 -45 -9 -45 -5 0 -6 7 -3 15 4 8 2 15 -4 15 -5 0 -12 9 -15 21 -4 16 -3 18 9 8 11 -9 14 -7 14 10 0 11 2 21 4 21 2 0 4 -20 4 -45z m222 30 c0 -9 6 -12 18 -8 10 4 14 2 9 -3 -11 -12 -67 -14 -67 -2 0 5 5 6 10 3 6 -3 10 1 10 9 0 9 5 16 10 16 6 0 10 -7 10 -15z m207 -17 c-3 -7 -5 -2 -5 12 0 14 2 19 5 13 2 -7 2 -19 0 -25z m223 14 c0 -11 -8 -18 -20 -19 -11 -1 -20 3 -20 8 0 6 5 7 10 4 6 -3 10 1 10 9 0 9 5 16 10 16 6 0 10 -8 10 -18z m207 -14 c-3 -7 -5 -2 -5 12 0 14 2 19 5 13 2 -7 2 -19 0 -25z m-5332 2 c3 -5 1 -10 -4 -10 -6 0 -11 5 -11 10 0 6 2 10 4 10 3 0 8 -4 11 -10z m520 -10 c3 -11 10 -20 15 -20 4 0 10 -7 14 -15 4 -11 -1 -15 -17 -14 -12 0 -16 3 -9 6 9 3 7 12 -9 34 -11 16 -16 29 -10 29 5 0 13 -9 16 -20z m55 16 c0 -3 -4 -8 -10 -11 -5 -3 -10 -1 -10 4 0 6 5 11 10 11 6 0 10 -2 10 -4z m203 -11 c-3 -9 -8 -14 -10 -11 -3 3 -2 9 2 15 9 16 15 13 8 -4z m3377 5 c0 -5 -4 -10 -10 -10 -5 0 -10 5 -10 10 0 6 5 10 10 10 6 0 10 -4 10 -10z m140 6 c0 -3 -4 -8 -10 -11 -5 -3 -10 -1 -10 4 0 6 5 11 10 11 6 0 10 -2 10 -4z m765 -14 c-3 -3 -11 0 -18 7 -9 10 -8 11 6 5 10 -3 15 -9 12 -12z m95 14 c0 -3 -4 -8 -10 -11 -5 -3 -10 -1 -10 4 0 6 5 11 10 11 6 0 10 -2 10 -4z m160 -6 c0 -5 -2 -10 -4 -10 -3 0 -8 5 -11 10 -3 6 -1 10 4 10 6 0 11 -4 11 -10z m-5090 -4 c0 -3 -4 -8 -10 -11 -5 -3 -10 -1 -10 4 0 6 5 11 10 11 6 0 10 -2 10 -4z m430 0 c0 -2 -11 -11 -25 -20 -19 -13 -30 -14 -43 -6 -14 9 -14 10 6 5 15 -4 22 -2 22 7 0 8 9 14 20 15 11 1 20 0 20 -1z m210 -6 c0 -5 -2 -10 -4 -10 -3 0 -8 5 -11 10 -3 6 -1 10 4 10 6 0 11 -4 11 -10z m220 6 c0 -3 -4 -8 -10 -11 -5 -3 -10 -1 -10 4 0 6 5 11 10 11 6 0 10 -2 10 -4z m177 -2 c-3 -3 -12 -4 -19 -1 -8 3 -5 6 6 6 11 1 17 -2 13 -5z m43 2 c0 -3 -4 -8 -10 -11 -5 -3 -10 -1 -10 4 0 6 5 11 10 11 6 0 10 -2 10 -4z m220 0 c0 -3 -4 -8 -10 -11 -5 -3 -10 -1 -10 4 0 6 5 11 10 11 6 0 10 -2 10 -4z m3060 -6 c0 -5 -2 -10 -4 -10 -3 0 -8 5 -11 10 -3 6 -1 10 4 10 6 0 11 -4 11 -10z m220 6 c0 -3 -4 -8 -10 -11 -5 -3 -10 -1 -10 4 0 6 5 11 10 11 6 0 10 -2 10 -4z m210 -6 c0 -5 -2 -10 -4 -10 -3 0 -8 5 -11 10 -3 6 -1 10 4 10 6 0 11 -4 11 -10z m220 6 c0 -3 -4 -8 -10 -11 -5 -3 -10 -1 -10 4 0 6 5 11 10 11 6 0 10 -2 10 -4z m220 0 c0 -3 -4 -8 -10 -11 -5 -3 -10 -1 -10 4 0 6 5 11 10 11 6 0 10 -2 10 -4z m220 0 c0 -3 -4 -8 -10 -11 -5 -3 -10 -1 -10 4 0 6 5 11 10 11 6 0 10 -2 10 -4z m-5620 -26 c0 -5 -5 -10 -11 -10 -5 0 -7 5 -4 10 3 6 8 10 11 10 2 0 4 -4 4 -10z m103 -16 c-10 -7 -27 -13 -38 -13 -15 0 -14 3 8 11 15 5 27 14 27 19 0 6 5 7 11 4 6 -5 4 -12 -8 -21z m112 16 c-3 -5 -1 -10 5 -10 6 0 9 -4 5 -10 -3 -5 -12 -7 -21 -3 -11 4 -12 9 -3 19 13 16 23 19 14 4z m120 -8 c-3 -3 -11 0 -18 7 -9 10 -8 11 6 5 10 -3 15 -9 12 -12z m95 8 c0 -5 -5 -10 -11 -10 -5 0 -7 5 -4 10 3 6 8 10 11 10 2 0 4 -4 4 -10z m214 -5 c-4 -8 -11 -15 -16 -15 -6 0 -5 6 2 15 7 8 14 15 16 15 2 0 1 -7 -2 -15z m120 6 c9 -14 -16 -27 -59 -30 -29 -1 -36 1 -25 8 8 5 18 7 22 5 13 -8 49 6 43 17 -4 5 -2 9 4 9 5 0 12 -4 15 -9z m96 -1 c0 -5 -5 -10 -11 -10 -5 0 -7 5 -4 10 3 6 8 10 11 10 2 0 4 -4 4 -10z m334 1 c3 -5 -1 -14 -9 -21 -11 -9 -14 -8 -12 9 1 22 12 28 21 12z m219 3 c7 -8 -3 -34 -13 -34 -5 0 -8 9 -7 20 1 20 8 25 20 14z m2744 -9 c0 -17 -13 -20 -21 -6 -4 5 0 12 6 14 7 3 13 6 14 6 0 1 1 -6 1 -14z m113 -4 c0 -4 -6 -8 -14 -8 -8 0 -12 6 -9 14 5 13 23 9 23 -6z m215 9 c3 -5 2 -10 -4 -10 -5 0 -13 5 -16 10 -3 6 -2 10 4 10 5 0 13 -4 16 -10z m100 0 c-3 -5 -11 -10 -16 -10 -6 0 -7 5 -4 10 3 6 11 10 16 10 6 0 7 -4 4 -10z m111 -1 c3 -6 1 -16 -6 -22 -10 -9 -11 -9 -5 2 4 8 2 17 -6 22 -9 6 -10 9 -2 9 6 0 15 -5 19 -11z m98 -2 c-3 -8 5 -13 21 -15 14 -1 25 3 25 8 0 6 4 10 10 10 5 0 7 -7 4 -15 -4 -9 -18 -14 -40 -13 -31 1 -44 15 -27 31 10 11 13 8 7 -6z m121 3 c3 -5 2 -10 -4 -10 -5 0 -13 5 -16 10 -3 6 -2 10 4 10 5 0 13 -4 16 -10z m100 0 c-3 -5 -11 -10 -16 -10 -6 0 -7 5 -4 10 3 6 11 10 16 10 6 0 7 -4 4 -10z m115 -9 c0 -4 -6 -8 -14 -8 -8 0 -12 6 -9 14 5 13 23 9 23 -6z m220 -1 c0 -4 -8 -14 -17 -21 -16 -12 -17 -12 -6 2 10 12 10 18 0 28 -9 10 -8 11 6 6 9 -4 17 -11 17 -15z m-5177 -5 c8 -18 -11 -31 -25 -17 -11 11 -3 32 12 32 4 0 10 -7 13 -15z m217 -6 c0 -5 -10 -9 -21 -9 -18 0 -19 2 -9 15 12 15 30 12 30 -6z m214 6 c4 -10 -1 -15 -14 -15 -13 0 -18 5 -14 15 4 8 10 15 14 15 4 0 10 -7 14 -15z m212 -17 c-23 -13 -40 0 -25 18 9 11 15 12 26 2 12 -10 12 -13 -1 -20z m214 17 c10 -13 9 -15 -8 -15 -15 0 -20 5 -16 15 4 8 7 15 9 15 1 0 8 -7 15 -15z m120 -8 c8 -3 -4 -6 -27 -6 -24 -1 -43 4 -43 10 0 6 9 8 20 4 13 -4 20 -2 20 7 0 9 3 9 8 2 4 -6 14 -14 22 -17z m95 -7 c-5 -8 -11 -8 -17 -2 -6 6 -7 16 -3 22 5 8 11 8 17 2 6 -6 7 -16 3 -22z m3078 15 c8 -18 -11 -31 -25 -17 -11 11 -3 32 12 32 4 0 10 -7 13 -15z m210 -16 c-17 -17 -37 -1 -22 17 8 10 15 12 23 4 7 -7 7 -13 -1 -21z m220 17 c6 -16 -19 -30 -28 -16 -7 11 2 30 15 30 4 0 10 -6 13 -14z m210 -17 c-17 -17 -37 -1 -22 17 8 10 15 12 23 4 7 -7 7 -13 -1 -21z m110 0 c-22 -7 -53 0 -53 13 0 5 10 4 22 -3 18 -10 20 -9 15 5 -5 13 -3 14 13 3 18 -11 19 -12 3 -18z m110 17 c4 -10 0 -14 -14 -13 -20 1 -24 9 -12 20 10 11 20 8 26 -7z m101 2 c-5 -8 0 -9 17 -5 22 5 22 5 6 -7 -24 -18 -61 -10 -44 10 15 16 31 18 21 2z m116 -1 c0 -8 -7 -14 -15 -14 -16 0 -19 9 -8 20 11 11 23 8 23 -6z m-5365 -15 c-3 -3 -11 0 -18 7 -9 10 -8 11 6 5 10 -3 15 -9 12 -12z m235 8 c0 -5 -8 -10 -17 -10 -15 0 -16 2 -3 10 19 12 20 12 20 0z m1080 0 c0 -5 -8 -10 -17 -10 -15 0 -16 2 -3 10 19 12 20 12 20 0z m2880 -6 c0 -2 -15 -4 -32 -3 -27 0 -29 2 -13 8 18 8 45 4 45 -5z m428 2 c3 -3 -16 -6 -42 -6 -26 0 -45 4 -42 9 6 9 74 7 84 -3z m227 4 c-3 -5 -12 -10 -18 -10 -7 0 -6 4 3 10 19 12 23 12 15 0z m-6865 -50 c0 -5 -2 -10 -4 -10 -3 0 -8 5 -11 10 -3 6 -1 10 4 10 6 0 11 -4 11 -10z m292 -368 c44 -46 87 -103 104 -138 l29 -59 0 -245 0 -245 -227 -3 -228 -2 0 234 c0 269 5 292 76 392 47 67 130 143 155 144 9 0 50 -35 91 -78z m2492 -211 c161 -132 327 -339 376 -468 48 -126 50 -156 50 -710 l0 -523 -506 0 -505 0 3 553 c4 621 1 588 84 745 71 135 178 263 322 383 53 43 97 79 99 79 3 0 37 -27 77 -59z m4150 0 c155 -127 305 -308 366 -445 58 -128 60 -156 60 -730 l0 -526 -505 0 -505 0 0 513 c1 393 4 530 15 590 32 184 178 398 391 576 54 45 99 81 101 81 3 0 37 -27 77 -59z m2828 -86 c3 -30 2 -30 -50 -33 l-54 -3 7 33 c4 18 17 54 28 79 l22 45 22 -45 c12 -26 23 -60 25 -76z m144 107 c0 -4 10 -27 22 -52 12 -25 22 -55 22 -67 0 -21 -5 -23 -50 -23 -48 0 -50 1 -50 28 0 15 9 45 20 67 11 22 20 46 20 54 0 13 14 7 16 -7z m237 -109 l7 -33 -56 0 -56 0 7 33 c4 17 16 47 26 65 10 18 19 41 19 50 0 24 46 -76 53 -115z m149 110 c0 -4 8 -21 18 -38 10 -16 21 -47 25 -67 l7 -38 -56 0 c-56 0 -56 0 -50 28 3 15 15 45 25 68 10 22 19 46 19 54 0 7 3 11 6 8 3 -4 6 -10 6 -15z m211 -55 c9 -21 17 -49 17 -63 0 -23 -3 -25 -51 -25 l-51 0 7 38 c4 20 16 52 27 70 11 17 17 32 13 32 -3 0 -3 6 1 12 6 9 10 7 14 -7 3 -11 14 -37 23 -57z m-393 -174 c0 -2 -7 -4 -15 -4 -8 0 -15 4 -15 10 0 5 7 7 15 4 8 -4 15 -8 15 -10z m110 6 c0 -5 -5 -10 -11 -10 -5 0 -7 5 -4 10 3 6 8 10 11 10 2 0 4 -4 4 -10z m137 -6 c-3 -3 -12 -4 -19 -1 -8 3 -5 6 6 6 11 1 17 -2 13 -5z m-37 -19 c10 -12 10 -15 -2 -15 -8 0 -15 7 -15 15 0 8 1 15 2 15 2 0 8 -7 15 -15z m-35 -15 c-3 -5 -14 -6 -25 -3 -11 3 -18 9 -15 13 3 5 14 6 25 3 11 -3 18 -9 15 -13z m-255 6 c0 -3 -4 -8 -10 -11 -5 -3 -10 -1 -10 4 0 6 5 11 10 11 6 0 10 -2 10 -4z m130 -6 c0 -5 -4 -10 -10 -10 -5 0 -10 5 -10 10 0 6 5 10 10 10 6 0 10 -4 10 -10z m-4522 -194 c38 -20 77 -65 91 -105 7 -23 11 -182 11 -512 l0 -479 -170 0 -170 0 0 495 c0 532 -1 523 52 572 12 12 34 26 48 32 37 14 107 13 138 -3z m-1062 -15 c23 -10 52 -34 65 -52 l24 -34 3 -502 3 -503 -171 0 -170 0 0 484 c0 318 4 494 11 513 35 94 141 136 235 94z m-526 -13 c18 -13 43 -36 54 -51 21 -28 21 -39 24 -533 l3 -504 -171 0 -170 0 0 488 c0 453 2 490 19 528 17 38 54 73 91 87 39 15 118 7 150 -15z m1081 -1 c18 -12 44 -38 56 -56 l23 -34 0 -498 0 -499 -170 0 -171 0 3 498 3 498 26 41 c34 49 79 72 145 73 37 0 60 -6 85 -23z m5094 -234 c78 -77 135 -160 165 -239 19 -51 20 -77 20 -409 l0 -355 -311 0 -310 0 3 363 3 363 37 75 c46 93 114 177 202 251 l69 58 26 -19 c15 -11 58 -50 96 -88z" />
              <path d="M12310 7805 c0 -8 5 -15 10 -15 6 0 10 7 10 15 0 8 -4 15 -10 15 -5 0 -10 -7 -10 -15z"/>
              <path d="M6010 6606 c-7 -14 -26 -28 -42 -31 l-30 -7 22 -23 c16 -17 19 -29 14 -50 -6 -25 -5 -27 12 -20 10 5 28 8 39 8 11 0 29 -3 39 -8 17 -7 18 -5 12 20 -5 21 -2 33 14 50 l22 23 -29 6 c-16 4 -36 18 -44 32 l-15 25 -14 -25z"/>
              <path d="M1322 3378 c-31 -31 3 -90 39 -67 11 7 9 9 -9 9 -28 0 -39 26 -23 51 13 22 10 24 -7 7z"/>
              <path d="M11222 2844 c-31 -21 -30 -69 2 -90 19 -12 29 -13 43 -5 17 10 16 10 -4 11 -20 0 -53 33 -53 52 0 4 10 16 22 28 26 24 21 26 -10 4z"/>
            </g>
          </svg>
          </div>
          <div className="tool-name azkar">
            الأذكار
          </div>
        </div>
        <div className="tool" onClick={() => {handleClick('search', 'search')}}>
          <div className="tool-img">
          <svg xmlns="http://www.w3.org/2000/svg" className="search" x="0px" y="0px" width="120" height="50" viewBox="0 0 24 24" fill="#fff">
            <path d="M 9 2 C 5.1458514 2 2 5.1458514 2 9 C 2 12.854149 5.1458514 16 9 16 C 10.747998 16 12.345009 15.348024 13.574219 14.28125 L 14 14.707031 L 14 16 L 20 22 L 22 20 L 16 14 L 14.707031 14 L 14.28125 13.574219 C 15.348024 12.345009 16 10.747998 16 9 C 16 5.1458514 12.854149 2 9 2 z M 9 4 C 11.773268 4 14 6.2267316 14 9 C 14 11.773268 11.773268 14 9 14 C 6.2267316 14 4 11.773268 4 9 C 4 6.2267316 6.2267316 4 9 4 z"></path>
          </svg>
          </div>
          <div className="tool-name search">
            الباحث القرآني
          </div>
        </div>
        <div className="tool first" onClick={() => {handleClick('home', 'home')}}>
          <div className="tool-img">
            <svg xmlns="http://www.w3.org/2000/svg" className="home" x="0px" y="0px" width="120" height="50" viewBox="0 0 24 24" fill="#fff">
              <path d="M 12 2 A 1 1 0 0 0 11.289062 2.296875 L 1.203125 11.097656 A 0.5 0.5 0 0 0 1 11.5 A 0.5 0.5 0 0 0 1.5 12 L 4 12 L 4 20 C 4 20.552 4.448 21 5 21 L 9 21 C 9.552 21 10 20.552 10 20 L 10 14 L 14 14 L 14 20 C 14 20.552 14.448 21 15 21 L 19 21 C 19.552 21 20 20.552 20 20 L 20 12 L 22.5 12 A 0.5 0.5 0 0 0 23 11.5 A 0.5 0.5 0 0 0 22.796875 11.097656 L 12.716797 2.3027344 A 1 1 0 0 0 12.710938 2.296875 A 1 1 0 0 0 12 2 z"></path>
            </svg>
          </div>
          <div className="tool-name home">
            الرئيسية
          </div>
        </div>
       </div>
    </div>
    </>
  )
}
