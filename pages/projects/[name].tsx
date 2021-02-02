import Nav from "../../components/Nav";
import { Repository } from "types/github-api";
import { useRouter } from 'next/router'
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


export async function getStaticPaths() {
  return {
    paths: [{
      params: { 
        name: "cram" 
      } 
    }],
    fallback: true,
  };
}

type ProjectProps = {
  repo: Repository;
};

const Project = ({ repo }: ProjectProps) => {
  const router = useRouter()
  if (router.isFallback) {
    return <div>Loading...</div>
  }
  const { name } = repo;
  console.log(repo);
  return (
    <div className="main">
      <Nav currentPage={`/projects`} />
      
    </div>
  );
};

export default Project;
