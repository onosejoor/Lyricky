"use client";

import { ChangeEvent, useState } from "react";

import { showToast } from "@/hooks/Toast";

import getLyrics from "@/app/_lib/lyrics";
import Loader from "@/app/_components/loader";
import LyricsContainer from "@/app/lyrics/_components/Lyrics";

type LyricsProps = {
  lyricsTitle?: string;
  lyricsArtist?: string;
  lyricsLyric?: string;
};

type Form = {
  artist?: string;
  song?: string;
};

export default function Form() {
  // Refs and states for lyrics data, loaing, and error
  const [lyrics, setLyrics] = useState<LyricsProps>({
    lyricsTitle: "",
    lyricsArtist: "",
    lyricsLyric: "",
  });
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<Form>({
    song: "",
    artist: "",
  });

  const { song, artist } = form;

  const isDisabled = !song?.trim() || !artist?.trim();

  const clearLyric = () => {
    setLyrics({});
  };

  const startLoader = () => setLoading(true);

  const handleSubmit = async (formData: FormData) => {
    const request = await getLyrics(formData);
    if (request.success) {
      const { lyrics } = request.data;

      setLyrics((prev) => {
        return {
          ...prev,
          lyricsLyric: lyrics,
          lyricsArtist: artist,
          lyricsTitle: song,
        };
      });
    } else {
      setLyrics({});
      showToast({
        message: request.error!,
        variants: "error",
        position: "top",
      });
    }
    setLoading(false);
  };

  // handle form change, submit, and error
  function formChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }
  return (
    <section>
      <h3
        className={
          "px-5 text-2xl dark:text-white pl-20 underline capitalize font-semibold my-5"
        }
      >
        Lyrics finder
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 divide-x dark:divide-purple-500 dark:border-white divide-purple my-2 w-[90%] mx-auto rounded-lg gap-2.5 border border-purple rounded-b-md overflow-hidden h-[700px] md:h-[350px]">
        <form action={handleSubmit} className="flex flex-col gap-2.5 p-5">
          <div className="grid gap-1.5 mb-2.5 ">
            <label htmlFor="Song" className="text-base text-white font-medium">
              Song Title
            </label>
            <input
              className={`px-3 py-2 dark:border-white dark:placeholder:text-white border rounded-md border-black outline-0 focus:border-purple `}
              name="song"
              value={form.song}
              type="text"
              onChange={formChange}
            />
          </div>
          <div className="grid gap-1.5 mb-2.5 ">
            <label htmlFor="Name" className="text-base text-white font-medium">
              Artist Name
            </label>
            <input
              type="text"
              name="artist"
              className={`px-3 py-2 dark:border-white dark:placeholder:text-white border border-black rounded-md outline-0 focus:border-purple`}
              value={form.artist}
              onChange={formChange}
            />
          </div>
          <button
            type="submit"
            onClick={startLoader}
            disabled={isDisabled}
            className="px-5 disabled:opacity-70  dark:disabled:border-white disabled:border-gray-700/50 disabled:cursor-not-allowed disabled:text-gray-500 py-4 w-fit font-medium text-white flex gap-2 h-fit bg-purple/50 border-[1.5px] border-purple rounded-xl "
          >
            {loading ? (
              <>
                <Loader className="shrink-0 border-t-white" /> Loading...
              </>
            ) : (
              "Submit"
            )}
          </button>
        </form>

        <LyricsContainer {...lyrics} click={clearLyric} />
      </div>
    </section>
  );
}
