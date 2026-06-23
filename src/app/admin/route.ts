import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const formData = await req.formData();
    const key = formData.get("key") as string;

    if (key !== process.env.ADMIN_SECRET) {
        return NextResponse.redirect(
            new URL("/admin/login?error=Ongeldige+inloggegevens", req.url)
        );
    }

    const response = NextResponse.redirect(
        new URL("/admin/dashboard", req.url)
    );

    response.cookies.set("admin_token", key, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
    });

    return response;
}