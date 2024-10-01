import Link from "next/link";
import Loader from "./loader";

const Button = ({ text, link , className, see}) => {
  return(<>
  {
    link ? (
      <Link href={link}>
        <button className={className}>{text}</button>
      </Link>
    ) : (
      <button className={className}>{see ? <><Loader />Loading...</> : text}</button>
    )
  }  
  </>)

};
export default Button