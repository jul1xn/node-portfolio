import CreateProjectModal from "@/components/admin/CreateProjectModal";
import ProjectCard from "@/components/admin/ProjectCard";
import { getAllProjects } from "@/utils/projects";

export const dynamic = "force-dynamic";

export default function AdminDashboardPage() {
    const projecten = getAllProjects();

    return (
        <div className="mx-auto max-w-4xl">
            <h1 className="text-5xl font-light">
                Admin dashboard
            </h1>

            <div className="mt-8 mb-4 flex items-center justify-between gap-4">
                <h2 className="text-2xl">
                    Projecten
                </h2>

                <CreateProjectModal />
            </div>

            <div className="flex flex-col gap-3">
                {projecten.map(project => (
                    <ProjectCard key={project} id={project} />
                ))}
            </div>
        </div>
    );
}