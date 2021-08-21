/* Imports */
import React from "react";
/* State and Store */
import { observer } from "mobx-react";
/* Styles */
import { TaskContainer, ListItem, TaskText } from "./styles";

const SiteItem = ({ client, navigation }) => {
  return (
    <ListItem>
      <TaskContainer
        onPress={() => navigation.navigate("TaskList", { client: client })}
      >
        <TaskText>{client.clientId}</TaskText>
      </TaskContainer>
    </ListItem>
  );
};

export default observer(SiteItem);
