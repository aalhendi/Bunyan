/* Imports */
import React, { useState } from "react";

/* Components */
import WaitModal from "./Modal/WaitModal";
import ClientWait from "./ClientWait";
import ClientItem from "./ClientItem";

/*Styles*/
import { CreateNew } from "./styles";

/* State and Store */
import { observer } from "mobx-react";
import clientStore from "../../stores/clientStore";
import authStore from "../../stores/authStore";

const ClientList = () => {
  /* Modal Function */
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  if (authStore.loading || clientStore.loading) {
    return <h1> Loading...</h1>;
  }

  const clientList = clientStore.clients.map((client) => {
    return (
      <tbody>
        <ClientItem client={client} />
      </tbody>
    );
  });

  return (
    <div className="d-md-flex h-md-100 align-items-center">
      {/* Left Side */}
      <div className="col-md-8 p-0  h-md-100">
        <div className="d-md-flex align-items-center h-100 p-5 text-center justify-content-center">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Client Name</th>
                <th scope="col">Progressive</th>
              </tr>
            </thead>
            {clientList}
          </table>
        </div>
      </div>

      {/* Right Side */}
      <div className="col-md-4 p-0 h-md-100 loginarea">
        <div className="align-items-center h-md-100 h-100 p-5 text-center justify-content-center">
          <CreateNew onClick={openModal} />
          <WaitModal isOpen={isOpen} closeModal={closeModal} />
          {/* Waiting List  */}
          <div className="card">
            <div className="card-header">Wating List</div>
            <ul className="list-group list-group-flush">
              <ClientWait clients={clientStore.waitList} />
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(ClientList);
