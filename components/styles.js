import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  mainView: {
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    paddingHorizontal: "4%",
  },
  header: {
    paddingVertical: 10,
    flexDirection: "column",
    alignItems: "center",
    width: "90%",
  },
  headerView: {
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 25,
    fontWeight: "600",
    color: "#5588A3",
  },
  nameText: {
    fontSize: 17.5,
    fontWeight: "300",
    color: "#5588A3",
  },
  mainContainer: {
    padding: "2.5%",
    alignContent: "center",
    width: "90%",
    height: "24%",
    backgroundColor: "#5588A3",
    borderRadius: 10,
    marginTop: "5%",
    shadowRadius: 10,
    shadowOpacity: 0.2,
  },
  mainText: {
    fontSize: 30,
    fontWeight: "500",
    color: "white",
  },
  homeIconStyled: {
    alignItems: "flex-end",
  },
  homePageDetails: {
    height: "20%",
    width: "90%",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    marginTop: "5%",
    shadowRadius: 10,
    shadowOpacity: 0.2,
  },
  activityView: {
    backgroundColor: "white",
    width: "100%",
    // flexGrow: 1,
    marginTop: "5%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowRadius: 10,
    shadowOpacity: 0.15,
  },
  activityTextStyled: {
    fontSize: 25,
    color: "#5588A3",
    fontWeight: "600",
    margin: "5%",
  },
  scrollView: {
    marginHorizontal: 20,
  },
  tryContainer: {
    height: 100,
    width: "100%",
    backgroundColor: "black",
    marginTop: 10,
  },
  tryContainer2: {
    height: 170,
    width: "100%",
    backgroundColor: "white",
    marginTop: 10,
  },
});
