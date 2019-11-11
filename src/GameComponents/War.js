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

let player_pile = [];//cards the player has
let player_card = [];//card the player drew

let dealer_pile = [];//cards the dealer has
let dealer_card = [];//card the dealer drew

function War() {
  const [deckId, setDeckId] = useState(0);
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
        console.log(result.data.deck_id)
        deckId = result.data.deck_id;
        //clear the cards in the player and dealer hands
        player_pile = [];
        dealer_pile = [];
        //split the cards evenly between player and dealer
        splitDeck();
      })
      .catch(error => console.log(error));
  }

  function splitDeck() {
    axios
      .get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
      .then(result => {
        result.data.success && console.log("The split was a success!!");
        var i;
        for(i=0; i<result.data.remaining/2; i+=2) {
          let card = result.data.cards[i];
          //create a card object to push onto the player hand
          let drawn_card1 = {
            value: `${card.value}`,
            suit: `${card.suit}`,
            imageURL: `${card.image}`,
            cardCode: `${card.code}`
          };

          card = result.data.cards[i+1];
          //create a card object to push onto the dealer hand
          let drawn_card2 = {
            value: `${card.value}`,
            suit: `${card.suit}`,
            imageURL: `${card.image}`,
            cardCode: `${card.code}`
          };

          //add 1 card to both player and dealer piles
          player_pile.push(drawn_card1)
          console.log(drawn_card1.value)
          dealer_pile.push(drawn_card2)
          console.log(drawn_card2.value)
        }
      })
  }

  function draw() {
    player_card = player_pile[Math.round(Math.random() * player_pile.length)]
    dealer_card = dealer_pile[Math.round(Math.random() * dealer_pile.length)]
//    console.log(player_card.value)
//    console.log(dealer_card.value)
  }

  return (
    <>
      <DisplayCardsDiv>
        <DisplayHand type="player">
          <h2>Player Card</h2>
          {player_card.map(card => {
            return (
              <img
                src={`${card.imageURL}`}
                alt={`${card.value} of ${card.suit}`}
              />
            );
          })}
        </DisplayHand>
        <DisplayHand>
          <h2>Dealer Card</h2>
          {dealer_card.map(card => {
            return (
              <img
                src={`${card.imageURL}`}
                alt={`${card.value} of ${card.suit}`}
              />
            );
          })}
        </DisplayHand>
      </DisplayCardsDiv>

      <GameControlsDiv>
        <GameControlsButtonDiv>
          <GameControlButton onClick={startNewGame}>New Game</GameControlButton>
          <GameControlButton onClick={draw}>Hit</GameControlButton>
          <GameControlButton>Dealer Draw</GameControlButton>
        </GameControlsButtonDiv>
        <h1>Welcome to WAR!</h1>
        <p>The deck ID is: {deckId}</p>
        <p>Player has: {player_pile.length} cards.</p>
        <p>Dealer has: {dealer_pile.length} cards.</p>
      </GameControlsDiv>
    </>
  );
}

export default War;
