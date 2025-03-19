import React, { useState } from "react";
import { Modal, View, TextInput, Button, StyleSheet } from "react-native";

const AddProductModal = ({ visible, onClose, onAdd }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [store, setStore] = useState("");

  const handleAdd = () => {
    if (!name || !price || !store) return;
    onAdd({
      id: Date.now().toString(),
      name,
      price: parseFloat(price),
      store,
      bought: false,
    });
    setName("");
    setPrice("");
    setStore("");
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.modal}>
        <TextInput
          placeholder="Nazwa produktu"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <TextInput
          placeholder="Cena"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
          style={styles.input}
        />
        <TextInput
          placeholder="Sklep"
          value={store}
          onChangeText={setStore}
          style={styles.input}
        />
        <Button title="Dodaj" onPress={handleAdd} />
        <Button title="Anuluj" onPress={onClose} color="red" />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: { flex: 1, justifyContent: "center", padding: 20 },
  input: { borderWidth: 1, padding: 10, marginVertical: 5 },
});

export default AddProductModal;
