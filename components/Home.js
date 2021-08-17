import React from "react";
import { observer } from "mobx-react";
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
} from "./styles";

const Home = ({ navigation }) => {
  return (
    <SafeAreaView>
      <CenteringElementStyled>
        <TopNavigationBar>
          <MenuIcon name="menu" size={25} />
          <TextTopNavigationBar>
            <WelcomeText> Welcome, </WelcomeText>
            <NameText> Mohammad Alzamami </NameText>
          </TextTopNavigationBar>
        </TopNavigationBar>
        <MainContainer onPress={() => navigation.navigate("CategoryList")}>
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
