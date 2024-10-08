"use client";
export default function Error({ reset }) {
  return (
    <>
      <h1></h1>
      <div className="accessDeniedContainer">
        <div className="accessDenied">
          <h1>Error!</h1>
          <h3>An error occured while processing your request</h3>
          <div className="deniedBtnCon">
            {" "}
            <Button
              className={"accessDeniedBtn CTAbutton"}
              link={"/"}
              text={"Go Back Home"}
            />
            <button
              className="accessDeniedBtn CTAbutton"
              onclick={() => {
                reset();
              }}
            >
              Retry
            </button>
          </div>
        </div>
        <div className="accessDeniedImgCon">
          <Img src={"/images/svg/cancelError.svg"} alt={"404 image"} />
        </div>
      </div>
    </>
  );
}
