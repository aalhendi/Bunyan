import styled from "styled-components/native";
import { List } from "native-base";
import { Ionicons } from "@expo/vector-icons";

export const SafeAreaView = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.grey};
`;
export const TopNavigationBar = styled.View`
  flex-direction: row;
  align-content: center;
  align-items: center;
  padding-horizontal: 4%;
`;
export const TextTopNavigationBar = styled.View`
  flex: 6;
  padding-vertical: 2.5%;
  align-items: center;
`;
export const TopBarText = styled.Text`
  font-size: 25px;
  font-weight: 500;
  color: #5588a3;
`;

export const FlexView = styled.View`
  flex: 1;
`;
export const ScrollView = styled.ScrollView`
  flex: 1;
  width: 100%;
`;
export const BackIcon = styled(Ionicons)`
  color: #5588a3;
`;
export const TaskContainer = styled.TouchableOpacity`
  height: 70px;
  width: 100%;
`;
export const ListItemContainer = styled(List)`
  border-width: 0px;
`;
export const ListItem = styled(List.Item)`
  border-radius: 10px;
  box-shadow: 2px 2px 4px #000000;
  border: 0.4px solid grey;
  margin-right: auto;
  margin-left: auto;
  margin-top: 2.5%;
  width: 98%;
  background-color: ${({ theme }) => theme.white};
`;
export const TaskText = styled.Text`
  padding-top: 4%;
  font-size: 30px;
`;
