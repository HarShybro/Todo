import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

export default function InputModal({
  modalVisible,
  setModalVisible,
  todoInputValue,
  setTodoInputValue,
  handleAddTodo,
  todo,
  setTodoEdited,
  handleEditTodo,
  todoEdited,
}) {
  const today = new Date();
  const formattedDate = `${today.toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })} ${today.toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata" })}`;

  const handleCloseModal = () => {
    setModalVisible(false);
    setTodoInputValue("");
    setTodoEdited(null);
  };

  const handleSubmit = () => {
    if (!todoEdited) {
      handleAddTodo({
        title: todoInputValue,
        date: formattedDate,
        key: `${
          (todo[todo.length - 1] && parseInt(todo[todo.length - 1].key) + 1) ||
          1
        }`,
      });
    } else {
      handleEditTodo({
        title: todoInputValue,
        date: todoEdited.date,
        key: todoEdited.key,
      });
    }

    setTodoInputValue("");
  };
  return (
    <View
      style={{
        position: "absolute",
        bottom: 18,
        right: 18,
      }}
    >
      <TouchableOpacity
        style={{
          backgroundColor: "#848ccf",
          padding: 12,
          borderRadius: 28,
          width: 74,
          height: 74,
        }}
        onPress={() => setModalVisible(true)}
      >
        <AntDesign name="plus" size={50} color={"white"} />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <View
            style={{
              width: "90%",
              height: "50%",
              borderColor: "white",
              backgroundColor: "#93b5e1",
              borderWidth: 2,
              borderRadius: 20,
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <View>
              <AntDesign name="edit" size={30} color="white" />
            </View>
            <TextInput
              placeholder="Add a todo"
              placeholderTextColor={"#f1efe3"}
              selectionColor={"#6b5e62"}
              autoFocus={true}
              onChangeText={(text) => setTodoInputValue(text)}
              value={todoInputValue}
              onSubmitEditing={handleSubmit}
              style={styles.modalInputText}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={{
                  backgroundColor: "#848ccf",
                  padding: 18,
                  borderRadius: 24,
                  width: 64,
                  height: 64,
                }}
                onPress={() => handleCloseModal()}
              >
                <AntDesign name="close" size={28} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: "#848ccf",
                  borderRadius: 24,
                  width: 64,
                  height: 64,
                  padding: 18,
                }}
                onPress={() => handleSubmit()}
              >
                <AntDesign name="check" size={28} color="white" />
                <AntDesign />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "lightblue",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  modalInputText: {
    width: "90%",
    height: "20%",
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "white",
    fontSize: 20,
    color: "#f1efe3",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 20,
  },
});
