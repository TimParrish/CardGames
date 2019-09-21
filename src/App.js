import React from "react";
import { Blackjack, NavBar } from "./GameComponents";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { StyledFooter } from "styles";

document.title = "React Card Games";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        {/* <Route path="/card-games/" component={SelectGame} exact /> */}
        {/* <Route path="/card-games/blackjack" component={Blackjack} />
        <Route path="/card-games/solitaire" component={Solitaire} /> */}
        <Route component={Blackjack} />
      </Switch>
      {/* <StyledFooter>Check out the source code on github!</StyledFooter> */}
    </BrowserRouter>
  );
}

export default App;
