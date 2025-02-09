import React, { useEffect, useState } from "react";
import { Link } from "expo-router";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useItems } from "./Context/ItemsContext";

export default function App() {
  const [cartCount, setCartCount] = useState(0); // דוגמה למספר פריטים בעגלה
  const { items } = useItems();
  useEffect(()=>{
    setCartCount(items.length)
  },[items])
  return (
    <View style={styles.container}>
      {/* כפתור עגלה עם מספר הפריטים */}
      <View style={styles.cartContainer}>
        <Ionicons name="cart" size={28} color="#007bff" />
        <Text style={styles.cartCount}>{cartCount}</Text>
      </View>

      <Text style={styles.title}>ברוכים הבאים לרשימת הקניות שלכם</Text>

      <TouchableOpacity style={styles.button}>
        <Link href="/ListScreen" asChild>
          <Text style={styles.buttonText}>מעבר לרשימה</Text>
        </Link>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#343a40",
    marginBottom: 20,
    textAlign:"center"
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  cartContainer: {
    position: "absolute",
    top: 20,
    right: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  cartCount: {
    marginLeft: 8,
    fontSize: 18,
    fontWeight: "bold",
    color: "#007bff",
  },
});
