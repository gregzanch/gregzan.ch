import Nav from "../../components/Nav";
import { Repository } from "types/github-api";

//@ts-ignore
export async function getStaticProps({ params }) {
  const request = await fetch(
    `https://api.github.com/repos/gregzanch/${params.name}`
  );
  const repo = await request.json();

  return {
    props: {
      repo,
    },
  };
}
//@ts-ignore
const Index = ({ repo }) => {
  const { name } = repo as Repository;
  return (
    <div className="main">
      <Nav currentPage={`projects/${name}`} />
    </div>
  );
};

export default Index;
