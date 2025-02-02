import { verifyUser } from "@/app/_lib/dal";
import Lyric from "@/lib/models/lyrics.model";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const user_id = (await verifyUser()).user as string;

  if (!user_id) {
    return NextResponse.json(
      {
        success: false,
        message: "UnAuthenticated",
      },
      { status: 401 }
    );
  }

  try {
    const userLyric = await Lyric.find({ user_id: user_id }).select({});
    

    return NextResponse.json({
      success: true,
      lyrics: userLyric,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}
