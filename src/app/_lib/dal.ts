import "server-only";
import { cookies } from "next/headers";
import { decode } from "./session";

export const verifyUser = async () => {
  const cookie = (await cookies()).get("session")?.value || "";

  const session = await decode(cookie);

  if (session?.id) {
    return { isAuth: true, user: session.id };
  } else {
    return { isAuth: false, message: "User Not Signed in" };
  }
};
