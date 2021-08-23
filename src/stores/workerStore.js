/* Imports */
import { makeAutoObservable, runInAction } from "mobx";
import authStore from "./authStore";
import instance from "./instance";

class WorkerStore {
  /* Assign user */
  loading = true;
  workers = [];

  constructor() {
    makeAutoObservable(this);
  }

  /* Fetch Company Profile */
  fetchWorker = async (userId) => {
    try {
      const res = await instance.get(`/workers`);
      runInAction(
        () =>
          (this.workers = res.data.filter(
            (worker) => worker.companyId === authStore.user.profile.id
          ))
      );
      this.loading = false;
    } catch (error) {
      console.error("fetchWorker: ", error);
    }
  };
}
const workerStore = new WorkerStore();
export default workerStore;
