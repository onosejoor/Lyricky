import Link from "next/link";

const GetStarted = () => {
  return (
    <>
      <section className="bg-[url(/images/svg/bg-boost-desktop.svg)] dark:bg-white dark:border-t dark:border-t-white bg-purple/5 bg-no-repeat bg-cover sm:px-10 px-5 py-10 sm:py-20">
        <div className="text-center grid gap-5">
          <h2 className="text-3xl sm:text-5xl text-center mb-5 font-bold text-black/85">
            Fetch A Song Lyric Today!
          </h2>

          <Link href={"/lyrics"}>
            <button className="px-5 py-3 cursor-pointer bg-purple/60 mx-auto rounded-[30px] border border-purple text-white ">Get Started</button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default GetStarted;
