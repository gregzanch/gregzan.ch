import styled from "styled-components";
import Link from "next/link";
import LanguageListItem from "./LanguageListItem";
import { Repository } from "types/github-api";
import { Time } from "../util/time";

const ListItem = styled.li`
  list-style: none;
  margin: 4px 0px;
  padding: 20px 0px;
  border-bottom: solid 1px var(--color-mono-7);
  margin-left: 1em;
  margin-right: 1em;
`;

export interface RepoListItemProps extends Repository {
  href: string;
}

const LightText = styled.p`
  color: var(--color-text-secondary);
  margin: 0;
  font-size: 10pt;
`;

const Description = styled.p`
  color: var(--color-text-secondary);
  margin: 8px 0px;
  font-size: 14px;
  padding-right: 4px;
`;

const RepoTitle = styled.h4`
  display: inline;
  font-size: 20px;
  margin-bottom: 8px;
`;

const LinkElement = styled.a`
  color: var(--color-text-link);
  text-decoration: none;
  :hover {
    text-decoration: underline;
  }
  :link,
  :visited {
    color: var(--color-text-link);
  }
  :link:active,
  :visited:active {
    color: var(--color-text-link);
  }
`;

const Inline = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const formatTime = (date: string) => {
  const time = new Time(date);
  return time.format();
};

export const RepoListItem = (props: RepoListItemProps) => {
  return (
    <ListItem>
      <RepoTitle>
        <Link passHref href={props.href || "#"}>
          <LinkElement>{props.name}</LinkElement>
        </Link>
      </RepoTitle>
      <Description>{props.description}</Description>
      <Inline>
        {props.language && <LanguageListItem language={props.language!} />}
        <LightText>Updated {formatTime(props.updated_at)}</LightText>
      </Inline>
    </ListItem>
  );
};

export default RepoListItem;
