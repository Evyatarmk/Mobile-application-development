import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Text, View, StyleSheet,Button, TouchableOpacity ,TextInput} from "react-native";
import { useItems } from './Context/ItemsContext';


const EditItemScreen = () => {
  const router = useRouter();
  const { editItem } = useItems();
  const params = useLocalSearchParams();
  const item = JSON.parse(params.item);

  const [newName, setNewName] = useState(item.name);
  const [newQuantity, setNewQuantity] = useState(item.quantity.toString());

  const saveEdit = () => {
    editItem(item.id,newName,newQuantity)
    router.back(); 
  };

const cancelEdit = () => {
  router.back(); // Go back to the previous screen
};
  return (
    <View >
      <TextInput
        value={newName}
        onChangeText={setNewName}
        placeholder="שם פריט"
      />
      <TextInput
        
        value={newQuantity}
        onChangeText={setNewQuantity}
        placeholder="כמות"
        keyboardType="numeric"
      />
      <Button title="שמור" onPress={saveEdit} />
      <Button title="ביטול" onPress={cancelEdit} />
    </View>
  );
};
export default EditItemScreen;
