//library imports
import React from "react";
import { Text, View } from "native-base";
import {
  ActivityContainer,
  CrossIcon,
  CheckIcon,
  ActivityContainerView,
} from "./styles";
import { useState } from "react/cjs/react.development";
import { ListItem } from "../tasks/styles";
import clientStore from "../../stores/clientStore";
import { Alert } from "react-native";

const ActivityContractItem = ({ contract }) => {
  const [contractInfo, setContractInfo] = useState({
    id: contract.id,
    status: contract.status,
  });

  const handleChangeStatus = async () => {
    setContractInfo({
      ...contract,
      status: 1,
    });
    await clientStore.updateContarct(contractInfo);
  };

  const handleAprroved = () => {
    handleChangeStatus();
    Alert.alert("Alert", "Job is Done");
  };

  return (
    <>
      <ActivityContainer disabled={true}>
        <Text>{contract.id}</Text>
        <ActivityContainerView disabled={true}>
          <CrossIcon
            name="cross"
            size={40}
            onPress={() => console.log("cross")}
          />
          <CheckIcon name="check" size={40} onPress={handleAprroved} />
        </ActivityContainerView>
      </ActivityContainer>
    </>
  );
};

export default ActivityContractItem;
