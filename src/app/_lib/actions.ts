"use server";

import { redirect } from "next/navigation";

import { verifyUser } from "./dal";
import { logout } from "./session";

import User from "@/lib/models/user.model";
import Lyric from "@/lib/models/lyrics.model";

// Select user from db using email
export async function selectUser(email: string) {
  try {
    const data = await User.findOne({ email: email }).select({});

    return { data: data };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function selectLyricById(id: string) {
  const user = (await verifyUser()).user as string;
  try {
    const lyric = await Lyric.findOne({ _id: id, user_id: user }).select({});
    if (!lyric) {
      redirect("/lyrics");
    }
    return { data: lyric };
  } catch (error: any) {
    return { error: error.message };
  }
}

// insert lyrics into db
export async function insertLyrics(
  id: string,
  artist: string,
  title: string,
  lyrics: string
) {
  try {
    const newLyric = new Lyric({
      artist: artist,
      title: title,
      lyric: lyrics,
      user_id: id,
    });
    await newLyric.save();
  } catch (error: any) {
    console.log(error);

    return { error: error.message };
  }
}

// delete lyrics from db
export async function deleteLyrics(id: string) {
  try {
    await Lyric.deleteOne({ _id: id });
  } catch (error: any) {
    console.log(["[DELETE_LYRIC_ERROR]" + error.message]);
  }
}

// Second insert
export async function insert(artist: string, title: string, lyrics: string) {
  const request = await verifyUser();
  if (!request.isAuth) {
    return { success: false, message: "User Not Signed In" };
  }

  const id = request.user as string;

  await insertLyrics(id, artist, title, lyrics);

  return { success: true, message: "Inserted Successfully" };
}

export const deleteSession = async () => {
  await logout();
  redirect("/login");
};
