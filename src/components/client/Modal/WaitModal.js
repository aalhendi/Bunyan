/* Imports */
import { useState } from "react";
import Modal from "react-modal";

/* State and Store */
import clientStore from "../../../stores/clientStore";
import authStore from "../../../stores/authStore";

const WaitModal = (props) => {
  /* Store Client Phone number  */
  const [client, setClient] = useState({
    phoneNumber: null,
    companyId: null,
    status: 0,
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    await clientStore.requestOnboardClient(client);
    props.closeModal();
  };

  if (authStore.loading) {
    return (
      <Modal
        isOpen={props.isOpen}
        onRequestClose={props.closeModal}
        contentLabel="Authstore loading Modal"
        style={customStyles}
        ariaHideApp={false}
      >
        <h1>Loading...</h1>
      </Modal>
    );
  }

  return (
    <div>
      <Modal
        isOpen={props.isOpen}
        onRequestClose={props.closeModal}
        contentLabel="Onboard Client Modal"
        style={customStyles}
        ariaHideApp={false}
      >
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-12">
            <input
              name="phoneNumber"
              type="tel"
              className="form-control"
              placeholder="Type Client Phone Number ..."
              minLength="7"
              maxLength="8"
              pattern="[0-9]+"
              onChange={(event) =>
                setClient({
                  ...client,
                  [event.target.name]: Number(event.target.value),
                })
              }
            />
          </div>
          <button
            type="submit"
            className="btn btn-outline-dark col-md-3 mx-auto"
          >
            Add
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default WaitModal;
