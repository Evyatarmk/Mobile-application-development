import React from "react";
import { View, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { useItems } from "./Context/ItemsContext";
import { useRouter } from "expo-router";
import { ListItem, Button, Icon, Text } from "react-native-elements";

const ListScreen = () => {
  const router = useRouter();
  const { items, setItems } = useItems();

  const deleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const startEditing = (item) => {
    router.push({ pathname: "./EditItemScreen", params: { item: JSON.stringify(item) } });
  };

  const viewDetails = (item) => {
    router.push({ pathname: "./ItemDetailsScreen", params: { item: JSON.stringify(item) } });
  };

  return (
    <View style={styles.container}>
      {/* כפתור בית */}
      <TouchableOpacity style={styles.homeButton} onPress={() => router.back()}>
        <Icon name="home" size={28} color="white" />
      </TouchableOpacity>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ListItem bottomDivider onPress={() => viewDetails(item)}>
            <ListItem.Content>
              <ListItem.Title style={styles.itemTitle}>{item.name}</ListItem.Title>
              <ListItem.Subtitle style={styles.itemSubtitle}>כמות: {item.quantity}</ListItem.Subtitle>
            </ListItem.Content>
            <Button
              icon={<Icon name="edit" size={18} color="white" />}
              buttonStyle={styles.editButton}
              onPress={() => startEditing(item)}
            />
            <Button
              icon={<Icon name="delete" size={18} color="white" />}
              buttonStyle={styles.deleteButton}
              onPress={() => deleteItem(item.id)}
            />
          </ListItem>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Icon name="inbox" size={50} color="#ccc" />
            <Text style={styles.emptyText}>אין פריטים להצגה</Text>
          </View>
        }
        contentContainerStyle={{ paddingBottom: 80 }}
      />


      <TouchableOpacity style={styles.addButton} onPress={() => router.push({ pathname: "./AddItemScreen" })}>
        <Icon name="add" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#f8f9fa" },
  homeButton: {

    backgroundColor: "#007bff",
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
    zIndex: 10,
  },
  itemTitle: { fontSize: 18, fontWeight: "bold" },
  itemSubtitle: { fontSize: 14, color: "#666" },
  editButton: {
    backgroundColor: "#007bff",
    borderRadius: 8,
    padding: 8,
    marginHorizontal: 5,
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    borderRadius: 8,
    padding: 8,
    marginHorizontal: 5,
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#28a745",
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: "#666",
    marginTop: 10,
  }

});

export default ListScreen;
