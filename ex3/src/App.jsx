import { useState } from 'react'
import './App.css'
import Register from './Pages/Register'
import Login from './Pages/Login'
import Profile from './Pages/Profile'
import EditDetails from './Pages/EditDetails'
import SystemAdmin from './Pages/SystemAdmin'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Register/>
      <Login/>
      <Profile/>
      <EditDetails/>
      <SystemAdmin/>
    </>
  )
}

export default App
