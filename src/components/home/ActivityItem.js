//library imports
import React from "react";
import { Text, View } from "native-base";
import {
  ActivityContainer,
  CrossIcon,
  CheckIcon,
  ActivityContainerView,
  ActivityContainerText,
} from "./styles";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ActivityItem = ({ task }) => {
  const navigation = useNavigation();

  return (
    <View>
      <TouchableOpacity
        onPress={() => navigation.navigate("TaskDetail", { task: task })}
      >
        <ActivityContainer>
          <ActivityContainerText>{task.name}</ActivityContainerText>
        </ActivityContainer>
      </TouchableOpacity>
    </View>
  );
};

export default ActivityItem;
