import { NextResponse } from "next/server";
import { updateProjectThumbnail } from "@/utils/projects";


export async function POST(req: Request) {

    const formData = await req.formData();


    const projectId = formData.get("projectId");
    const thumbnail = formData.get("thumbnail");


    if (
        typeof projectId !== "string" ||
        typeof thumbnail !== "string"
    ) {
        return new NextResponse(
            "Invalid parameters",
            {
                status: 400,
            },
        );
    }


    const success = updateProjectThumbnail(
        projectId,
        thumbnail,
    );


    if (!success) {
        return new NextResponse(
            "Failed updating thumbnail",
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