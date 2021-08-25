import styled from "styled-components/native";
import {
  Entypo,
  AntDesign,
  MaterialCommunityIcons,
  Feather,
} from "@expo/vector-icons";

export const SafeAreaView = styled.SafeAreaView`
  flex: 1;
`;
export const CenteringElementStyled = styled.View`
  flex: 1;
  align-items: center;
`;
export const TopNavigationBar = styled.View`
  flex-direction: row;
  align-content: center;
  align-items: center;
  padding-horizontal: 4%;
`;
export const TextTopNavigationBar = styled.View`
  padding-vertical: 2.5%;
  flex-direction: column;
  align-items: center;
  width: 75%;
`;
export const WelcomeText = styled.Text`
  font-size: 25px;
  font-weight: 600;
  color: #5588a3;
`;
export const NameText = styled.Text`
  font-size: 17.5px;
  font-weight: 300;
  color: #5588a3;
`;
export const MainContainer = styled.TouchableOpacity`
  padding: 2.5%;
  align-content: center;
  width: 90%;
  ${"" /* height: 24%; */}
  background-color: #5588a3;
  border-radius: 10px;
  margin-top: 5%;
  shadow-radius: 10px;
  shadow-opacity: 0.2;
`;
export const MainContainerText = styled.Text`
  font-size: 30px;
  font-weight: 500;
  color: white;
`;
export const HomeIconStyled = styled.View`
  align-items: flex-end;
`;
export const ActivityView = styled.View`
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
export const ActivityText = styled.Text`
  font-size: 25px;
  color: #5588a3;
  font-weight: 600;
  margin-top: 5%;
  margin-left: 5%;
`;
export const ScrollView = styled.ScrollView`
  margin-horizontal: 5%;
`;
export const ActivityContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 80px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.grey};
  margin-top: 5%;
  box-shadow: 0px 0px 1px rgba(25, 50, 47, 0.1);
  padding-horizontal: 5%;
`;
export const ActivityContainerView = styled.View`
  flex-direction: row;
  justify-content: space-around;
`;
export const ActivityContainerText = styled.Text`
  font-size: 25px;
  font-weight: 400;
  color: black;
`;

export const CheckIcon = styled(Entypo)`
  color: #2a7e18;
`;
export const CrossIcon = styled(Entypo)`
  color: #b33f40;
`;
export const LogoutIcon = styled(Feather)`
  color: red;
  flex: 1;
`;
export const HomeIcon = styled(AntDesign)`
  color: white;
`;
export const ProfileButton = styled(MaterialCommunityIcons)`
  color: ${({ theme }) => theme.blue};
  flex: 1;
`;
export const FlexView = styled.View`
  padding-vertical: 2.5%;
  flex-direction: row;
  align-items: center;
  width: 15%;
`;
