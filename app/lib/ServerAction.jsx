"use server";
import axios from "axios";
import { verifyUser } from "./dal";

export async function serve(formData) {
  try {
    const auth = await verifyUser();

    if (!auth.IsAuth) {
      return { success: false, error: "User Not Signed In" };
    }
    const form = await formData;

    const request = await axios.get(
      `https://lyrist.vercel.app/api/${form.get("song")}/${form.get("artist")}`,
      {
        timeout: 20000,
        timeoutErrorMessage:
          "Error Fetching Lyrics. Try Checking Internet Connection",
      }
      // "https://api.lyrics.ovh/v1/eminem/stan"
    );

    if (!request.data.lyrics) {
      return { success: false, error: "Incorrect Song Credentials" };
    }
    const response = request.data;

    return { success: true, data: response };
  } catch (error) {
    return {
      success: false,
      error: "Error Fetching Lyrics. Try Checking Internet Connection",
    };
  }
}

export default serve;
