import { CancelIcon } from "@/components/Icons";
import Img from "@/components/Img";
import Save from "./Save";

type LyricsProps = {
  lyricsTitle?: string;
  lyricsArtist?: string;
  lyricsLyric?: string;
  click: () => void;
};

const LyricsContainer = ({
  lyricsLyric,
  lyricsArtist,
  lyricsTitle,
  click,
}: LyricsProps) => {
  return (
    <div className={`grid gap-5 ${lyricsLyric ? "overflow-y-scroll" : ""}  py-2`}>
      {lyricsLyric ? (
        <div className="flex gap-5">
          <div className="grid gap-5 h-fit sticky top-0">
            <CancelIcon cursor={'pointer'} height={40} width={40} fill="red" onClick={click} />

            <Save
              title={lyricsTitle!}
              lyrics={lyricsLyric!}
              artist={lyricsArtist!}
            />
          </div>
          <div className=" w-full">
            <div>
              <h1 className="text-lg mb-5 text-black/80 capitalize font-semibold text-end">
                {lyricsTitle}
              </h1>
            </div>
            <div>
              <p className="text-gray-800 whitespace-break-spaces">
                {lyricsLyric}
              </p>
            </div>
            <h5 className="text-lg mb-5 text-black/80 capitalize font-semibold text-end">
              {lyricsArtist}
            </h5>
          </div>
        </div>
      ) : (
        <div className="grid place-content-center">
          <Img
            src={"/images/nothingHere.png"}
            className="h-[200px] w-[200px] "
            alt={"Nothing here image"}
          />
        </div>
      )}
    </div>
  );
};

export default LyricsContainer;
