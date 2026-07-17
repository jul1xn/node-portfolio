import { NextResponse } from "next/server";
import { deleteProjectFolder } from "@/utils/projects";

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export async function POST(req: Request) {
    const formData = await req.formData();
    const projectId = formData.get("projectId");

    if (typeof projectId !== "string" || !slugPattern.test(projectId)) {
        return new NextResponse("Invalid parameters", { status: 400 });
    }

    const success = deleteProjectFolder(projectId);

    if (!success) {
        return new NextResponse("Failed deleting project", { status: 500 });
    }

    return NextResponse.redirect(
        new URL("/admin/dashboard", req.url),
        { status: 303 },
    );
}