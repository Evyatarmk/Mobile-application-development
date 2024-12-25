import React, { useEffect, useState } from 'react'
import EditDetails from './EditDetails'

export default function SystemAdmin(props) {
  const[UsersList,setUsersList]=useState([])
  const [editUser, setEditUser] = useState(null)
  
  const UpdateUserEditDetails=(user)=>{
  const userIndex = UsersList.findIndex((u) => u.email === user.email);
  // If the user is found, update the list
  if (userIndex !== -1) {
    let newUsersList = [...UsersList]; // Create a copy to avoid mutating state directly
    newUsersList[userIndex] = user;
    setUsersList(newUsersList); // Update the state with the modified list
  }
   setEditUser(null)
  }
  const CloseEditDetails=()=>{
     setEditUser(null)
    }
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("UsersList") || "[]");
    setUsersList(storedUsers);
  }, []);
  const DeleteUser = (username) => {
    const updatedUsersList = UsersList.filter(user => user.username !== username);
    localStorage.setItem("UsersList", JSON.stringify(updatedUsersList));
    setUsersList(updatedUsersList)
  };
  
  return (
    <div>
      {editUser ? (
        <EditDetails sendToPUserDetails={UpdateUserEditDetails} user={editUser} closeEditMode={CloseEditDetails}/>
      ) : (
        <div style={style.tableContainer}>
          <h2 style={style.heading}>ניהול משתמשים</h2>
          <table style={style.table}>
            <thead>
              <tr>
                <th style={style.th}>שם משתמש</th>
                <th style={style.th}>שם מלא</th>
                <th style={style.th}>תאריך לידה</th>
                <th style={style.th}>כתובת</th>
                <th style={style.th}>דואר אלקטרוני</th>
                <th style={style.th}>פעולות</th>
              </tr>
            </thead>
            <tbody>
              {UsersList.map((user) => (
                <tr key={user.username} style={style.tr}>
                  <td style={style.td}>
                    <img
                      src={user.image || "https://via.placeholder.com/50"}
                      alt="Profile"
                      style={style.image}
                    />
                    <div>{user.username}</div>
                  </td>
                  <td style={style.td}>{`${user.firstName} ${user.lastName}`}</td>
                  <td style={style.td}>{user.birthDate}</td>
                  <td style={style.td}>{`${user.street} ${user.houseNumber}, ${user.city}`}</td>
                  <td style={style.td}>{user.email}</td>
                  <td style={style.td}>
                    <button
                      name={user.email}
                      style={style.buttonEdit}
                      onClick={() => setEditUser(user)}
                    >
                      עדכון פרטים
                    </button>
                    <button
                      style={style.buttonDelete}
                      onClick={() => DeleteUser(user.username)}
                    >
                      מחיקה
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
  
}

const style = {
  tableContainer: {
    maxWidth: "1000px",
    margin: "30px auto",
       padding: "20px",
    borderRadius: "12px",
    textAlign: "right",
    fontFamily: "'Arial', sans-serif",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "28px",
    color: "#333",
    fontWeight: "bold",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
    boxShadow: '9px 9px 9px rgba(0, 0, 0, 0.1)',

  },
  th: {
    backgroundColor: "#4CAF50",
    color: "#fff",
    padding: "12px",
    textAlign: "center",
    fontSize: "16px",
    borderBottom: "2px solid #ddd",
  },
  td: {
    padding: "12px",
    textAlign: "center",
    fontSize: "14px",
    color: "#555",
    verticalAlign: "middle",
    borderBottom: "1px solid #ddd",
  },
  tr: {
    transition: "background-color 0.3s",
  },
  trHover: {
    backgroundColor: "#f5f5f5",
  },
  image: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    border: "2px solid #ddd",
    marginBottom: "5px",
  },
  buttonEdit: {
    padding: "8px 12px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    margin: "5px",
  },
  buttonEditHover: {
    backgroundColor: "#0056b3",
  },
  buttonDelete: {
    padding: "8px 12px",
    backgroundColor: "#E74C3C",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  buttonDeleteHover: {
    backgroundColor: "#C0392B",
  },
};
