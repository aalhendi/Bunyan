/* Imports */
import { makeAutoObservable } from "mobx";
import companyStore from "./companyStore";
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
      this.workers = res.data.filter(
        (worker) => worker.companyId === companyStore.company.id
      );
      console.log(userId);
      this.loading = false;
    } catch (error) {
      console.error("fetchWorker: ", error);
    }
  };
}
const workerStore = new WorkerStore();
export default workerStore;
