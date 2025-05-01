import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Appbar } from './components/Appbar'
import { Home } from './pages/Home'
import { Footer } from './components/footer'
import { Report } from './pages/Report'
function App() {
  return (
    <BrowserRouter>
      <Appbar />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/" element={<Home/>}/>
        <Route path="/report" element ={<Report/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
