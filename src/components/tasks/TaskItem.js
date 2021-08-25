//library imports
import React from "react";
import { observer } from "mobx-react";
//styles
import {
  TaskContainer,
  ListItem,
  TaskText,
  TaskText1,
  TaskText3,
  TaskText2,
  TaskText0,
  TaskContainerDisabled,
} from "./styles";

const TaskItem = ({ task, navigation }) => {
  return (
    <ListItem>
      {task.status === 0 ? (
        <TaskContainer
          onPress={() => navigation.navigate("TaskDetail", { task: task })}
        >
          <TaskText>{task.name}</TaskText>
          <TaskText0>we are working on it</TaskText0>
        </TaskContainer>
      ) : task.status === 1 ? (
        <TaskContainerDisabled
          onPress={() => navigation.navigate("TaskDetail", { task: task })}
        >
          <TaskText>{task.name}</TaskText>
          <TaskText1>Waiting for Company Approval</TaskText1>
        </TaskContainerDisabled>
      ) : task.status === 2 ? (
        <TaskContainer
          onPress={() => navigation.navigate("TaskDetail", { task: task })}
        >
          <TaskText>{task.name}</TaskText>
          <TaskText2>Waiting for your Approval</TaskText2>
        </TaskContainer>
      ) : (
        <TaskContainer
          onPress={() => navigation.navigate("TaskDetail", { task: task })}
        >
          <TaskText>{task.name}</TaskText>
          <TaskText3>Job is Done</TaskText3>
        </TaskContainer>
      )}
    </ListItem>
  );
};

export default observer(TaskItem);
