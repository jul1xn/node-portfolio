import { NextRequest, NextResponse } from "next/server";
import { createRedirectUrl } from "@/utils/redirect-url";

export async function POST(req: NextRequest) {
    const formData = await req.formData();
    const key = formData.get("key") as string;

    if (key !== process.env.ADMIN_SECRET) {
        return NextResponse.redirect(
            createRedirectUrl(req, "/admin/login?error=Ongeldige+inloggegevens"),
        );
    }

    const response = NextResponse.redirect(
        createRedirectUrl(req, "/admin/dashboard"),
    );

    response.cookies.set("admin_token", key, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
    });

    return response;
}
