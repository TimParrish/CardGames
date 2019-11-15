import React from "react";
import { HomepageStyle } from "styles";
import { Casino, Tank } from "images";

function Homepage() {
  return (
    <>
      <HomepageStyle>
        <h1>Please select a game!</h1>
        <img src={Casino} alt={"Neon casino marquee sign at night"} />
        <img
          src={Tank}
          alt={"Tank on a dirt road with the sky in the background"}
        />
      </HomepageStyle>
    </>
  );
}

export default Homepage;
