import React from 'react';
import authStore from '../../stores/authStore';
import { LinkNav, Nav } from './styles';


function Navbar() {
    /* logout and redirect to login page */
    return (
        <Nav className="navbar navbar-expand-lg d-flex">
            <div className="container-fluid ">
                <i className="navbar-brand">Navbar</i>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav align-items-center">
                        <li className="nav-item">
                            <LinkNav className="nav-link" exact to="/">Home</LinkNav>
                        </li>
                        <li className="nav-item">
                            <LinkNav className="nav-link" to="/clientlist">Clients</LinkNav>
                        </li>
                        <li className="nav-item">
                            <LinkNav className="nav-link" to="/worker">Wrokers</LinkNav>
                        </li>
                        {/* Check if possible to have logout  and link to login*/}
                        <li className="nav-item">
                            <LinkNav onClick={() => authStore.logout()} to="/login" className="float-end">Logout</LinkNav>
                        </li>
                    </ul>
                </div>
            </div>
        </Nav>
    );
}

export default Navbar;