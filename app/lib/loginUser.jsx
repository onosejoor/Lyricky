"use server";

import bcrypt from "bcrypt";
import { selectUser } from "./userFunctions";
import { createSession } from "./session";

export default async function loginUser(formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const checkRegUser = await selectUser(email);

    if (checkRegUser.error) {
      return { success: false, message: "Couldn't Validate User, Check Internet Connection" };
    }

    if (!checkRegUser.data) {
      return {
        success: false,
        message: `${email} Is Not Registered on Lyricky`,
      };
    } else {
      const dbEmail = checkRegUser.data.password;

      const hash = await bcrypt.compare(password, dbEmail);
      const { username } = checkRegUser.data;

      if (hash) {
        await createSession(username);
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
    console.log(error, "keje");
    
    return { success: false, message: error.message };
  }
}
