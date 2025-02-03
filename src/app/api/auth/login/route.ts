import { selectUser } from "@/app/_lib/actions";
import { NextResponse } from "next/server";

import bcrypt from "bcrypt";
import { createSession } from "@/app/_lib/session";

export async function POST(reg: Request) {
  const formData = await reg.formData();
  // Form data
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    // select user from db and check if there's an error
    const checkRegUser = await selectUser(email);

    if (checkRegUser.error) {
      return NextResponse.json({
        success: false,
        message: "Couldn't Validate User, Check Internet Connection",
      });
    }
    // check if user exists
    if (!checkRegUser.data) {
      return NextResponse.json({
        success: false,
        message: `${email} Is Not Registered on Lyricky`,
      });
    } else {
      const dbEmail = checkRegUser.data.password;
      // if user was registered via google

      if (dbEmail === process.env.GOOGLE_CODE) {
        return NextResponse.json({
          success: false,
          message: `${email} is already connected with a Google account, please sign-in with Google`,
        });
      }
      //
      const hash = await bcrypt.compare(password, dbEmail);

      const { id } = checkRegUser.data;

      if (hash) {
        await createSession(id);
        return NextResponse.json({
          success: true,
          message: "Logged in succesfully",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Incorrect Password!",
        });
      }
    }
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: "Internal Error, try again",
      },
      { status: 500 }
    );
  }
}
