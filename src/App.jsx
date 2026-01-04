import { Route, Routes } from 'react-router-dom'
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
function App() {
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
