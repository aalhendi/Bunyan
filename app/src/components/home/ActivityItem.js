//library imports
import React from "react";
import { ActivityContainer, ActivityContainerText } from "./styles";
import { useNavigation } from "@react-navigation/native";

const ActivityItem = ({ task }) => {
  const navigation = useNavigation();

  return (
    <>
      <ActivityContainer
        onPress={() => navigation.navigate("TaskDetail", { task: task })}
      >
        <ActivityContainerText>{task.name}</ActivityContainerText>
      </ActivityContainer>
    </>
  );
};

export default ActivityItem;
