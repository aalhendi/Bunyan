/* Imports */
import React from "react";
import {
  ActivityText,
  ActivityView,
  CenteringElementStyled,
  HomeIconStyled,
  MainContainer,
  MainContainerText,
  NameText,
  TextTopNavigationBar,
  TopNavigationBar,
  WelcomeText,
  ScrollView,
  ActivityContainer,
  SafeAreaView,
  MenuIcon,
  HomeIcon,
  LogoutIcon,
  ProfileButton,
  FlexView,
} from "./styles";

/* State and Store */
import { observer } from "mobx-react";
import authStore from "../stores/authStore";
import { FlexView } from "./tasks/styles";

const Home = ({ navigation }) => {
  const handleSubmit = async () => {
    await authStore.logout();
    navigation.replace("Login");
  };

  return (
    <SafeAreaView>
      <CenteringElementStyled>
        <TopNavigationBar>
          <MenuIcon name="menu" size={25} />
          <TextTopNavigationBar>
            <WelcomeText> Welcome, </WelcomeText>
            <NameText>Hello</NameText>
          </TextTopNavigationBar>
          <FlexView>
            <LogoutIcon name="log-out" size={25} onPress={handleSubmit} />
            <ProfileButton
              name="face-profile"
              size={30}
              onPress={() => navigation.navigate("Profile")}
            />
          </FlexView>
        </TopNavigationBar>
        <MainContainer onPress={() => navigation.navigate("TaskList")}>
          <MainContainerText>Your Home</MainContainerText>
          <HomeIconStyled>
            <HomeIcon name="home" size={137.5} />
          </HomeIconStyled>
        </MainContainer>
        <ActivityView>
          <ActivityText>Activity</ActivityText>
          <ScrollView>
            <ActivityContainer></ActivityContainer>
            <ActivityContainer></ActivityContainer>
            <ActivityContainer></ActivityContainer>
            <ActivityContainer></ActivityContainer>
            <ActivityContainer></ActivityContainer>
            <ActivityContainer></ActivityContainer>
            <ActivityContainer></ActivityContainer>
            <ActivityContainer></ActivityContainer>
          </ScrollView>
        </ActivityView>
      </CenteringElementStyled>
    </SafeAreaView>
  );
};

export default observer(Home);
