"use client";

import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import serve from "@/lib/ServerAction";
import Loader from "@/_components/loader";
import LyricsContainer from "@/_components/Lyrics";

export default function ServerComponent() {
  // Refs and states for lyrics data, loaing, and error
  const initial = useRef(true);
  const [lyrics, setLyrics] = useState({
    lyricsTitle: "",
    lyricsArtist: "",
    lyricsLyric: "",
  });
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    artist: "",
    song: "",
  });
  const [error, setError] = useState({
    song: "",
  });

  // Fetch data from localStorage
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("lyrics"))) {
      const lyri = JSON.parse(localStorage.getItem("lyrics"));
      setLyrics(lyri);
    }
  }, []);

  useEffect(() => {
    if (initial.current) {
      initial.current = false;
      return;
    }
    localStorage.setItem("lyrics", JSON.stringify(lyrics));
  }, [lyrics]);

  // Server action to fetch lyrics
  const set = async (formData) => {
    const request = await serve(formData);

    if (request.success) {
      const { lyrics, artist, title } = request.data;

      setLyrics((prev) => {
        return {
          ...prev,
          lyricsLyric: lyrics,
          lyricsArtist: artist,
          lyricsTitle: title,
        };
      });
    } else {
      setLyrics({});
      toast.error(request.error);
    }
    setLoading(false);
  };

  // handle form change, submit, and error
  function formChange(e) {
    const { name, value } = e.target;
    setForm((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
    setError((prev) => {
      return {
        ...prev,
        [name]: "",
      };
    });
  }
  const handleSubmit = (e) => {
    const newError = {};

    const keys = form.song;

    if (!keys.trim()) {
      e.preventDefault();
      newError.song = "Song Title required";
      setError(newError);
      setLoading(false);
    }
  };

  // HTML
  return (
    <>
      <section id="lyrics">
        <h3 className={"h1"}>Lyrics finder</h3>
        <div className="formCon">
          <form action={set} className="lyricForm">
            <div>
              {" "}
              <label htmlFor="Song">Song Title</label>
              <input
                style={{ borderColor: error.song ? "red" : "initial" }}
                name="song"
                value={form.song}
                onChange={formChange}
              />
              {error.song && <h5 className="formError">{error.song}</h5>}
            </div>
            <div>
              {" "}
              <label htmlFor="Name">
                Artist Name{" "}
                <span style={{ opacity: ".83", fontSize: "smaller" }}>
                  (optional)
                </span>
              </label>
              <input
                style={{ borderColor: error.artist ? "red" : "initial" }}
                type="text"
                name="artist"
                value={form.artist}
                onChange={formChange}
              />
            </div>

            <button
              className="CTAbutton"
              type="submit"
              onClick={(e) => {
                setLoading(true);
                handleSubmit(e);
              }}
            >
              {loading ? (
                <>
                  <Loader /> Loading...
                </>
              ) : (
                "Submit"
              )}
            </button>
          </form>

          <LyricsContainer
            text={lyrics.lyricsLyric}
            artist={lyrics.lyricsArtist}
            title={lyrics.lyricsTitle}
            click={() => {
              setLyrics({});
            }}
          />
        </div>
      </section>
    </>
  );
}
