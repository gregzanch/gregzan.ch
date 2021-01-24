import styled from "styled-components";

export const Title = styled.h1`
  font-size: 12pt;
  align-self: center;
  margin: 0.125em 0.5em;
  color: ${({ theme }) => theme.colors.primary};
`;

export default Title;
