import ProjectCard from "@/components/ProjectCard";
import fs from "fs";
import path from "path";

function getAllProjects(page: number = 1, limit: number = 12) {
    const directories = 
        fs.readdirSync(path.join(process.cwd(), "src", "projecten"), {withFileTypes: true})
        .filter(dire => dire.isDirectory())
        .map(dir => dir.name);

    return directories;
}

export default function Projecten() {
    const projecten = getAllProjects();

    return (
        <>
            <h1 className="text-center font-light text-4xl mb-8">Alle projecten</h1>
            <div className="grid grid-cols-3 gap-8">
                {projecten.map((project, index) => {
                    const colStart = (index % 3) + 1;
                    const colClass = 
                        colStart === 1 ? "col-start-1" :
                        colStart === 2 ? "col-start-2" :
                        "col-start-3";
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