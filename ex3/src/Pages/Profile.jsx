import React, { useEffect, useState } from 'react'
import EditDetails from './EditDetails'
import SystemAdmin from './SystemAdmin'

export default function Profile(props) {
    const [user, setUser] = useState({})
    const [EditDetailsMode, setEditDetailsMode] = useState(false)
  
  const OpenEditDetails=()=>{
    setEditDetailsMode(true)
  }
  const CloseEditDetails=()=>{
    setEditDetailsMode(false)
  }
  const logoutUser=()=>{
    setUser(null)
    setEditDetailsMode(false)
    sessionStorage.removeItem("User")
  }
  const UpdateUserEditDetails=(user)=>{
    setEditDetailsMode(false)
    sessionStorage.setItem("User",JSON.stringify(user))
    setUser(user)
  }

    useEffect(() => {
      const userFromSessionStorage = JSON.parse(
        sessionStorage.getItem("User")
      );
        setUser(userFromSessionStorage);
    },[]);
    return (
      <div>
        {user?.isAdmin ? (
          <SystemAdmin />
        ) : EditDetailsMode ? (
          <EditDetails
            sendToPUserDetails={UpdateUserEditDetails}
            user={user}
            closeEditMode={CloseEditDetails}
          />
        ) : user ? (
          <div style={style.container}>
            <img
              src={user.image || "https://via.placeholder.com/100"}
              alt="Profile"
              style={style.image}
            />
            <div style={style.details}>
              <h2 style={style.heading}>פרופיל</h2>
              <h3 style={style.name}>{user.username}</h3>
              <p style={style.info}>
                <strong>שם:</strong> {user.firstName} {user.lastName}
              </p>
              <p style={style.info}>
                <strong>אימייל:</strong> {user.email}
              </p>
              <p style={style.info}>
                <strong>תאריך לידה:</strong> {user.birthDate}
              </p>
              <p style={style.info}>
                <strong>מקום מגורים:</strong> {user.street} {user.houseNumber},{" "}
                {user.city}
              </p>
              <div style={style.buttons}>
                <input
                  type="button"
                  style={style.buttonEdit}
                  value="עדכון פרטים"
                  onClick={OpenEditDetails}
                />
                <a href="https://games.yo-yoo.co.il/games_play.php?game=151">
                  <input
                    type="button"
                    style={style.buttonGame}
                    value="למשחק"
                  />
                </a>
                <input
                  type="button"
                  style={style.buttonLogout}
                  value="התנתק"
                  onClick={logoutUser}
                />
              </div>
            </div>
          </div>
        ) : (
          <div>
            <h2 style={style.heading}>פרופיל</h2>
            <div style={style.noLogin}>לא ביצעת כינסה למערכת</div>
          </div>
        )}
      </div>
    );
}

const style = {
    container: {
      backgroundColor: '#E3F2FD',
      boxShadow: '9px 9px 20px rgba(0, 0, 0, 0.1)',
      display: "flex",
      alignItems: "start",
      justifyContent: "start",
      padding: "20px",
      borderRadius: "8px",
      maxWidth: "600px",
      margin: "20px auto",
      gap: "20px",
    

    },
    image: {
      width: "100px",
      height: "100px",
      borderRadius: "50%",
      border: "2px solid #ddd",
    },
    details: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      flex: 1,
    },
    heading: {
      textAlign: "center",
      marginBottom: "10px",
      fontSize: "24px",
      color: "#333",
    },
    name: {
      fontSize: "20px",
      fontWeight: "bold",
      color: "#555",
      marginBottom: "5px",
    },
    info: {
      fontSize: "16px",
      color: "#666",
    },
    buttons: {
      display: "flex",
      gap: "10px",
      marginTop: "10px",
    },
    buttonGame: {
      padding: "10px 15px",
      backgroundColor: "#4CAF50",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
    buttonGameHover: {
      backgroundColor: "#45a049",
    },
    button: {
      padding: "10px 15px",
      backgroundColor: "#4CAF50",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
    buttonHover: {
      backgroundColor: "#45a049",
    },
    buttonEdit: {
      padding: "10px 15px",
      backgroundColor: "gray",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
   buttonEditHover: {
      backgroundColor: "#45a049",
    },
    buttonLogout: {
      padding: "10px 15px",
      backgroundColor: "red",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
    buttonLogoutHover: {
      backgroundColor: "#45a049",
    },
    noLogin: {
      textAlign: "center",
      fontSize: "18px",
      color: "#ff0000",
      marginTop: "20px",
    },
  };
  