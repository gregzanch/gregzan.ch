import Link from "next/link";

type ExperimentsProps = {
  experiments: {
    id: string;
    slug: string;
    title: string;
  }[];
};
function Experiments({ experiments }: ExperimentsProps) {
  return (
    <ul>
      {experiments.map((x) => (
        <li key={x.id}>
          <Link href={`/blog/${encodeURIComponent(x.slug)}`}>
            <a>{x.title}</a>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default Experiments;
