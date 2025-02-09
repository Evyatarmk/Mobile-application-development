import { useRouter } from "expo-router";
import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Input, Button, Text, Icon } from "react-native-elements";
import { useItems } from "./Context/ItemsContext";
import { Ionicons } from "@expo/vector-icons";

const AddItemScreen = () => {
  const router = useRouter();
  const { addItem } = useItems();

  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [description, setDescription] = useState("");

  const saveItem = () => {
    if (!name.trim()) return;
    addItem({ id: "", name, quantity, description });
    router.back();
  };

  const cancel = () => router.back();

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <View style={styles.container}>
      <Text h4 style={styles.title}>הוספת פריט</Text>

      <Input
        placeholder="שם פריט"
        value={name}
        onChangeText={setName}
        leftIcon={{ type: "font-awesome", name: "tag", color: "#007bff" }}
        inputStyle={{ textAlign: "right" }} 

      />

      <Input
        placeholder="תיאור המוצר"
        value={description}
        onChangeText={setDescription}
        leftIcon={<Icon name="description" size={24} color="#007bff" />}
        inputStyle={{ textAlign: "right" }} 
      />


      <View style={styles.quantityContainer}>
        <Text style={styles.label}>כמות:</Text>
        <Button
          buttonStyle={styles.iconButton}
          icon={<Ionicons name="add" size={20} color="white" />}
          onPress={increaseQuantity}
        />
        <Input
          value={quantity.toString()}
          onChangeText={(text) => {
            const num = parseInt(text, 10);
            setQuantity(isNaN(num) || num < 1 ? 1 : num);
          }}
          keyboardType="numeric"
          containerStyle={styles.quantityInputContainer}
          inputStyle={styles.quantityInput}
        />
        <Button
          buttonStyle={styles.iconButton}
          icon={<Ionicons name="remove" size={20} color="white" />}
          onPress={decreaseQuantity}
        />
      </View>

      <Button title="הוסף פריט" buttonStyle={styles.saveButton} onPress={saveItem} />
      <Button title="ביטול" buttonStyle={styles.cancelButton} onPress={cancel} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
  },
  quantityContainer: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 10,
  },
  iconButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  quantityInputContainer: {
    width: 60,
  },
  quantityInput: {
    textAlign: "center",
    fontSize: 18,
    width: "100%",
  },
  saveButton: {
    backgroundColor: "#28a745",
    borderRadius: 8,
    paddingVertical: 12,
    marginBottom: 10,
  },
  cancelButton: {
    backgroundColor: "#dc3545",
    borderRadius: 8,
    paddingVertical: 12,
  },
});

export default AddItemScreen;
