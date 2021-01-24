import { Nav, Header, Title, SubTitle, Card } from "../../components";
import styled from "styled-components";
import { Repository } from "types/github-api";
import create from "zustand";
import { useEffect } from "react";

const SortMethods = {
  NAME_ASCENDING: "Name (A-Z)",
  NAME_DESCENDING: "Name (Z-A)",
  LAST_UPDATED: "Last Updated",
};
type SortMethod = keyof typeof SortMethods;
type ComparisonFunction<T> = (a: T, b: T) => number;

const time = (date: string) => new Date(date).getTime();

const comparisonFunctions = {
  NAME_ASCENDING: (a, b) =>
    +(a.name.toLowerCase() > b.name.toLowerCase()) - 0.5,
  NAME_DESCENDING: (a, b) =>
    +(a.name.toLowerCase() < b.name.toLowerCase()) - 0.5,
  LAST_UPDATED: (a, b) => time(b.updated_at) - time(a.updated_at),
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
  sortMethod: "LAST_UPDATED",
  setRepos: (repos: Repository[]) => set({ repos }),
  setSortBy: (sortMethod: SortMethod) =>
    set((oldState) => ({
      sortMethod,
      repos: [...sort(((oldState as unknown) as State).repos, sortMethod)],
    })),
}));

const ProjectList = () => {
  const repos = useStore((state) => state.repos) as Repository[];
  return (
    <ul>
      {repos.map((repo, i) => (
        <Card
          title={repo.name}
          subTitle={repo.description || undefined}
          orderIndex={i}
          href={`/projects/${repo.name}`}
          key={repo.id}
        />
      ))}
    </ul>
  );
};

const SortByDropDown = () => {
  const sortMethods = Object.keys(SortMethods) as SortMethod[];
  const { sortMethod, setSortBy } = useStore((state) => ({
    sortMethod: state.sortMethod,
    setSortBy: state.setSortBy,
  })) as { sortMethod: SortMethod; setSortBy: State["setSortBy"] };

  return (
    <select
      name="Sort By"
      id="sort-by"
      onChange={(e) => {
        setSortBy(e.target.value as SortMethod);
        console.log(e.target.value);
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
    </select>
  );
};

//@ts-ignore
const Index = ({ repos }) => {
  // console.log(repos);
  const setRepos = useStore((state) => state.setRepos) as State["setRepos"];
  useEffect(() => {
    console.log(repos);
    setRepos(repos);
  }, [repos]);
  return (
    <div className="main">
      <Nav currentPage={"projects"} />
      <SortByDropDown />
      <ProjectList />
    </div>
  );
};

// This gets called on every request
export async function getServerSideProps() {
  const res = await fetch(
    "https://api.github.com/users/gregzanch/repos?sort=updated-asc"
  );
  const repos = (await res.json()) as Repository[];

  // Pass data to the page via props
  return { props: { repos: sort(repos, "LAST_UPDATED") } };
}

export default Index;
