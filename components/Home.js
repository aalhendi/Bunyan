import React from "react";
import { SafeAreaView, StatusBar, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { observer } from "mobx-react";
import { style } from "./styles";

const Home = () => {
  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <StatusBar
        translucent={false}
        backgroundColor="white"
        barStyle="dark-content"
      />
      <View style={style.mainView}>
        <View>
          <Feather name="menu" size={25} color="#5588A3" />
        </View>
        <View style={style.header}>
          <Text style={style.welcomeText}> Welcome, </Text>
          <Text style={style.nameText}> Mohammad Alzamami </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default observer(Home);
