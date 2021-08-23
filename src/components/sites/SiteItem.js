/* Imports */
import React from "react";
/* State and Store */
import { observer } from "mobx-react";
/* Styles */
import { TaskContainer, ListItem, TaskText } from "./styles";

const SiteItem = ({ contractSite, navigation }) => {
  return (
    <ListItem>
      <TaskContainer onPress={() => navigation.navigate("TaskList")}>
        <TaskText>{contractSite.clientId}</TaskText>
      </TaskContainer>
    </ListItem>
  );
};

export default observer(SiteItem);
