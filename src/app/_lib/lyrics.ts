"use server";
import axios from "axios";
import { verifyUser } from "./dal";

export async function fetchLyrics(formData: FormData) {
  try {
    const auth = await verifyUser();

    if (!auth.isAuth) {
      return { success: false, error: "User Not Signed In" };
    }
    const form = formData;
    console.log(form);
    

    const request = await axios.get(
      `https://api.lyrics.ovh/v1/${form.get("artist")}/${form.get("song")}`,
      {
        timeout: 20000,
        timeoutErrorMessage:
          "Error Fetching Lyrics. Try Checking Internet Connection",
      }
      // "https://api.lyrics.ovh/v1/eminem/stan"
    );

    if (request.data.error) {
      return {
        success: false,
        error: request.data.error + " ,Check Song Credentials",
      };
    }
    const response = request.data;

    return { success: true, data: response };
  } catch (error:any) {
    if (error.status === 404) {
      return {
        success: false,
        error: "Lyric not found. Check artist and title inputs",
      };
    }

    return {
      success: false,
      error: "Error Fetching Lyrics. Try Checking Internet Connection",
    };
  }
}

export default fetchLyrics;
