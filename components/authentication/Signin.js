import React, { useState } from "react";
import { Input, Icon, Center, Box, Button } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import { AuthButtonText, AuthOther, AuthTitle } from "./styles";

const Signin = ({ navigation }) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  return (
    <Center flex={1}>
      <AuthTitle>Sign in</AuthTitle>
      <View style={{ position: "absolute" }}>
        <View style={{ zIndex: 1 }}></View>
        <View style={{ zIndex: 0, position: "absolute" }} />
      </View>
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
        <Button> Sign in</Button>
      </Box>
      <View>
        <AuthOther>don't have an account?</AuthOther>
        <AuthButtonText onPress={() => navigation.navigate("Signup")}>
          Sign up
        </AuthButtonText>
      </View>
    </Center>
  );
};

export default Signin;
