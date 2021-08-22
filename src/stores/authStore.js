/* Imports */
import instance from "./instance";
import decode from "jwt-decode";
import { makeAutoObservable, runInAction } from "mobx";
import workerStore from "./workerStore";

class AuthStore {
  /* Assign user */
  loading = true;
  user = null;

  constructor() {
    makeAutoObservable(this);
  }

  /* Create New Contractor */
  register = async (newUser, isWorker = false) => {
    try {
      const res = await instance.post("/register", newUser);
      if (!isWorker) {
        this.setUser(res.data.token);
      }
    } catch (error) {
      console.error(error); // error message
    }
  };

  /* Login Contractor */
  login = async (userData) => {
    try {
      const res = await instance.post("/login", userData);
      this.setUser(res.data.token);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  /* Logout Contractor */
  logout = () => {
    delete instance.defaults.headers.common.Authorization;
    localStorage.removeItem("myToken");
    this.user = null;
    /* ToDo: redirect to the login page */
  };

  /* Set contractor token in local storage */
  setUser = (token) => {
    localStorage.setItem("myToken", token);
    instance.defaults.headers.common.Authorization = `Bearer ${token}`;
    this.user = decode(token);
    workerStore.fetchWorker(authStore.user.id);
  };

  /* Check the Contractor Token */
  checkForToken = async () => {
    const token = localStorage.getItem("myToken");
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
  updateProfile = async (updateProfile) => {
    try {
      const res = await instance.put(
        `/companies/${authStore.user.id}`,
        updateProfile
      );
      runInAction(() => (this.profile = res.data));
    } catch (error) {}
  };
}
const authStore = new AuthStore();
authStore.checkForToken();
if (authStore.user?.id) {
  workerStore.fetchWorker(authStore.user.id);
}
export default authStore;
