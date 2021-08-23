/*imports*/
import React from "react";
import { Text } from "react-native";
import { Button, Spinner } from "native-base";
import { observer } from "mobx-react";
/*Stores*/
import authStore from "../../stores/authStore";
/*Styles*/
import {
  SafeAreaView,
  TopNavigationBar,
  FlexView,
  TextTopNavigationBar,
  TopBarText,
  LogoutIcon,
  BackIcon,
} from "./styles";

const Profile = ({ navigation }) => {
  if (authStore.loading) return <Spinner />;

  const client = authStore.user;

  const handleSubmit = async () => {
    await authStore.logout();
    navigation.replace("Login");
  };

  const handleBack = () => {
    navigation.goBack("Home");
  };
  return (
    <SafeAreaView>
      <TopNavigationBar>
        <FlexView>
          <BackIcon name="chevron-back" size={35} onPress={handleBack} />
        </FlexView>
        <TextTopNavigationBar>
          <TopBarText>My Profile</TopBarText>
        </TextTopNavigationBar>
        <LogoutIcon name="log-out" size={25} onPress={handleSubmit} />
      </TopNavigationBar>
      <FlexView>
        <Text> {client.profile.firstName}</Text>
        <Text> {client.profile.lastName}</Text>
        <Text> {client.email}</Text>
        <Text> {client.phoneNumber}</Text>
        <Button onPress={() => navigation.navigate("EditProfile")}>EDIT</Button>
      </FlexView>
    </SafeAreaView>
  );
};

export default observer(Profile);
