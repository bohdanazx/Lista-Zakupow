import React, { useState } from "react";
import {
  View,
  Text,
  SectionList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = ({ shoppingList, setShoppingList }) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState(null);

  // Функція зміни статусу купленого товару
  const toggleBought = (sectionIndex, itemIndex) => {
    let newList = [...shoppingList];
    let item = newList[sectionIndex]?.data[itemIndex];

    if (!item) return;

    item.bought = !item.bought;

    if (item.bought) {
      newList[sectionIndex].data.splice(itemIndex, 1);
      newList[1].data.push(item);
    } else {
      newList[1].data.splice(newList[1].data.indexOf(item), 1);
      newList[0].data.unshift(item);
    }

    setShoppingList([...newList]);
  };

  // Функція видалення товару
  const removeProduct = (sectionTitle, itemId) => {
    console.log("🔍 Видалення продукту...");
    let newList = shoppingList.map((section) => {
      if (section.title === sectionTitle) {
        return {
          ...section,
          data: section.data.filter((item) => item.id !== itemId),
        };
      }
      return section;
    });
    setShoppingList(newList);
  };

  // Фільтрація за магазином
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
    <View style={styles.container}>
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
                shoppingList.findIndex((s) => s.title === section.title),
                section.data.findIndex((i) => i.id === item.id)
              )
            }
          >
            <Text style={item.bought ? styles.bought : styles.notBought}>
              {item.name} - {item.store} ({item.price} zł)
            </Text>
            <Text
              style={styles.delete}
              onPress={() => removeProduct(section.title, item.id)}
            >
              🗑
            </Text>
          </TouchableOpacity>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.header}>{title}</Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 30, // Відступ зверху для зручності
    paddingBottom: 50, // Відступ знизу для кнопки додавання
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
    padding: 15, // Збільшено відступ для гарного вигляду
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
