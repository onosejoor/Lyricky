"use client";

import { useState } from "react";

import { deleteLyrics } from "@/app/_lib/actions";

import Img from "@/components/Img";
import Loader from "../../_components/loader";
import CopyBtn from "../_components/CopyBtn";
import Link from "next/link";
import axios from "axios";
import useSWR, { KeyedMutator } from "swr";
import { DeleteIcon } from "@/components/Icons";
import { showToast } from "@/hooks/Toast";

type LyricsProps = {
  lyric: string;
  artist: string;
  title: string;
  _id: string;
};

type Data = {
  success: boolean;
  lyrics: LyricsProps[];
};

type RecentLyricsProps = LyricsProps & { mutate: KeyedMutator<any> };

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const Recent = () => {
  const { data, error, isLoading, mutate } = useSWR<Data | undefined>(
    "/api/lyrics",
    fetcher
  );

  if (isLoading)
    return (
      <div className="grid my-10 w-[90%] gap-5 mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((array, index) => (
          <LoadingCard key={index} />
        ))}
      </div>
    );

  if (error)
    return (
      <div className="flex gap-10 items-center w-fit mx-auto">
        <Img
          className="h-[400px] w-[400px] mx-auto"
          src={"/images/svg/cancelError.svg"}
          alt={"nothing here yet Image"}
        />
        <h4 className="font-semibold">Error Fetching Lyrics</h4>
      </div>
    );

  if (data?.lyrics?.length) {
    const lyrics = data.lyrics;
    return (
      <div className="grid my-10 w-[90%] gap-5 mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {lyrics.map((data: LyricsProps, index: number) => (
          <RecentCard key={index} {...data} mutate={mutate} />
        ))}
      </div>
    );
  }

  return (
    <div className="flex gap-10 items-center w-fit mx-auto">
      <Img
        className="h-[400px] w-[400px] mx-auto"
        src={"/images/svg/not found.svg"}
        alt={"nothing here yet Image"}
      />
      <h4 className="font-semibold">No lyrics yet</h4>
    </div>
  );
};

function RecentCard({ lyric, artist, title, _id, mutate }: RecentLyricsProps) {
  const [loading, setLoading] = useState(false);

  async function deleteFunction() {
    setLoading(true);
    await deleteLyrics(_id);
    setLoading(false);
    showToast({
      message: "Deleted Successfully",
      variants: "success",
      position: "top",
    });
    mutate();
  }

  return (
    <div className="h-fit dark:bg-gray-900 dark:*:text-white dark:border-white/60 bg-white border-2 border-purple rounded-[10px] p-5">
      <div className="flex justify-between items-center">
        <CopyBtn text={lyric} />

        <b className="text-lg dark:text-white text-black/80 capitalize font-semibold text-end">
          {title}
        </b>
      </div>

      <div className={"text-black/75 my-5"}>
        {lyric.slice(0, 150) + "... "}
        <Link href={`lyrics/details?id=${_id}`} className="block">
          <button className="text-purple/70  dark:text-purple-400 underline">{" see-more"}</button>
        </Link>
      </div>
      <div className="flex justify-between items-center flex-row-reverse">
        <h5 className="text-lg dark:text-white text-black/80 capitalize font-semibold text-end">
          {artist}
        </h5>

        <button>
          {!loading ? (
            <div onClick={deleteFunction}>
              <DeleteIcon />
            </div>
          ) : (
            <Loader />
          )}
        </button>
      </div>
    </div>
  );
}

function LoadingCard() {
  return (
    <div className="h-fit bg-white border-2 border-purple rounded-[10px] p-5">
      <div className="flex h-5 rounded-lg animate-pulse bg-white justify-between items-center"></div>
      <div
        className={
          "text-black/75 rounded-lg  my-5 h-10 animate-pulse bg-black/10"
        }
      ></div>
      <div className="flex h-5 rounded-lg  bg-gray-500 justify-between items-center flex-row-reverse"></div>
    </div>
  );
}

export default Recent;
