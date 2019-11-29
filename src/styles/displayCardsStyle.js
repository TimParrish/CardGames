import styled from "styled-components";
import { deviceSize } from "utilities";

export const DisplayCardsDiv = styled.div`
  @media ${deviceSize.laptop}{
    width: 850px;

  }
  @media ${deviceSize.tablet}{
    width: 680px;
  }
  @media ${deviceSize.mobile}{
    width: 510px;
  }

  margin: auto;
  display: flex;
  flex-direction: row;
`;

export const DisplayHand = styled.div`
  @media ${deviceSize.laptop}{
    width: 400px;
    img {
      padding: 5px;
      height: 175px;
      width: 123px;
      float: left;
      border-radius: 10px;
    }

  }
  @media ${deviceSize.tablet}{
    width: 320px;
    img {
      padding: 4px;
      height: 140px;
      width: 98px;
      float: left;
      border-radius: 8px;
    }
  }
  @media ${deviceSize.mobile}{
    width: 240px;
    img {
      padding: 3px;
      height: 105px;
      width: 74px;
      float: left;
      border-radius: 6px;
    }
  }
  ${"" /* float: ${({ type }) => (type === "player" ? "left" : "right")}; */}
  background-color: ${({ type }) =>
    type === "player" ? "darkgreen" : "#4F265B"};
  h2 {
    text-align: center;
    background-color: lightgrey;
  }

`;