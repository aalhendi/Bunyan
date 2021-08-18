/* State and Store */
import { makeAutoObservable, runInAction } from "mobx";
import instance from "./instance";

class TaskStore {
  tasks = [];
  loading = true;

  constructor() {
    makeAutoObservable(this);
  }

  fetchTasks = async () => {
    try {
      const response = await instance.get("/tasks");
      runInAction(() => (this.tasks = response.data));
      runInAction(() => (this.loading = false));
    } catch (error) {
      console.error("fetchTasks: ", error);
    }
  };
}

const taskStore = new TaskStore();
taskStore.fetchTasks();
export default taskStore;
