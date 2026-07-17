import { NextResponse } from "next/server";
import { deleteProjectLink } from "@/utils/projects";


export async function POST(req: Request) {

    const formData = await req.formData();


    const projectId = formData.get("projectId");
    const url = formData.get("url");


    if (
        typeof projectId !== "string" ||
        typeof url !== "string"
    ) {
        return new NextResponse(
            "Invalid parameters",
            {
                status: 400,
            },
        );
    }


    const success = deleteProjectLink(
        projectId,
        url,
    );


    if (!success) {
        return new NextResponse(
            "Failed deleting link",
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