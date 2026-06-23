import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
    const token = req.cookies.get("admin_token")?.value;

    if (
        req.nextUrl.pathname.startsWith("/admin") &&
        req.nextUrl.pathname !== "/admin/login" &&
        token !== process.env.ADMIN_SECRET
    ) {
        return NextResponse.redirect(
            new URL("/admin/login?error=Unauthorized", req.url)
        );
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"],
};