import React, { useState } from "react";
import {
  View,
  Text,
  SectionList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { toggleBought, removeProduct } from "../utils/shoppingListUtils";

const HomeScreen = ({ shoppingList, setShoppingList }) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState(null);

  const applyFilter = (store) => setFilter(store);
  const clearFilter = () => setFilter(null);

  const stores = [
    ...new Set(
      shoppingList.flatMap((section) => section.data.map((item) => item.store))
    ),
  ];

  const filteredList = shoppingList.map((section) => ({
    ...section,
    data: section.data.filter((item) => {
      return (
        item.name.toLowerCase().includes(search.toLowerCase()) &&
        (!filter || item.store === filter)
      );
    }),
  }));

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TextInput
        style={styles.search}
        placeholder="🔍 Wyszukaj produkt..."
        value={search}
        onChangeText={setSearch}
      />

      <View style={styles.filterContainer}>
        {stores.map((store, index) => (
          <Text
            key={index}
            style={styles.filterButton}
            onPress={() => applyFilter(store)}
          >
            Filtruj: {store}
          </Text>
        ))}
        <Text style={styles.clearFilter} onPress={clearFilter}>
          Wyczyść filtr
        </Text>
      </View>

      <SectionList
        sections={filteredList}
        keyExtractor={(item) => item.id}
        renderItem={({ item, section }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() =>
              toggleBought(
                shoppingList,
                section.title,
                item.id,
                setShoppingList
              )
            }
          >
            <Text style={item.bought ? styles.bought : styles.notBought}>
              {item.name} - {item.store} ({item.price} zł)
            </Text>
            <Text
              style={styles.delete}
              onPress={() =>
                removeProduct(
                  shoppingList,
                  section.title,
                  item.id,
                  setShoppingList
                )
              }
            >
              🗑
            </Text>
          </TouchableOpacity>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.header}>{title}</Text>
        )}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: Platform.OS === "ios" ? 50 : 30, // Відступ зверху для статус-бара
    paddingBottom: 80, // Відступ знизу для кнопки додавання
    backgroundColor: "#fff",
  },
  search: {
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  filterContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 10,
  },
  filterButton: {
    color: "blue",
    marginHorizontal: 5,
  },
  clearFilter: {
    color: "red",
    marginHorizontal: 5,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 5,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    borderBottomWidth: 1,
  },
  bought: {
    textDecorationLine: "line-through",
    color: "gray",
  },
  notBought: {
    color: "black",
  },
  delete: {
    color: "red",
  },
});

export default HomeScreen;
