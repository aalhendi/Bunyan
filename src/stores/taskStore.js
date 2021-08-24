/* Imports */
import { makeAutoObservable, runInAction } from "mobx";
import instance from "./instance";

class TaskStore {
  /* Assign user */
  loading = true;
  tasks = [];

  constructor() {
    makeAutoObservable(this);
  }

  /* Fetch Company Profile */
  fetchTask = async () => {
    try {
      const res = await instance.get(`/tasks/filter`);
      runInAction(() => {
        this.tasks = res.data;
        this.loading = false;
      });
    } catch (error) {
      console.error("fetchTask: ", error);
    }
  };

  /* Add Task */
  addTask = async (task) => {
    try {
      const res = await instance.post(`/tasks`, task);
      runInAction(() => this.tasks.push(res.data));
    } catch (error) {
      console.error("addTask: ", error);
    }
  };

  /* Assign User */
  assignUser = async (workerId, contractId) => {
    try {
      await instance.put(
        `/contracts/${contractId}`,
        { workerId }
      );
      this.loading = false;
    } catch (error) {
      console.error(error);
    }
  }
}
const taskStore = new TaskStore();
taskStore.fetchTask();
export default taskStore;
