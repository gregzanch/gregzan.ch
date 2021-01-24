import React, { Children } from "react";
import Link from "next/link";
import styled, { createGlobalStyle } from "styled-components";
import { Colors } from "./StyleGuide";
import Header from "./Header";
import Title from "./Title";
import SubTitle from "./SubTitle";

const NavBar = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 2rem;
  margin: 0.5rem 0.25rem;
  @media (max-width: 768px) {
    /* flex-direction: column; */
  }
`;

const ListItem = styled.li`
  display: inline;
`;

const LinkItem = styled.a`
  font-family: "Inter var";
  font-size: 14px;
  line-height: 100%;
  text-align: left;
  vertical-align: top;
  padding: 8px 8px;
  font-weight: 300;
  text-decoration: none;
  color: ${Colors.mono[1]};
`;

const NavGroup = styled.div`
  display: inline;
`;

type NavProps = {
  currentPage: string;
};

type NavLinkProps = {
  href: string;
  as?: string;
  title: string;
};

const NavLink = ({ href, as, title }: NavLinkProps) => {
  return (
    <ListItem>
      <Link href={href} as={as || href} passHref>
        <LinkItem title={title}>{title}</LinkItem>
      </Link>
    </ListItem>
  );
};

const MainLink = ({ href, as, title }: NavLinkProps) => {
  return (
    <ListItem>
      <Link href={href} as={as || href} passHref>
        <LinkItem title={title}>{title}</LinkItem>
      </Link>
    </ListItem>
  );
};

export const Nav = ({ currentPage }: NavProps) => {
  return (
    <NavBar>
      <NavGroup>
        <MainLink href="/" title="greg zanchelli" />
      </NavGroup>
      <NavGroup>
        <NavLink href="/about" title="about" />
        <NavLink href="/projects" title="projects" />
        <NavLink href="/experiments" title="experiments" />
        {/* <NavLink href="/cv" title="cv" /> */}
      </NavGroup>
    </NavBar>
  );
};

export default Nav;
