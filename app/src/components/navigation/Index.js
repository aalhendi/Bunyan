/* Imports */
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

/* Components */
import Login from "../authentication/Login";
import Register from "../authentication/Register";
import Home from "../home/Home";
import CategoryList from "../categories/CategoryList";
import EditProfile from "../profile/EditProfile";
import TaskList from "../tasks/TaskList";
import TaskDetail from "../tasks/TaskDetail";
import SiteList from "../sites/SiteList";
import Profile from "../profile/Profile";

/* State and Store */
import { observer } from "mobx-react";

const Stack = createStackNavigator();

const RootNavigator = () => {
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
        name="EditProfile"
        component={EditProfile}
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
      <Stack.Screen
        name="TaskList"
        component={TaskList}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SiteList"
        component={SiteList}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default observer(RootNavigator);
