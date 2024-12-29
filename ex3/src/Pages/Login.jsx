import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { usePopup } from './Popup';


export default function Login(props) {
   const [formData, setFormData] = useState({
      username: '',
      password: '',

    });
    const { showPopup } = usePopup();

    const navigate = useNavigate();


    const [errors, setErrors] = useState({});
  
    // Validation functions
    const validateUsername = (username) => {
      const regex = /^[a-zA-Z0-9!@#$%^&*]{1,60}$/;
      return regex.test(username);
    };
  
    const validatePassword = (password) => {
      const regex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{7,12}$/;
      return regex.test(password);
    };
  
    // Validate the form on submit
    const handleSubmit = (e) => {
      e.preventDefault();
      const newErrors = {};
  
      // if (!validateUsername(formData.username)) {
      //   newErrors.username = 'שם משתמש לא תקין!';
      // }
      // if (!validatePassword(formData.password)) {
      //   newErrors.password = 'הסיסמה חייבת להכיל 7-12 תווים, עם מספר, אות גדולה ותו מיוחד!';
      // }
     
      setErrors(newErrors);
  
      if (Object.keys(newErrors).length === 0) {
        loginUser(formData)
      }
    };
    const loginUser=(userToCheck)=>{
      const UsersList = localStorage.getItem("UsersList");
        
        // Initialize UsersList if it doesn't exist
        let users = UsersList ? JSON.parse(UsersList) : [];
      
        // Check if user exists
         const user=users.find(u => u.username === userToCheck.username && u.password === userToCheck.password)
         console.log(UsersList)
         if (user) {
          sessionStorage.setItem("User",JSON.stringify(user))
          navigate('/Profile');
        }
        else{
          showPopup("המשתשמש לא קיים");
        } 
    }
  
    // Handle input changes
    const handleChange = (e) => {
      const { name, value, files } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: files ? files[0] : value,
      }));
    };
  
  return (
    <div style={styles.container}>
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2 style={styles.heading}>התחברות</h2>
      <div style={styles.inputGroup}>
        <label>שם משתמש</label>
        <input type="text" name="username" onChange={handleChange} />
        {errors.username && <div style={{ color: 'red' }}>{errors.username}</div>}
      </div>
      <div style={styles.inputGroup}>
        <label>סיסמה</label>
        <input type="password" name="password" onChange={handleChange} />
        {errors.password && <div style={{ color: 'red' }}>{errors.password}</div>}
      </div>
      <input type="submit" value="התחבר" style={styles.submitButton} />
    </form>
  </div>
  )
  
}

// Inline CSS for styling
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    padding: '20px',
  },
  form: {
    width: '100%',
    maxWidth: '500px',
    backgroundColor: '#E3F2FD',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '9px 9px 9px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '24px',
    color: '#333',
  },
  inputGroup: {
    marginBottom: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '8px',
  },
  label: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '16px',
    outline: 'none',
    boxSizing: 'border-box',
  },
  submitButton: {
    display: 'block',
    width: '100%',
    padding: '12px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '10px',
    transition: 'background-color 0.3s',
  },
  submitButtonHover: {
    backgroundColor: '#45a049',
  },
};