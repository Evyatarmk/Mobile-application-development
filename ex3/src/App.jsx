
import './App.css'
import Register from './Pages/Register'
import Login from './Pages/Login'
import Profile from './Pages/Profile'
import SystemAdmin from './Pages/SystemAdmin'
import { Link, Route, Routes } from 'react-router-dom'

function App() {
  if (!localStorage.getItem("UsersList")) {
    localStorage.setItem("UsersList", JSON.stringify([{
      username: "admin",
      password: "ad12343211ad",
      image: "",
      firstName: "admin",
      lastName: "admin",
      email: "admin@admin.com",
      birthDate: "1984-02-02",
      city: "באר שבע",
      street: "admin",
      houseNumber: "1",
      isAdmin: "true"
    }]));
  }
  return (
    <>
<div style={styles.navbar}>
  <Link to="/Register" style={styles.link}>הרשמה</Link>
  <span style={styles.separator}>|</span>
  <Link to="/Login" style={styles.link}>התחברות</Link>
  <span style={styles.separator}>|</span>
  <Link to="/" style={styles.link}>אזור אישי</Link>
</div>
    <Routes>
      <Route path='/' element={<Profile/>}/>
      <Route path='/Profile' element={<Profile/>}/>
      <Route path='/Register' element={<Register/>}/>
      <Route path='/Login' element={<Login/>}/>
    </Routes>

    </>
  )
}

export default App
const styles = {
  navbar: {
    position: 'fixed', // Ensures the navbar stays at the top
    top: 0, // Aligns it to the top of the page
    left: 0,
    width: '100%', // Spans the full width of the page
    display: 'flex',
    justifyContent: 'center', // Centers the navbar items horizontally
    alignItems: 'center', // Aligns items vertically in the center
    backgroundColor: '#4CAF50', // Green background color
    padding: '10px 20px', // Adds some spacing around the navbar
    borderBottom: '2px solid #388E3C', // Adds a bottom border for a visual effect
    fontFamily: 'Arial, sans-serif',
    fontSize: '16px',
    zIndex: 1000, // Ensures the navbar stays above other content
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Adds a subtle shadow
  },
  link: {
    textDecoration: 'none', // Removes underline
    color: '#fff', // White text color
    padding: '0 10px', // Adds spacing between links
    fontWeight: 'bold',
    transition: 'color 0.3s', // Smooth hover effect
  },
  linkHover: {
    color: '#FFD700', // Gold hover color
  },
  separator: {
    color: '#fff', // White separator color
    padding: '0 5px', // Adds spacing around the separator
  },
};