import React from "react";
import { StyledLink, NavBarContainer } from "styles";

function NavBar() {
  return (
    <>
      <NavBarContainer>
        <StyledLink type="first" to="/card-games/">
          View All Games
        </StyledLink>
        <StyledLink to="/card-games/blackjack">Blackjack</StyledLink>
        <StyledLink type="last" to="/card-games/solitaire">
          solitaire
        </StyledLink>
      </NavBarContainer>
    </>
  );
}

export default NavBar;
