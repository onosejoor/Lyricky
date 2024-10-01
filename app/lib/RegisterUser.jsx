"use server";

import bcrypt from "bcrypt";
import { selectUser, selectUserName } from "./userFunctions";
import { createSession} from "./session";
import { supabase } from "./db";

export default async function registerUser(formData) {
  const email = formData.get("email");
  const password = formData.get("password");
  const username = formData.get("username");
  const saltRounds = 10;

  const checkRegUser = await selectUser(email);
  const checkUserName = await selectUserName(username);

  if (checkRegUser.error || checkUserName.error) {
    return {
      success: false,
      message: "Error Validating User. Check Internet Connection",
    };
  }

  if (checkRegUser.data) {
    return { success: false, message: "User already registered" };
  } else if (checkUserName.data) {
    return { success: false, message: "Username already used" };
  } else {
    const hash = await bcrypt.hash(password, saltRounds);

    await supabase.from("users").insert({
      email: email,
      password: hash,
      username: username,
    })

    await createSession(username);
    return { success: true, message: "Registration Successful", redirect: true};
  }
}
