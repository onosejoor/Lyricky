"use client";

import { useState } from "react";

const Input = ({ name, svg, placeholder }) => {
  const [focus, setFocus] = useState(false);
  const [see, setSee] = useState(false);
  function set() {
    setSee((prev) => {
      return !prev;
    });
  }

  return (
    <>
      {svg ? (
        <div
          className="regLogInput"
          style={{ borderColor: focus ? "var(--inputBtn)" : null }}
        >
          <input
            type={see ? "text" : name}
            name={name}
            id={name}
            required
            className="form-input"
            placeholder={placeholder}
            onFocus={() => {
              setFocus(true);
            }}
            onBlur={() => {
              setFocus(false);
            }}
          />
          {see ? (
            <div className="inputSvgCon">
            <svg
              aria-label="don't see password"
              onClick={set}
              viewBox="0 0 24 24"
              stroke="#000"
              height={"30px"}
              fill="none"
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
                <path
                  d="M21.0006 12.0007C19.2536 15.5766 15.8779 18 12 18M12 18C8.12204 18 4.7463 15.5766 2.99977 12.0002M12 18L12 21M19.4218 14.4218L21.4999 16.5M16.2304 16.9687L17.5 19.5M4.57812 14.4218L2.5 16.5M7.76953 16.9687L6.5 19.5"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
              </g>
            </svg>
            </div>
          ) : (
            <div className="inputSvgCon">
            <svg
              aria-label="see password"
              onClick={set}
              viewBox="0 0 24 24"
              height={"30px"}
              fill="none"
              stroke="#000"
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
                <path
                  d="M4 12C4 12 5.6 7 12 7M12 7C18.4 7 20 12 20 12M12 7V4M18 5L16 7.5M6 5L8 7.5M15 13C15 14.6569 13.6569 16 12 16C10.3431 16 9 14.6569 9 13C9 11.3431 10.3431 10 12 10C13.6569 10 15 11.3431 15 13Z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
              </g>
            </svg>
            </div>
          )}
        </div>
      ) : (
        <input
          className="regLogInput form-input"
          type={name}
          name={name}
          id={name}
          required
          placeholder={placeholder}
        />
      )}
    </>
  );
};

export default Input;
