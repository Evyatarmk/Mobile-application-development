import { useLocalSearchParams, useRouter } from "expo-router";
import { View, StyleSheet, I18nManager } from "react-native";
import { Card, Button, Icon, Text } from "react-native-elements";

// מוודא שהתצוגה מותאמת לעברית
I18nManager.forceRTL(true);
I18nManager.allowRTL(true);

const ItemDetailsScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const item = JSON.parse(params.item);

  return (
    <View style={styles.container}>
      {/* כרטיס מוצר */}
      <Card containerStyle={styles.card}>
        <Card.Title style={styles.title}>{item.name}</Card.Title>
        <Card.Divider />

        <View style={styles.row}>
          <Icon name="layers" size={24} color="#007bff" />
          <Text style={styles.label}>כמות:</Text>
          <Text style={styles.value}>{item.quantity}</Text>
        </View>

        <View style={styles.row}>
          <Icon name="description" size={24} color="#007bff" />
          <Text style={styles.label}>תיאור:</Text>
        </View>
        <Text style={styles.description}>{item.description}</Text>

        {/* כפתור חזרה */}
        <Button
          title="חזור"
          icon={<Icon name="arrow-forward" size={20} color="white" />} // כיוון מתאים לעברית
          buttonStyle={styles.backButton}
          onPress={() => router.back()}
        />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", backgroundColor: "#f8f9fa" },
  card: { borderRadius: 10, padding: 20, elevation: 5 },
  title: { 
    fontSize: 22, 
    fontWeight: "bold", 
    textAlign: "right", // מיושר לימין
    marginBottom: 10 
  },
  row: { 
    flexDirection: "row-reverse", // כיוון מימין לשמאל
    alignItems: "center", 
    marginBottom: 10 
  },
  label: { 
    fontSize: 18, 
    fontWeight: "bold", 
    marginRight: 8, // מתאים לעברית 
    textAlign: "right" 
  },
  value: { 
    fontSize: 18, 
    color: "#333", 
    marginRight: 5, // יישור מימין
    textAlign: "right" 
  },
  description: { 
    fontSize: 16, 
    color: "#555", 
    textAlign: "right", 
    marginTop: 5 
  },
  backButton: {
    backgroundColor: "#007bff",
    borderRadius: 8,
    paddingVertical: 12,
    marginTop: 15,
  },
});

export default ItemDetailsScreen;
