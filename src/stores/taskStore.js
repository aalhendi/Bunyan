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
      const res = await instance.get("/tasks/filter");
      runInAction(() => (this.tasks = res.data));
      runInAction(() => (this.loading = false));
    } catch (error) {
      console.error("fetchTasksByType:", error);
    }
  };

  updateTask = async (updatedTask) => {
    try {
      const formData = new FormData();
      for (const key in updatedTask) {
        formData.append(key, updatedTask[key]);
      }
      const res = await instance.put(`/tasks/${updatedTask.id}`, formData);
      const newTask = this.tasks.find((task) => task.id === res.data.id);
      console.log(newTask);
      const contract = newTask.contract;
      runInAction(() => {
        for (const key in newTask) {
          newTask[key] = res.data[key];
        }
        newTask.contract = contract;
      });
    } catch (error) {
      console.error(error);
    }
  };
  updateTaskForClient = async (updatedTask) => {
    try {
      const res = await instance.put(`/tasks/${updatedTask.id}`, updatedTask);
      // console.log(this.tasks);
      const newTask = this.tasks.find((task) => task.id === res.data.id);
      // const newTask = res.data;
      console.log(res.data);
      console.log(newTask);

      runInAction(() => {
        for (const key in newTask) {
          newTask[key] = res.data[key];
        }
      });
    } catch (error) {
      console.error(error);
    }
  };
}

const taskStore = new TaskStore();
export default taskStore;
