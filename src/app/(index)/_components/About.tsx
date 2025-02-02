import Img from "@/components/Img";

type Props = {
  headText: string;
  smallText: string;
  src: string;
  isEven: boolean;
};

const data = [
  {
    headText: "Instant Lyric Finder",
    src: "/images/about/search.svg",
    smallText:
      "At Lyricky, we’re all about connecting you with the soul of a song. Simply tell us the artist’s name and the title of the track, and we’ll get the lyrics for in an a snap. Lyricky has your back, Because life’s too short to hum hearted choruses.",
  },
  {
    headText: "Lyrics Storage",
    src: "/images/about/storage.svg",
    smallText:
      "Our Lyrics Storage Services allow you to securely save those precious lyrics you’ve already fetched. With our vast storage capacities, we provide a better source of saving your lyrics to avoid any loss.",
  },
  {
    headText: "Authentication",
    src: "/images/about/authentication.svg",
    smallText:
      "At Lyricky, we take lyrics seriously. Our mission? To protect your fetched lyrics from unauthorized access. Only users signed in can save and fetch lyrics. With our robust authentication measures, your lyrics are shielded",
  },
];

const AboutSection = () => {
  return (
    <section>
      <div className="grid gap-5 px-5 md:px-20 py-10">
        {data.map((section, index) => {
          const isEven = index % 2 === 0;
          return <AboutCard {...section} key={index} isEven={isEven} />;
        })}
      </div>
    </section>
  );
};

const AboutCard = ({ headText, smallText, src, isEven }: Props) => {
  return (
    <>
      <div
        className={`flex gap-[30px] flex-col-reverse justify-center items-center ${
          isEven ? "sm:flex-row-reverse ml-0" : "sm:flex-row"
        }`}
      >
        <div
          className={`grid gap-5 ${
            isEven ? "justify-items-start" : "justify-items-end"
          }`}
        >
          <h2 className="text-black/80 dark:text-white text-3xl w-full font-bold">
            {headText}
          </h2>
          <p className="text-black/90 dark:text-white text-base xs:text-lg">{smallText}</p>
        </div>

        <div className="aboutImgCon h-[400px] w-full sm:h-[500px] sm:w-[500px] shrink-0">
          <Img
            src={src}
            alt={headText}
            className="object-cover min-h-full min-w-full"
          />
        </div>
      </div>
    </>
  );
};

export default AboutSection;
