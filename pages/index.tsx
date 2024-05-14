import Nav from "../components/Nav";
import styled from "styled-components";
import { RepoCard } from "components/RepoCard";

const GridContainer = styled.div`
  width: 100%;
  /* margin-right: 30%; */
  padding-left: 10%;
  padding-right: 10%;
  /* margin-left: 10%; */
  max-width: 600px;
  display: grid;
  grid-auto-flow: dense;
  row-gap: 2em;
  margin-bottom: 2em;

  .small {
    grid-column-end: span 2;
    width: min-content;
  }

  .med {
    grid-column-end: span 4;
    width: min-content;
  }

  .large {
    grid-column-end: span 6;
    width: min-content;
  }
`;

const Index = () => {
  return (
    <div className="main">
      <Nav currentPage={"/"} />
      <div style={{ display: "flex", justifyContent: "center", marginTop: "2em" }}>
        <GridContainer>
          <RepoCard
            href="https://github.com/gregzanch/cram"
            className="large"
            image="/img/cram.gif"
            name="cram"
            description="cram (computational room acoustic module) is an application that allows users to simulate and explore various acoustic properties of a modeled space."
            tags={["tag"]}
          />
          <RepoCard
            href="https://github.com/gregzanch/beam-vibrations"
            className="large"
            image="/img/beam.png"
            name="beam-vibrations"
            description="small web app that simulates transverse vibrations along a cantilevered beam"
            tags={["tag"]}
          />
          <RepoCard
            href="https://github.com/gregzanch/alpha-db"
            className="large"
            image="/img/alpha-db.png"
            name="alpha-db"
            description="alpha-dB is an api for acoustic properties of various materials and constructions"
            tags={["tag"]}
          />
        </GridContainer>
      </div>
    </div>
  );
};

export default Index;
