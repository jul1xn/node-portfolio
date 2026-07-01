import Link from "next/link";
import { getProjectInfo } from "@/utils/projects";
import { FiArrowRight } from "react-icons/fi";
import DeleteProjectButton from "@/components/admin/DeleteProjectButton";

type ProjectCardProps = {
    id: string;
};

export default function ProjectCard({ id }: ProjectCardProps) {
    const project = getProjectInfo(id);

    if (!project) {
        throw new Error(`Project with id ${id} could not be found.`);
    }

    return (
        <div className="flex items-stretch gap-3 rounded-md border border-neutral-800 bg-neutral-900/50 transition hover:border-neutral-700 hover:bg-neutral-900">
            <Link
                rel="nofollow"
                href={`/admin/projecten/${id}`}
                className="group flex flex-1 items-center justify-between px-4 py-3"
            >
                <div>
                    <h3 className="text-lg font-medium">
                        {project.title}
                    </h3>

                    <p className="mt-1 text-sm text-neutral-400">
                        {project.shortDescription}
                    </p>
                </div>

                <FiArrowRight
                    className="h-4 w-4 text-neutral-500 transition-transform duration-200 group-hover:translate-x-1"
                />
            </Link>

            <div className="flex items-center pr-3">
                <DeleteProjectButton projectId={id} projectTitle={project.title} />
            </div>
        </div>
    );
}