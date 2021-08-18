//library imports
import { makeAutoObservable } from "mobx";
//components
import instance from "./instance";

class WorkerStore {
  workers = [];
  loading = true;

  constructor() {
    makeAutoObservable(this);
  }

  fetchWorkers = async () => {
    try {
      const response = await instance.get("/workers");
      this.workers = response.data;
      this.loading = false;
    } catch (error) {
      console.error("fetchWorkers: ", error);
    }
  };
}

const workerStore = new WorkerStore();
workerStore.fetchWorkers();
export default workerStore;
