import styled from "styled-components";

export const SubTitle = styled.h2`
  font-size: 12pt;
  align-self: center;
  font-weight: 300;
  margin: 0.125em 0.5em;
  color: ${({ theme }) => theme.colors.secondary};
`;

export default SubTitle;
