import { verifyUser } from "@/app/_lib/dal";
import Form from "./_components/Form";
import Recent from "@/app/lyrics/_components/Recent";

const Lyrics = async () => {
  return (
    <>
      <Form />
      <section id="fetchedLyrics">
        <h3
          className={
            "px-5 text-2xl pl-20 dark:text-white underline capitalize font-semibold my-5"
          }
        >
          Your Fetched Lyrics
        </h3>
        <Recent />
      </section>
    </>
  );
};

export default Lyrics;
