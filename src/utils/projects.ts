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

const projectIdPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function getProjectDirectory(id: string) {
    return path.resolve(
        process.cwd(),
        "src",
        "projecten",
        id,
    );
}

function isValidProjectId(id: string) {
    return projectIdPattern.test(id);
}

export function getAllProjects(
    page: number = 1,
    limit: number = 9,
    filter: string | null = null,
) {
    const directories = fs
        .readdirSync(path.join(process.cwd(), "src", "projecten"), {
            withFileTypes: true,
        })
        .filter((dir) => dir.isDirectory())
        .map((dir) => dir.name);

    const filteredProjects = directories.filter((dir) => {
        const projectData = getProjectInfo(dir);

        if (!projectData) return false;
        if (filter && !projectData.tech.includes(filter)) return false;

        return true;
    });

    const pages = Math.ceil(filteredProjects.length / limit);
    const start = (page - 1) * limit;
    const projects = filteredProjects.slice(start, start + limit);

    return {
        projects,
        pages,
    };
}

export function getProjectInfo(id: string): ProjectInfo | null {
    const jsonPath = path.join(process.cwd(), "src", "projecten", id, "info.json");

    if (!fs.existsSync(jsonPath)) {
        return null;
    }

    const fileContents = fs.readFileSync(jsonPath, "utf8");
    const parsed = JSON.parse(fileContents) as ProjectInfo;
    const final = parsed ?? null;
    if (final) {
        final.tech = final.tech.sort((a, b) =>
            a.localeCompare(b, undefined, { sensitivity: "base" }),
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
        project.longHtml,
    );

    if (!fs.existsSync(filePath)) {
        return "";
    }

    return fs.readFileSync(filePath, "utf8");
}

export function updateProjectLongDescription(
    id: string,
    description: string,
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
        project.longHtml,
    );

    try {
        fs.writeFileSync(
            filePath,
            description,
            "utf8",
        );

        return true;
    } catch (error) {
        console.error(
            "Failed to update project description:",
            error,
        );

        return false;
    }
}

export function addProjectLink(
    id: string,
    name: string,
    url: string,
): boolean {

    const jsonPath = path.join(
        process.cwd(),
        "src",
        "projecten",
        id,
        "info.json",
    );


    if (!fs.existsSync(jsonPath)) {
        return false;
    }


    try {
        const fileContents = fs.readFileSync(
            jsonPath,
            "utf8",
        );

        const projects = JSON.parse(fileContents) as ProjectInfo;


        if (!projects) {
            return false;
        }


        if (!projects.links) {
            projects.links = [];
        }


        projects.links.push({
            name,
            url,
        });


        fs.writeFileSync(
            jsonPath,
            JSON.stringify(projects, null, 4),
            "utf8",
        );


        return true;

    } catch (error) {

        console.error(
            "Failed adding project link:",
            error,
        );

        return false;
    }
}

export function deleteProjectLink(
    id: string,
    url: string,
): boolean {

    const jsonPath = path.join(
        process.cwd(),
        "src",
        "projecten",
        id,
        "info.json",
    );


    if (!fs.existsSync(jsonPath)) {
        return false;
    }


    try {
        const fileContents = fs.readFileSync(
            jsonPath,
            "utf8",
        );


        const projects = JSON.parse(fileContents) as ProjectInfo;


        if (!projects?.links) {
            return false;
        }


        const originalLength = projects.links.length;


        projects.links = projects.links.filter(
            link => link.url !== url,
        );


        // Nothing was removed
        if (projects.links.length === originalLength) {
            return false;
        }


        fs.writeFileSync(
            jsonPath,
            JSON.stringify(projects, null, 4),
            "utf8",
        );


        return true;

    } catch (error) {

        console.error(
            "Failed deleting project link:",
            error,
        );

        return false;
    }
}

export function addProjectImage(
    id: string,
    imageUrl: string,
    description: string = "",
): boolean {

    const jsonPath = path.join(
        process.cwd(),
        "src",
        "projecten",
        id,
        "info.json",
    );


    if (!fs.existsSync(jsonPath)) {
        return false;
    }


    try {

        const fileContents = fs.readFileSync(
            jsonPath,
            "utf8",
        );


        const projects = JSON.parse(fileContents) as ProjectInfo;


        if (!projects) {
            return false;
        }


        if (!projects.images) {
            projects.images = [];
        }


        projects.images.push({
            url: imageUrl,
            description,
        });


        fs.writeFileSync(
            jsonPath,
            JSON.stringify(projects, null, 4),
            "utf8",
        );


        return true;


    } catch (error) {

        console.error(
            "Failed adding project image:",
            error,
        );

        return false;
    }
}

