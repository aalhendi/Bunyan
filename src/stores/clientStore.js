/* State and Store */
import instance from "./instance";
import { makeAutoObservable, runInAction } from "mobx";
import authStore from "./authStore";

class ClientStore {
  /* find all clients */
  clients = [];
  /* find all waiting list */
  waitList = [];
  loading = true;

  constructor() {
    makeAutoObservable(this);
  }

  /* Add new Client in the waiting list */
  requestOnboardClient = async (newClient) => {
    try {
      newClient.companyId = authStore.user.profile.id;
      const res = await instance.post("/contracts", newClient);
      runInAction(() => this.waitList.push(res.data));
    } catch (error) {
      console.error(error);
    }
  };

  fetchClientsByCompany = async () => {
    try {
      // TODO: Ask about runInAction wihtout disabling strict mode or disabling enforcing
      const res = await instance.get(`/contracts/clientsByCompany`);
      runInAction(
        () => (this.clients = res.data.filter((client) => client.status !== 0))
      );
      runInAction(
        () => (this.waitList = res.data.filter((client) => client.status === 0))
      );
      runInAction(() => (this.loading = false));
    } catch (error) {
      console.error("fetchWaitlist: ", error);
    }
  };
}
const clientStore = new ClientStore();
// TODO: waitlist shows another user logs in. updates/disappears on refresh
export default clientStore;
