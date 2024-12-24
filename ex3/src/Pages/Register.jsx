import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import convertImageToBase64 from './convertImageToBase64';

export default function Register(props) {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    image: '',
    firstName: '',
    lastName: '',
    email: '',
    birthDate: '',
    city: '',
    street: '',
    houseNumber: '',
  });


  // Validation functions
  const validateUsername = (username) => {
    const regex = /^[a-zA-Z0-9!@#$%^&*]{1,60}$/;
    return regex.test(username);
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{7,12}$/;
    return regex.test(password);
  };

  const validateConfirmPassword = (password, confirmPassword) => {
    return password === confirmPassword;
  };

  const validateImage = (file) => {
    return file=='' || (file.type === 'image/jpeg' || file.type === 'image/jpg');
  };
  const validateFirstName = (firstName) => {
    const regex = /^[a-zA-Z\u0590-\u05FF\s]+$/;
    return regex.test(firstName);
  };
  const validateLastName = (lastName) => {
    const regex = /^[a-zA-Z\u0590-\u05FF\s]+$/;
    return regex.test(lastName);
  };
  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[cC][oO][mM]$/;
    return regex.test(email);
  };
  const validatBirthDate = (birthDate) => {
    let birthDateDate = new Date(birthDate)
    let nowDate = new Date()
    if (birthDateDate > nowDate) {
      return false;
    }
    const age = nowDate.getFullYear() - birthDateDate.getFullYear();
    if (age <= 18 || age >= 120) {
      return false;
    }
    return true;
  };
  const validateStreet = (street) => {
    const regex = /^[\u0590-\u05FF\s]+$/;
    return regex.test(street);
  };

  const validateHouseNumber = (number) => {
    return !isNaN(number) && Number(number) > 0;
  };

  
  // Validate the form on submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!validateUsername(formData.username)) {
      newErrors.username = 'שם משתמש לא תקין!';
    }
    if (!validatePassword(formData.password)) {
      newErrors.password = 'הסיסמה חייבת להכיל 7-12 תווים, עם מספר, אות גדולה ותו מיוחד!';
    }
    if (!validateConfirmPassword(formData.password, formData.confirmPassword)) {
      newErrors.confirmPassword = 'אימות הסיסמה לא תואם!';
    }
    if (!validateImage(formData.image)) {
      newErrors.image = 'נא להעלות קובץ תמונה בפורמט JPG או JPEG בלבד!';
    }
    if (!validateFirstName(formData.firstName)) {
      newErrors.firstName = 'ניתן למלא טקסט בלבד!';
    }
    if (!validateLastName(formData.lastName)) {
      newErrors.lastName = 'ניתן למלא טקסט בלבד!';
    }
    if (!validateEmail(formData.email)) {
      newErrors.email = 'כתובת מייל לא תקינה!';
    }
    if (!validatBirthDate(formData.birthDate)) {
      newErrors.birthDate = 'תאריך לא תקין גילך צריך להיות בין 18 ל120!'
    }
    if (!validateStreet(formData.street)) {
      newErrors.street = 'שם רחוב חייב להכיל אותיות בעברית בלבד!';
    }
    if (!validateHouseNumber(formData.houseNumber)) {
      newErrors.houseNumber = 'מספר בית חייב להיות מספר חיובי!';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      registerUser(formData)
  };
  }
 
  const registerUser= async (formData)=>{
    let base64String ;
    if(formData.image!=''){
      base64String = await convertImageToBase64(formData.image);
    }
    else{
      base64String=formData.image;
    }
    const user={
      username: formData.username ,
      password: formData.password,
      image:base64String,
      firstName:formData.firstName ,
      lastName:formData.lastName ,
      email:formData.email,
      birthDate: formData.birthDate,
      city: formData.city,
      street: formData.street,
      houseNumber: formData.houseNumber,
      isAdmin:true,
    }
    const UsersList = localStorage.getItem("UsersList");
     // Initialize UsersList if it doesn't exist
     let users = UsersList ? JSON.parse(UsersList) : [];
    
     // Check if email already exists
     if (users.some(u => u.email === user.email)) {
       alert("יש לך כבר משתמש רשום");
     }
     // Check if username already exists
     else if (users.some(u => u.username === user.username)) {
       alert("השם משתמש הזה כבר תפוס אנא בחר אחר");
     } 
     // Add new user to the list and save to localStorage
     else {
       users.push(user);
       localStorage.setItem("UsersList", JSON.stringify(users));
       sessionStorage.setItem("User", JSON.stringify(user));
       navigate('/Profile');
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
        <h2 style={styles.heading}>טופס הרשמה</h2>
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
        <div style={styles.inputGroup}>
          <label>אימות סיסמה</label>
          <input type="password" name="confirmPassword" onChange={handleChange} />
          {errors.confirmPassword && <div style={{ color: 'red' }}>{errors.confirmPassword}</div>}
        </div>
        <div style={styles.inputGroup}>
          <label>תמונה</label>
          <input type="file" name="image" onChange={handleChange} />
          {errors.image && <div style={{ color: 'red' }}>{errors.image}</div>}
        </div>
        <div style={styles.inputGroup}>
          <label>שם פרטי</label>
          <label>שם משתמש</label>
          <input type="text" name="firstName" onChange={handleChange} />
          {errors.firstName && <div style={{ color: 'red' }}>{errors.firstName}</div>}
        </div>
        <div style={styles.inputGroup}>
          <label>שם משפחה</label>
          <input type="text" name="lastName" onChange={handleChange} />
          {errors.lastName && <div style={{ color: 'red' }}>{errors.lastName}</div>}
        </div>
        <div style={styles.inputGroup}>
          <label>כתובת מייל</label>
          <input type="email" name="email" onChange={handleChange} />
          {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
        </div>
        <div style={styles.inputGroup}>
          <label>תאריך לידה</label>
          <input type="date" name="birthDate" onChange={handleChange} />
          {errors.birthDate && <div style={{ color: 'red' }}>{errors.birthDate}</div>}
        </div>
        <div style={styles.inputGroup}>
          <label>עיר</label>
          <select type="s" name="city" onChange={handleChange}>
            <option value="תל אביב">תל אביב</option>
            <option value="ירושלים">ירושלים</option>
            <option value="חיפה">חיפה</option>
            <option value="באר שבע">באר שבע</option>
            <option value="אשדוד">אשדוד</option>
          </select>
        </div>
        <div style={styles.inputGroup}>
          <label>שם רחוב</label>
          <input type="text" name="street" onChange={handleChange} />
          {errors.street && <div style={{ color: 'red' }}>{errors.street}</div>}
        </div>
        <div style={styles.inputGroup}>
          <label>מספר בית</label>
          <input type="number" name="houseNumber" onChange={handleChange} />
          {errors.houseNumber && <div style={{ color: 'red' }}>{errors.houseNumber}</div>}
        </div>
        <input type="submit" value="הרשם" style={styles.submitButton} />
      </form>
    </div>
  );
}

// Inline CSS for styling
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f7f7f7',
    padding: '20px',
  },
  form: {
    width: '100%',
    maxWidth: '500px',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
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
