/* Imports */
import React from "react";
/*Components*/
import ActivityList from "./ActivityList";
/*Styles*/
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
  SafeAreaView,
  HomeIcon,
  LogoutIcon,
  ProfileButton,
  FlexView,
} from "./styles";

/* State and Store */
import { observer } from "mobx-react";
import authStore from "../../stores/authStore";
import taskStore from "../../stores/taskStore";
import clientStore from "../../stores/clientStore";
import { Spinner } from "native-base";
import { FlatList, View } from "react-native";

const Home = ({ navigation }) => {
  if (taskStore.loading || clientStore.loading) return <Spinner />;

  const handleSubmit = async () => {
    await authStore.logout();
    navigation.replace("Login");
  };
  return (
    <SafeAreaView>
      <CenteringElementStyled>
        <TopNavigationBar>
          <FlexView />
          <TextTopNavigationBar>
            <WelcomeText> Welcome, </WelcomeText>
            <NameText>
              {`${authStore.user?.profile.firstName} ${authStore.user?.profile.lastName}`}
            </NameText>
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
            <ActivityList />
          </ScrollView>
        </ActivityView>
      </CenteringElementStyled>
    </SafeAreaView>
  );
};

export default observer(Home);
