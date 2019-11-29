import styled from "styled-components";
import { deviceSize } from "utilities";

export const HomepageStyle = styled.div`
  @media ${deviceSize.laptop}{
    padding: 10px 34px;
    box-shadow: inset 0px 0px 30px #888;
    font-size: 12px;
    img {
      border-radius: 15px;
      padding: 10px;
    }
    h1 {
      color: white;
      text-transform: uppercase;
      font-size: 30px;
    }
  }
  @media ${deviceSize.tablet}{
    padding: 8px 27px;
    box-shadow: inset 0px 0px 24px #888;
    font-size: 10px;
    img {
      border-radius: 12px;
      padding: 8px;
    }
    h1 {
      color: white;
      text-transform: uppercase;
      font-size: 24px;
    }
  }
  @media ${deviceSize.mobile}{
    padding: 6px 20px;
    box-shadow: inset 0px 0px 18px #888;
    font-size: 7px;
    img {
      border-radius: 9px;
      padding: 6px;
    }
    h1 {
      color: white;
      text-transform: uppercase;
      font-size: 18px;
    }
  }

  text-align: center;
  font-family: helvetica;
  display: block;

  }
`;
