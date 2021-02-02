import { Repository } from "types/github-api";
import styled from "styled-components";
import Link from "next/link";

const RepoCardContainer = styled.div`
  transition: cubic-bezier(0.075, 0.82, 0.165, 1);
  transition-property: box-shadow;
  transition-duration: 250ms;
  border-width: 1px;
  border-color: #f1f1f1;
  border-style: solid;
  cursor: pointer;
  :hover {
    box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.07), 0 1px 18px 0 rgba(0, 0, 0, 0.06), 0 3px 5px -1px rgba(0, 0, 0, 0.02);
  }
  z-index: 0;
  height: min-content;
  border-radius: 16px;
`;

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

const RepoInfo = styled.div`
  padding: 8px;
  /* background-color: #fcfcfc; */
  border-bottom-right-radius: 16px;
  border-bottom-left-radius: 16px;
`;

const ImageContainer = styled.a`
  border-top-right-radius: 16px;
  border-top-left-radius: 16px;
  max-height: 400px;
  height: 400px;
  display: flex !important;
  overflow: hidden !important;
  position: relative !important;
  align-items: center !important;
`;

const Image = styled.img`
  object-fit: cover;
  /* margin: 1em; */
  width: 600px;
  height: 400px;
`;

type RepoCardProps = {
  image: string;
  // repo: Repository;
  href: string;
  name: string;
  description: string;
  tags: string[];
  className?: string;
};

export const RepoCard = ({ image, name, className, description, href }: RepoCardProps) => {
  return (
    <Link passHref href={href || "#"}>
      <RepoCardContainer className={className}>
        <ImageContainer>
          <Image src={image} alt={name} />
        </ImageContainer>
        <RepoInfo>
          <RepoTitle>
            <LinkElement>{name}</LinkElement>
          </RepoTitle>
          <Description>{description}</Description>
        </RepoInfo>
      </RepoCardContainer>
    </Link>
  );
};
