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
import authStore from "../../stores/authStore";
import { observer } from "mobx-react";

const ActivityContractItem = ({ contract }) => {
  const [contractInfo, setContractInfo] = useState({
    id: contract.id,
    status: contract.status,
  });

  const handleChangeStatus = async () => {
    await clientStore.updateContarct({ ...contract, status: 1 });
  };

  const handleApproved = () => {
    handleChangeStatus();
    Alert.alert("Alert", "Contract Approved");
  };

  const handleRejected = async (contractId) => {
    Alert.alert(
      "Delete Request",
      "Are you sure you wish to delete ?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel pressed"),
        },
        {
          text: "Delete",
          onPress: async () => await clientStore.deleteContract(contractId),
        },
      ],
      { cancelable: false }
    );
  };
  return (
    <>
      <ActivityContainer disabled={true}>
        <Text>{contract.id}</Text>
        <ActivityContainerView disabled={true}>
          <CrossIcon
            name="cross"
            size={40}
            onPress={() => handleRejected(contract.id)}
          />
          <CheckIcon name="check" size={40} onPress={handleApproved} />
        </ActivityContainerView>
      </ActivityContainer>
    </>
  );
};

export default observer(ActivityContractItem);
