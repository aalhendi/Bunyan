import React from "react";
import { View, SafeAreaView, Text } from "react-native";
import { AuthTitle, style } from "./styles";
import { Ionicons } from "@expo/vector-icons";
const CategoryList = ({ navigation }) => {
  return (
    // <SafeAreaView style={{ flex: 1 }}>
    //   <View
    //     style={{
    //       flex: 1,
    //       flexDirection: "row",
    //       paddingHorizontal: "4%",
    //     }}
    //   >
    //     <View style={{ flex: 1 }}>
    //       <Ionicons
    //         name="chevron-back"
    //         size={40}
    //         color="#5588A3"
    //         onPress={() => navigation.goBack("Home")}
    //       />
    //     </View>

    //     <View style={(style.mainView, { flex: 1 })}>
    //       <View style={style.header}>
    //         <AuthTitle> Category </AuthTitle>
    //       </View>
    //     </View>
    //     <View style={{ flex: 1 }}></View>
    //   </View>
    // </SafeAreaView>
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
      </View>
    </SafeAreaView>
  );
};

export default CategoryList;
