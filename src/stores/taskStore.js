/* State and Store */
import { makeAutoObservable, runInAction } from "mobx";
import { Spinner } from "native-base";
import authStore from "./authStore";
import instance from "./instance";

class TaskStore {
  tasks = [];
  loading = true;

  constructor() {
    makeAutoObservable(this);
  }

  fetchTasks = async () => {
    try {
      const res = await instance.get("/tasks/filter");
      runInAction(() => (this.tasks = res.data));
      runInAction(() => (this.loading = false));
    } catch (error) {
      console.error("fetchTasksByType:", error);
    }
  };

  uploadImage = async (updatedTask) => {
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
export default taskStore;
