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
import taskStore from "../../stores/taskStore";
//styles
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
  console.log(unique);
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

  return (
    <SafeAreaView>
      <TopNavigationBar>
        <TextTopNavigationBar>
          <TopBarText>Sites</TopBarText>
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
