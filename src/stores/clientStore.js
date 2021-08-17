import { makeAutoObservable } from 'mobx';
import instance from "./instance";


class ClientStore {
    /* find all clients */
    clients = [];
    /* find all waiting list */
    waitList = []
    loading = true;

    constructor() {
        makeAutoObservable(this)
    }
    /* Read the Clients */
    /* ToDo: find only the client related to the login user */
    fetchClient = async () => {
        try {
            const response = await instance.get("/clients");
            this.clients = response.data;
            this.loading = false
        } catch (error) {
            console.error("fetchClient: ", error);
        }
    };
    /* Add new Client in the waiting list */
    /* ToDo: Add client in the login user waiting list */

    newClientWait = async (newVendors) => {
        try {
            const response = await instance.post("/waitlist", newVendors)
            this.waitList.push(response.data); // push the data from resonse to API
        } catch (error) {
            console.error(error) // error message 
        }
    }
}
const clientStore = new ClientStore() // create instance
clientStore.fetchVendors();
export default clientStore; // export it 