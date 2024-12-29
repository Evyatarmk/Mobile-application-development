import React, { createContext, useContext, useState } from 'react';

const PopupContext = createContext();

export function PopupProvider({ children }) {
  const [popup, setPopup] = useState({ message: '', isVisible: false });

  const showPopup = (message) => {
    setPopup({ message, isVisible: true });
  };

  const hidePopup = () => {
    setPopup({ message: '', isVisible: false });
  };

  return (
    <PopupContext.Provider value={{ showPopup }}>
      {children}
      {popup.isVisible && (
        <div style={styles.overlay}>
          <div style={styles.popup}>
            <p style={styles.message}>{popup.message}</p>
            <button style={styles.closeButton} onClick={hidePopup}>
              Close
            </button>
          </div>
        </div>
      )}
    </PopupContext.Provider>
  );
}

export function usePopup() {
  return useContext(PopupContext);
}

// Inline styles
const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  popup: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
    width: '300px',
    maxWidth: '90%',
  },
  message: {
    marginBottom: '20px',
    fontSize: '16px',
    color: '#333',
  },
  closeButton: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};
