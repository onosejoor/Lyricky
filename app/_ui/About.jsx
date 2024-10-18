import Button from "@/_components/Button";
import Img from "@/_components/Img";

const About = ({ headText, text, link, buttonText, src, class2, class3 }) => {
  return (
    <>
      {" "}
      <div className={class2 ? "aboutContainer  " + class2 : "aboutContainer"}>
        <div className={"textWrapper"}>
          <h2 className="aboutH1">{headText}</h2>
          <p className="aboutSmall">{text}</p>

          {buttonText && <Button text={buttonText} link={link} />}
        </div>{" "}

        <div className="aboutImgCon">
        <Img
          src={src}
          alt={headText}
          className={class3 ? "aboutImg " + class3 : "aboutImg"}
        />         
        </div>
      </div>
    </>
  );
};

export default About;
