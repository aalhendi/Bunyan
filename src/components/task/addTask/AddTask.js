/* Libraries */
import { useState } from "react";
import Modal from "react-modal";
import { observer } from "mobx-react";

/* Client Store */

const AddTask = (props) => {
    /* Store Client Phone number  */
    const [worker, setWorker] = useState("")
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
        setWorker(event.target.value)
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        /* ToDo: Assign the worker in the task */
        console.log(worker)
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
                <form onSubmit={handleSubmit}>
                    <div className="row g-3 mb-3">
                        <div className="col">
                            <input
                                name="username"
                                type="text"
                                className="form-control"
                                placeholder="Username"
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="mb-3">
                        <input
                            name="password"
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-dark w-100 d-grid mx-auto">
                        Login
                    </button>
                </form>
            </Modal>
        </div>
    );
};

export default observer(AddTask);
