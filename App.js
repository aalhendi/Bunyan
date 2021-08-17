import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import React from "react";

import RootNavigator from "./src/components/navigation/Index";
import { ThemeProvider } from "styled-components";

const theme = {
  grey: "#eeeeee",
  white: "#ffffff",
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
