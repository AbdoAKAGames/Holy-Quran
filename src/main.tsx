import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import PhoneHome from './components/phone-home/PhoneHome.tsx'

const phoneRegEx = /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i;
const userAgent = navigator.userAgent;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {phoneRegEx.test(userAgent) ? <PhoneHome /> : <App />}
  </StrictMode>,
)
