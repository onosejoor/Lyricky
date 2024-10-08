import About from "./_ui/About";
import Header from "./_ui/Header";
import GetStarted from "./_ui/GetStarted";

const Page = () => {
  return (
    <>
      {/* <Hero /> */}
      <Header />
      <section id="about">
        <About
          headText={"Instant Lyric Finder"}
          class2={"aboutReverse"}
          src={"/images/about/search.svg"}
          class3={"aboutImgWidth"}
          text={
            "At Lyricky, we’re all about connecting you with the soul of a song. Simply tell us the artist’s name(optional) and the title of the track, and we’ll get the lyrics for in an a snap. Lyricky has your back, Because life’s too short to hum hearted choruses."
          }
        />
        <About
          headText={"Lyrics Storage"}
          src={"/images/about/storage.svg"}
          text={
            "Our Lyrics Storage Services allow you to securely save those precious lyrics you’ve already fetched. With our vast storage capacities, we provide a better source of saving your lyrics to avoid any loss."
          }
        />
        <About
          headText={"Authentication"}
          class2={"aboutReverse"}
          src={"/images/about/authentication.svg"}
          text={
            "At Lyricky, we take lyrics seriously. Our mission? To protect your fetched lyrics from unauthorized access. Only users signed in can edit, save and fetch lyrics. With our robust authentication measures, your verses are shielded"
          }
        />
      </section>
      <GetStarted />
    </>
  );
};

export default Page;
