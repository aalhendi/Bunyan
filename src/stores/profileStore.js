import { makeAutoObservable } from "mobx";
import instance from "./instance";

class ProfileStore {
  profiles = [];
  loading = true;

  constructor() {
    makeAutoObservable(this);
  }
}

const profileStore = new ProfileStore();
export default profileStore;
