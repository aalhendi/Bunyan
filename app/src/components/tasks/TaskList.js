//library imports
import React from "react";
import { Spinner, View, Text } from "native-base";
import { observer } from "mobx-react";
import { ScrollView } from "react-native";
//components
import TaskItem from "./TaskItem";
//stores
import taskStore from "../../stores/taskStore";
import authStore from "../../stores/authStore";
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
  if (taskStore.loading || clientStore.loading) return <Spinner />;

  //to compare clientId with client.id
  //TODO: works for now, but make it better
  const { client } = authStore.user?.email.endsWith("@worker.com")
    ? route.params
    : "";
  const clientObject = { ...client };
  const taskListWaitingWorker = authStore.user?.email.endsWith("@worker.com")
    ? taskStore.tasks
        //filter by clientId for specific site => so I dont get all tasks for each site I enter
        .filter((task) => task.contract.clientId === clientObject[0].id)
        .filter((task) => task.status === 0)
        .map((task) => (
          <TaskItem task={task} key={task.id} navigation={navigation} />
        ))
    : taskStore.tasks.map((task) => (
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
        <ListItemContainer>{taskListWaitingWorker}</ListItemContainer>
      </ScrollView>
    </SafeAreaView>
  );
};
//comment
export default observer(TaskList);
