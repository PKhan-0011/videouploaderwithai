import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // sabse phele mai ye lunga like ki getToken login hai ya nahi checking lagunag okkh!..

  const token = await getToken({ req: request });
  const pathname = request.nextUrl.pathname;

  if (
    pathname.startsWith("/register") ||
    pathname.startsWith("/Login") ||
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/home")
  ) {
    return NextResponse.next();
  }

  if (!token && pathname.startsWith("/videoUploader")) {
    return NextResponse.redirect(new URL("/Login", request.url));
  }

  if (
    token &&
    (pathname.startsWith("/register") || pathname.startsWith("/Login"))
  ) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|static|favicon.ico).*)"],
};
