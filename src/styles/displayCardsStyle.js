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
  }
`;

export const DisplayGameStats = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  margin: auto;
  p {
    padding-top: 5px;
    text-align: center;
  }
  background-color: white;
  border-radius: 10px;
  height: 200px;
  width: 9vw;
`;
