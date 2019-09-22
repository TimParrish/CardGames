import React, { useState } from "react";
import axios from "axios";
// import { CardsOnFire } from "images";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, ButtonGroup } from "react-bootstrap";
import styled from "styled-components";

let player_hand = [];
// let dealer_hand = new Array();

const GameControlsDiv = styled.div`
  height: 150px;
  width: 450px;
  margin: auto;
`;

const DisplayCardsDiv = styled.div`
  height: 350px;
  width: 850px;
  margin: auto;
`;

const DisplayPlayerCards = styled.div`
  width: 400px;
  float: left;
  background-color: green;
  img {
    height: 30%;
    width: 30%;
    float: left;
  }
  padding: 10px;
`;
const DisplayDealerCards = styled.div`
  width: 400px;
  float: right;
  background-color: teal;
  img {
    height: 30%;
    width: 30%;
    float: left;
  }
  padding: 10px;
`;
function Blackjack() {
  const [deckId, setDeckId] = useState("");
  const [shuffled, setShuffled] = useState("");
  const [cardsRemaining, setCardsRemaining] = useState("");
  //   const [playerNumberWins, setPlayerNumberWins] = useState(0);
  //   const [dealerNumberWins, setDealerNumberWins] = useState(0);
  void shuffled;

  // Create a new deck of cards and store the deck id for future API calls
  function startNewGame() {
    axios
      .get(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6`)
      .then(result => {
        result.data.success && console.log("The result was a success!!");

        setDeckId(result.data.deck_id);
        setShuffled(result.data.shuffled);
        setCardsRemaining(result.data.remaining);
      })
      .catch(error => console.log(error));
  }

  function drawCard() {
    axios
      .get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
      .then(result => {
        result.data.success && console.log(`We successfully drew cards!!`);

        setShuffled(result.data.shuffled);
        setCardsRemaining(result.data.remaining);
        try {
          let card = result.data.cards[0];
          let drawn_card = {
            value: `${card.value}`,
            suit: `${card.suit}`,
            imageURL: `${card.image}`,
            cardCode: `${card.code}`
          };
          player_hand.push(drawn_card);
          console.log(player_hand[0]);
        } catch (err) {
          console.log("failed to parse JSON for desired values");
        }
      });
  }

  function computeHand() {
    console.log("TODO: add logic for the game here");
    //clear cards in hand
  }

  return (
    <>
      <DisplayCardsDiv>
        <DisplayPlayerCards>
          <img
            src={`https://deckofcardsapi.com/static/img/5D.png`}
            // src={`${player_hand[0].imageURL}`}
            alt={"hello"}
            // alt={`${player_hand[0].value} of ${player_hand[0].suit}`}
          />
          <img
            src={`https://deckofcardsapi.com/static/img/8C.png`}
            // src={`${player_hand[0].imageURL}`}
            alt={"hello"}
            // alt={`${player_hand[0].value} of ${player_hand[0].suit}`}
          />
        </DisplayPlayerCards>
        <DisplayDealerCards>
          <img
            src={`https://deckofcardsapi.com/static/img/AH.png`}
            // src={`${player_hand[0].imageURL}`}
            alt={"hello"}
            // alt={`${player_hand[0].value} of ${player_hand[0].suit}`}
          />
        </DisplayDealerCards>
      </DisplayCardsDiv>

      <GameControlsDiv>
        <ButtonGroup aria-label="Game Control Buttons" size="lg">
          <Button variant="secondary" onClick={startNewGame}>
            New Game
          </Button>
          <Button variant="secondary" onClick={drawCard}>
            Hit
          </Button>
          <Button variant="secondary" onClick={computeHand}>
            Stay
          </Button>
        </ButtonGroup>

        <p>The deck ID is: {deckId}</p>
        <p>Total cards remaining in the deck: {cardsRemaining}</p>

        {/* <p>{data}</p> */}
        {/* <Image src={CardsOnFire} rounded />
      <p>Photo by Julius Drost on Unsplash</p> */}
      </GameControlsDiv>
    </>
  );
}

export default Blackjack;
