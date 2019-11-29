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
  const [playerHandValue, setPlayerHandValue] = useState(-1);
  const [dealerHandValue, setDealerHandValue] = useState(-1);
  const [playerAceCount, setPlayerAceCount] = useState(0);
  const [dealerAceCount, setDealerAceCount] = useState(0);
  const [playerNumberWins, setPlayerNumberWins] = useState(0);
  const [dealerNumberWins, setDealerNumberWins] = useState(0);
  const [dealerFirstCardURL, setDealerFirstCardURL] = useState("");
  const [dealerCardHidden, setDealerCardHidden] = useState(true);
  const [disabledHit, setDisabledHit] = useState(true);
  const [disabledStay, setDisabledStay] = useState(true);
  const hiddenCardImage = CardsOnFire;

  //calls startNewGame() when the page loads
  useEffect(() => {
    startNewGame();
  }, []);

  //Check for a player bust (Hand value over 21) every time the hand updates
  useEffect(() => {
    console.log("Inside useEffect for player hand value " + playerHandValue);
    if (playerHandValue > 21) {
      if (playerAceCount > 0) {
        setPlayerAceCount(playerAceCount - 1);
        setPlayerHandValue(playerHandValue - 10);
        console.log("used an Ace to save yourself");
      } else {
        console.log("\tPLAYER BUSTED!!!");
        setDealerNumberWins(dealerNumberWins + 1);
        newRound();
      }
    }
    console.log("exiting useEffect for player hand value");
  }, [playerHandValue]);

  //Check for a dealer bust (Hand value over 21) every time the hand updates
  useEffect(() => {
    console.log("Inside useEffect for dealer hand value " + dealerHandValue);
    if (dealerHandValue > 21) {
      if (dealerAceCount > 0) {
        setDealerAceCount(dealerAceCount - 1);
        setDealerHandValue(dealerHandValue - 10);
        console.log("dealer used an Ace to save themself");
      } else {
        console.log("\tDEALER BUSTED!!");
        setPlayerNumberWins(playerNumberWins + 1);
        newRound();
      }
    }
    console.log("exiting useEffect for dealer hand value");
  }, [dealerHandValue]);

  function sleepDelay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function startNewGame() {
    setPlayerNumberWins(0);
    setDealerNumberWins(0);
    main_deck = [];

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
    console.log("Inside new round");
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
    await sleepDelay(200);
    setDisabledHit(false);
    setDisabledStay(false);
  }

  //draw player card
  function drawCard() {
    console.log("inside draw player card");
    let drawnCard = main_deck.pop();
    player_hand.push(drawnCard);
    calculateHandValue("player");
    console.log("exiting draw player card");
  }

  function drawDealer() {
    console.log("inside draw dealer card");
    let dealerDrawnCard = main_deck.pop();

    dealer_hand.push(dealerDrawnCard);

    if (dealer_hand.length === 1) {
      setDealerFirstCardURL(dealer_hand[0].imageURL);
      dealer_hand[0].imageURL = hiddenCardImage;
      setDealerCardHidden(true);
    }

    calculateHandValue("dealer");
    console.log("exiting draw dealer card");
  }

  async function calculateHandValue(whosHand) {
    console.log("inside calculatedHandValue and calculating: " + whosHand);
    let runningTotal = 0;
    let aceCount = 0;
    let hand = player_hand;

    if (whosHand === "dealer") {
      hand = dealer_hand;
    }
    if (hand[0].imageURL) {
      hand.forEach(card => {
        switch (card.value) {
          case "ACE":
            runningTotal += 11;
            aceCount += 1;
            break;
          case "KING":
            runningTotal += 10;
            break;
          case "QUEEN":
            runningTotal += 10;
            break;
          case "JACK":
            runningTotal += 10;
            break;
          default:
            runningTotal += Number(card.value);
            break;
        }
      });
    }
    if (whosHand === "player") {
      console.log(
        "Inside calculateHandValue: Player hand running total: " + runningTotal
      );
      setPlayerHandValue(runningTotal);
      setPlayerAceCount(aceCount);
    } else if (whosHand === "dealer") {
      console.log(
        "inside calculateHandValue: Dealer hand running total: " + runningTotal
      );
      setDealerHandValue(runningTotal);
      setDealerAceCount(aceCount);
    }
  }

  function playerStay() {
    console.log("Player hit the STAY button");
    setDisabledStay(true);
    setDisabledHit(true);

    //show dealer card
    if (dealerCardHidden === true) {
      dealer_hand[0].imageURL = dealerFirstCardURL;
      setDealerCardHidden(false);
    }

    // if the player has not busted and the dealer needs to hit...
    // if (playerHandValue <= 21 && dealerHandValue < 16) {
    //   drawDealer();
    // }

    console.log("end of playerStay before computeHand");
    computeHand();
  }

  async function computeHand() {
    console.log("COMPUTING: inside computeHand");
    if (playerHandValue === dealerHandValue) {
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

  return (
    <>
      <FlexBox>
        <GameControlsDiv>
          <GameControlsButtonDiv>
            <GameControlButton disabled={disabledHit} onClick={drawCard}>
              Hit
            </GameControlButton>
            {/* <GameControlButton onClick={drawDealer}>
              Dealer Draw
            </GameControlButton> */}
            {/* <GameControlButton onClick={getAllCardsFromAPI}>
              Load decks
            </GameControlButton> */}
            <GameControlButton disabled={disabledStay} onClick={playerStay}>
              Stay
            </GameControlButton>
            <GameControlButton onClick={startNewGame}>
              New Game
            </GameControlButton>
            {/* <GameControlButton onClick={newRound}>New Round</GameControlButton> */}
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
