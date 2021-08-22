import React from "react";
import authStore from "../../stores/authStore";
import { LinkNav, NavDropDown } from "./styles";

import { observer } from "mobx-react";


import { Navbar, Container, Nav } from "react-bootstrap"

function NavBar() {
  if (authStore.loading) { <h1>Loading</h1> }
  /* logout and redirect to login page */
  return (
    <Navbar expand="lg" style={{ backgroundColor: "#5588A3" }}>
      <Container>
        {/* Brand Logo */}
        <Navbar.Brand>Bunyan</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-na">
          <Nav className="me-auto w-100">
            <Nav.Link><LinkNav exact to="/">Home</LinkNav></Nav.Link>
            <Nav.Link><LinkNav to="/clientList">Client</LinkNav></Nav.Link>
            <Nav.Link><LinkNav to="/workerList">Worker</LinkNav></Nav.Link>
            <NavDropDown title={`${authStore.user.profile.name}`} id="basic-nav-dropdown" className="text-dark">
              <NavDropDown.Item className="p-0"><LinkNav className="d-block p-1 text-dark" to="/profile">Profile</LinkNav></NavDropDown.Item>
              <NavDropDown.Divider />
              <NavDropDown.Item className="p-0"><LinkNav className="d-block p-1 text-dark" onClick={() => authStore.logout()} to="/login">logout</LinkNav></NavDropDown.Item>
            </NavDropDown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default observer(NavBar);
