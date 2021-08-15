/* Global Libraries */
import { makeAutoObservable } from 'mobx';
import decode from "jwt-decode";

import instance from "./instance";

class AuthStore {
    /* Assign user */
    user = null;

    constructor() {
        makeAutoObservable(this)
    };

    /* Create New Contractor */
    createUser = async (newUser) => {
        try {
            const res = await instance.post("/register", newUser)
            this.setUser(res.data.token)
        } catch (error) {
            console.error(error) // error message 
        }
    };

    /* Login Contractor */
    signin = async (userData) => {
        try {
            const res = await instance.post("/login", userData)
            this.setUser(res.data.token)
        } catch (error) {
            console.error(error);
        }
    };

    /* Signout Contractor */
    signout = () => {
        delete instance.defaults.headers.common.Authorization;
        localStorage.removeItem("myToken")
        this.user = null;
    };

    /* set contractor token in local storage */
    setUser = (token) => {
        localStorage.setItem("myToken", token)
        instance.defaults.headers.common.Authorization = `Bearer ${token}`
        this.user = decode(token);
    };

    /* Check the Contractor Token */
    checkForToken = () => {
        const token = localStorage.getItem("myToken");
        if (token) {
            const currentTime = Date.now();
            const user = decode(token);
            if (user.exp >= currentTime) {
                this.setUser(token);
            } else {
                this.signout();
            }
        }
    }

}
const authStore = new AuthStore() // create instance
authStore.checkForToken()
export default authStore; // export it 