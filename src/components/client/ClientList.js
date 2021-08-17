
import React, { useState } from 'react';
import ClientItem from './ClientItem';
import ClientWait from './ClientWait';
import WaitModal from './Modal/WaitModal';
import { CreateNew } from './styles';

function ClientList() {
    /* ToDo: Function to find all clients for the login user and pass props to Client item */
    const clientItem = <ClientItem />

    /* ToDo: Function to find all waiting client for the login user and pass props to Client wait */
    const clientWait = <ClientWait />

    /* Modal Function */
    const [isOpen, setIsOpen] = useState(false)
    const openModal = () => { setIsOpen(true) };
    const closeModal = () => { setIsOpen(false) }
    return (
        <div className="d-md-flex h-md-100 align-items-center">
            {/* Left Side */}
            <div className="col-md-8 p-0  h-md-100">
                <div className="d-md-flex align-items-center h-100 p-5 text-center justify-content-center">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Client Name</th>
                                <th scope="col">Progressive</th>
                            </tr>
                        </thead>
                        <tbody >
                            {clientItem}
                        </tbody>
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
                        <div className="card-header">
                            Wating List
                        </div>
                        <ul className="list-group list-group-flush">
                            {clientWait}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ClientList;