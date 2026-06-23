import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { addProjectImage } from "@/utils/projects";


export async function POST(req: Request) {

    const formData = await req.formData();


    const projectId = formData.get("projectId");
    const image = formData.get("image");
    const description = formData.get("description");


    if (
        typeof projectId !== "string" ||
        !(image instanceof File)
    ) {
        return new NextResponse(
            "Invalid parameters",
            {
                status: 400
            }
        );
    }


    /*
        Validate file
    */

    if (!image.type.startsWith("image/")) {
        return new NextResponse(
            "File must be an image",
            {
                status: 400
            }
        );
    }


    if (image.size > 5 * 1024 * 1024) {
        return new NextResponse(
            "Image too large",
            {
                status: 400
            }
        );
    }

    const projectDirectory = path.join(
        process.cwd(),
        "src",
        "projecten",
        projectId
    );


    if (!fs.existsSync(projectDirectory)) {
        fs.mkdirSync(
            projectDirectory,
            {
                recursive: true
            }
        );
    }


    const extension = image.name.split(".").pop();

    const filename =
        `${Date.now()}.${extension}`;


    const filePath = path.join(
        projectDirectory,
        filename
    );


    const bytes = await image.arrayBuffer();


    fs.writeFileSync(
        filePath,
        Buffer.from(bytes)
    );

    const success = addProjectImage(
        projectId,
        filename,
        typeof description === "string"
            ? description
            : ""
    );


    if (!success) {

        // cleanup uploaded file
        fs.unlinkSync(filePath);

        return new NextResponse(
            "Failed saving image metadata",
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