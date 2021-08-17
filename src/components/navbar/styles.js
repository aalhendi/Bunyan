import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const Nav = styled.nav`
    background-color: #5588A3;
`;

export const LinkNav = styled(NavLink)`
    color: #fff;
    &.active {
    color: #71d1df;
  }

`;