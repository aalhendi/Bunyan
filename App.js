import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import React from "react";
import RootNavigation from "./src/components/navigation/Index";

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <RootNavigation />
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
