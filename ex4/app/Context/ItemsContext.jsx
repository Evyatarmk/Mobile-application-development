import React, { createContext, useState, useContext } from "react";

const ItemsContext = createContext();

export const useItems = () => {
  return useContext(ItemsContext);
};

export const ItemsProvider = ({ children }) => {
  const [items, setItems] = useState([
    { id: "1", name: "חלב", quantity: 1 },
    { id: "2", name: "לחם", quantity: 2 },
    { id: "3", name: "ביצים", quantity: 12 }
  ]);
  const editItem = (id, newName, newQuantity) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, name: newName, quantity: newQuantity } : item
      )
    );
  };
  return (
    <ItemsContext.Provider value={{ items, setItems,editItem }}>
      {children}
    </ItemsContext.Provider>
  );
}