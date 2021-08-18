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
} from "./styles";
import { Spinner } from "native-base";

/* State and Store */
import { observer } from "mobx-react";
import authStore from "../stores/authStore";
import profileStore from "../stores/profileStore";

const Home = ({ navigation }) => {
  const handleSubmit = async () => {
    await authStore.logout();
    navigation.replace("Login");
  };

  if (profileStore.loading) {
    return <Spinner />;
  }

  return (
    <SafeAreaView>
      <CenteringElementStyled>
        <TopNavigationBar>
          <MenuIcon name="menu" size={25} />
          <TextTopNavigationBar>
            <WelcomeText> Welcome, </WelcomeText>
            <NameText>
              {profileStore.profile.name ? (
                <>{`${profileStore.profile.name}`}</>
              ) : (
                <>{`${profileStore.profile.firstName} ${profileStore.profile.lastName}`}</>
              )}
            </NameText>
          </TextTopNavigationBar>
          <LogoutIcon name="log-out" size={25} onPress={handleSubmit} />
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
