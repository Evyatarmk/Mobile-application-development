
import './App.css'
import Register from './Pages/Register'
import Login from './Pages/Login'
import Profile from './Pages/Profile'
import SystemAdmin from './Pages/SystemAdmin'
import { Link, Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
    <div>
      <Link to="/Register">הרשמה</Link>|
      <Link to="/Login">Login</Link>|
      <Link to="/Profile">אזור אישי</Link>
    </div>
    <Routes>
      <Route path='/Profile' element={<Profile/>}/>
      <Route path='/Register' element={<Register/>}/>
      <Route path='/Login' element={<Login/>}/>
    </Routes>

    </>
  )
}

export default App
