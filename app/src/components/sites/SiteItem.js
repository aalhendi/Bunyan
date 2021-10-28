/* Imports */
import React from "react";
/* State and Store */
import { observer } from "mobx-react";
/* Styles */
import { TaskContainer, ListItem, TaskText } from "./styles";
import clientStore from "../../stores/clientStore";

const SiteItem = ({ contractSite, navigation }) => {
  //to get address name
  //TODO: it works, but do it better
  const client = clientStore.clients
    .filter((c) => c.id === contractSite.clientId)
    .map((c) => c);
  const object = { ...client };
  const address = object[0].address;

  return (
    <ListItem>
      <TaskContainer
        onPress={() => navigation.navigate("TaskList", { client: client })}
      >
        <TaskText>{address}</TaskText>
      </TaskContainer>
    </ListItem>
  );
};

export default observer(SiteItem);
