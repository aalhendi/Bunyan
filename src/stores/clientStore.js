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
      const res = await instance.get("/clients");
      this.clients = res.data;
      this.loading = false;
    } catch (error) {
      console.error("fetchClients: ", error);
    }
  };

  fetchStatuses = async () => {
    try {
      const res = await instance.get("/contracts");
      this.statuses = res.data;
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
