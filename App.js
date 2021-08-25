/* Imports*/
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import RootNavigator from "./src/components/navigation/Index";
import { ThemeProvider } from "styled-components";
import { LogBox } from "react-native";

LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const theme = {
  grey: "#eeeeee",
  white: "#ffffff",
  blue: "#5588A3",
  green: "#00bc2c",
};
export default function App() {
  return (
    <NativeBaseProvider>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </ThemeProvider>
    </NativeBaseProvider>
  );
}
