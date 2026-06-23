import path from "path";
import fs from "fs";

type ProjectInfo = {
    title: string;
    shortDescription: string;
    tech: string[];
    links?: { name: string; url: string }[];
    images?: { url: string; description: string }[];
    thumbnail?: string;
    longHtml?: string;
};

export function getAllProjects(
    page: number = 1,
    limit: number = 12,
    filter: string | null = null
) {
    const directories =
        fs.readdirSync(path.join(process.cwd(), "src", "projecten"), {
            withFileTypes: true,
        })
            .filter(dire => dire.isDirectory())
            .map(dir => dir.name);

    const projects: string[] = [];

    directories.forEach(dir => {
        const projectData = getProjectInfo(dir);

        if (projectData) {
            if (!filter || projectData.tech.includes(filter)) {
                projects.push(dir);
            }
        }
    });

    return projects;
}

export function getProjectInfo(id: string): ProjectInfo | null {
    const jsonPath = path.join(process.cwd(), "src", "projecten", id, "info.json");

    if (!fs.existsSync(jsonPath)) {
        return null;
    }

    const fileContents = fs.readFileSync(jsonPath, "utf8");
    const parsed = JSON.parse(fileContents) as ProjectInfo[];
    const final = parsed?.[0] ?? null;
    if (final) {
        final.tech = final.tech.sort((a, b) =>
            a.localeCompare(b, undefined, { sensitivity: "base" })
        );
    }
    return final;
}

export function getProjectLongDescription(id: string): string {
    const project = getProjectInfo(id);

    if (!project?.longHtml) {
        return "";
    }

    const filePath = path.join(
        process.cwd(),
        "src",
        "projecten",
        id,
        project.longHtml
    );

    if (!fs.existsSync(filePath)) {
        return "";
    }

    return fs.readFileSync(filePath, "utf8");
}