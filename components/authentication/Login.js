import React, { useState } from "react";
import { Input, Icon, Center, Box, Button } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import { AuthBackground, AuthButtonText, AuthOther, AuthTitle } from "./styles";

const Login = ({ navigation }) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  return (
    <AuthBackground
      blurRadius={12.5}
      source={{
        uri: "https://previews.123rf.com/images/microone/microone1809/microone180900880/107816017-building-house-work-process-of-buildings-construction-and-machinery-flat-vector-concept-development-.jpg",
      }}
    >
      <Center style={{ flex: 5 }}>
        <AuthTitle>Log in</AuthTitle>
        <Box w="80%">
          <View style={{ marginBottom: 15 }}>
            <Input
              InputLeftElement={
                <Icon as={<Ionicons name="person" />} size="md" m={2} />
              }
              placeholder="username" // mx={4}
            />
          </View>
          <View style={{ marginBottom: 15 }}>
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
          <Button onPress={() => navigation.replace("Home")}>Log in</Button>
        </Box>
        <AuthOther>don't have an account?</AuthOther>
        <AuthButtonText onPress={() => navigation.navigate("Register")}>
          Register
        </AuthButtonText>
      </Center>
    </AuthBackground>
  );
};

export default Login;
