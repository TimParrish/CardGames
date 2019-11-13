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
import { CardsOnFire } from "images";

let player_pile = [];//cards the player has
let player_card = [];//card the player drew

let dealer_pile = [];//cards the dealer has
let dealer_card = [];//card the dealer drew

let winner = "no one.";

function War() {
  const [deckId, setDeckId] = useState("");
  const [shuffled, setShuffled] = useState("");
  const [cardsRemaining, setCardsRemaining] = useState("");
  const [, updateRender] = useState();
  const hiddenCardImage = CardsOnFire;
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
        }
        //console.log(player_pile);
        //console.log(dealer_pile);
      })
      .catch(error => console.log(error));
    })
    .catch(error => console.log(error));
  }

  async function draw() {
    console.log("\n\n");
    player_card = player_pile.pop();
    dealer_card = dealer_pile.pop();
//    dealer_card.imageURL = hiddenCardImage;
    updateRender(n => !n);
    computeFlipWinner();
    gameWon();
  }

  //computes who won the flip
  function computeFlipWinner(){
    //get player card value
    var player_score = getCardValue(player_card);

    //get deal card value
    var dealer_score = getCardValue(dealer_card);

    var i;
    if(player_score === dealer_score){//its a tie
      console.log("Tie");
      //for now the cards just go bak into the respective piles
      addCard(player_pile, player_card);
      addCard(dealer_pile, dealer_card);
    }
    else if(player_score > dealer_score){//player wins the flip
      console.log("Player wins this round");
      addCard(player_pile, player_card);
      addCard(player_pile, dealer_card);
    }
    else{//dealer wins
      console.log("Dealer wins this round");
      addCard(dealer_pile, player_card);
      addCard(dealer_pile, dealer_card);
    }
  }

  function getCardValue(card){
  switch(card.value){
    case "ACE"://highest card in the game
      return 14;
    case "KING":
      return 13;
    case "QUEEN":
      return 12;
    case "JACK":
      return 11;
    default:
      return player_card.value;
  }
  }

  function addCard(pile, card){
    var i
    for(i = pile.length; i > 0; i--)
      {
        pile[i] = pile[i-1];
      }
      pile[0] = card;
  }

  //checks if either player has an empty deck
  function gameWon(){
    if(player_pile.length === 0)
      winner = "the dealer.\nBetter luck next time.";
    if(dealer_pile.length === 0)
      winner = "the player.\nCongratulations! Please come again.";
  }

/*  function sleepDelay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }*/

  return (
    <>
      <DisplayCardsDiv>
        <DisplayHand type="player">
          <h2>Player Card</h2>
          {<img
            src={`${player_card.imageURL}`}
            alt={`${player_card.value}`}
          />/*player_card.map(card => {
            return (
              <img
                src={`${card.imageURL}`}
                alt={`${card.value} of ${card.suit}`}
              />
            );
          })*/}
        </DisplayHand>
        <DisplayHand>
          <h2>Dealer Card</h2>
          {<img
            src={`${dealer_card.imageURL}`}
            alt={`${dealer_card.value}`}
          />/*dealer_card.map(card => {
            return (
              <img
                src={`${card.imageURL}`}
                alt={`${card.value} of ${card.suit}`}
              />
            );
          })*/}
        </DisplayHand>
      </DisplayCardsDiv>

      <GameControlsDiv>
        <GameControlsButtonDiv>
          <GameControlButton onClick={startNewGame}>New Game</GameControlButton>
          <GameControlButton onClick={draw}>Hit</GameControlButton>
        </GameControlsButtonDiv>
        <h1>Welcome to WAR!</h1>
        <p>The deck ID is: {deckId}</p>
        <p>Player has: {player_pile.length} cards.</p>
        <p>Dealer has: {dealer_pile.length} cards.</p>
        <p>The winner of this game is: {winner}</p>
      </GameControlsDiv>
    </>
  );
}

export default War;
