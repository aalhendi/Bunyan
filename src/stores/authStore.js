/* Imports */
import instance from "./instance";
import decode from "jwt-decode";
import companyStore from "./companyStore";
import { makeAutoObservable } from "mobx";

class AuthStore {
  /* Assign user */
  loading = true;
  user = null;

  constructor() {
    makeAutoObservable(this);
  }

  /* Create New Contractor */
  register = async (newUser) => {
    try {
      const res = await instance.post("/register", newUser);
      this.setUser(res.data.token);
    } catch (error) {
      console.error(error); // error message
    }
  };

  /* Login Contractor */
  login = async (userData) => {
    try {
      const res = await instance.post("/login", userData);
      this.setUser(res.data.token);
    } catch (error) {
      console.error(error);
    }
  };

  /* Signout Contractor */
  logout = () => {
    delete instance.defaults.headers.common.Authorization;
    localStorage.removeItem("myToken");
    this.user = null;
  };

  /* set contractor token in local storage */
  setUser = (token) => {
    localStorage.setItem("myToken", token);
    instance.defaults.headers.common.Authorization = `Bearer ${token}`;
    this.user = decode(token);
  };

  /* Check the Contractor Token */
  checkForToken = () => {
    const token = localStorage.getItem("myToken");
    if (token) {
      const currentTime = Date.now();
      const user = decode(token);
      if (user.exp >= currentTime) {
        this.setUser(token);
        companyStore.fetchCompany(this.user.id);
      } else {
        this.signout();
      }
      this.loading = false;
    }
  };

  /* Profile request */
}
const authStore = new AuthStore(); // create instance
authStore.checkForToken();
export default authStore; // export it
