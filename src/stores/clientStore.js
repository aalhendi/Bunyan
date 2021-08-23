/* State and Store */
import instance from "./instance";
import { makeAutoObservable } from "mobx";

class ClientStore {
  clients = [];
  contracts = [];
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

  fetchContracts = async () => {
    try {
      const res = await instance.get("/contracts");
      this.contracts = res.data;
      this.loading = false;
    } catch (error) {
      console.error("fetchContracts: ", error);
    }
  };
}

const clientStore = new ClientStore();
clientStore.fetchClients();
clientStore.fetchContracts();
export default clientStore;
