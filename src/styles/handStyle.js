import styled from "styled-components";

export const DisplayCardsInHand = styled.div`
  width: 400px;
  float: ${({ type }) => (type === "player" ? "left" : "right")};
  background-color: ${({ type }) =>
    type === "player" ? "darkgreen" : "#4F265B"};
  h2 {
    text-align: center;
    background-color: lightgrey;
  }
  img {
    height: 30%;
    width: 30%;
    float: left;
  }
  padding: 10px;
`;
