import "server-only";
import { cookies } from "next/headers";
import { decode } from "./session";

export const verifyUser = async () => {
  const cookie = cookies().get("session")?.value;

  const session = await decode(cookie);
  

  if (session?.username) {
    return { IsAuth: true, user: session.email, username: session.username };
  } else {
    return { IsAuth: false, message: "User Not Signed in"};
  }
};
