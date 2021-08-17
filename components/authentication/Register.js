import React, { useState } from "react";
import { Input, Icon, Center, Box, Button } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import {
  AuthBackground,
  AuthButtonText,
  AuthOther,
  AuthTitle,
  AuthWhiteBackground,
} from "./styles";
import { Entypo } from "@expo/vector-icons";

const Register = ({ navigation }) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  return (
    <AuthBackground
      blurRadius={12.5}
      source={{
        uri: "https://previews.123rf.com/images/microone/microone1809/microone180900880/107816017-building-house-work-process-of-buildings-construction-and-machinery-flat-vector-concept-development-.jpg",
      }}
    >
      <Center style={{ flex: 1 }}>
        <AuthTitle>Register</AuthTitle>
        <Box w="80%">
          <View style={{ marginBottom: 10 }}>
            <Input
              InputLeftElement={
                <Icon as={<Ionicons name="person" />} size="md" m={2} />
              }
              placeholder="username" // mx={4}
            />
          </View>
          <View style={{ marginBottom: 10 }}>
            <Input
              type={show ? "text" : "password"}
              InputLeftElement={
                <Icon
                  as={
                    show ? (
                      <Ionicons name="eye-off" onPress={handleClick} />
                    ) : (
                      <Ionicons name="eye" onPress={handleClick} />
                    )
                  }
                  size="md"
                  m={2}
                />
              }
              placeholder="password" // mx={4}
            />
          </View>
          <View style={{ marginBottom: 10 }}>
            <Input
              InputLeftElement={
                <Icon as={<Entypo name="phone" />} size="md" m={2} />
              }
              placeholder="number" // mx={4}
            />
          </View>
          <View style={{ marginBottom: 10 }}>
            <Input
              InputLeftElement={
                <Icon as={<Entypo name="email" />} size="md" m={2} />
              }
              placeholder="email" // mx={4}
            />
          </View>
          <Button onPress={() => navigation.replace("Home")}>Register</Button>
        </Box>
        <AuthOther>already have an account?</AuthOther>
        <AuthButtonText onPress={() => navigation.navigate("Login")}>
          Log in
        </AuthButtonText>
      </Center>
    </AuthBackground>
  );
};

export default Register;
