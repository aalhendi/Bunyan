import { Box, Button, Input } from "native-base";
import React, { useState } from "react";
import { View, Text } from "react-native";
import authStore from "../../stores/authStore";

const EditProfile = ({ navigation }) => {
  const [user, setUser] = useState({
    firstName: "",
    LastName: "",
  });

  handleNavigate = () => {
    authStore.user.email.endsWith("@worker.com")
      ? navigation.replace("SiteList")
      : navigation.replace("Home");
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 30 }}>EditProfile</Text>
      <Box w="80%">
        <View style={{ marginBottom: 10 }}>
          <Input
            placeholder="first name" // mx={4}
            onChangeText={(firstName) => setUser({ ...user, firstName })}
          />
        </View>
        <View style={{ marginBottom: 10 }}>
          <Input
            placeholder="last name" // mx={4}
            onChangeText={(lastName) => setUser({ ...user, lastName })}
          />
        </View>
        <Button onPress={handleNavigate}>Continue</Button>
      </Box>
    </View>
  );
};

export default EditProfile;
