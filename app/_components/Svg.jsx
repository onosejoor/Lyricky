import Link from "next/link";

const Svg = ({ svg, link }) => {
  return (
    <>
      <Link href={link} >
        {svg}
      </Link>
    </>
  );
};

export default Svg;
