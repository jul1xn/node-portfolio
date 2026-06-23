import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
    const token = req.cookies.get("admin_token")?.value;

    if (
        req.nextUrl.pathname.startsWith("/admin") &&
        req.nextUrl.pathname !== "/admin/login" &&
        req.nextUrl.pathname !== "/admin" &&
        token !== process.env.ADMIN_SECRET
    ) {
        return NextResponse.redirect(
            new URL("/admin/login?error=Log+eerst+in+om+deze+pagina+te+bekijken", req.url)
        );
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"],
};