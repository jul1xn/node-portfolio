import { NextRequest, NextResponse } from "next/server";

const ADMIN_COOKIE = "admin_token";
const ADMIN_SECRET = process.env.ADMIN_SECRET || "replace-me";

export function middleware(req: NextRequest) {
  const token = req.cookies.get(ADMIN_COOKIE)?.value;

  // Protect all /admin routes except login
  if (
    req.nextUrl.pathname.startsWith("/admin") &&
    !req.nextUrl.pathname.startsWith("/admin/login")
  ) {
    if (token !== ADMIN_SECRET) {
      const loginUrl = new URL("/admin/login", req.url);
      loginUrl.searchParams.set("error", "Invalid session");

      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};