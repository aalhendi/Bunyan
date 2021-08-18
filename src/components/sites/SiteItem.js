//library imports
import React from "react";
import { observer } from "mobx-react";
//styles
import { TaskContainer, ListItem, TaskText } from "./styles";

const SiteItem = ({ site, navigation }) => {
  return (
    <ListItem>
      <TaskContainer onPress={() => navigation.navigate("TaskList")}>
        <TaskText>{site.firstName}</TaskText>
      </TaskContainer>
    </ListItem>
  );
};

export default observer(SiteItem);
