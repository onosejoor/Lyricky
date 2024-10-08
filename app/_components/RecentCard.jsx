"use client";

import { deleteLyrics } from "@/lib/userFunctions";
import { useState } from "react";
import Loader from "./loader";
import LoadBtn from "./LoadBtn";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function RecentCard({ lyrics, artist, title, id }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function setLoad(id) {
    setLoading(true);
    await deleteLyrics(id);
    setLoading(false);
    toast.success("Deleted Successfully");
    router.refresh();
  }

  return (
    <>
      <div className="recentCardContainer">
        <div className="copyCon">
          <LoadBtn className={"copy"} text={lyrics} />

          <h1 className="recentTitle">{title}</h1>
        </div>
        

        <div className={"recentLyrics"}>
          {lyrics.slice(0, 150) + "..."}
          <button className="see" onClick={()=>{router.push(`lyrics/details?id=${id}`)}}>
            {"see-more" }
          </button> 

        </div>
        <div className="lyricDetail">
          <h5 className="recentArtist">{artist}</h5>

          <button className="deleteLyrics">
            {!loading ? (
              <svg
                aria-label="Delete svg button"
                onClick={() => {
                  setLoad(id);
                }}
                className="deleteSvg"
                cursor={"pointer"}
                viewBox="0 0 1024 1024"
                xmlns="http://www.w3.org/2000/svg"
                fill="#ff0000"
                stroke="#ff0000"
                transform="matrix(1, 0, 0, 1, 0, 0)"
                height="25px"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path d="M160 256H96a32 32 0 0 1 0-64h256V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64h-64v672a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32V256zm448-64v-64H416v64h192zM224 896h576V256H224v640zm192-128a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32zm192 0a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32z"></path>
                </g>
              </svg>
            ) : (
              <Loader />
            )}
          </button>
        </div>
      </div>
    </>
  );
}
