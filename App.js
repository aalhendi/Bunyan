import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider, Button } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";
import RootNavigator from "./components/navigation/Index";

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  fixToText: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  space: {
    width: 20, // or whatever size you need
    height: 20,
  },
});
