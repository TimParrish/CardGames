import React, { useState } from "react";
import axios from "axios";
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

function War() {
  const [deckId, setDeckId] = useState("");
  const [shuffled, setShuffled] = useState("");
  const [cardsRemaining, setCardsRemaining] = useState("");
  const [, updateRender] = useState();
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
          <GameControlButton>Hit</GameControlButton>
          <GameControlButton>Dealer Draw</GameControlButton>
        </GameControlsButtonDiv>
        <h1>Welcome to WAR!</h1>
        <p>The deck ID is: {deckId}</p>
        <p>Total cards remaining in the deck: {cardsRemaining}</p>
      </GameControlsDiv>
    </>
  );
}

export default War;
