import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { deleteProjectImage } from "@/utils/projects";


export async function POST(req: Request) {

    const formData = await req.formData();


    const projectId = formData.get("projectId");
    const imageName = formData.get("imageName");


    if (
        typeof projectId !== "string" ||
        typeof imageName !== "string"
    ) {
        return new NextResponse(
            "Invalid parameters",
            {
                status: 400,
            },
        );
    }

    const filename = path.basename(imageName);


    const imagePath = path.join(
        process.cwd(),
        "src",
        "projecten",
        projectId,
        filename,
    );



    /*
        Delete actual image file
    */

    if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
    }



    /*
        Remove image from info.json
    */

    const success = deleteProjectImage(
        projectId,
        imageName,
    );


    if (!success) {
        return new NextResponse(
            "Failed deleting image metadata",
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