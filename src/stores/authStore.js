/* Imports */
import decode from "jwt-decode";
import instance from "./instance";

/* State and Store */
import { makeAutoObservable, runInAction } from "mobx";
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
      runInAction(() => this.setUser(res.data.token));
      navigation.replace("EditProfile", (navigation = { navigation }));
      return true;
    } catch (error) {
      console.error(error); // error message
      return false;
    }
  };

  /* Login for Client */
  login = async (userData) => {
    try {
      const res = await instance.post("/login", userData);
      runInAction(() => this.setUser(res.data.token));
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  /* Signout Client */
  logout = async () => {
    delete instance.defaults.headers.common.Authorization;
    await AsyncStorage.removeItem("myToken");
    runInAction(() => (this.user = null));
  };

  updateProfile = async (updatedProfile) => {
    try {
      const res = await instance.put(
        `/clients/${authStore.user.profile.id}`,
        updatedProfile
      );
      runInAction(() => (this.user.profile = res.data));
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  /* Set Client token in AsyncStorage */
  setUser = async (token) => {
    await AsyncStorage.setItem("myToken", token);
    instance.defaults.headers.common.Authorization = `Bearer ${token}`;
    runInAction(() => (this.user = decode(token)));
    runInAction(() => (this.loading = false));
  };

  /* Check the Client Token */
  checkForToken = async () => {
    const token = await AsyncStorage.getItem("myToken");
    if (token) {
      const currentTime = Date.now();
      const user = decode(token);
      if (user.exp >= currentTime) {
        runInAction(() => this.setUser(token));
        runInAction(() => (this.loading = false));
      } else {
        this.logout();
      }
    }
  };
}
const authStore = new AuthStore(); // create instance
authStore.checkForToken();
export default authStore; // export it
