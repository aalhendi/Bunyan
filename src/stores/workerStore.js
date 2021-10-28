/* State and Store */
import { makeAutoObservable, runInAction } from "mobx";
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
      runInAction(() => (this.workers = response.data));
      runInAction(() => (this.loading = false));
    } catch (error) {
      console.error("fetchWorkers: ", error);
    }
  };
}

const workerStore = new WorkerStore();
workerStore.fetchWorkers();
export default workerStore;
