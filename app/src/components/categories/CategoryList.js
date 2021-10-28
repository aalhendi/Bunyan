/* Imports */
import React from "react";
import CircularProgress from "react-native-circular-progress-indicator";

/* Styles */
import {
  CenterView,
  TopNavigationBar,
  SafeAreaView,
  BackIcon,
  CategoryIcon,
  Felx1View,
  TextTopNavigationBar,
  TopBarText,
  ScrollView,
  CategoryCard,
  CategoryType,
  CategoryTypeText,
  CenterCircularProgress,
  CompanyInfo,
  CompanyInfoLogo,
  CompanyInfoText,
} from "./styles";

const x = 90;
const CategoryList = ({ navigation }) => {
  return (
    <SafeAreaView>
      <CenterView>
        <TopNavigationBar>
          <Felx1View>
            <BackIcon
              name="chevron-back"
              size={35}
              onPress={() => navigation.goBack("Home")}
            />
          </Felx1View>
          <TextTopNavigationBar>
            <TopBarText>Category</TopBarText>
          </TextTopNavigationBar>
          <Felx1View />
        </TopNavigationBar>
        <ScrollView>
          <CategoryCard>
            <CategoryType>
              <CategoryIcon name="snowflake-o" size={50} />
              <CategoryTypeText>A/C</CategoryTypeText>
              <Felx1View />
              <CenterCircularProgress>
                <CircularProgress
                  value={x}
                  valuePrefix="%"
                  inActiveStrokeColor="grey"
                  inActiveStrokeOpacity={0.25}
                  activeStrokeColor="#5588A3"
                />
              </CenterCircularProgress>
            </CategoryType>
            <CompanyInfo>
              <CompanyInfoLogo />
              <CompanyInfoText>Al Ghanim Industries</CompanyInfoText>
            </CompanyInfo>
          </CategoryCard>
        </ScrollView>
      </CenterView>
    </SafeAreaView>
  );
};

export default CategoryList;
