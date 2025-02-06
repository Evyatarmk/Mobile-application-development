import React, { useState } from "react";
import { View, Text, FlatList, Button, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { useItems } from "./Context/ItemsContext";
import { useRouter } from "expo-router";
const router = useRouter();

const ListScreen = () => {
const { items, setItems } = useItems();

  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const startEditing = (item) => {
    router.push({ 
      pathname: "./EditItemScreen", 
      params: { item: JSON.stringify(item) } 
    });
  };
  

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
              <Text style={styles.itemText}>{item.name}</Text>
              <Text style={styles.itemText}>{item.quantity}</Text>
                <Button title="עריכה" onPress={() => startEditing(item)} />
                <Button title="מחק" onPress={() => deleteItem(item.id)} color="red" />
          </View>
        )}
      />
      <TouchableOpacity style={styles.button} >
        <Text style={styles.buttonText}>הוספת פריט</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  listItem: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 10, borderBottomWidth: 1 },
  input: { borderWidth: 1, padding: 5, flex: 1 },
  itemText: { flex: 1 },
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
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ListScreen;
