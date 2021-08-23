/* Imports */
import { makeAutoObservable } from "mobx";
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
            this.tasks = res.data
            this.loading = false;
        } catch (error) {
            console.error("fetchTask: ", error);
        }
    };
}
const taskStore = new TaskStore();
taskStore.fetchTask()
export default taskStore;
