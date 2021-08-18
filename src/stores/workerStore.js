/* Imports */
import { makeAutoObservable } from "mobx";
import instance from "./instance";

class WorkerStore {
  /* Assign user */
  loading = true;
  worker = [];

  constructor() {
    makeAutoObservable(this);
  }

  /* Fetch Company Profile */
  fetchWorker = async (userId) => {
    try {
      const response = await instance.get(`/workers/${userId}`);
      this.worker = response.data;
      this.loading = false;
    } catch (error) {
      console.error("fetchClient: ", error);
    }
  };
}
const workerStore = new WorkerStore();
export default workerStore;
