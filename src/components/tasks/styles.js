import styled from "styled-components/native";
import { List } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "native-base";

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
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export const TaskContainerDisabled = styled.TouchableOpacity`
  height: 70px;
  width: 100%;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export const ListItemContainer = styled(List)`
  border-width: 0px;
  margin-left: 4%;
  margin-right: 4%;
`;

export const ListItem = styled(List.Item)`
  flex: 1;
  align-content: center;
  border-radius: 7.5px;
  box-shadow: 0px 0px 3px grey;
  border: 0.4px solid grey;
  margin-top: 3.5%;
  width: 100%;
  background-color: ${({ theme }) => theme.white};
`;
export const TaskText = styled.Text`
  font-size: 25px;
  font-weight: 500;
`;
export const TaskText0 = styled.Text`
  font-size: 17.5px;
  font-weight: 400;
  margin-horizontal: 2%;
`;
export const TaskText1 = styled.Text`
  font-size: 17.5px;
  font-weight: 400;
  margin-horizontal: 2%;
`;
export const TaskText2 = styled.Text`
  font-size: 17.5px;
  font-weight: 400;
  margin-horizontal: 2%;
  color: #5588a3;
`;
export const TaskText3 = styled.Text`
  font-size: 17.5px;
  font-weight: 400;
  margin-horizontal: 2%;
  color: #2a7e18;
`;
export const DetailView = styled.View`
  background-color: white;
  width: 100%;
  flex-grow: 1;
  height: 10%;
  margin-top: 5%;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  shadow-radius: 10px;
  shadow-opacity: 0.15;
`;
export const DetailNameText = styled.Text`
  font-size: 33px;
  color: #5588a3;
  font-weight: 600;
  margin-top: 5%;
  margin-left: 5%;
`;
export const TextDetailView = styled.View`
  margin-top: 5%;
  margin-left: 5%;
`;
export const DetailText = styled.Text`
  font-size: 25px;
  font-weight: 500;
`;
export const ClientConfirm = styled(Button)`
  margin: 2.5%;
  background-color: ${({ theme }) => theme.green};
`;
