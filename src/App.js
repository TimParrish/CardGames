import React from "react";
import { Blackjack, Homepage, NavBar, War } from "./GameComponents";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { StyledFooter } from "styles";
import "./styles/background.css";
import "./styles/rootStyle.css";

document.title = "React Card Games";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path="/card-games/" component={Homepage} exact />
        <Route path="/card-games/blackjack" component={Blackjack} />
        <Route path="/card-games/war" component={War} />
        <Route component={Homepage} />
      </Switch>
      <StyledFooter>
        <p>Check out the source code on github!</p>
        <p>Image from Julius Drost on Unsplash.com</p>
      </StyledFooter>
    </BrowserRouter>
  );
}

export default App;
