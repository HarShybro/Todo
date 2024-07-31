import {
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SwipeListView } from "react-native-swipe-list-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from "@expo/vector-icons";

export default function List({ todo, setTodo, handleTriggerEdit }) {
  const [swipedRow, setSwipedRow] = useState(null);

  const handleDeleteTodo = async (rowMap, rowkey) => {
    const newTodos = [...todo];
    const todoIndex = todo.findIndex((todo) => todo.key === rowkey);
    newTodos.splice(todoIndex, 1);

    try {
      await AsyncStorage.setItem("storedTodos", JSON.stringify(newTodos));
      setTodo(newTodos);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {todo.length == 0 ? (
        <Text
          style={{
            paddingHorizontal: 10,
            fontSize: 26,
            color: "gray",
            fontWeight: "bold",
          }}
        >
          No Todo
        </Text>
      ) : (
        <SwipeListView
          data={todo}
          renderItem={(data) => {
            const overline =
              data.item.key === swipedRow
                ? styles.swipedTodoText
                : styles.todoText;
            return (
              <TouchableHighlight
                style={styles.listContainer}
                underlayColor="#848ccf"
                onPress={() => handleTriggerEdit(data.item)}
              >
                <>
                  <Text style={[styles.listTitle, overline]}>
                    {data.item.title}
                  </Text>

                  <Text style={styles.listTime}>{data.item.date}</Text>
                </>
              </TouchableHighlight>
            );
          }}
          renderHiddenItem={(data, rowMap) => {
            return (
              <View
                style={{
                  flex: 1,
                  backgroundColor: "#d5cad6",
                  marginBottom: 10,
                  borderRadius: 20,
                  justifyContent: "center",
                }}
              >
                <TouchableOpacity
                  style={styles.deletebtn}
                  onPress={() => handleDeleteTodo(rowMap, data.item.key)}
                >
                  <AntDesign name="delete" size={32} color="black" />
                </TouchableOpacity>
              </View>
            );
          }}
          leftOpenValue={80}
          previewRowKey="1"
          previewOpenValue={80}
          previewOpenDelay={1000}
          disableLeftSwipe={true}
          showsVerticalScrollIndicator={false}
          onRowOpen={(rowkey) => {
            setSwipedRow(rowkey);
          }}
          onRowClose={() => {
            setSwipedRow(null);
          }}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: "#93b5e1",
    padding: 15,
    borderRadius: 20,
    gap: 10,
    marginBottom: 10,
  },
  listTitle: {
    width: "90%",
    fontSize: 22,
    fontFamily: "sans-serif-medium",
  },
  listTime: {
    fontSize: 12,
    fontWeight: "600",
    textAlign: "right",
  },
  deletebtn: {
    paddingLeft: 20,
  },
  swipedTodoText: {
    textDecorationLine: "line-through",
    color: "gray",
    textDecorationColor: "gray",
    textDecorationStyle: "dotted",
  },
  todoText: {
    textDecorationLine: "none",
  },
});
