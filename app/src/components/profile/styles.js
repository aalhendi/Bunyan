import styled from "styled-components/native";
import { Ionicons, Feather } from "@expo/vector-icons";

export const SafeAreaView = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.grey};
`;

export const TopNavigationBar = styled.View`
  flex-direction: row;
  align-content: center;
  align-items: center;
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
export const BackIcon = styled(Ionicons)`
  color: #5588a3;
`;
export const LogoutIcon = styled(Feather)`
  color: red;
  flex: 1;
`;
