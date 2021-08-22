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

  updaeTask = async (updatedTask) => {
    try {
      const formData = new FormData();
      for (const key in updatedTask) {
        formData.append(key, updatedTask[key]);
      }
      const res = await instance.put(`/tasks/${updatedTask.id}`, formData);
      const newTask = this.tasks.find((task) => task.id === res.data.id);
      for (const key in newTask) {
        runInAction(() => (newTask[key] = res.data[key]));
      }
    } catch (error) {
      console.error(error);
    }
  };
}

const taskStore = new TaskStore();
taskStore.fetchTasks();
export default taskStore;
