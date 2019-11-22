import React, { useState, useEffect } from "react";
import axios from "axios";
import { CardsOnFire } from "images";
import {
  DisplayHand,
  DisplayCardsDiv,
  DisplayGameStats,
  FlexBox,
  GameControlsDiv,
  GameControlsButtonDiv,
  GameControlButton
} from "styles";

let player_hand = [];
let dealer_hand = [];
let main_deck = [];

function Blackjack() {
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

  //calls startNewGame() when the page loads
  useEffect(() => {
    startNewGame();
  }, []);

  async function startNewGame() {
    await axios
      .get(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6`)
      .then(result => {
        result.data.success &&
          console.log("Successfully created a new game with 6 decks!!");
        let curDeck = result.data.deck_id;

        axios
          .get(`https://deckofcardsapi.com/api/deck/${curDeck}/draw/?count=312`)
          .then(result => {
            result.data.success && console.log(`We successfully drew cards!!`);

            try {
              let cards = result.data.cards;
              let drawn_card;
              cards.forEach(card => {
                drawn_card = {
                  value: `${card.value}`,
                  suit: `${card.suit}`,
                  imageURL: `${card.image}`,
                  cardCode: `${card.code}`
                };
                main_deck.push(drawn_card);
              });
              console.log(main_deck);
            } catch (err) {
              console.log("failed to parse JSON for desired values");
            }
          });
      })
      .catch(error => console.log(error));
    newRound();
  }

  async function newRound() {
    player_hand = [];
    dealer_hand = [];
    setPlayerAceCount(0);
    setDealerAceCount(0);
    setDealerHandValue(0);
    setPlayerHandValue(0);
    setDealerCardHidden("");
    //sleep delay to slowly deal cards
    await sleepDelay(800);
    drawCard();
    await sleepDelay(800);
    drawDealer();
    await sleepDelay(800);
    drawCard();
    await sleepDelay(800);
    drawDealer();
    // updateRender(n => !n);
  }

  //draw player card
  async function drawCard() {
    let drawnCard = main_deck.pop();

    switch (drawnCard.value) {
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
        setPlayerHandValue(Number(drawnCard.value) + playerHandValue);
        break;
    }
    player_hand.push(drawnCard);
    console.log(
      "player hand value after drawing card " +
        drawnCard.code +
        " is " +
        playerHandValue
    );
    updateRender(n => !n);
  }

  async function drawDealer() {
    let dealerDrawnCard = main_deck.pop();

    switch (dealerDrawnCard.value) {
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
        setDealerHandValue(Number(dealerDrawnCard.value) + dealerHandValue);
        break;
    }
    console.log(
      "dealer hand value after drawing card " +
        dealerDrawnCard.code +
        " is " +
        dealerHandValue
    );
    dealer_hand.push(dealerDrawnCard);
    if (dealer_hand.length === 1) {
      setDealerFirstCardURL(dealer_hand[0].imageURL);
      dealer_hand[0].imageURL = hiddenCardImage;
      setDealerCardHidden(true);
    }
    if (dealerHandValue > 21) {
      computeHand();
    }
    updateRender(n => !n);
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
        await sleepDelay(2000);
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
        await sleepDelay(2000);
        newRound();
      }
    } else if (playerHandValue === dealerHandValue) {
      console.log("push");
      await sleepDelay(2000);
      newRound();
    } else if (playerHandValue > dealerHandValue) {
      setPlayerNumberWins(playerNumberWins + 1);
      console.log("Player wins!!");
      await sleepDelay(2000);
      newRound();
    } else {
      setDealerNumberWins(dealerNumberWins + 1);
      console.log("Dealer wins...");
      await sleepDelay(2000);
      newRound();
    }
  }

  function sleepDelay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  return (
    <>
      <FlexBox>
        <GameControlsDiv>
          <GameControlsButtonDiv>
            <GameControlButton onClick={drawCard}>Hit</GameControlButton>
            <GameControlButton onClick={drawDealer}>
              Dealer Draw
            </GameControlButton>
            {/* <GameControlButton onClick={getAllCardsFromAPI}>
              Load decks
            </GameControlButton> */}
            <GameControlButton onClick={playerStay}>Stay</GameControlButton>
            <GameControlButton onClick={startNewGame}>
              New Game
            </GameControlButton>
          </GameControlsButtonDiv>
        </GameControlsDiv>
        <DisplayCardsDiv>
          <DisplayHand type="player">
            <h2>Player Cards</h2>
            {player_hand.map((card, index) => {
              return (
                <img
                  key={`player${index}`}
                  src={`${card.imageURL}`}
                  alt={`${card.value} of ${card.suit}`}
                />
              );
            })}
          </DisplayHand>
          <DisplayHand>
            <h2>Dealer Cards</h2>
            {dealer_hand.map((card, index) => {
              return (
                <img
                  key={`dealer${index}`}
                  src={`${card.imageURL}`}
                  alt={`${card.value} of ${card.suit}`}
                />
              );
            })}
          </DisplayHand>
        </DisplayCardsDiv>
        <DisplayGameStats>
          <p>Hand value: {playerHandValue}</p>
          {/* <p>Dealer hand value: {dealerHandValue}</p> */}
          <p>Player wins: {playerNumberWins}</p>
          <p>Dealer wins: {dealerNumberWins}</p>
        </DisplayGameStats>
      </FlexBox>
    </>
  );
}

export default Blackjack;
