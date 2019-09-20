import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [deckId, setDeckId] = useState("llwmfzb9zat7");
  const [shuffled, setShuffled] = useState(false);
  const [cardsRemaining, setCardsRemaining] = useState("");

  useEffect(() => {
    startNewGame();
  }, []);

  // Create a new deck of cards and store the deck id for future API calls
  function startNewGame() {
    axios.get(`https://deckofcardsapi.com/api/deck/new/`).then(result => {
      {
        result.data.success && console.log("The result was a success!!");
      }
      console.log("from the response: " + result.data.deck_id);
      setDeckId(result.data.deck_id);
      setShuffled(result.data.shuffled);
      setCardsRemaining(result.data.remaining);

      console.log("     after the axios request deckId is: " + deckId);
      drawCard(1, deckId);
    });
  }

  function drawCard(numberOfCards, passedDeckId) {
    console.log("in draw card function passedDeckId is: " + passedDeckId);
    console.log(`taking ${numberOfCards} cards from the deck`);
    axios
      .get(
        `https://deckofcardsapi.com/api/deck/${passedDeckId}/draw/?count=${numberOfCards}`
      )
      .then(result => {
        {
          result.data.success &&
            console.log(`We successfully drew ${numberOfCards} cards!!`);
        }
        setShuffled(result.data.shuffled);
        setCardsRemaining(result.data.remaining);
        console.log(
          "The API response is tracking that " +
            result.data.remaining +
            " cards are left in deck"
        );
        console.log(
          "The value of cardsRemaining after drawCard is: " + cardsRemaining
        );
      });
  }

  // https://deckofcardsapi.com/api/deck/<<deck_id>>/draw/?count=2

  // useEffect(())

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {/* {drawCard(1, deckId)} */}
        <p>
          Future home of Tim, Alex & Ransom final project for Fall 2019 Web
          Development course @ MSU!
        </p>
        <p>The deck ID is: {deckId}</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
