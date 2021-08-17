import styled from "styled-components/native";

import { Ionicons, FontAwesome } from "@expo/vector-icons";

export const SafeAreaView = styled.SafeAreaView`
  flex: 1;
`;
export const CenterView = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
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

export const Felx1View = styled.View`
  flex: 1;
`;
export const ScrollView = styled.ScrollView`
  flex: 1;
  width: 100%;
`;
export const CategoryCard = styled.View`
  flex: 1;
  margin-horizontal: 5%;
  background-color: white;
  border-radius: 10px;
  shadow-radius: 7.5px;
  shadow-opacity: 0.15;
  margin-top: 5%;
`;
export const CategoryType = styled.View`
  padding-left: 3%;
  flex-direction: row;
  align-items: center;
`;
export const CategoryTypeText = styled.Text`
  padding-left: 5%;
  font-size: 50px;
  font-weight: 400;
`;
export const CenterCircularProgress = styled.View`
  margin-right: 5%;
`;
export const CompanyInfo = styled.View`
  padding-top: 3%;
  padding-bottom: 3%;
  padding-left: 3%;
  flex-direction: row;
  align-items: center;
`;
export const CompanyInfoLogo = styled.View`
  width: 60px;
  height: 60px;
  border-radius: 50px;
  background-color: grey;
`;
export const CompanyInfoText = styled.Text`
  padding-left: 3%;
  font-size: 17.5px;
  font-weight: 300;
`;

export const BackIcon = styled(Ionicons)`
  color: #5588a3;
`;
export const CategoryIcon = styled(FontAwesome)`
  color: black;
`;
