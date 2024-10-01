import Img from "./Img";
import Save from "./Save";


const LyricsContainer = ({ text, artist, title, click }) => {
  return (
    <>
      <div className={text ? "lyrics" : "lyrics grid"}>
        {text ? (
          <>
            {" "}
            <div className="fetchLyrics">
            <div className="lyricsSvg">
              <svg
              onClick={click}
                viewBox="0 0 16 16"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                fill="red"
                height={"30"}
                stroke="#000000"
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

              
              <Save title={title} lyrics={text} artist={artist}  />
              

              </div>
              <div>
                <div>
                  <h1 className="recentTitle">{title}</h1>
                </div>
                <div >
                  <p>{text}</p>
                </div>
                <h5 className="recentArtist">{artist}</h5>
              </div>
            </div>
          </>
        ) : (
          <Img src={"/images/nothingHere.png"} alt={"Nothing here image"} />
        )}
      </div>
    </>
  );
};

export default LyricsContainer;
