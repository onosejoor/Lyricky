"use server";

import bcrypt from "bcrypt";
import { selectUser } from "./userFunctions";
import { createSession } from "./session";

export default async function loginUser(formData) {
  // Form data
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    // select user from db and check if there's an error
    const checkRegUser = await selectUser(email);

    if (checkRegUser.error) {
      return {
        success: false,
        message: "Couldn't Validate User, Check Internet Connection",
      };
    }
// check if user exists
    if (!checkRegUser.data) {
      return {
        success: false,
        message: `${email} Is Not Registered on Lyricky`,
      };
    } else {
      const dbEmail = checkRegUser.data.password;
      // if user was registered via google

      if (dbEmail === process.env.GOOGLE_CODE) {
        return {
          success: false,
          message: `${email} is already connected with a Google account, please sign-in with Google`,
        };
      }

      // 
      const hash = await bcrypt.compare(password, dbEmail);
      const { email,username } = checkRegUser.data;

      if (hash) {
        await createSession(email, username);
        return {
          success: true,
          message: "Logged In Succesfully",
          redirect: true,
        };
      } else {
        return { success: false, message: "Incorrect Password!" };
      }
    }
  } catch (error) {
    // console.log(error, "keje");

    return { success: false, message: error.message };
  }
}
