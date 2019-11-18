import styled from "styled-components";

export const DisplayCardsDiv = styled.div`
  width: 850px;
  margin: auto;
  display: flex;
  flex-direction: row;
`;

export const DisplayHand = styled.div`
  width: 400px;
  ${"" /* float: ${({ type }) => (type === "player" ? "left" : "right")}; */}
  background-color: ${({ type }) =>
    type === "player" ? "darkgreen" : "#4F265B"};
  h2 {
    text-align: center;
    background-color: lightgrey;
  }
  img {
    padding: 5px;
    height: 175px;
    width: 123px;
    float: left;
    border-radius: 10px;
  }
`;
