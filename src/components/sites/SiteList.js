//library imports
import React from "react";
import { Spinner } from "native-base";
import { observer } from "mobx-react";
import { ScrollView } from "react-native";
//components
import SiteItem from "./SiteItem";
//stores
import clientStore from "../../stores/clientStore";
import authStore from "../../stores/authStore";
//styles
import { LogoutIcon } from "../styles";
import {
  SafeAreaView,
  TopNavigationBar,
  FlexView,
  TextTopNavigationBar,
  TopBarText,
  ListItemContainer,
} from "./styles";

const SiteList = ({ navigation }) => {
  if (clientStore.loading) return <Spinner />;

  const siteList = clientStore.statuses
    .filter((client) => client.companyId === authStore.user?.profile.companyId)
    .map((client) => (
      <SiteItem client={client} key={client.clientId} navigation={navigation} />
    ));

  const handleSubmit = async () => {
    await authStore.logout();
    navigation.replace("Login");
  };

  return (
    <SafeAreaView>
      <TopNavigationBar>
        <TextTopNavigationBar>
          <TopBarText>Sites</TopBarText>
          <LogoutIcon name="log-out" size={25} onPress={handleSubmit} />
        </TextTopNavigationBar>
        <FlexView />
      </TopNavigationBar>
      <ScrollView>
        <ListItemContainer>{siteList}</ListItemContainer>
      </ScrollView>
    </SafeAreaView>
  );
};

export default observer(SiteList);
