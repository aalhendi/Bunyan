/* Imports */
import instance from "./instance";

/* State and Store */
import { makeAutoObservable } from "mobx";
import authStore from "./authStore";

class ProfileStore {
  profile = null;
  loading = true;

  constructor() {
    makeAutoObservable(this);
  }

  fetchProfile = async (userId) => {
    res = await instance.get("/clients");
    const foundProfile = res.data.find((client) => client.userId === userId);
    if (foundProfile) {
      this.profile = foundProfile;
      this.loading = false;
    }
  };

  getProfileByUserId = async (userId) => {
    const res = await instance.get("/clientByUserId", {
      params: { userId: userId },
    });
    return res.data;
  };

  updateProfile = async (updatedProfile) => {
    const tmp = await this.getProfileByUserId(authStore.user.id);
    const res = await instance.put(`/clients/${tmp.id}`, updatedProfile);
    this.profile = res.data;
  };
}

const profileStore = new ProfileStore();
export default profileStore;
