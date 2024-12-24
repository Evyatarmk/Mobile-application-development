import React, { useState } from 'react'
import convertImageToBase64 from './convertImageToBase64';

export default function EditDetails(props) {
   const [userData, setUserData] = useState(props.user);
   const [errors, setErrors] = useState({});
   const [imageIsEdit, setImageIsEdit] = useState(false)
  
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
      return ( !imageIsEdit || (file.type === 'image/jpeg' || file.type === 'image/jpg'));
    };
    const validateFirstName = (firstName) => {
      const regex = /^[a-zA-Z\u0590-\u05FF\s]+$/;
      return regex.test(firstName);
    };
    const validateLastName = (lastName) => {
      const regex = /^[a-zA-Z\u0590-\u05FF\s]+$/;
      return regex.test(lastName);
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
  
    const editUser= async (userData)=>{
      let base64String ;
          if(imageIsEdit){
            base64String = await convertImageToBase64(userData.image);
          }
          else{
            base64String=userData.image;
          }
          const user={...userData,
            image:base64String, 
          }
      let UsersList = JSON.parse(localStorage.getItem("UsersList"));
       if (UsersList.some(u => u.username === user.username && u.email!=user.email)) {
         alert("השם משתמש הזה כבר תפוס אנא בחר אחר");
       }
       else{
        UsersList[UsersList.indexOf(u=>u.email===user.email)]=user
        localStorage.setItem("UsersList",JSON.stringify(UsersList))
        props.sendToPUserDetails(user)
        alert("המשתממש נערך");
       } 
     }
    // Validate the form on submit
    const handleSubmit = (e) => {
      e.preventDefault();
      const newErrors = {};
  
      if (!validateUsername(userData.username)) {
        newErrors.username = 'שם משתמש לא תקין!';
      }
      if (!validatePassword(userData.password)) {
        newErrors.password = 'הסיסמה חייבת להכיל 7-12 תווים, עם מספר, אות גדולה ותו מיוחד!';
      }
    
      if (!validateImage(userData.image)) {
        newErrors.image = 'נא להעלות קובץ תמונה בפורמט JPG או JPEG בלבד!';
      }
      if (!validateFirstName(userData.firstName)) {
        newErrors.firstName = 'ניתן למלא טקסט בלבד!';
      }
      if (!validateLastName(userData.lastName)) {
        newErrors.lastName = 'ניתן למלא טקסט בלבד!';
      }
      if (!validatBirthDate(userData.birthDate)) {
        newErrors.birthDate = 'תאריך לא תקין גילך צריך להיות בין 18 ל120!'
      }
      if (!validateStreet(userData.street)) {
        newErrors.street = 'שם רחוב חייב להכיל אותיות בעברית בלבד!';
      }
      if (!validateHouseNumber(userData.houseNumber)) {
        newErrors.houseNumber = 'מספר בית חייב להיות מספר חיובי!';
      }
  
      setErrors(newErrors);
      if (Object.keys(newErrors).length === 0) {
        editUser(userData)
    };
    }
   
  
    // Handle input changes
    const handleChange = (e) => {
      const { name, value, files } = e.target;
      setUserData((prevData) => ({
        ...prevData,
        [name]: files ? files[0] : value,
      }));
      files?setImageIsEdit(true):setImageIsEdit(false)
    };
  
  
    return (
      <div style={styles.container}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <h2 style={styles.heading}>טופס עריכה</h2>
          <p><strong>{userData.email}</strong></p>
          <div style={styles.inputGroup}>
            <label>שם משתמש</label>
            <input type="text" name="username" onChange={handleChange}  value={userData.username}/>
            {errors.username && <div style={{ color: 'red' }}>{errors.username}</div>}
          </div>
          <div style={styles.inputGroup}>
            <label>סיסמה</label>
            <input type="text" name="password" onChange={handleChange}  value={userData.password} />
            {errors.password && <div style={{ color: 'red' }}>{errors.password}</div>}
          </div>
          
          <div style={styles.inputGroup}>
            <label>תמונה</label>
            <input type="file" name="image" onChange={handleChange} />
            {errors.image && <div style={{ color: 'red' }}>{errors.image}</div>}
          </div>
          <div style={styles.inputGroup}>
            <label>שם פרטי</label>
            <input type="text" name="firstName" onChange={handleChange} value={userData.firstName} />
            {errors.firstName && <div style={{ color: 'red' }}>{errors.firstName}</div>}
          </div>
          <div style={styles.inputGroup}>
            <label>שם משפחה</label>
            <input type="text" name="lastName" onChange={handleChange} value={userData.lastName}/>
            {errors.lastName && <div style={{ color: 'red' }}>{errors.lastName}</div>}
          </div>
          <div style={styles.inputGroup}>
            <label>תאריך לידה</label>
            <input type="date" name="birthDate" onChange={handleChange} value={userData.birthDate} />
            {errors.birthDate && <div style={{ color: 'red' }}>{errors.birthDate}</div>}
          </div>
          <div style={styles.inputGroup}>
            <label>עיר</label>
            <select type="s" name="city" onChange={handleChange} value={userData.city}>
              <option value="תל אביב">תל אביב</option>
              <option value="ירושלים">ירושלים</option>
              <option value="חיפה">חיפה</option>
              <option value="באר שבע">באר שבע</option>
              <option value="אשדוד">אשדוד</option>
            </select>
          </div>
          <div style={styles.inputGroup}>
            <label>שם רחוב</label>
            <input type="text" name="street" onChange={handleChange} value={userData.street}/>
            {errors.street && <div style={{ color: 'red' }}>{errors.street}</div>}
          </div>
          <div style={styles.inputGroup}>
            <label>מספר בית</label>
            <input type="number" name="houseNumber" onChange={handleChange} value={userData.houseNumber}/>
            {errors.houseNumber && <div style={{ color: 'red' }}>{errors.houseNumber}</div>}
          </div>
          <input type="submit" value="ערוך" style={styles.submitButton} />
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
      borderRadius: '20px',
      border:' #4CAF50 solid '
     
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
    image: {
      width: "100px",
      height: "100px",
      borderRadius: "50%",
      border: "2px solid #ddd",
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

