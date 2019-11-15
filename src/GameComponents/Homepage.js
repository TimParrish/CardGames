import React from "react";
import styled from "styled-components";
import { HomepageStyle } from "styles";
import {Casino, Tank} from "images";

function Homepage() {

  return (<>
            <HomepageStyle>
              <h1>Homepage</h1>
              <img
                src={Casino}
              />
              <img
                src={Tank}
              />
            </HomepageStyle>
            
            </>);

}

export default Homepage;
