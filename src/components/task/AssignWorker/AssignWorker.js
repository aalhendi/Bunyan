/* Libraries */
import { useState } from "react";
import Modal from "react-modal";
import { observer } from "mobx-react";
import { Form } from "react-bootstrap";

/* Client Store */

const AssignWorker = (props) => {
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
        console.log(event.target.id)
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
                <form className="row g-3" onSubmit={handleSubmit}>
                    <div className="col-md-12">
                        {props.worker !== null ? (
                            props.worker.map(worker =>
                                <Form.Check
                                    block="true"
                                    label={worker.name}
                                    name="worker"
                                    type="radio"
                                    value={worker}
                                    onChange={handleChange}
                                    id={worker.id}
                                    key={worker.id}
                                />
                            )
                        ) : (
                            <h3 className="text-center">Dont have any Worker</h3>
                        )}
                    </div>
                    <button type="submit" class="btn btn-outline-dark col-12 mx-auto">
                        Add
                    </button>
                </form>
            </Modal>
        </div>
    );
};

export default observer(AssignWorker);
