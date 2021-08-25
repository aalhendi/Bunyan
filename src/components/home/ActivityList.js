//library imports
import React from "react";
//Styles
import taskStore from "../../stores/taskStore";
import ActivityItem from "./ActivityItem";
import { List, Spinner, View } from "native-base";
import clientStore from "../../stores/clientStore";
import { observer } from "mobx-react";
import ActivityContractItem from "./ActivityContractItem";
import authStore from "../../stores/authStore";
const ActivityList = () => {
  if (taskStore.loading || clientStore.loading) return <Spinner />;
  const activityItemTasks = taskStore.tasks
    .filter((task) => +task.status === 2)
    .map((task) => <ActivityItem task={task} key={task.id} />);
  const activityItemContracts = clientStore.contracts
    .filter((contract) => contract.clientId === authStore.user?.profile.id)
    .filter((contract) => +contract.status === 0)
    .map((contract) => (
      <ActivityContractItem contract={contract} key={contract.id} />
    ));
  return (
    <>
      {activityItemContracts}
      {activityItemTasks}
    </>
  );
};

export default observer(ActivityList);
