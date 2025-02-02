import { selectUser } from "@/app/_lib/actions";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { createSession } from "@/app/_lib/session";
import User from "@/lib/models/user.model";

type FormData = {
  email: string;
  password: string;
  username: string;
};

export async function POST(req: Request) {
  const formData = await req.formData();
  const { email, password, username } = Object.fromEntries(
    formData
  ) as FormData;
  const saltRounds = 10;

  try {
    const checkRegUser = await selectUser(email);

    if (checkRegUser.error) {
      return NextResponse.json({
        success: false,
        message: "Error Validating User. Check Internet Connection",
      });
    }

    if (checkRegUser.data) {
      return NextResponse.json({
        success: false,
        message: "User already registered",
      });
    } else {
      const hash = await bcrypt.hash(password, saltRounds);
      const newData = new User({
        email: email,
        password: hash,
        username: username,
      });
      await newData.save();

      await createSession(email);
      return NextResponse.json(
        {
          success: true,
          message: "Registration Successful",
        },
        { status: 200 }
      );
    }
  } catch (error: any) {
    console.log("[SIGNUP_ERROR]:" + error.message);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
