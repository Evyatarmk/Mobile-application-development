import { Stack } from "expo-router";
import { ItemsProvider } from "./Context/ItemsContext"; // Adjust the import path

export default function RootLayout() {
return (
  <ItemsProvider>
  <Stack screenOptions={{
    headerShown: false,
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }}>
<Stack.Screen name="index" />
<Stack.Screen name="EditItemScreen" />
<Stack.Screen name="ListScreen" />
</Stack>

  </ItemsProvider>
);
}
