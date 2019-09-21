import React, { useState } from "react";
import axios from "axios";
// import { CardsOnFire } from "images";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, ButtonGroup, Image } from "react-bootstrap";
import styled from "styled-components";

const GameControlsDiv = styled.div`
  height: 150px;
  width: 450px;
  margin: auto;
`;

function Blackjack() {
  const [deckId, setDeckId] = useState("");
  const [shuffled, setShuffled] = useState("");
  const [cardsRemaining, setCardsRemaining] = useState("");

  // Create a new deck of cards and store the deck id for future API calls
  function startNewGame() {
    axios.get(`https://deckofcardsapi.com/api/deck/new/`).then(result => {
      {
        result.data.success && console.log("The result was a success!!");
      }
      console.log("from the response: " + result.data.deck_id);
      setDeckId(result.data.deck_id);
      setShuffled(result.data.shuffled);
      setCardsRemaining(result.data.remaining);
    });
  }

  function drawCard() {
    axios
      .get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
      .then(result => {
        {
          result.data.success && console.log(`We successfully drew a card!!`);
        }
        setShuffled(result.data.shuffled);
        setCardsRemaining(result.data.remaining);
        console.log(
          "The API response is tracking that " +
            result.data.remaining +
            " cards are left in deck"
        );
      });
  }

  return (
    <GameControlsDiv>
      <ButtonGroup aria-label="Game Control Buttons" size="lg">
        <Button variant="secondary" onClick={startNewGame}>
          Get a new deck here!!!
        </Button>
        <Button variant="secondary" onClick={drawCard}>
          Draw a card
        </Button>
      </ButtonGroup>

      <p>The deck ID is: {deckId}</p>
      <p>Total cards remaining in the deck: {cardsRemaining}</p>
      {/* <Image src={CardsOnFire} rounded />
      <p>Photo by Julius Drost on Unsplash</p> */}
    </GameControlsDiv>
  );
}

export default Blackjack;
