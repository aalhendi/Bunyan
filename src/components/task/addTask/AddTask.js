/* Libraries */
import { useState } from "react";
import Modal from "react-modal";
import { observer } from "mobx-react";
import taskStore from "../../../stores/taskStore";
import clientStore from "../../../stores/clientStore";

/* Client Store */

const AddTask = ({ isOpen, closeModal, contractId }) => {
  if (clientStore.loading) {
    <h1>Loading...</h1>;
  }

  /* Store Client Phone number  */
  const [task, setTask] = useState({
    name: "",
    description: "",
    status: 0,
    contractId: contractId,
    //TODO: CHANGEME
  });
  /* Style modal  */
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  const handleChange = (event) => {
    setTask({ ...task, [event.target.name]: event.target.value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    await taskStore.addTask(task);
    event.target.reset();
    closeModal();
    //TODO: LIVE RENDER WITHOUT RELOAD
    window.location.reload();
  };

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        style={customStyles}
        ariaHideApp={false}
      >
        <form onSubmit={handleSubmit}>
          <div className="row g-3 mb-3">
            <div className="col">
              <input
                name="name"
                type="text"
                className="form-control"
                placeholder="Task name"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mb-3">
            <input
              name="description"
              type="text"
              className="form-control"
              placeholder="Task Description"
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-dark w-100 d-grid mx-auto">
            Add Task
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default observer(AddTask);
