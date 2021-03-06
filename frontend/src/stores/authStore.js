/* Imports */
import decode from "jwt-decode";

/* State and Store */
import instance from "./instance";
import { makeAutoObservable, runInAction } from "mobx";
import workerStore from "./workerStore";
import clientStore from "./clientStore";

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
  setUser = async (token) => {
    localStorage.setItem("myToken", token);
    instance.defaults.headers.common.Authorization = `Bearer ${token}`;
    this.user = decode(token);
    workerStore.fetchWorker(authStore.user.id);
    await clientStore.fetchClientsByCompany();
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
        `/companies/${authStore.user.profile.id}`,
        updateProfile
      );
      runInAction(() => (this.user.profile = res.data));
      this.loading = false;
      /* ToDo: Refresh the token */
    } catch (error) {
      console.error(error);
    }
  };
}
const authStore = new AuthStore();
authStore.checkForToken();
if (authStore.user?.id) {
  workerStore.fetchWorker(authStore.user.id);
}
export default authStore;
