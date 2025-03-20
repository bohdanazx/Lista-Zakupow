import React, { useState, useEffect } from "react";
import { View, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HomeScreen from "./screens/HomeScreen";
import AddProductModal from "./components/AddProductModal";
import { sampleData } from "./data/sampleData";

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
      console.error("Error", error);
    }
  };

  const loadShoppingList = async () => {
    try {
      const storedList = await AsyncStorage.getItem("shoppingList");
      setShoppingList(storedList ? JSON.parse(storedList) : sampleData);
    } catch (error) {
      console.error("Error", error);
    }
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
        onAdd={(product) => {
          let newList = [...shoppingList];
          newList[0].data.unshift(product);
          setShoppingList(newList);
        }}
      />
      <View style={styles.addButtonContainer}>
        <Button
          title="➕ Dodaj Produkt"
          onPress={() => setModalVisible(true)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: 20,
  },
  addButtonContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },
});
