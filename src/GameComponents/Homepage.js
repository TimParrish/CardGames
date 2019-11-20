import React from "react";
import { HomepageStyle } from "styles";
import { Casino, Tank } from "images";
import { NavLink } from "react-router-dom";

function Homepage() {
  return (
    <>
      <HomepageStyle>
        <h1>Please select a game!</h1>
        <NavLink to="/card-games/blackjack">
          <img src={Casino} alt={"Neon casino marquee sign at night"} />
        </NavLink>
        <NavLink to="/card-games/war">
          <img
            src={Tank}
            alt={"Tank on a dirt road with the sky in the background"}
          />
        </NavLink>
      </HomepageStyle>
    </>
  );
}

export default Homepage;
