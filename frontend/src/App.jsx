import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Appbar } from './components/Appbar'
import { Home } from './pages/Home'
import { Footer } from './components/footer'
import { Report } from './pages/Report'
import { Dashboard } from './pages/Dashboard'
import { Leaderboard } from './pages/Leaderboard'
import { Admin } from './pages/Admin'
import { AdminRoute } from './components/AdminRoute'
import { NotAuthorized } from './pages/NotAuthorized'

function App() {
  return (
    <BrowserRouter>
      <Appbar />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/" element={<Home/>}/>
        <Route path="/report" element ={<Report/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/leaderboard" element={<Leaderboard/>}/>
        <Route path="/admin" element={<AdminRoute> <Admin /> </AdminRoute>}/>

        <Route path="/not-authorized" element={<NotAuthorized />} />


      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
