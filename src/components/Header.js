import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

export default function Header(props) {
  return (
    <View style={styles.HeaderContainer}>
      <Text style={styles.HeaderTitle}>Todo-List</Text>
      <TouchableOpacity onPress={() => props.handleDeleteConfirmation()}>
        <AntDesign name="delete" size={32} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  HeaderTitle: {
    fontSize: 32,
    fontWeight: "bold",
    fontFamily: "sans-serif-medium",
  },
  HeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    marginBottom: 10,
  },
});
