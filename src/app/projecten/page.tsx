import ProjectCard, { getProjectInfo } from "@/components/ProjectCard";
import path from "path";
import fs from "fs";
import Link from "next/link";
import { X } from 'lucide-react';

export const FILTERS = [
    "Arduino",
    "C#",
    "WinForms",
    "CSS",
    "HTML",
    "Javascript",
    "Lua",
    "Java",
    "MySQL",
    "Node.js",
    "PHP",
    "Python",
    "Unity",
]

function getAllProjects(
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

type Props = {
    searchParams: Promise<{
        filter?: string;
    }>;
};

export default async function Projecten({ searchParams }: Props) {
    const params = await searchParams;
    const projecten = getAllProjects(1, 12, params.filter ?? null);

    return (
        <>
            <h1 className="text-center font-light text-4xl mb-5">Alle projecten</h1>
            <div className="mb-8 flex justify-center gap-2">
                {FILTERS.map(filter => {
                    if (params.filter && params.filter === filter) {
                        return (
                            <Link className="inline-flex items-center rounded-full bg-neutral-600 px-3 py-1 text-sm text-white transition hover:bg-neutral-700" key={filter} href={`/projecten`}>
                                <X className="me-1" /> 
                                {filter}
                            </Link>
                        )
                    }
                    else {
                        return (
                            <Link className="inline-flex items-center rounded-full bg-neutral-800 px-3 py-1 text-sm text-white transition hover:bg-neutral-700" key={filter} href={`/projecten?filter=${filter}`}>
                                {filter}
                            </Link>
                        )
                    }
                })}
            </div>
            <div className="grid grid-cols-3 gap-8">
                {projecten.map((project, index) => {
                    const colStart = (index % 3) + 1;

                    const colClass =
                        colStart === 1
                            ? "col-start-1"
                            : colStart === 2
                                ? "col-start-2"
                                : "col-start-3";

                    return (
                        <div key={project} className={colClass}>
                            <ProjectCard id={project} />
                        </div>
                    );
                })}
            </div>
        </>
    )
}