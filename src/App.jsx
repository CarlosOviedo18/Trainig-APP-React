import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Trainings from './pages/Trainings'

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes> 
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/entrenamientos" element={<Trainings />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App