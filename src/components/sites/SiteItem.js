/* Imports */
import React from "react";

/* State and Store */
import { observer } from "mobx-react";

/* Styles */
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
