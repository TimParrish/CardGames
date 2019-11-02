import React, { useState } from "react";
import axios from "axios";
// import { CardsOnFire } from "images";
import styled from "styled-components";
import {
  DisplayHand,
  DisplayCardsDiv,
  GameControlsDiv,
  GameControlsButtonDiv,
  GameControlButton
} from "styles";

let player_hand = [];
let dealer_hand = [];

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
        <DisplayHand type="player">
          <h2>Player Cards</h2>
          {player_hand.map((card, i) => {
            return (
              <img
                src={`${player_hand[i].imageURL}`}
                alt={`${player_hand[i].value} of ${player_hand[i].suit}`}
              />
            );
          })}
        </DisplayHand>
        <DisplayHand>
          <h2>Dealer Cards</h2>
          {dealer_hand.map((card, i) => {
            return (
              <img
                src={`${dealer_hand[i].imageURL}`}
                alt={`${dealer_hand[i].value} of ${dealer_hand[i].suit}`}
              />
            );
          })}
        </DisplayHand>
      </DisplayCardsDiv>

      <GameControlsDiv>
        <GameControlsButtonDiv>
          <GameControlButton onClick={startNewGame}>New Game</GameControlButton>
          <GameControlButton onClick={drawCard}>Hit</GameControlButton>
          <GameControlButton onClick={drawDealer}>
            Dealer Draw
          </GameControlButton>
        </GameControlsButtonDiv>
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
