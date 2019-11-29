import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { deviceSize } from "utilities";

export const StyledLink = styled(NavLink)`
  @media ${deviceSize.laptop}{

  }
  @media ${deviceSize.tablet}{

  }
  @media ${deviceSize.mobile}{

  }
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
  ${({ type }) => type === "first" && "border-radius: 10px 0 0 10px"};
  ${({ type }) => type === "last" && "border-radius: 0 10px 10px 0"};
  &:hover {
    background-color: #eee;
    color: #333;
    box-shadow: inset 0px 0px 30px #ccc;
  }
`;

export const NavBarContainer = styled.div`
  @media ${deviceSize.laptop}{
    margin: 25px auto 25px auto;
    width: 700px;
    height: 38px;
  }
  @media ${deviceSize.tablet}{
    margin: 20px auto 20px auto;
    width: 560px;
    height: 30px;
  }
  @media ${deviceSize.mobile}{
    margin: 15px auto 15px auto;
    width: 420px;
    height: 23px;
  }
    display: flex;
    justify-content: center;
    padding: 0px;
`;
