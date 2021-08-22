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
  /* Read the Clients */
  /* ToDo: find only the client related to the login user */
  fetchClients = async () => {
    try {
      const res = await instance.get("/clients");
      this.clients = res.data;
      this.loading = false;
    } catch (error) {
      console.error("fetchClient: ", error);
    }
  };

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

  fetchWaitlist = async () => {
    try {
      // TODO: change params to a req.body
      const res = await instance.get(`/contracts/waitlist`, {
        params: { companyId: authStore.user.profile.id },
      });
      runInAction(() => (this.waitList = res.data));
    } catch (error) {
      console.error("fetchWaitlist: ", error);
    }
  };
}
const clientStore = new ClientStore();
// TODO: waitlist shows another user logs in. updates/disappears on refresh
clientStore.fetchWaitlist();
clientStore.fetchClients();
export default clientStore;
