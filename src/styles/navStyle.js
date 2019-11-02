import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const StyledLink = styled(NavLink)`
  font-size: 12px;
  color: white;
  font-family: helvetica;
  text-transform: uppercase;
  text-decoration: none;
  background-color: darkgreen;
  display: block;
  padding: 10px 34px;
  transition: all 1s linear;
  box-shadow: inset 0px 0px 30px #888;
  border-right: ${({ type }) => (type === "last" ? "0" : "1px solid #ccc")};
  &:hover {
    background-color: #eee;
    color: #333;
    box-shadow: inset 0px 0px 30px #ccc;
  }
`;

export const NavBarContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 25px auto 25px auto;
  width: 700px;
  height: 38px;
  padding: 0px;
`;
