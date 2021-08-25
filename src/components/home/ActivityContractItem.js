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

const ActivityContractItem = ({ contract }) => {
  const [contractInfo, setContractInfo] = useState({
    id: contract.id,
    status: contract.status,
  });

  const handleChangeStatus = () => {
    setContractInfo({
      ...contract,
      status: 1,
    });
  };
  return (
    <View>
      <ActivityContainer>
        <Text>{contract.id}</Text>
        <ActivityContainerView>
          <CrossIcon name="cross" size={40} />
          <CheckIcon name="check" size={40} onPress={handleChangeStatus} />
        </ActivityContainerView>
      </ActivityContainer>
    </View>
  );
};

export default ActivityContractItem;
