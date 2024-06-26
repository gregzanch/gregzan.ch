import { useMemo } from "react";
import styled from "styled-components";
import getLanguageColor from "../util/language-color";

type LanguageListItemProps = {
  language: string;
};

const Dot = styled.span`
  font-size: 24px;
  color: ${(props) => props.color};
`;

const Center = styled.div`
  display: inline-flex;
  align-items: center;
  color: var(--color-text-secondary);
  margin: 0;
  font-size: 10pt;
`;

export const LanguageListItem = ({ language }: LanguageListItemProps) => {
  const languageColor = useMemo(() => getLanguageColor(language), [getLanguageColor]);
  return (
    <Center>
      <Dot color={languageColor}>•</Dot>
      {language}
    </Center>
  );
};

export default LanguageListItem;
