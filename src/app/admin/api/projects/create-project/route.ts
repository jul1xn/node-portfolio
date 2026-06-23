import { NextResponse } from "next/server";
import { createProjectFolder } from "@/utils/projects";

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export async function POST(req: Request) {
    const formData = await req.formData();

    const projectId = formData.get("internalName");
    const title = formData.get("title");
    const shortDescription = formData.get("shortDescription");

    if (
        typeof projectId !== "string" ||
        typeof title !== "string" ||
        typeof shortDescription !== "string" ||
        !slugPattern.test(projectId)
    ) {
        return new NextResponse("Invalid parameters", { status: 400 });
    }

    const success = createProjectFolder(projectId, title, shortDescription);

    if (!success) {
        return new NextResponse("Failed creating project", { status: 500 });
    }

    return NextResponse.redirect(
        new URL(`/admin/projecten/${projectId}`, req.url),
        { status: 303 }
    );
}