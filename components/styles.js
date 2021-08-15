import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  mainView: {
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  header: {
    paddingVertical: 20,
    flexDirection: "column",
    alignItems: "center",
    width: "85%",
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
});
