import { Nav, Header, Title, SubTitle, RepoListItem } from "../../components";
import styled from "styled-components";
import { Repository } from "types/github-api";
import { create } from "zustand";
import { useEffect } from "react";

const SortMethods = {
  NAME_ASCENDING: "Sort By: Name (A-Z)",
  NAME_DESCENDING: "Sort By: Name (Z-A)",
  LAST_UPDATED: "Sort By: Last Updated",
  LAST_PUSH: "Sort By: Last Push",
};
type SortMethod = keyof typeof SortMethods;
type ComparisonFunction<T> = (a: T, b: T) => number;

const time = (date: string) => new Date(date).getTime();

const comparisonFunctions = {
  NAME_ASCENDING: (a, b) => +(a.name.toLowerCase() > b.name.toLowerCase()) - 0.5,
  NAME_DESCENDING: (a, b) => +(a.name.toLowerCase() < b.name.toLowerCase()) - 0.5,
  LAST_UPDATED: (a, b) => time(b.updated_at) - time(a.updated_at),
  LAST_PUSH: (a, b) => time(b.pushed_at) - time(a.pushed_at),
} as Record<SortMethod, ComparisonFunction<Repository>>;

const sort = (repos: Repository[], sortMethod: SortMethod): Repository[] => {
  if (Object.hasOwnProperty.call(comparisonFunctions, sortMethod)) {
    return repos.sort(comparisonFunctions[sortMethod]);
  }
  return repos;
};

interface State {
  repos: Repository[];
  sortMethod: SortMethod;
  setRepos: (repos: Repository[]) => void;
  setSortBy: (sortMethod: SortMethod) => void;
}

const useStore = create((set) => ({
  repos: [] as Repository[],
  sortMethod: "LAST_PUSH",
  setRepos: (repos: Repository[]) => set({ repos }),
  setSortBy: (sortMethod: SortMethod) =>
    set((oldState: any) => ({
      sortMethod,
      repos: [...sort((oldState as unknown as State).repos, sortMethod)],
    })),
}));

const RepoList = styled.ul`
  margin-block-start: 0;
  margin-block-end: 0;
  padding-inline-start: 0;
  max-width: 760px;
`;

const ProjectList = () => {
  const repos = useStore((state: any) => state.repos) as Repository[];
  return (
    <RepoList>
      {repos.map((repo, i) => (
        <RepoListItem key={repo.id} {...repo} href={repo.html_url} />
      ))}
    </RepoList>
  );
};

const Select = styled.select`
  -webkit-writing-mode: horizontal-tb !important;
  writing-mode: horizontal-tb !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  cursor: pointer;
  color: var(--color-mono-1);
  display: inline-block;
  box-sizing: border-box;
  align-items: center;
  font-family: "Inter", sans-serif;
  margin: 0em;
  background-color: rgb(250, 251, 252);
  border-color: rgba(27, 31, 35, 0.15);
  border-radius: 6px;
  border-style: solid;
  border-width: 1px;
  box-shadow: rgba(27, 31, 35, 0.04) 0px 1px 0px 0px, rgba(255, 255, 255, 0.25) 0px 1px 0px 0px inset;
  font-weight: 500;
  line-height: 20px;
  overflow-wrap: break-word;
  padding: 5px 16px;
  user-select: none;
  vertical-align: middle;
  white-space: nowrap;
`;

const SortByDropDown = () => {
  const sortMethods = Object.keys(SortMethods) as SortMethod[];
  const { sortMethod, setSortBy } = useStore((state: any) => ({
    sortMethod: state.sortMethod,
    setSortBy: state.setSortBy,
  })) as { sortMethod: SortMethod; setSortBy: State["setSortBy"] };

  return (
    <Select
      name="Sort By"
      id="sort-by"
      onChange={(e) => {
        setSortBy(e.target.value as SortMethod);
      }}
      value={sortMethod}
    >
      {sortMethods.map((key: SortMethod) => {
        return (
          <option key={key} value={key}>
            {SortMethods[key]}
          </option>
        );
      })}
    </Select>
  );
};

// This gets called on every request
export async function getServerSideProps() {
  const res = await fetch("https://api.github.com/users/gregzanch/repos?sort=updated-asc");
  const repos = (await res.json()) as Repository[];

  // Pass data to the page via props
  return { props: { repos: sort(repos, "LAST_PUSH") } };
}

const ProjectsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const FiltersContainer = styled.div`
  display: flex;
  /* flex-direction: column; */
  /* align-items: center; */
  justify-content: flex-end;
  margin-block-start: 0;
  margin-block-end: 0;
  padding-inline-start: 0;
  width: 100%;
  max-width: 760px;
`;

type ProjectsProps = {
  repos: Repository[];
};

const Projects = ({ repos }: ProjectsProps) => {
  // console.log(repos);
  const setRepos = useStore((state: any) => state.setRepos) as State["setRepos"];
  useEffect(() => {
    setRepos(repos);
  }, [repos]);
  return (
    <div className="main">
      <Nav currentPage={"/projects"} />
      <ProjectsContainer>
        <FiltersContainer>
          <SortByDropDown />
        </FiltersContainer>
        <ProjectList />
      </ProjectsContainer>
    </div>
  );
};

export default Projects;
