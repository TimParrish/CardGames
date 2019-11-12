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
  const [deckId, setDeckId] = useState("");
  const [shuffled, setShuffled] = useState("");
  const [cardsRemaining, setCardsRemaining] = useState("");
  const [, updateRender] = useState();
  var curDeck;
  //   const [playerNumberWins, setPlayerNumberWins] = useState(0);
  //   const [dealerNumberWins, setDealerNumberWins] = useState(0);
  void shuffled;

  // Create a new deck of cards and store the deck id for future API calls
  function startNewGame() {
    axios
    .get(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`)
    .then(result => {
      result.data.success && console.log("Deck obtained");

      setDeckId(result.data.deck_id);
      setShuffled(result.data.shuffled);
      setCardsRemaining(result.data.remaining);
      curDeck = result.data.deck_id;
      //clear the cards in the player and dealer hands
      player_pile = [];
      dealer_pile = [];
      //split the deck
      axios
      .get(`https://deckofcardsapi.com/api/deck/${curDeck}/draw/?count=52`)
      .then(result => {
        result.data.success && console.log("Beginning split");

        var i;
        for(i=0; i<52; i+=2) {
          let card1 = result.data.cards[i];
          //create a card object to push onto the player hand
          let drawn_card1 = {
            value: `${card1.value}`,
            suit: `${card1.suit}`,
            imageURL: `${card1.image}`,
            cardCode: `${card1.code}`
          };

          let card2 = result.data.cards[i+1];
          //create a card object to push onto the dealer hand
          let drawn_card2 = {
            value: `${card2.value}`,
            suit: `${card2.suit}`,
            imageURL: `${card2.image}`,
            cardCode: `${card2.code}`
          };

          //add 1 card to both player and dealer piles
          player_pile.push(drawn_card1)
          dealer_pile.push(drawn_card2)
          console.log(player_pile[i]);
        }
      })
      .catch(error => console.log(error));
    })
    .catch(error => console.log(error));
  }

  function draw() {
    player_card = player_pile.pop()
    dealer_card = dealer_pile.pop()
    console.log("Player flipped over " + player_card.value)
    console.log("Dealer flipped over " + dealer_card.value)
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
