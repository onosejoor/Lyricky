import Link from "next/link";
import Img from "../components/Img";

export const metadata = {
  title: "404 Page Not Found",
  description:
    "Oops, looks like the lyrics got lost in translation, go back home to see your lyrics.",
};

export default function NotFound() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2  w-fit mx-auto py-5 items-center">
      <div className="grid justify-items-start gap-3">
        <h1 className="text-[100px] font-black text-purple-950">Oops!</h1>
        <h3 className=" font-medium">404 Page Not Found</h3>
        <p className="sm:w-[70%] font-medium">
          Oops, looks like the lyrics got lost in translation, go back home to
          see your lyrics.
        </p>
        <Link href={"/"}>
          <button className="px-5 py-4 whitespace-nowrap border-purple bg-white font-normal border-[1.5px] rounded-xl text-center">
            Go To Homepage
          </button>
        </Link>
      </div>

      <Img
        src={"/images/404 Error.png"}
        className="h-[300px] w-[400px]"
        alt={"404 image"}
      />
    </div>
  );
}
