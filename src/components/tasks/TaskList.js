//library imports
import React from "react";
import { Spinner } from "native-base";
import { observer } from "mobx-react";
import { ScrollView, Text } from "react-native";
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
  CenterView,
  TopNavigationBar,
  FlexView,
  BackIcon,
  TextTopNavigationBar,
  TopBarText,
  ListItemContainer,
} from "./styles";

const TaskList = ({ navigation }) => {
  if (taskStore.loading) return <Spinner />;

  const workers = workerStore.workers
    .filter((worker) => worker.userId === authStore.user?.id)
    .map((worker) => worker);
  const worker = Object.assign({}, ...workers);

  const clients = clientStore.clients
    .filter((client) => client.userId === authStore.user?.id)
    .map((client) => client);
  const client = Object.assign({}, ...clients);

  const taskList = authStore.user.email.endsWith("@worker.com")
    ? taskStore.tasks
        .filter((task) => task.workerId === worker?.id)
        .map((task) => (
          <TaskItem task={task} key={task.id} navigation={navigation} />
        ))
    : taskStore.tasks
        .filter((task) => task.clientId === client?.id)
        .map((task) => (
          <TaskItem task={task} key={task.id} navigation={navigation} />
        ));

  //   .filter((task) => task.userId !== authStore.user?.id)
  return (
    <SafeAreaView>
      <TopNavigationBar>
        <FlexView>
          {authStore.user.email.endsWith("@worker.com") ? (
            <BackIcon
              name="chevron-back"
              size={35}
              onPress={() => navigation.goBack("SiteList")}
            />
          ) : (
            <BackIcon
              name="chevron-back"
              size={35}
              onPress={() => navigation.goBack("Home")}
            />
          )}
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
