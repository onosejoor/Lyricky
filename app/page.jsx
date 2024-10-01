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
            "At Lyricky, we’re all about connecting you with the soul of a song. Simply tell us the artist’s name and the title of the track, and we’ll weave the lyrics into your fingertips. Whether you’re belting it out in the shower or decoding the hidden meanings, Lyricky has your back. Because life’s too short to hum half-hearted choruses."
          }
        />
        <About
          headText={"Lyrics Storage"}
          src={"/images/about/storage.svg"}
          text={
            "At Lyricky, we understand that lyrics aren’t just words, they’re memories etched in melodies. Our Lyrics Storage Services allow you to securely archive those precious verses you’ve already fetched. Whether you’re a songwriter fine-tuning your own creations or a music enthusiast curating playlists, Lyricky’s virtual shelves await."
          }
        />
        <About
          headText={"Authentication"}
          class2={"aboutReverse"}
          src={"/images/about/authentication.svg"}
          text={
            "At Lyricky, we take lyrics seriously. Our mission? To protect your fetched lyrics from unauthorized access. Whether you’re a budding listener or a lyric reader, Lyricky ensures that your song lyrics remain secure. With our robust authentication measures, your verses are shielded"
          }
        />
      </section>
      <GetStarted />
    </>
  );
};

export default Page;
