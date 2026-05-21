import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

type Params = {
  id: string;
  file: string;
};

export async function GET(
  _req: Request,
  { params }: { params: Promise<Params> }
) {
  try {
    const { id, file } = await params;

    if (!id || !file) {
      return NextResponse.json(
        { message: "Missing parameters" },
        { status: 400 }
      );
    }

    const safeFile = decodeURIComponent(file);

    if (safeFile.includes("..")) {
      return NextResponse.json({ message: "Invalid file" }, { status: 400 });
    }

    const filePath = path.join(
      process.cwd(),
      "src",
      "projecten",
      id,
      safeFile
    );

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    const data = await fs.promises.readFile(filePath);

    const ext = path.extname(file).toLowerCase();

    const map: Record<string, string> = {
      ".png": "image/png",
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".webp": "image/webp",
      ".gif": "image/gif",
      ".svg": "image/svg+xml",
    };

    return new NextResponse(data, {
      status: 200,
      headers: {
        "Content-Type": map[ext] ?? "application/octet-stream",
      },
    });
  } catch (err) {
    console.error("projecten api error", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}