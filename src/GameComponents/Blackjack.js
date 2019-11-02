import React, { useState } from "react";
import axios from "axios";
// import { CardsOnFire } from "images";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, ButtonGroup } from "react-bootstrap";
import styled from "styled-components";
import { DisplayCardsInHand, DisplayCardsDiv, GameControlsDiv } from "styles";

let player_hand = [];
let dealer_hand = [];

const GroupOfButtons = styled(ButtonGroup)`
  ${"" /* background-color: red; */}
  padding-top: 8 px;
  padding-left: 100px;
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
      .get(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`)
      .then(result => {
        result.data.success && console.log("The result was a success!!");

        setDeckId(result.data.deck_id);
        setShuffled(result.data.shuffled);
        setCardsRemaining(result.data.remaining);
        //clear the cards in the players hands
        player_hand = [];
        dealer_hand = [];
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
          //create a card object to push onto the player or dealer hand
          let drawn_card = {
            value: `${card.value}`,
            suit: `${card.suit}`,
            imageURL: `${card.image}`,
            cardCode: `${card.code}`
          };
          player_hand.push(drawn_card);
          console.log("The card from the players hand is:");
          // console.log(player_hand[0]);
          console.log(player_hand);
        } catch (err) {
          console.log("failed to parse JSON for desired values");
        }
      });
  }
  function drawDealer() {
    axios
      .get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
      .then(result => {
        result.data.success && console.log(`We successfully drew cards!!`);

        setShuffled(result.data.shuffled);
        setCardsRemaining(result.data.remaining);
        try {
          let card = result.data.cards[0];
          //create a card object to push onto the player or dealer hand
          let drawn_card = {
            value: `${card.value}`,
            suit: `${card.suit}`,
            imageURL: `${card.image}`,
            cardCode: `${card.code}`
          };
          dealer_hand.push(drawn_card);
          console.log("The card from the players hand is:");
          // console.log(player_hand[0]);
          console.log(dealer_hand);
        } catch (err) {
          console.log("failed to parse JSON for desired values");
        }
      });
  }

  // TODO: add logic to compute hand values here
  function computeHand() {
    //clear cards in hand
  }

  return (
    <>
      <DisplayCardsDiv>
        <DisplayCardsInHand type="player">
          <h2>Player Cards</h2>
          {player_hand[0] && (
            <img
              src={`${player_hand[0].imageURL}`}
              alt={`${player_hand[0].value} of ${player_hand[0].suit}`}
            />
          )}
          {player_hand[1] && (
            <img
              src={`${player_hand[1].imageURL}`}
              alt={`${player_hand[1].value} of ${player_hand[1].suit}`}
            />
          )}
          {player_hand[2] && (
            <img
              src={`${player_hand[2].imageURL}`}
              alt={`${player_hand[2].value} of ${player_hand[2].suit}`}
            />
          )}{" "}
          {player_hand[3] && (
            <img
              src={`${player_hand[3].imageURL}`}
              alt={`${player_hand[3].value} of ${player_hand[3].suit}`}
            />
          )
          /* player_hand.map(card => {
              <img src={card.imageURL} />;
            }) */
          }
        </DisplayCardsInHand>
        <DisplayCardsInHand>
          <h2>Dealer Cards</h2>
          {dealer_hand[0] && (
            <img
              src={`${dealer_hand[0].imageURL}`}
              alt={`${dealer_hand[0].value} of ${dealer_hand[0].suit}`}
            />
          )}
          {dealer_hand[1] && (
            <img
              src={`${dealer_hand[1].imageURL}`}
              alt={`${dealer_hand[1].value} of ${dealer_hand[1].suit}`}
            />
          )}
          {dealer_hand[2] && (
            <img
              src={`${dealer_hand[2].imageURL}`}
              alt={`${dealer_hand[2].value} of ${dealer_hand[2].suit}`}
            />
          )}{" "}
          {dealer_hand[3] && (
            <img
              src={`${dealer_hand[3].imageURL}`}
              alt={`${dealer_hand[3].value} of ${dealer_hand[3].suit}`}
            />
          )}
        </DisplayCardsInHand>
      </DisplayCardsDiv>

      <GameControlsDiv>
        <GroupOfButtons aria-label="Game Control Buttons" size="lg">
          <Button variant="secondary" onClick={startNewGame}>
            New Game
          </Button>
          <Button variant="secondary" onClick={drawCard}>
            Hit
          </Button>
          <Button variant="secondary" onClick={drawDealer}>
            Dealer Draw
          </Button>
        </GroupOfButtons>

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
