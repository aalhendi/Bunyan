/* Imports */
import { makeAutoObservable } from "mobx";
import instance from "./instance";

class CompanyStore {
  /* Assign user */
  loading = true;
  company = null;

  constructor() {
    makeAutoObservable(this);
  }

  /* Fetch Company Profile */
  fetchCompany = async (userId) => {
    try {
      const companies = await instance.get("/companies");
      this.company = companies.data.find(
        (company) => company.userId === userId
      );
      this.loading = false;
    } catch (error) {
      console.error(error);
    }
  };
}
const companyStore = new CompanyStore();
export default companyStore;
