"use server";
import { revalidatePath } from "next/cache";
import { supabase } from "./db";
import { verifyUser } from "./dal";

// Select user from db using email
export async function selectUser(email) {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email, $1", [email]);

    if (error) {
      const { message } = error;
      return { error: message };
    } else {
      const [user] = data;

      return { data: user };
    }
  } catch (error) {
    return { error: error.message };
  }
}

// Select user from db using username
export async function selectUserName(username) {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("username, $1", [username]);

    if (error) {
      return { error: error.message + "psojsoj" };
    } else {
      const [user] = data;
      return { data: user };
    }
  } catch (error) {
    return { error: `Error: ${error.message}` };
  }
}

// Select user saved lyrics from db using email

export async function selectLyrics(email) {
  try {
    const { data, error } = await supabase
      .from("lyrics")
      .select("*, users(*)")
      .eq("user_email, $1", [email]);

    if (error) {
      return { error: error.message };
    } else {
      const lyrics = data;
      return { data: lyrics };
    }
  } catch (error) {
    return { error: error.message };
  }
}

export async function selectLyricsById(id, username) {
  try {
    const { data: user } = await selectUser(username);
    const { data, error } = await supabase
      .from("lyrics")
      .select("*")
      .eq("user_email, $1", [user.email])
      .or(`id.eq.${id}`);

    if (error) {
      return { error: error.message };
    } else {
      const lyrics = data;
      return { data: lyrics };
    }
  } catch (error) {
    return { error: error.message };
  }
}

// insert lyrics into db
export async function insertLyrics(email, artist, title, lyrics) {
  try {
    const { data, error } = await supabase.from("lyrics").insert({
      artist: artist,
      title: title,
      lyrics: lyrics,
      user_email: email,
    });
    if (error) {
      return { error: error.message };
    }
  } catch (error) {
    return { error: error.message };
  }
}

// delete lyrics from db
export async function deleteLyrics(id) {
  try {
    const response = await supabase.from("lyrics").delete().eq("id, $1", [id]);

    revalidatePath("/lyrics");
  } catch (error) {
    console.log(error);
  }
}

// Second insert
export async function insert(artist, title, lyrics) {
  const request = await verifyUser();

  if (!request.IsAuth) {
    return { success: false, message: "User Not Signed In" };
  } else {
    const { user } = request;

    await insertLyrics(user, artist, title, lyrics);

    return { success: true, message: "Inserted Successfully" };
  }
}
