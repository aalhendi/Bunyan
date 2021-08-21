/* Imports */
import { Box, Button, Input, Spinner } from "native-base";
import React, { useState } from "react";
import { View, Text } from "react-native";

/* State and Store */
import authStore from "../../stores/authStore";
import profileStore from "../../stores/profileStore";
import { observer } from "mobx-react";

const EditProfile = ({ navigation }) => {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
  });

  if (authStore.loading) {
    return <Spinner />;
  }

  const handleSubmit = async () => {
    await profileStore.updateProfile(profile);
    navigation.replace("Home");
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
            onChangeText={(firstName) => setProfile({ ...profile, firstName })}
          />
        </View>
        <View style={{ marginBottom: 10 }}>
          <Input
            placeholder="last name" // mx={4}
            onChangeText={(lastName) => setProfile({ ...profile, lastName })}
          />
        </View>
        <Button onPress={handleSubmit}>Continue</Button>
      </Box>
    </View>
  );
};

export default observer(EditProfile);
