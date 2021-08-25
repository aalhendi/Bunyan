/* State and Store */
import instance from "./instance";
import { makeAutoObservable, runInAction } from "mobx";

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

  updateContarct = async (updatedContract) => {
    try {
      const res = await instance.put(
        `/contracts/${updatedContract.id}`,
        updatedContract
      );
      const newContract = this.contracts.find(
        (contract) => contract.id === updatedContract.id
      );
      runInAction(() => {
        for (const key in newContract) {
          newContract[key] = res.data[key];
        }
      });
    } catch (error) {
      console.error(error);
    }
  };
  deleteContract = async (contractId) => {
    try {
      const res = await instance.delete(`contracts/${contractId}`);
      // if (res.status === 204) {
      runInAction(() => {
        this.contracts = this.contracts.filter((contract) => {
          return contract.id !== contractId;
        });
      });
      // }
    } catch (error) {
      console.error(error);
    }
  };
}

const clientStore = new ClientStore();
clientStore.fetchClients();
clientStore.fetchContracts();
export default clientStore;
