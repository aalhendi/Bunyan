/* Imports */
import decode from "jwt-decode";
import instance from "./instance";

/* State and Store */
import { makeAutoObservable } from "mobx";
import AsyncStorage from "@react-native-async-storage/async-storage";
import profileStore from "./profileStore";

class AuthStore {
  /* Assign user */
  loading = true;
  user = null;

  constructor() {
    makeAutoObservable(this);
  }

  /* Create New user for Client */
  register = async (newUser, navigation) => {
    console.log("Hello");
    try {
      const res = await instance.post("/register", newUser);
      this.setUser(res.data.token);
      console.log(this.user);
      navigation.replace("EditProfile", (navigation = { navigation }));
    } catch (error) {
      console.error(error); // error message
    }
  };

  /* Login for Client */
  login = async (userData, navigation) => {
    try {
      const res = await instance.post("/login", userData);
      this.setUser(res.data.token);
      navigation.replace("Home");
    } catch (error) {
      console.error(error);
    }
  };

  /* Signout Client */
  logout = async () => {
    delete instance.defaults.headers.common.Authorization;
    await AsyncStorage.removeItem("myToken");
    this.user = null;
  };

  /* set Client token in AsyncStorage */
  setUser = async (token) => {
    await AsyncStorage.setItem("myToken", token);
    instance.defaults.headers.common.Authorization = `Bearer ${token}`;
    this.user = decode(token);
    await profileStore.fetchProfile(this.user.id);
  };

  /* Check the Client Token */
  checkForToken = async () => {
    const token = await AsyncStorage.getItem("myToken");
    if (token) {
      const currentTime = Date.now();
      const user = decode(token);
      if (user.exp >= currentTime) {
        this.setUser(token);
        this.loading = false;
        profileStore.fetchProfile(this.user.id);
      } else {
        this.logout();
      }
    }
  };

  /* Profile request */
}
const authStore = new AuthStore(); // create instance
authStore.checkForToken();
export default authStore; // export it
