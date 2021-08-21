//library imports
import React from "react";
import { Spinner } from "native-base";
import { observer } from "mobx-react";
import { ScrollView } from "react-native";
//components
import TaskItem from "./TaskItem";
//stores
import taskStore from "../../stores/taskStore";
import authStore from "../../stores/authStore";
import workerStore from "../../stores/workerStore";
import clientStore from "../../stores/clientStore";
//styles
import {
  SafeAreaView,
  TopNavigationBar,
  FlexView,
  BackIcon,
  TextTopNavigationBar,
  TopBarText,
  ListItemContainer,
} from "./styles";

const TaskList = ({ navigation, route }) => {
  if (taskStore.loading) return <Spinner />;

  const client = authStore.user.email.endsWith("@worker.com")
    ? route.params.client
    : clientStore.statuses
        .filter(
          (client) => client.companyId === authStore.user?.profile.companyId
        )
        .map((client) => client);

  const workers = workerStore.workers
    .filter((worker) => worker.userId === authStore.user?.id)
    .map((worker) => worker);
  const worker = Object.assign({}, ...workers);

  const taskList = authStore.user.email.endsWith("@worker.com")
    ? taskStore.tasks
        .filter((task) => task.workerId === worker?.id)
        .filter((task) => task.clientId === client.clientId)
        .map((task) => (
          <TaskItem task={task} key={task.id} navigation={navigation} />
        ))
    : taskStore.tasks
        .filter((task) => task.clientId === authStore.user.profile.userId)
        .map((task) => (
          <TaskItem task={task} key={task.id} navigation={navigation} />
        ));

  const handleBack = () => {
    authStore.user.profile.companyId !== null
      ? navigation.goBack("SiteList")
      : navigation.goBack("Home");
  };
  return (
    <SafeAreaView>
      <TopNavigationBar>
        <FlexView>
          <BackIcon name="chevron-back" size={35} onPress={handleBack} />
        </FlexView>
        <TextTopNavigationBar>
          <TopBarText>Tasks</TopBarText>
        </TextTopNavigationBar>
        <FlexView />
      </TopNavigationBar>
      <ScrollView>
        <ListItemContainer>{taskList}</ListItemContainer>
      </ScrollView>
    </SafeAreaView>
  );
};

export default observer(TaskList);
