import { verifyUser } from "@/app/_lib/dal";
import uploadImage from "@/app/_lib/upload";
import User from "@/lib/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const getId = (await verifyUser()).user;
    if (!getId) {
      return NextResponse.json({ user: null }, { status: 200 });
    }
    const getUser = await User.findById(getId);

    return NextResponse.json({ user: getUser }, { status: 200 });
  } catch (error: any) {
    console.log("[GET_USER_ERROR]:" + error);

    return NextResponse.json(
      { user: null, message: error.message },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const user_id = (await verifyUser()).user as string;

    const formData = await req.formData();
    const { imgFile, username } = Object.fromEntries(formData) as {
      imgFile: File;
      username: string;
    };

    const { image } = await uploadImage(imgFile);

    const data = {
      ...(username && { username: username }),
      ...(image && { avatar: image }),
    };

    console.log(data);

    await User.updateOne(
      { _id: user_id },
      {
        $set: data,
      }
    );
    return NextResponse.json(
      {
        success: true,
        message: "Profile Updated successfully",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log("[UPDATE_PROFILE_ERROR]:" + error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}
