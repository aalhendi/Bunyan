//library imports
import React from "react";
//Styles
import taskStore from "../../stores/taskStore";
import ActivityItem from "./ActivityItem";
import { View } from "native-base";
import clientStore from "../../stores/clientStore";
import { observer } from "mobx-react";
import ActivityContractItem from "./ActivityContractItem";
import { Text } from "react-native";
const ActivityList = () => {
  const activityItemTasks = taskStore.tasks
    .filter((task) => task.status === 2)
    .map((task) => <ActivityItem task={task} key={task.id} />);
  const activityItemContracts = clientStore.contracts
    .filter((contract) => contract.status === 0)
    .map((contract) => (
      <ActivityContractItem contract={contract} key={contract.id} />
    ));
  return (
    <View>
      <View>{activityItemContracts}</View>
      <Text>----------</Text>
      <View>{activityItemTasks}</View>
    </View>
  );
};

export default observer(ActivityList);
