import styled from "styled-components";
import { deviceSize } from "utilities";

export const StyledFooter = styled.div`
@media ${deviceSize.laptop}{
  height: 100px;

}
@media ${deviceSize.tablet}{
  height: 800px;
}
@media ${deviceSize.mobile}{
  height: 600px;
}

  p {
    text-align: center;
    color: white;
  }
`;
