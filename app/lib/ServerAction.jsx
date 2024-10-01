"use server";
import axios from "axios";
import {selectUserName } from "./userFunctions";
import { verifyUser } from "./dal";

export async function serve(formData) {
  try {
    const auth = await verifyUser();

    const username = auth.user;
    if (!auth.IsAuth) {
      return { success: false, error: "User Not Signed In" };
    }

    const select = await selectUserName(username);

    if (select.error) {
      return { success: false, error: "Error Fetching Lyrics. Try Checking Internet Connection" };
    }
    const { email } = select.data;

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
    return { success: false, error: error.message};
  }
}

export default serve;
