import { NextResponse } from "next/server";
import { updateProjectLongDescription } from "@/utils/projects";


export async function POST(req: Request) {

    const formData = await req.formData();

    const projectId = formData.get("projectId");
    const description = formData.get("description");


    if (
        typeof projectId !== "string" ||
        typeof description !== "string"
    ) {
        return new NextResponse(
            "Invalid parameters",
            {
                status: 400
            }
        );
    }


    const success = updateProjectLongDescription(
        projectId,
        description
    );


    if (!success) {
        return new NextResponse(
            "Could not update project description",
            {
                status: 500
            }
        );
    }


    return NextResponse.redirect(
        new URL(
            `/admin/projecten/${projectId}`,
            req.url
        ),
        {
            status: 303
        }
    );
}