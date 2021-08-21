/* State and Store */
import instance from "./instance";
import { makeAutoObservable } from "mobx";

class ClientStore {
  clients = [];
  statuses = [];
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

  fetchStatuses = async () => {
    try {
      const response = await instance.get("/companyclient");
      this.statuses = response.data;
      this.loading = false;
    } catch (error) {
      console.error("fetchCompanyClient: ", error);
    }
  };
}

const clientStore = new ClientStore();
clientStore.fetchClients();
clientStore.fetchStatuses();
export default clientStore;
