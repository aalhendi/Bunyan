import React from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather, AntDesign } from "@expo/vector-icons";
import { observer } from "mobx-react";
import { style } from "./styles";

const Home = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          width: "100%",
          alignItems: "center",
        }}
      >
        <View style={style.mainView}>
          <Feather name="menu" size={25} color="#5588A3" />
          <View style={style.header}>
            <Text style={style.welcomeText}> Welcome, </Text>
            <Text style={style.nameText}> Mohammad Alzamami </Text>
          </View>
        </View>
        <TouchableOpacity
          style={style.mainContainer}
          onPress={() => navigation.navigate("CategoryList")}
        >
          <Text style={style.mainText}>Your Home</Text>
          <View style={style.homeIconStyled}>
            <AntDesign name="home" size={137.5} color="white" />
          </View>
        </TouchableOpacity>
        <View style={style.activityView}>
          <Text style={style.activityTextStyled}>Activity</Text>
          <ScrollView style={style.scrollView}>
            <View style={style.tryContainer}></View>
            <View style={style.tryContainer}></View>
            <View style={style.tryContainer}></View>
            <View style={style.tryContainer}></View>
            <View style={style.tryContainer}></View>
            <View style={style.tryContainer}></View>
            <View style={style.tryContainer}></View>
            <View style={style.tryContainer}></View>
            <View style={style.tryContainer}></View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default observer(Home);
