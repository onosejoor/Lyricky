import Link from "next/link";
import { verifyUser } from "@/app/_lib/dal";

const Header = async () => {
  const verify = await verifyUser();
  return (
    <section className="hero-gradient px-5">
      <div className="text-center md:w-[70%] w-full pt-4 mb-5 mx-auto grid gap-10">
        <h5 className="bg-clip-text font-medium text-lg text-black/70 dark:text-white bg-linear-to-r w-fit mx-auto from-white to-purple ">
          Your Lyric Finder
        </h5>
        <h1 className="capitalize sm:p-5 text-3xl  xs:text-4xl sm:text-6xl dark:text-white md:text-[75px] font-semibold">
          Follow the Melodies: <br />
          <span className="text-purple dark:text-purple-500 font-bold">Lyricky</span> – Your Lyric Finder
        </h1>
        <div className="mt-2 flex gap-10 justify-center">
          {!verify.isAuth ? (
            <>
              <Link
                href={"/signup"}
                className="px-5 font-medium dark:border-white dark:text-white py-4 h-fit bg-purple/40 border-[1.5px] rounded-xl w-[150px] "
              >
                Get Started
              </Link>
              <Link
                href={"/login"}
                className="px-5 text-base py-4 h-fit dark:bg-black dark:text-white border-purple bg-white font-medium border-[1.5px] rounded-xl w-[150px] "
              >
                Login
              </Link>
            </>
          ) : (
            <Link href={"/lyrics"}>
              <button
                type="button"
                className="px-5 py-4 h-fit bg-purple/50 dark:border-white dark:text-white font-normal border-[1.5px] rounded-xl w-[150px] "
              >
                Lyrics
              </button>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default Header;
