import Link from "next/link";
import { getProjectInfo } from "@/utils/projects";
import { FiArrowRight } from "react-icons/fi";

type ProjectCardProps = {
    id: string;
};

export default function ProjectCard({ id }: ProjectCardProps) {
    const project = getProjectInfo(id);

    if (!project) {
        throw new Error(`Project with id ${id} could not be found.`);
    }

    return (
        <Link
            href={`/admin/projecten/${id}`}
            className="
                block rounded-md 
                border border-neutral-800 
                bg-neutral-900/50 
                px-4 py-3 
                transition 
                hover:border-neutral-700 hover:bg-neutral-900
            "
        >
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-medium">
                        {project.title}
                    </h3>

                    <p className="mt-1 text-sm text-neutral-400">
                        {project.shortDescription}
                    </p>
                </div>

                <FiArrowRight
                    className="
                        h-4 w-4
                        text-neutral-500
                        transition-transform duration-200
                        group-hover:translate-x-1
                    "
                />
            </div>
        </Link>
    );
}