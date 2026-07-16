import Link from "next/link";
import ImageWithSpinner from "./ImageWithSpinner";
import { getProjectInfo } from "@/utils/projects";

type ProjectCardProps = {
    id: string;
};

export default function ProjectCard({ id }: ProjectCardProps) {
    const project = getProjectInfo(id);

    if (!project) {
        throw new Error("Project with id " + id + " could not be found.");
    }

    return (
        <div className="min-h-108 overflow-hidden rounded-3xl border border-neutral-800 bg-[#111111] shadow-xl transition-transform hover:scale-105">
            <div className="h-64 w-full overflow-hidden bg-neutral-900">
                <ImageWithSpinner
                    src={`/projecten/api/${id}/${project.thumbnail}`}
                    alt={`Preview van ${project.title}`}
                    className="h-full w-full"
                    width={500}
                    height={400}
                    loading="lazy"
                />
            </div>
            <div className="p-6">
                <h2 className="text-2xl font-semibold text-white mb-3">{project.title}</h2>
                <p className="text-neutral-300 mb-4">{project.shortDescription}</p>

                <div className="mb-4 flex flex-wrap gap-2">
                    {project.tech.map((tag) => (
                        <Link
                            rel="nofollow"
                            key={tag}
                            href={`/projecten?filter=${encodeURIComponent(tag)}`}
                            className="inline-flex items-center rounded-full bg-neutral-800 px-3 py-1 text-sm text-white transition hover:bg-neutral-700"
                        >
                            {tag}
                        </Link>
                    ))}
                </div>

                <Link
                    href={`/projecten/${id}`}
                    className="inline-flex rounded-full bg-purple-700 px-5 py-3 font-semibold text-white transition hover:bg-purple-600"
                >
                    Bekijk project
                </Link>
            </div>
        </div>
    );
}