"use client";
import { usePathname } from "next/navigation";
import Lists from "./List";
import { useEffect, useState } from "react";

const NavCon = ({ children, username }) => {
  const [showed, setShowed] = useState(false);
  const [dark, setDark] = useState("false");
  const path = usePathname();

  useEffect(() => {
    if (dark === "true") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [dark]);

  const set = () => {
    setDark((prev) => {
      if (prev === "true") {
        return "false";
      } else {
        return "true";
      }
    });
  };

  useEffect(() => {
    const dom = document.querySelector(".nav-items");
    const overlay = document.querySelector(".overlay");
    if (showed) {
      dom.classList.add("show");
      overlay.classList.add("shut");
    } else {
      dom.classList.remove("show");
      overlay.classList.remove("shut");
    }
  }, [showed]);

  function show() {
    setShowed((prev) => {
      return !prev;
    });
  }
  function shut() {
    setShowed(false);
  }
  return (
    <>
      <div className="overlay" onClick={show}></div>

      <div className="navCon">
        <div className="themeContainer">
        {dark === "true" ? (
          <>
            <svg
              viewBox="0 0 24 24"
              onClick={set}
              height={"25"}
              cursor={"pointer"}
              fill="white"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <g clip-path="url(#a)">
                  {" "}
                  <path d="M12 0a1 1 0 0 1 1 1v4a1 1 0 1 1-2 0V1a1 1 0 0 1 1-1ZM4.929 3.515a1 1 0 0 0-1.414 1.414l2.828 2.828a1 1 0 0 0 1.414-1.414L4.93 3.515ZM1 11a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2H1ZM18 12a1 1 0 0 1 1-1h4a1 1 0 1 1 0 2h-4a1 1 0 0 1-1-1ZM17.657 16.243a1 1 0 0 0-1.414 1.414l2.828 2.828a1 1 0 1 0 1.414-1.414l-2.828-2.828ZM7.757 17.657a1 1 0 1 0-1.414-1.414L3.515 19.07a1 1 0 1 0 1.414 1.414l2.828-2.828ZM20.485 4.929a1 1 0 0 0-1.414-1.414l-2.828 2.828a1 1 0 1 0 1.414 1.414l2.828-2.828ZM13 19a1 1 0 1 0-2 0v4a1 1 0 1 0 2 0v-4ZM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z"></path>{" "}
                </g>{" "}
                <defs>
                  {" "}
                  <clipPath id="a">
                    {" "}
                    <path fill="#ffffff" d="M0 0h24v24H0z"></path>{" "}
                  </clipPath>{" "}
                </defs>{" "}
              </g>
            </svg>
          </>
        ) : (
          <img onClick={set} className="theme" src="/images/theme/dark.svg" />
        )}
        </div>
        

        <svg
          className={"bars"}
          width="30px"
          height="30px"
          viewBox="0 0 24 24"
          stroke={dark === "false" ? "#001233" : "#fff"}
          fill={dark === "false" ? "#001233" : "#fff"}
          onClick={show}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M4 18L20 18" strokeWidth="2" strokeLinecap="round" />
          <path d="M4 12L20 12" strokeWidth="2" strokeLinecap="round" />
          <path d="M4 6L20 6" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <ul className="nav-items">
          <>
            {showed && (
              <div>
                <svg
                  onClick={show}
                  fill={dark === "false" ? "#001233" : "#fff"}
                  width="30px"
                  height="30px"
                  cursor={"pointer"}
                  viewBox="0 0 256 256"
                  id="Flat"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M202.82861,197.17188a3.99991,3.99991,0,1,1-5.65722,5.65624L128,133.65723,58.82861,202.82812a3.99991,3.99991,0,0,1-5.65722-5.65624L122.343,128,53.17139,58.82812a3.99991,3.99991,0,0,1,5.65722-5.65624L128,122.34277l69.17139-69.17089a3.99991,3.99991,0,0,1,5.65722,5.65624L133.657,128Z" />
                </svg>
              </div>
            )}
            <Lists
              click={showed ? shut : null}
              class1={`nav ${path === "/" && "active"}`}
              text="Home"
              link="//"
            />
            {!username && (
              <>
                {" "}
                <Lists
                  click={showed ? shut : null}
                  class1={`nav ${path === "/signup" && "active"}`}
                  class2="nav-link"
                  text="sign-Up"
                  link="/signup"
                />
                <Lists
                  click={showed ? shut : null}
                  class1={`nav ${path === "/login" && "active"}`}
                  class2="nav-link"
                  text="Login"
                  link="/login"
                />
              </>
            )}

            <Lists
              click={showed ? shut : null}
              class1={`nav ${path === "/lyrics" && "active"}`}
              class2="nav-link"
              text="lyrics"
              link="/lyrics"
            />
          </>
        </ul>
        {children}
      </div>
    </>
  );
};

export default NavCon;