export function deleteProjectImage(
    id: string,
    imageUrl: string,
): boolean {

    const jsonPath = path.join(
        process.cwd(),
        "src",
        "projecten",
        id,
        "info.json",
    );


    if (!fs.existsSync(jsonPath)) {
        return false;
    }


    try {
        const fileContents = fs.readFileSync(
            jsonPath,
            "utf8",
        );


        const projects = JSON.parse(fileContents) as ProjectInfo;


        if (!projects?.images) {
            return false;
        }


        const originalLength = projects.images.length;


        projects.images = projects.images.filter(
            image => image.url !== imageUrl,
        );


        if (projects.images.length === originalLength) {
            return false;
        }

        // check if the thumbnail is equal to the deleted file
        if (projects.thumbnail && projects.thumbnail === imageUrl) {
            projects.thumbnail = "";
        }


        fs.writeFileSync(
            jsonPath,
            JSON.stringify(projects, null, 4),
            "utf8",
        );


        return true;


    } catch (error) {

        console.error(
            "Failed deleting project image metadata:",
            error,
        );

        return false;
    }
}

export function updateProjectTech(
    id: string,
    tech: string[],
): boolean {

    const jsonPath = path.join(
        process.cwd(),
        "src",
        "projecten",
        id,
        "info.json",
    );


    if (!fs.existsSync(jsonPath)) {
        return false;
    }


    try {

        const fileContents = fs.readFileSync(
            jsonPath,
            "utf8",
        );


        const projects = JSON.parse(fileContents) as ProjectInfo;


        if (!projects) {
            return false;
        }


        projects.tech = tech.sort(
            (a, b) =>
                a.localeCompare(
                    b,
                    undefined,
                    {
                        sensitivity: "base",
                    },
                ),
        );


        fs.writeFileSync(
            jsonPath,
            JSON.stringify(projects, null, 4),
            "utf8",
        );


        return true;


    } catch (error) {

        console.error(
            "Failed updating project tech:",
            error,
        );

        return false;
    }
}

export function updateProjectThumbnail(
    id: string,
    thumbnail: string,
): boolean {

    const jsonPath = path.join(
        process.cwd(),
        "src",
        "projecten",
        id,
        "info.json",
    );


    if (!fs.existsSync(jsonPath)) {
        return false;
    }


    try {

        const fileContents = fs.readFileSync(
            jsonPath,
            "utf8",
        );


        const projects = JSON.parse(fileContents) as ProjectInfo;


        if (!projects) {
            return false;
        }


        const imageExists = projects.images?.some(
            image => image.url === thumbnail,
        );


        if (thumbnail && !imageExists) {
            return false;
        }


        projects.thumbnail = thumbnail;


        fs.writeFileSync(
            jsonPath,
            JSON.stringify(projects, null, 4),
            "utf8",
        );


        return true;


    } catch (error) {

        console.error(
            "Failed updating project thumbnail:",
            error,
        );

        return false;
    }
}

export function createProjectFolder(
    id: string,
    title: string,
    shortDescription: string,
): boolean {

    if (
        !isValidProjectId(id) ||
        !title.trim() ||
        !shortDescription.trim()
    ) {
        return false;
    }

    const projectDirectory = getProjectDirectory(id);

    if (fs.existsSync(projectDirectory)) {
        return false;
    }

    try {
        fs.mkdirSync(projectDirectory, { recursive: true });

        const template: ProjectInfo =
        {
            title: title.trim(),
            shortDescription: shortDescription.trim(),
            tech: [],
            links: [],
            images: [],
            thumbnail: "",
            longHtml: "description.md",
        };

        fs.writeFileSync(
            path.join(projectDirectory, "info.json"),
            JSON.stringify(template, null, 4),
            "utf8",
        );

        fs.writeFileSync(
            path.join(projectDirectory, "description.md"),
            "",
            "utf8",
        );

        return true;
    } catch (error) {
        console.error("Failed creating project folder:", error);
        return false;
    }
}

export function deleteProjectFolder(id: string): boolean {

    if (!isValidProjectId(id)) {
        return false;
    }

    const projectDirectory = getProjectDirectory(id);
    const baseDirectory = getProjectDirectory("");
    const relative = path.relative(baseDirectory, projectDirectory);

    if (relative.startsWith("..") || path.isAbsolute(relative)) {
        return false;
    }

    if (!fs.existsSync(projectDirectory)) {
        return false;
    }

    try {
        fs.rmSync(projectDirectory, { recursive: true, force: true });
        return true;
    } catch (error) {
        console.error("Failed deleting project folder:", error);
        return false;
    }
}