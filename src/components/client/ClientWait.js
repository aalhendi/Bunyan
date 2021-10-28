/* Imports */
import React from "react";

/* State and Store */
import { observer } from "mobx-react";

const ClientWait = ({ clients }) => {
  const waitingList = clients.map((client) => (
    <li
      className="list-group-item"
      key={client.id}
    >{`${client.firstName} ${client.lastName}`}</li>
  ));

  return <>{waitingList}</>;
};

export default observer(ClientWait);
