import { Box, Button, Input } from "native-base";
import React from "react";
import { View, Text } from "react-native";

const EditProfile = () => {
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
        <Button onPress={() => console.log("add first and last name")}>
          Continue
        </Button>
      </Box>
    </View>
  );
};

export default EditProfile;
