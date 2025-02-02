import { NextRequest, NextResponse } from "next/server";
import { verifyUser } from "@/app/_lib/dal";

export async function middleware(req: NextRequest) {
  const { isAuth } = await verifyUser();
  const { pathname } = req.nextUrl;
  const protectedRoute = ["/lyrics", '/settings'];

  if (protectedRoute.includes(pathname) && !isAuth) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
