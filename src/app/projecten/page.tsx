import ProjectCard from "@/components/ProjectCard";
import type { Metadata } from "next";
import { getAllProjects } from "@/utils/projects";
import Seperator from "@/components/Seperator";
import FilterBar from "@/components/FilterBar";
import Pagination from "@/components/Pagination";

export const metadata: Metadata = {
    title: "Projecten",
    description:
        "Bekijk mijn software en game development projecten. Van webapps en backends tot game development met Unity, Arduino, ESP32 en meer.",
};

type Props = {
    searchParams: Promise<{
        filter?: string;
        page?: string;
    }>;
};

export default async function Projecten({ searchParams }: Props) {
    const params = await searchParams;
    const page = parseInt(params.page ?? "1", 10);
    const currentPage = Number.isNaN(page) ? 1 : page;
    const projectView = getAllProjects(currentPage, 9, params.filter ?? null);
    const projecten = projectView.projects;

    return (
        <>
            <h1 className="text-center font-light text-5xl mb-5">Alle projecten</h1>
            <FilterBar
                active={params.filter}
            />
            <div className={projecten.length === 0 ? "" : "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"}>
                {projecten.length === 0 && (
                    <p className="text-center">We konden geen projecten vinden voor dit filter. Probeer een andere categorie of bekijk alle projecten.</p>
                )}
                {projecten.map((project) => (
                    <div key={project} >
                        <ProjectCard id={project} />
                    </div>
                ))}
            </div>
            <Seperator />
            <Pagination
                filter={params.filter}
                maxPages={projectView.pages}
                currentPage={currentPage}
            />
        </>
    );
}