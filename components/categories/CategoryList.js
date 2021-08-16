import React from "react";
import { View, SafeAreaView, Text, ScrollView } from "react-native";
import { style } from "./styles";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import CircularProgress from "react-native-circular-progress-indicator";
import { Center } from "native-base";

const x = 90;
const CategoryList = ({ navigation }) => {
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
          <View style={{ flex: 1 }}>
            <Ionicons
              name="chevron-back"
              size={35}
              color="#5588A3"
              onPress={() => navigation.goBack("Home")}
            />
          </View>
          <View style={style.header}>
            <Text style={style.welcomeText}>Category</Text>
          </View>
          <View style={{ flex: 1 }} />
        </View>
        <ScrollView
          style={{
            flex: 1,
            width: "100%",
          }}
        >
          <View style={style.card}>
            <View
              style={{
                paddingLeft: "3%",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <FontAwesome name="snowflake-o" size={50} color="black" />
              <Text
                style={{ paddingLeft: "5%", fontSize: 50, fontWeight: "400" }}
              >
                A/C
              </Text>
              <View style={{ flex: 1 }} />
              <Center style={{ marginRight: "5%" }}>
                <CircularProgress
                  value={x}
                  valuePrefix={"%"}
                  inActiveStrokeColor={"grey"}
                  inActiveStrokeOpacity={0.25}
                  activeStrokeColor={"#5588A3"}
                />
              </Center>
            </View>
            <View
              style={{
                paddingTop: "3%",
                paddingBottom: "3%",
                paddingLeft: "3%",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 50,
                  backgroundColor: "grey",
                }}
              />
              <Text
                style={{
                  paddingLeft: "3%",
                  fontSize: 17.5,
                  fontWeight: "300",
                }}
              >
                Al Ghanim Industries
              </Text>
              {/* </View> */}
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default CategoryList;
