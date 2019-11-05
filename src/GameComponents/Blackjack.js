import React, { useState } from "react";
import axios from "axios";
import { CardsOnFire } from "images";
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
  const [deckId, setDeckId] = useState(0);
  const [cardsRemaining, setCardsRemaining] = useState(0);
  const [playerHandValue, setPlayerHandValue] = useState(0);
  const [dealerHandValue, setDealerHandValue] = useState(0);
  const [playerAceCount, setPlayerAceCount] = useState(0);
  const [dealerAceCount, setDealerAceCount] = useState(0);
  const [playerNumberWins, setPlayerNumberWins] = useState(0);
  const [dealerNumberWins, setDealerNumberWins] = useState(0);
  const [dealerFirstCardURL, setDealerFirstCardURL] = useState("");
  const [dealerCardHidden, setDealerCardHidden] = useState(true);
  const [, updateRender] = useState("");
  const hiddenCardImage = CardsOnFire;

  // Create a new deck of cards and store the deck id for future API calls
  function startNewGame() {
    axios
      .get(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6`)
      .then(result => {
        result.data.success && console.log("The result was a success!!");

        setDeckId(result.data.deck_id);
        setCardsRemaining(result.data.remaining);
        newRound();
      })
      .catch(error => console.log(error));
  }

  function newRound() {
    player_hand = [];
    dealer_hand = [];
    setPlayerAceCount(0);
    setDealerAceCount(0);
    setDealerHandValue(0);
    setPlayerHandValue(0);
    setDealerCardHidden("");
    updateRender(n => !n);
  }

  function drawCard() {
    axios
      .get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
      .then(result => {
        result.data.success && console.log(`We successfully drew cards!!`);

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
          switch (card.value) {
            case "ACE":
              setPlayerHandValue(Number(11) + playerHandValue);
              setPlayerAceCount(Number(1) + playerAceCount);
              break;
            case "KING":
              setPlayerHandValue(Number(10) + playerHandValue);
              break;
            case "QUEEN":
              setPlayerHandValue(Number(10) + playerHandValue);
              break;
            case "JACK":
              setPlayerHandValue(Number(10) + playerHandValue);
              break;
            default:
              setPlayerHandValue(Number(card.value) + playerHandValue);
              break;
          }
          player_hand.push(drawn_card);
          updateRender(n => !n);
          if (playerHandValue > 21) {
            computeHand();
          }
        } catch (err) {
          console.log("failed to parse JSON for desired values");
        }
      });
  }

  function playerStay() {
    //show dealer card
    if (dealerCardHidden === true) {
      console.log(setDealerFirstCardURL);
      dealer_hand[0].imageURL = dealerFirstCardURL;
      setDealerCardHidden(false);
      updateRender(n => !n);
    }
    if (dealerHandValue < 16) {
      drawDealer();
    } else {
      //dealer draws
      computeHand();
    }
  }

  async function computeHand() {
    if (playerHandValue > 21) {
      if (playerAceCount > 0) {
        setPlayerAceCount(playerAceCount - 1);
        setPlayerHandValue(playerHandValue - 10);
        console.log("used an Ace to save yourself");
      } else {
        console.log("the player busted!!!");
        setDealerNumberWins(dealerNumberWins + 1);
        await sleepDelay(3000);
        newRound();
      }
    } else if (dealerHandValue > 21) {
      if (dealerAceCount > 0) {
        setDealerAceCount(dealerAceCount - 1);
        setDealerHandValue(dealerHandValue - 10);
        console.log("dealer used an Ace to save themself");
      } else {
        console.log("the dealer busted!!");
        setPlayerNumberWins(playerNumberWins + 1);
        await sleepDelay(3000);
        newRound();
      }
    } else if (playerHandValue === dealerHandValue) {
      console.log("push");
      await sleepDelay(3000);
      newRound();
    } else if (playerHandValue > dealerHandValue) {
      setPlayerNumberWins(playerNumberWins + 1);
      console.log("Player wins!!");
      await sleepDelay(3000);
      newRound();
    } else {
      setDealerNumberWins(dealerNumberWins + 1);
      console.log("Dealer wins...");
      await sleepDelay(3000);
      newRound();
    }
  }

  function drawDealer() {
    axios
      .get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
      .then(result => {
        result.data.success && console.log(`We successfully drew cards!!`);

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
          switch (card.value) {
            case "ACE":
              setDealerHandValue(Number(11) + dealerHandValue);
              setDealerAceCount(Number(1) + dealerAceCount);
              break;
            case "KING":
              setDealerHandValue(Number(10) + dealerHandValue);
              break;
            case "QUEEN":
              setDealerHandValue(Number(10) + dealerHandValue);
              break;
            case "JACK":
              setDealerHandValue(Number(10) + dealerHandValue);
              break;
            default:
              setDealerHandValue(Number(card.value) + dealerHandValue);
              break;
          }
          dealer_hand.push(drawn_card);
          if (dealer_hand.length == 1) {
            setDealerFirstCardURL(dealer_hand[0].imageURL);
            dealer_hand[0].imageURL = hiddenCardImage;
            setDealerCardHidden(true);
          }
          updateRender(n => !n);
          if (dealerHandValue > 21) {
            computeHand();
          }
        } catch (err) {
          console.log("failed to parse JSON for desired values");
        }
      });
  }

  function sleepDelay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  return (
    <>
      <DisplayCardsDiv>
        <DisplayHand type="player">
          <h2>Player Cards</h2>
          {player_hand.map(card => {
            return (
              <img
                src={`${card.imageURL}`}
                alt={`${card.value} of ${card.suit}`}
              />
            );
          })}
        </DisplayHand>
        <DisplayHand>
          <h2>Dealer Cards</h2>
          {dealer_hand.map(card => {
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
          <GameControlButton onClick={playerStay}>Stay</GameControlButton>
          <GameControlButton onClick={drawCard}>Hit</GameControlButton>
          <GameControlButton onClick={drawDealer}>
            Dealer Draw
          </GameControlButton>
        </GameControlsButtonDiv>
        <p>The deck ID is: {deckId}</p>
        <p>Total cards remaining in the deck: {cardsRemaining}</p>
        <p>Player hand value: {playerHandValue}</p>
        <p>Dealer hand value: {dealerHandValue}</p>
        <p>Player num wins: {playerNumberWins}</p>
        <p>Dealer num wins: {dealerNumberWins}</p>

        {/* <p>{data}</p> */}
        {/* <Image src={CardsOnFire} rounded />
      <p>Photo by Julius Drost on Unsplash</p> */}
      </GameControlsDiv>
    </>
  );
}

export default Blackjack;
