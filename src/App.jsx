import { Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import AICaptionGenerator from './components/AICaptionGenerator'
import LoginScreen from './components/LoginScreen'
import SignupScreen from './components/SignupScreen'
import HomeScreen from './components/HomeScreen'
import PricingScreen from './components/PricingScreen'
import LivePreviewMockUp from './components/LivePreviewMockUp'
import TemporaryCompo from './components/TemporaryCompo'
import DashboardHome from './components/DashboardHome'
import GenerateCaption from './Pages/GenerateCaption'
import ImageCaption from './Pages/ImageCaption'
import { useEffect } from 'react'
function App() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/dashboard') {
      console.log("Hey there")
      console.warn("⚠️ KICKBACK DETECTED: Something tried to send us to Dashboard.");
      console.trace(); // This will show exactly what function called the redirect
    }
  }, [location]);
  return (
    <>
      <Routes>
        <Route path='/' element={<HomeScreen />} />
        <Route path='/login' element={<LoginScreen />} />
        <Route path='/signup' element={<SignupScreen />} />
        <Route path='/pricing' element={<PricingScreen />} />
        <Route path='/dashboard' element={<DashboardHome />} />
        {/* <Route path='/home-page' element={<AICaptionGenerator />} /> */}
        {/* <Route path='/live-mock-up' element={<LivePreviewMockUp />} />
        <Route path='/temp' element={<TemporaryCompo />} /> */}
        <Route path='/generate-caption' element={<GenerateCaption />} />
        <Route path='/image-caption' element={<ImageCaption />} />
      </Routes>
    </>
  )
}

export default App
