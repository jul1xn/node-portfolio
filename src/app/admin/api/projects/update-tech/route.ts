import { NextResponse } from "next/server";
import { updateProjectTech } from "@/utils/projects";


export async function POST(req: Request) {

    const formData = await req.formData();


    const projectId = formData.get("projectId");
    const tech = formData.getAll("tech");


    if (
        typeof projectId !== "string"
    ) {
        return new NextResponse(
            "Invalid parameters",
            {
                status: 400
            }
        );
    }


    const success = updateProjectTech(
        projectId,
        tech.filter(
            item => typeof item === "string"
        ) as string[]
    );


    if (!success) {
        return new NextResponse(
            "Failed updating tech",
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