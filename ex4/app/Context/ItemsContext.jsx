import React, { createContext, useState, useContext, useEffect } from "react";
import 'react-native-get-random-values'
import { v4 as uuidv4 } from "uuid"; // ייבוא UUID

const ItemsContext = createContext();

export const useItems = () => {
  return useContext(ItemsContext);
};

export const ItemsProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  useEffect(()=>{
    setItems([
      { id: 1, name: "חלב", quantity: 1, description: "חלב טרי 3% שומן",isTaken:false },
      { id: 2, name: "לחם", quantity: 2, description: "לחם מחיטה מלאה",isTaken:true  },
      { id: 3, name: "ביצים", quantity: 12, description: "ביצים אורגניות מגידול חופשי",isTaken:true},
    ]
    )
  },[])
  const addItem = (item) => {
    const newItem = {
      id: uuidv4(),
      name:item.name,
      quantity:item.quantity,
      description:item.description,
      isTaken:false 
    };
    setItems([...items, newItem]);
  };

  const editItem = (id, newName, newQuantity, newDescription) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, name: newName, quantity: newQuantity, description: newDescription } : item
    ));
  };
  // דאג לכל פריט שיהיה לו שדה isTaken
const updateItemStatus = (id, newStatus) => {
  setItems(items.map(item =>
    item.id === id ? { ...item, isTaken: newStatus } : item
  ));
};

  return (
    <ItemsContext.Provider value={{ items, setItems,editItem,addItem ,updateItemStatus}}>
      {children}
    </ItemsContext.Provider>
  );
}