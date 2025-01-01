import React, { useEffect, useState } from 'react'
import convertImageToBase64 from './convertImageToBase64';
import { usePopup } from './Popup';


export default function EditDetails(props) {
  const [userData, setUserData] = useState(props.user);
  const [errors, setErrors] = useState({});
  const [imageIsEdit, setImageIsEdit] = useState(false)
  const { showPopup } = usePopup();
  const [allCities, setCities] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  // Fetch cities from an API on component mount
  useEffect(() => {
    const fetchCities = async () => {
 
      try {
        const response = await fetch(
          'https://raw.githubusercontent.com/royts/israel-cities/master/israel-cities.json',

        );

        if (!response.ok) {
          throw new Error('Failed to fetch cities');
        }

        const data = await response.json();
        const cityNames = data.map((city) => city.name);
        setCities(cityNames);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };
    fetchCities();
  }, []);
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
    return (!imageIsEdit || (file.type === 'image/jpeg' || file.type === 'image/jpg'));
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
  const validateCity = (city) => {
    return allCities.includes(city)
  };
  const validateStreet = (street) => {
    const regex = /^[\u0590-\u05FF\s]+$/;
    return regex.test(street);
  };

  const validateHouseNumber = (number) => {
    return !isNaN(number) && Number(number) > 0;
  };

  const editUser = async (userData) => {
    let base64String;
    if (imageIsEdit) {
      base64String = await convertImageToBase64(userData.image);
    }
    else {
      base64String = userData.image;
    }
    const user = {
      ...userData,
      image: base64String,
    }
    let UsersList = JSON.parse(localStorage.getItem("UsersList"));
    if (UsersList.some(u => u.username === user.username && u.email != user.email)) {
      showPopup("השם משתמש הזה כבר תפוס אנא בחר אחר");
    }
    else {
      UsersList[UsersList.findIndex(u => u.email === user.email)] = user
      localStorage.setItem("UsersList", JSON.stringify(UsersList))
      props.sendToPUserDetails(user)
      showPopup("המשתממש נערך");
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
    if (!validateCity(userData.city)) {
      newErrors.city = 'העיר צריכה להיות אמיתי וקיימת ברשימה';
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
    files ? setImageIsEdit(true) : setImageIsEdit(false)
    // Handle city autocomplete dynamically
    if (name === 'city') {
      const suggestions = allCities.filter((city) =>
        city.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCities(suggestions);
    }
  };


  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input type="button" style={styles.exitBTN} className='btn-close' onClick={() => props.closeEditMode()} />
        <h2 style={styles.heading}>טופס עריכה</h2>
        <p><strong>{userData.email}</strong></p>
        <div style={styles.inputGroup}>
          <label>שם משתמש</label>
          <input type="text" name="username" onChange={handleChange} value={userData.username} />
          {errors.username && <div style={{ color: 'red' }}>{errors.username}</div>}
        </div>
        <div style={styles.inputGroup}>
          <label>סיסמה</label>
          <input type="text" name="password" onChange={handleChange} value={userData.password} />
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
          <input type="text" name="lastName" onChange={handleChange} value={userData.lastName} />
          {errors.lastName && <div style={{ color: 'red' }}>{errors.lastName}</div>}
        </div>
        <div style={styles.inputGroup}>
          <label>תאריך לידה</label>
          <input type="date" name="birthDate" onChange={handleChange} value={userData.birthDate} />
          {errors.birthDate && <div style={{ color: 'red' }}>{errors.birthDate}</div>}
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="city">עיר</label>
          {/* City Field with Autocomplete */}
          <div className="form-group">
            <input
              type="text"
              id="city"
              name="city"
              list="citys"
              value={userData.city}
              onChange={handleChange}
              required
            />
            {/* Show suggestions */}
            {filteredCities.length > 0 && (
              <datalist id="citys">
                {filteredCities.map((city, index) => (
                  <option key={index}
                    onClick={() => handleCityClick(city)}
                    value={city}>
                  </option>
                ))}
              </datalist >
            )}
          </div>
          {errors.city && <div style={{ color: 'red' }}>{errors.city}</div>}
        </div>
        <div style={styles.inputGroup}>
          <label>שם רחוב</label>
          <input type="text" name="street" onChange={handleChange} value={userData.street} />
          {errors.street && <div style={{ color: 'red' }}>{errors.street}</div>}
        </div>
        <div style={styles.inputGroup}>
          <label>מספר בית</label>
          <input type="number" name="houseNumber" onChange={handleChange} value={userData.houseNumber} />
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
    marginTop: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    padding: '20px',
    borderRadius: '20px',
  },
  exitBTN: {
    position: "absolute",
    top: "10px", // Distance from the top
    right: "10px", // Distance from the right
  },
  form: {
    backgroundColor: '#E3F2FD',
    boxShadow: '9px 9px 20px rgba(0, 0, 0, 0.1)',
    position: 'relative',
    width: '100%',
    maxWidth: '500px',
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

