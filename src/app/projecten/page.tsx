import ProjectCard from "@/components/ProjectCard";
import Link from "next/link";
import { X } from 'lucide-react';
import { FILTERS } from "@/utils/site.config";
import type { Metadata } from "next";
import { getAllProjects } from "@/utils/projects";

export const metadata: Metadata = {
  title: "Projecten",
  description:
    "Bekijk mijn software en game development projecten. Van webapps en backends tot game development met Unity, Arduino, ESP32 en meer.",
};

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
            <h1 className="text-center font-light text-5xl mb-5">Alle projecten</h1>
            <div className="mb-8 flex flex-wrap justify-center gap-2">
                {FILTERS.map(filter => {
                    if (params.filter && params.filter === filter) {
                        return (
                            <Link rel="nofollow" className="inline-flex items-center rounded-full bg-neutral-600 px-3 py-1 text-sm text-white transition hover:bg-neutral-700" key={filter} href={`/projecten`}>
                                <X className="me-1" />
                                {filter}
                            </Link>
                        )
                    }
                    else {
                        return (
                            <Link rel="nofollow" className="inline-flex items-center rounded-full bg-neutral-800 px-3 py-1 text-sm text-white transition hover:bg-neutral-700" key={filter} href={`/projecten?filter=${encodeURIComponent(filter)}`}>
                                {filter}
                            </Link>
                        )
                    }
                })}
            </div>
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
        </>
    )
}