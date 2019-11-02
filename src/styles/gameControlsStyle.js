import styled from "styled-components";

export const GameControlsDiv = styled.div`
  padding: 15px;
  width: 450px;
  margin: auto;
  p {
    padding-top: 5px;
    text-align: center;
  }
  background-color: white;
  border-radius: 10px;
`;

export const GameControlsButtonDiv = styled.div`
  height: 40px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const GameControlButton = styled.button`
  width: 125px;
  background-color: lightgreen;
  padding: 10px;
  margin-top: 10px;
  border-radius: 5px;
  &:hover {
    background-color: orange;
    box-shadow: inset 0px 0px 30px #ccc;
  }
`;
