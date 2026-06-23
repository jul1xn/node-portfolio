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

export function updateProjectLongDescription(
    id: string,
    description: string
): boolean {
    const project = getProjectInfo(id);

    if (!project?.longHtml) {
        return false;
    }

    const filePath = path.join(
        process.cwd(),
        "src",
        "projecten",
        id,
        project.longHtml
    );

    try {
        fs.writeFileSync(
            filePath,
            description,
            "utf8"
        );

        return true;
    } catch (error) {
        console.error(
            "Failed to update project description:",
            error
        );

        return false;
    }
}

export function addProjectLink(
    id: string,
    name: string,
    url: string
): boolean {

    const jsonPath = path.join(
        process.cwd(),
        "src",
        "projecten",
        id,
        "info.json"
    );


    if (!fs.existsSync(jsonPath)) {
        return false;
    }


    try {
        const fileContents = fs.readFileSync(
            jsonPath,
            "utf8"
        );

        const projects = JSON.parse(fileContents) as ProjectInfo[];


        if (!projects[0]) {
            return false;
        }


        if (!projects[0].links) {
            projects[0].links = [];
        }


        projects[0].links.push({
            name,
            url
        });


        fs.writeFileSync(
            jsonPath,
            JSON.stringify(projects, null, 4),
            "utf8"
        );


        return true;

    } catch (error) {

        console.error(
            "Failed adding project link:",
            error
        );

        return false;
    }
}

export function deleteProjectLink(
    id: string,
    url: string
): boolean {

    const jsonPath = path.join(
        process.cwd(),
        "src",
        "projecten",
        id,
        "info.json"
    );


    if (!fs.existsSync(jsonPath)) {
        return false;
    }


    try {
        const fileContents = fs.readFileSync(
            jsonPath,
            "utf8"
        );


        const projects = JSON.parse(fileContents) as ProjectInfo[];


        if (!projects[0]?.links) {
            return false;
        }


        const originalLength = projects[0].links.length;


        projects[0].links = projects[0].links.filter(
            link => link.url !== url
        );


        // Nothing was removed
        if (projects[0].links.length === originalLength) {
            return false;
        }


        fs.writeFileSync(
            jsonPath,
            JSON.stringify(projects, null, 4),
            "utf8"
        );


        return true;

    } catch (error) {

        console.error(
            "Failed deleting project link:",
            error
        );

        return false;
    }
}

export function addProjectImage(
    id: string,
    imageUrl: string,
    description: string = ""
): boolean {

    const jsonPath = path.join(
        process.cwd(),
        "src",
        "projecten",
        id,
        "info.json"
    );


    if (!fs.existsSync(jsonPath)) {
        return false;
    }


    try {

        const fileContents = fs.readFileSync(
            jsonPath,
            "utf8"
        );


        const projects = JSON.parse(fileContents) as ProjectInfo[];


        if (!projects[0]) {
            return false;
        }


        if (!projects[0].images) {
            projects[0].images = [];
        }


        projects[0].images.push({
            url: imageUrl,
            description
        });


        fs.writeFileSync(
            jsonPath,
            JSON.stringify(projects, null, 4),
            "utf8"
        );


        return true;


    } catch (error) {

        console.error(
            "Failed adding project image:",
            error
        );

        return false;
    }
}

export function deleteProjectImage(
    id: string,
    imageUrl: string
): boolean {

    const jsonPath = path.join(
        process.cwd(),
        "src",
        "projecten",
        id,
        "info.json"
    );


    if (!fs.existsSync(jsonPath)) {
        return false;
    }


    try {
        const fileContents = fs.readFileSync(
            jsonPath,
            "utf8"
        );


        const projects = JSON.parse(fileContents) as ProjectInfo[];


        if (!projects[0]?.images) {
            return false;
        }


        const originalLength = projects[0].images.length;


        projects[0].images = projects[0].images.filter(
            image => image.url !== imageUrl
        );


        if (projects[0].images.length === originalLength) {
            return false;
        }

        // check if the thumbnail is equal to the deleted file
        if (projects[0].thumbnail && projects[0].thumbnail === imageUrl) {
            projects[0].thumbnail = "";
        }


        fs.writeFileSync(
            jsonPath,
            JSON.stringify(projects, null, 4),
            "utf8"
        );


        return true;


    } catch (error) {

        console.error(
            "Failed deleting project image metadata:",
            error
        );

        return false;
    }
}

export function updateProjectTech(
    id: string,
    tech: string[]
): boolean {

    const jsonPath = path.join(
        process.cwd(),
        "src",
        "projecten",
        id,
        "info.json"
    );


    if (!fs.existsSync(jsonPath)) {
        return false;
    }


    try {

        const fileContents = fs.readFileSync(
            jsonPath,
            "utf8"
        );


        const projects = JSON.parse(fileContents) as ProjectInfo[];


        if (!projects[0]) {
            return false;
        }


        projects[0].tech = tech.sort(
            (a, b) =>
                a.localeCompare(
                    b,
                    undefined,
                    {
                        sensitivity: "base"
                    }
                )
        );


        fs.writeFileSync(
            jsonPath,
            JSON.stringify(projects, null, 4),
            "utf8"
        );


        return true;


    } catch (error) {

        console.error(
            "Failed updating project tech:",
            error
        );

        return false;
    }
}

export function updateProjectThumbnail(
    id: string,
    thumbnail: string
): boolean {

    const jsonPath = path.join(
        process.cwd(),
        "src",
        "projecten",
        id,
        "info.json"
    );


    if (!fs.existsSync(jsonPath)) {
        return false;
    }


    try {

        const fileContents = fs.readFileSync(
            jsonPath,
            "utf8"
        );


        const projects = JSON.parse(fileContents) as ProjectInfo[];


        if (!projects[0]) {
            return false;
        }


        const imageExists = projects[0].images?.some(
            image => image.url === thumbnail
        );


        if (thumbnail && !imageExists) {
            return false;
        }


        projects[0].thumbnail = thumbnail;


        fs.writeFileSync(
            jsonPath,
            JSON.stringify(projects, null, 4),
            "utf8"
        );


        return true;


    } catch (error) {

        console.error(
            "Failed updating project thumbnail:",
            error
        );

        return false;
    }
}
