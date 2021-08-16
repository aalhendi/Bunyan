import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  mainView: {
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    paddingHorizontal: "4%",
  },
  header: {
    flex: 6,
    paddingVertical: 10,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  welcomeText: {
    fontSize: 25,
    fontWeight: "500",
    color: "#5588A3",
  },
});
