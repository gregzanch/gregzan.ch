import styled from "styled-components";

export const Header = styled.header`
  display: flex;
  flex-direction: row;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export default Header;
