import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HomeScreen from "./screens/HomeScreen";
import AddProductModal from "./components/AddProductModal";
import { sampleData } from "./data/sampleData";
import { AntDesign } from "@expo/vector-icons"; // Іконки для кнопки додавання

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [shoppingList, setShoppingList] = useState([]);

  useEffect(() => {
    loadShoppingList();
  }, []);

  useEffect(() => {
    saveShoppingList();
  }, [shoppingList]);

  const saveShoppingList = async () => {
    try {
      await AsyncStorage.setItem("shoppingList", JSON.stringify(shoppingList));
    } catch (error) {
      console.error("Помилка збереження даних", error);
    }
  };

  const loadShoppingList = async () => {
    try {
      const storedList = await AsyncStorage.getItem("shoppingList");
      if (storedList) {
        setShoppingList(JSON.parse(storedList));
      } else {
        setShoppingList(sampleData);
      }
    } catch (error) {
      console.error("Помилка завантаження даних", error);
    }
  };

  const addProduct = (product) => {
    let newList = [...shoppingList];
    newList[0].data.unshift(product);
    setShoppingList(newList);
  };

  return (
    <View style={styles.container}>
      <HomeScreen
        shoppingList={shoppingList}
        setShoppingList={setShoppingList}
      />
      <AddProductModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAdd={addProduct}
      />

      {/* FAB Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setModalVisible(true)}
      >
        <AntDesign name="plus" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9", paddingTop: 30 },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 40,
    backgroundColor: "#007bff",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
});
