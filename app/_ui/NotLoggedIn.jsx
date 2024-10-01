import Img from "@/_components/Img";

const { default: Button } = require("@/_components/Button");

const NotLoggedIn = () => {
  return (
    <>
      <h1></h1>
      <div className="accessDeniedContainer">
        <div className="accessDenied">
          <h1>Oops!</h1>
          <h3>You Have To be logged in to see this content.</h3>
          <div className="deniedBtnCon">
            {" "}
            <Button
              className={"accessDeniedBtn CTAbutton"}
              link={"signup"}
              text={"Sign-Up"}
            />
            <Button
              className={"accessDeniedBtn CTAbutton"}
              link={"login"}
              text={"Login"}
            />{" "}
          </div>
        </div>
<div className="accessDeniedImgCon">
<Img src={"/images/svg/loggedIn.svg"} alt={"404 image"} />
</div>
      </div>
    </>
  );
};

export default NotLoggedIn;
