/* Imports */
import React from "react";
import { Spinner } from "native-base";
import { ScrollView } from "react-native";

/* Components */
import SiteItem from "./SiteItem";

/* State and Store */
import { observer } from "mobx-react";
import clientStore from "../../stores/clientStore";
import authStore from "../../stores/authStore";
import taskStore from "../../stores/taskStore";

/* Styles */
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

  const oneTask = taskStore.tasks.map((task) => task.clientId);

  const unique = [...new Set(oneTask)];
  //   const task = Object.assign({}, ...tasks);

  const clients = clientStore.clients
    .filter((client) => client.userId === authStore.user?.id)
    .map((client) => client);
  const client = Object.assign({}, ...clients);

  const siteList = clientStore.clients
    .filter((site) => site.clientId === client?.id)
    .map((site) => (
      <SiteItem site={site} key={site.id} navigation={navigation} />
    ));

  //   const workers = workerStore.workers
  //     .filter((worker) => worker.userId === authStore.user?.id)
  //     .map((worker) => worker);
  //   const worker = Object.assign({}, ...workers);

  //   const siteList = authStore.user.email.endsWith("@worker.com")
  //     ? clientStore.clients
  //         .filter((site) => site.workerId === worker?.id)
  //         .map((site) => (
  //           <TaskItem site={site} key={site.id} navigation={navigation} />
  //         ))
  //     : clientStore.clients.map((site) => (
  //         <TaskItem site={site} key={site.id} navigation={navigation} />
  //       ));

  //   .filter((task) => task.userId !== authStore.user?.id)

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
