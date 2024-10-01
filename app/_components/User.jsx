"use client";

import { useState } from "react";

const User = ({ username, action }) => {
  const [see, setSee] = useState(false);

  function set() {
    setSee((prev) => {
      return !prev;
    });
  }
  async function logout() {
    await action();
  }

  return (
    <>
      {username && (
        <>
          {"  "}
          <div id="user">
            <div className="usersection" onClick={set}>
              <div className="user-name">
              <h5 className="user">{username.slice(0, 1).toUpperCase()}</h5>

              </div>
            </div>
            {see && (
              <div className="logout">
                <h5>{username}</h5>
                <form
                  action={logout}
                  onSubmit={() => {
                    setSee(false);
                  }}
                >
                  <button type="submit" className="logoutBtn">
                    Log-Out{" "}
                    <span>
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        height="20px"
                        width="20px"
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
                            d="M14 20H6C4.89543 20 4 19.1046 4 18L4 6C4 4.89543 4.89543 4 6 4H14M10 12H21M21 12L18 15M21 12L18 9"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>{" "}
                        </g>
                      </svg>
                    </span>
                  </button>
                </form>
                <svg
                  onClick={() => {
                    setSee(false);
                  }}
                  viewBox="0 0 16 16"
                  version="1.1"
                  className="cancelLogout"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  fill="#000000"
                  height={"20"}
                  strokeWidth="0.00016"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <rect
                      width="16px"
                      height="16px"
                      id="icon-bound"
                      fill="none"
                    ></rect>{" "}
                    <polygon points="14.707,2.707 13.293,1.293 8,6.586 2.707,1.293 1.293,2.707 6.586,8 1.293,13.293 2.707,14.707 8,9.414 13.293,14.707 14.707,13.293 9.414,8 "></polygon>{" "}
                  </g>
                </svg>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default User;
