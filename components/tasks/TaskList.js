//library imports
import React from "react";
import { Spinner } from "native-base";
import { observer } from "mobx-react";
import { ScrollView, Text } from "react-native";
//components
import TaskItem from "./TaskItem";
//stores
import taskStore from "../../stores/taskStore";
// import authStore from "../../stores/authStore";
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
  const taskList = taskStore.tasks.map((task) => (
    <TaskItem task={task} key={task.id} navigation={navigation} />
  ));
  //   .filter((task) => task.userId !== authStore.user?.id)
  return (
    <SafeAreaView>
      <TopNavigationBar>
        <FlexView>
          <BackIcon
            name="chevron-back"
            size={35}
            onPress={() => navigation.goBack("Home")}
          />
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
