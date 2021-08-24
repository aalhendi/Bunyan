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
import { LogoutIcon } from "../home/styles";
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

  const siteList = clientStore.contracts
    //filter by companyId => to only see the contracts of my company
    .filter(
      (contract) => contract.companyId === authStore.user?.profile.companyId
    )
    //filter by workerId => to only see the contracts Im assigned to
    .filter((contract) => contract.workerId === authStore.user?.profile.id)
    .map((contractSite) => (
      <SiteItem
        contractSite={contractSite}
        key={contractSite.clientId}
        navigation={navigation}
      />
    ));

  const handleSubmit = async () => {
    await authStore.logout();
    navigation.replace("Login");
  };

  return (
    <SafeAreaView>
      <TopNavigationBar>
        <FlexView />
        <TextTopNavigationBar>
          <TopBarText>Sites</TopBarText>
        </TextTopNavigationBar>
        <LogoutIcon name="log-out" size={25} onPress={handleSubmit} />
      </TopNavigationBar>
      <ScrollView>
        <ListItemContainer>{siteList}</ListItemContainer>
      </ScrollView>
    </SafeAreaView>
  );
};

export default observer(SiteList);
