import { View, Text, StatusBar, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import Header from "./Header";
import List from "./List";
import InputModal from "./InputModal";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home({ todo, setTodo }) {
  // const [todo, setTodo] = useState(initialTodos);
  const [modalVisible, setModalVisible] = useState(false);
  const [todoInputValue, setTodoInputValue] = useState();

  const handleAllDelete = () => {
    AsyncStorage.setItem("storedTodos", JSON.stringify([]))
      .then(() => {
        setTodo([]);
      })
      .catch((err) => console.error());
  };

  const handleDeleteConfirmation = () => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete all todos?",
      [
        { text: "Cancel", onPress: () => {}, style: "cancel" },
        { text: "Delete", onPress: handleAllDelete },
      ]
    );
  };

  const handleAddTodo = async (todos) => {
    const newTodos = [...todo, todos];
    try {
      await AsyncStorage.setItem("storedTodos", JSON.stringify(newTodos));
      setTodo(newTodos);
      setModalVisible(false);
    } catch (err) {
      console.error(err);
    }
  };

  const [todoEdited, setTodoEdited] = useState(null);

  const handleTriggerEdit = (item) => {
    // console.log(item);
    setTodoEdited(item);
    setModalVisible(true);
    setTodoInputValue(item.title);
  };

  const handleEditTodo = (editedTodo) => {
    const newTodos = [...todo];
    const todoIndex = todo.findIndex((item) => item.key === editedTodo.key);
    newTodos.splice(todoIndex, 1, editedTodo);

    AsyncStorage.setItem("storedTodos", JSON.stringify(newTodos))
      .then(() => {
        setTodo(newTodos);
        setTodoEdited(null);
        setModalVisible(false);
      })
      .catch((err) => console.error());
  };

  return (
    <View style={styles.Container}>
      <StatusBar barStyle={"dark-content"} backgroundColor={"#cdebf4"} />
      <Header handleDeleteConfirmation={handleDeleteConfirmation} />
      <List
        todo={todo}
        setTodo={setTodo}
        handleTriggerEdit={handleTriggerEdit}
      />
      <InputModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        todoInputValue={todoInputValue}
        setTodoInputValue={setTodoInputValue}
        handleAddTodo={handleAddTodo}
        todoEdited={todoEdited}
        setTodoEdited={setTodoEdited}
        todo={todo}
        handleEditTodo={handleEditTodo}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    paddingHorizontal: 10,
    flex: 1,
  },
});
