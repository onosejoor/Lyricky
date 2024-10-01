import { useState } from "react";

const LoadBtn = ({ className, text }) => {
  const [copied, setCopies] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(text);
    setCopies(true);
    setTimeout(() => {
      setCopies(false);
    }, 2000);
  }
  return (
    <button className={className} onClick={handleCopy}>
      {!copied ? (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          stroke="purple"
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
              d="M20.9983 10C20.9862 7.82497 20.8897 6.64706 20.1213 5.87868C19.2426 5 17.8284 5 15 5H12C9.17157 5 7.75736 5 6.87868 5.87868C6 6.75736 6 8.17157 6 11V16C6 18.8284 6 20.2426 6.87868 21.1213C7.75736 22 9.17157 22 12 22H15C17.8284 22 19.2426 22 20.1213 21.1213C21 20.2426 21 18.8284 21 16V15"
              strokeWidth="1.5"
              strokeLinecap="round"
            ></path>{" "}
            <path
              d="M3 10V16C3 17.6569 4.34315 19 6 19M18 5C18 3.34315 16.6569 2 15 2H11C7.22876 2 5.34315 2 4.17157 3.17157C3.51839 3.82475 3.22937 4.69989 3.10149 6"
              strokeWidth="1.5"
              strokeLinecap="round"
            ></path>{" "}
          </g>
        </svg>
      ) : (
        <svg
          viewBox="0 0 24 24"
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
            <title></title>{" "}
            <g id="Complete">
              {" "}
              <g id="tick">
                {" "}
                <polyline
                  fill="none"
                  points="3.7 14.3 9.6 19 20.3 5"
                  stroke="purple"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.4"
                ></polyline>{" "}
              </g>{" "}
            </g>{" "}
          </g>
        </svg>
      )}
    </button>
  );
};

export default LoadBtn;
