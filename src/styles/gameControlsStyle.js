import styled from "styled-components";
import { deviceSize } from "utilities";

export const GameControlsDiv = styled.div`
  padding: 15px;
  margin: auto;
  p {
    padding-top: 5px;
    text-align: center;
  }
  background-color: white;
  border-radius: 10px;
  height: 180px;
`;

export const GameControlsButtonDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 9vw;
`;

export const GameControlButton = styled.button`


  width: 125px;
  background-color: lightgreen;
  padding: 10px;
  margin-top: 5px;
  margin-bottom: 5px;
  border-radius: 10px;
  &:hover {
    background-color: orange;
    box-shadow: inset 0px 0px 30px #ccc;
  }
`;

export const DisplayGameStats = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px;
  margin: auto;
  p {
    padding-top: 5px;
    text-align: center;
  }
  background-color: white;
  border-radius: 10px;
  height: 180px;
  width: 9vw;
`;
