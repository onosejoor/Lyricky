import Img from "@/components/Img";
import Link from "next/link";

const NotLoggedIn = () => {
  return (
    <div className="grid grid-cols-2 w-fit mx-auto py-5 items-center">
      <div className="grid justify-items-start gap-3">
        <h1 className="text-[100px] font-black text-purple-950">Oops!</h1>
        <h3 className=" font-medium">
          You Have To be logged in to see this content.
        </h3>
        <div className="deniedBtnCon">
          <Link
            href={"/signup"}
            className="px-5 font-medium py-4 h-fit bg-purple/40 border-[1.5px] rounded-xl"
          >
            Signup
          </Link>
          <Link
            href={"/login"}
            className="px-5 text-base py-4 h-fit border-purple bg-white font-medium border-[1.5px] rounded-xl"
          >
            Login
          </Link>
        </div>
      </div>
      <div className="w-[400px] h-[400px] ">
        <Img className="h-full w-full" src={"/images/svg/loggedIn.svg"} alt={"404 image"} />
      </div>
    </div>
  );
};

export default NotLoggedIn;
