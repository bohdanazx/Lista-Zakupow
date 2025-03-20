import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { toggleBought, removeProduct } from "../utils/shoppingListUtils";

const ProductItem = ({ item, section, shoppingList, setShoppingList }) => {
  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() =>
        toggleBought(shoppingList, section.title, item.id, setShoppingList)
      }
    >
      <Text style={item.bought ? styles.bought : styles.notBought}>
        {item.name} - {item.store} ({item.price} zł)
      </Text>
      <Text
        style={styles.delete}
        onPress={() =>
          removeProduct(shoppingList, section.title, item.id, setShoppingList)
        }
      >
        🗑
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    borderBottomWidth: 1,
  },
  bought: { textDecorationLine: "line-through", color: "gray" },
  notBought: { color: "black" },
  delete: { color: "red" },
});

export default ProductItem;
