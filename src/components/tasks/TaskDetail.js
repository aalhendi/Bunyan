//library imports
import React from "react";
import { ScrollView, Text } from "react-native";
import { observer } from "mobx-react";
//styles
import {
  SafeAreaView,
  TopNavigationBar,
  FlexView,
  BackIcon,
  TextTopNavigationBar,
  TopBarText,
} from "./styles";
const TaskDetail = ({ navigation, route }) => {
  const { task } = route.params;
  return (
    <SafeAreaView>
      <TopNavigationBar>
        <FlexView>
          <BackIcon
            name="chevron-back"
            size={35}
            onPress={() => navigation.goBack("TaskList")}
          />
        </FlexView>
        <TextTopNavigationBar>
          <TopBarText>Details</TopBarText>
        </TextTopNavigationBar>
        <FlexView />
      </TopNavigationBar>
      <ScrollView>
        <Text> {task.name}</Text>
        <Text> {task.description}</Text>
        <Text> {task.image}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default observer(TaskDetail);
