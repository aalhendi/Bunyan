//library imports
import { makeAutoObservable } from "mobx";
//components
import instance from "./instance";

class ClientStore {
  clients = [];
  loading = true;

  constructor() {
    makeAutoObservable(this);
  }

  fetchClients = async () => {
    try {
      const response = await instance.get("/clients");
      this.clients = response.data;
      this.loading = false;
    } catch (error) {
      console.error("fetchClients: ", error);
    }
  };
}

const clientStore = new ClientStore();
clientStore.fetchClients();
export default clientStore;
