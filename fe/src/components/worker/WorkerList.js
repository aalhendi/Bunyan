/* Imports */
import React, { useState } from "react";

/* Components */
import AddWorker from "./Modal/AddWorker";
import WorkerItem from "./WorkerItem";

/* State and Store */
import authStore from "../../stores/authStore";
import workerStore from "../../stores/workerStore";
import { observer } from "mobx-react";

/* Styles */
import { CreateNew } from "./styles";

function WorkerList() {
  /* ToDo: Function to find all workers for the login user and pass props to worker item */
  /* Modal Function */
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  if (authStore.loading) {
    return <h1>Loading...</h1>;
  }
  const workerItem = workerStore.workers.map((worker) => (
    <WorkerItem worker={worker} key={worker.name} />
  ));
  return (
    <div className="d-md-flex h-md-100 align-items-center">
      {/* Left Side */}
      <div className="col-md-6 p-0  h-md-100 mx-auto">
        <CreateNew onClick={openModal} />
        <AddWorker isOpen={isOpen} closeModal={closeModal} />
        <div className="d-md-flex align-items-center h-100 p-5 text-center justify-content-center">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Worker Account</th>
              </tr>
            </thead>
            <tbody>{workerItem}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default observer(WorkerList);
