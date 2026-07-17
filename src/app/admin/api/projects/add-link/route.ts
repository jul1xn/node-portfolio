import { NextResponse } from "next/server";
import { addProjectLink } from "@/utils/projects";


export async function POST(req: Request) {

    const formData = await req.formData();


    const projectId = formData.get("projectId");
    const name = formData.get("name");
    const url = formData.get("url");


    if (
        typeof projectId !== "string" ||
        typeof name !== "string" ||
        typeof url !== "string"
    ) {
        return new NextResponse(
            "Invalid parameters",
            {
                status: 400,
            },
        );
    }


    const success = addProjectLink(
        projectId,
        name,
        url,
    );


    if (!success) {
        return new NextResponse(
            "Failed adding link",
            {
                status: 500,
            },
        );
    }


    return NextResponse.redirect(
        new URL(
            `/admin/projecten/${projectId}`,
            req.url,
        ),
        {
            status: 303,
        },
    );
}