import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Home from "./src/components/Home";

import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";
import React, { useState, useEffect } from "react";

export default function App() {
  const [ready, setReady] = useState(false);
  const initialTodos = [];
  const [todo, setTodo] = useState(initialTodos);

  useEffect(() => {
    async function loadDataAndHideSplashScreen() {
      try {

        await SplashScreen.preventAutoHideAsync();

        await LoadTodos();
        await new Promise((resolve) => setTimeout(resolve, 1000));

        await SplashScreen.hideAsync();
      } catch (error) {
        console.error(error);
      } finally {
        setReady(true);
      }
    }

    loadDataAndHideSplashScreen();
  }, []);

  const LoadTodos = async () => {
    try {
      const storedTodos = await AsyncStorage.getItem("storedTodos");
      if (storedTodos !== null) {
        setTodo(JSON.parse(storedTodos));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {ready && <Home todo={todo} setTodo={setTodo} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#eafffd",
    flex: 1,
  },
});
