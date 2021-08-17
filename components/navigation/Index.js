import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "../authentication/Login";
import Register from "../authentication/Register";
import Home from "../Home";
import CategoryList from "../categories/CategoryList";
import TaskList from "../tasks/TaskList";
import TaskDetail from "../tasks/TaskDetail";

const Stack = createStackNavigator();

export default RootNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#5588A3",
        },
        headerTintColor: "white",
      }}
    >
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CategoryList"
        component={CategoryList}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="TaskList"
        component={TaskList}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="TaskDetail"
        component={TaskDetail}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
