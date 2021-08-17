/* Global Libraries */
import { makeAutoObservable } from "mobx";
import decode from "jwt-decode";

import instance from "./instance";

import AsyncStorage from "@react-native-async-storage/async-storage";

class AuthStore {
  /* Assign user */
  loading = true;
  user = null;

  constructor() {
    makeAutoObservable(this);
  }

  /* Create New user for Client */
  register = async (newUser, navigation) => {
    try {
      const res = await instance.post("/register", newUser);
      this.setUser(res.data.token);
      navigation.replace("EditProfile");
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
  };

  /* Check the Client Token */
  checkForToken = async () => {
    const token = await AsyncStorage.getItem("myToken");
    if (token) {
      const currentTime = Date.now();
      const user = decode(token);
      if (user.exp >= currentTime) {
        this.setUser(token);
      } else {
        this.logout();
      }
      this.loading = false;
    }
  };

  /* Profile request */
}
const authStore = new AuthStore(); // create instance
authStore.checkForToken();
export default authStore; // export it
