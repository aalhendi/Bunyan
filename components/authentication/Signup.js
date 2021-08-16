import React, { useState } from "react";
import { Input, Icon, Center, Box, Button } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import { AuthBackground, AuthButtonText, AuthOther, AuthTitle } from "./styles";
import { Entypo } from "@expo/vector-icons";

const Singup = ({ navigation }) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 9 }}>
        <AuthBackground
          source={{
            uri: "https://previews.123rf.com/images/microone/microone1809/microone180900880/107816017-building-house-work-process-of-buildings-construction-and-machinery-flat-vector-concept-development-.jpg",
          }}
        />
      </View>

      <View style={{ flex: 10, marginTop: "5%" }}>
        <Center>
          <AuthTitle>Sign up</AuthTitle>
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
            <View style={{ marginBottom: 15 }}>
              <Input
                InputLeftElement={
                  <Icon as={<Entypo name="email" />} size="md" m={2} />
                }
                placeholder="email" // mx={4}
              />
            </View>
            <Button> Sign up</Button>
          </Box>
          <View>
            <AuthOther>already have an account?</AuthOther>
            <AuthButtonText onPress={() => navigation.navigate("Signin")}>
              Sign in
            </AuthButtonText>
          </View>
        </Center>
      </View>
    </View>
  );
};

export default Singup;
