import { useState } from "react";
import { mutate } from "swr";

import { insert } from "@/app/_lib/actions";

import Loader from "@/app/_components/loader";

import { CheckedIcon, SaveIcon } from "@/components/Icons";
import { showToast } from "@/hooks/Toast";

type Props = {
  lyrics: string;
  title: string;
  artist: string;
};

const Save = ({ lyrics, artist, title }: Props) => {
  const [loading, setloading] = useState(false);
  const [saved, setSaved] = useState(false);

  async function saveLyric() {
    setloading(true);
    const insertLyrics = await insert(artist, title, lyrics);

    if (!insertLyrics.success) {
      showToast({
        variants: "error",
        message: insertLyrics.message,
        position: "top",
      });
    } else {
      setSaved(true);

      setTimeout(() => {
        setSaved(false);
      }, 1000);

      showToast({
        variants: "success",
        message: insertLyrics.message,
        position: "top",
      });
      mutate("/api/lyrics");
    }
    setloading(false);
  }
  return (
    <div className="saveSvg">
      {!saved ? (
        loading ? (
          <Loader className="!h-[30px] !w-[30px] mx-auto" />
        ) : (
          <SaveIcon
            onClick={saveLyric}
            className="h-[40px] w-[40px] cursor-pointer"
            xlinkTitle="save lyric"
          />
        )
      ) : (
        <CheckedIcon height={40} width={40} />
      )}
    </div>
  );
};

export default Save;
