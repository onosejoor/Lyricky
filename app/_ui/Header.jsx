import Button from "@/_components/Button";

const Header = () => {
  return (
    <>
      <section id="hero">
        <div className="heroContainer">
            <h5 className="heroTop"><span></span>Your Lyric Finder</h5>
          <h1 className="heroH1">
            Unlock the Melodies: <span className="comName">Lyricky</span> – Your Lyric Finder
          </h1>
          {/* <h1 className="heroH1">Lyricky – Your Lyric Finder</h1> */}
          <div className="buttonCon">
          <Button text="Get Started" link={"/signup"} className={"CTAbutton headerBtn"} />       
          <Button text="Login" link={"/login"} className={"CTAbutton headerBtn"} />       
          </div>

        </div>{" "}

      </section>
    </>
  );
};

export default Header;
