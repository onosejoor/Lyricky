import Link from "next/link";

export default function Lists(props) {
  
  return (
    <li className={props.class1} onClick={props.click}>
      <Link  href={props.link} className={props.class2}>
        {" "}
        {props.text}
      </Link>
    </li>
  );
}
