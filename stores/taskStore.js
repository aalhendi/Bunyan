//library imports
import { makeAutoObservable } from "mobx";
//components
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
      this.tasks = response.data;
      this.loading = false;
    } catch (error) {
      console.error("fetchTasks: ", error);
    }
  };
}

const taskStore = new TaskStore();
taskStore.fetchTasks();
export default taskStore;
