import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { NavDropdown } from "react-bootstrap"


export const NavDropDown = styled(NavDropdown)`
    @media (min-width: 992px) {
    margin-left: auto
  }
`;

export const LinkNav = styled(NavLink)`
    color: #fff;
    text-decoration: none;
    &.active {
    color: #71d1df;
  }
  :hover {
    color: #71d1df;
  }

`;