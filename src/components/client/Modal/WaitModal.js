/* Libraries */
import Modal from "react-modal";

/* Client Store */

const WaitModal = (props) => {
  /* Store Client Phone number  */

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
  const handleSubmit = (event) => {
    event.preventDefault();
    /* ToDo: Add the client to waiting List */
    props.closeModal();
  };
  return (
    <div>
      <Modal
        isOpen={props.isOpen}
        onRequestClose={props.closeModal}
        contentLabel="Example Modal"
        style={customStyles}
      >
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-12">
            <input
              name="phoneNumber"
              type="tel"
              className="form-control"
              placeholder="Type client Number ..."
              minLength="7"
              maxLength="8"
              pattern="[0-9]+"
            />
          </div>
          <button type="submit" class="btn btn-outline-dark col-md-3 mx-auto">
            Add
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default WaitModal;
