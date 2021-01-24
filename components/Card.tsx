export interface CardProps {
  title: string;
  subTitle?: string;
  orderIndex: number;
  href?: string;
}

export const Card = (props: CardProps) => {
  return (
    <li className="card">
      <h4>{props.title}</h4>
      {props.subTitle && <p>{props.subTitle}</p>}
    </li>
  );
};

export default Card;
