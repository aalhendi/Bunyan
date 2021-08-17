//library imports
import React from "react";
import { observer } from "mobx-react";
//styles
import { TaskContainer, ListItem, TaskText } from "./styles";

const TaskItem = ({ task, navigation }) => {
  return (
    <ListItem>
      <TaskContainer
        onPress={() => navigation.navigate("TaskDetail", { task: task })}
      >
        <TaskText>{task.name}</TaskText>
      </TaskContainer>
    </ListItem>
  );
};

export default observer(TaskItem);
