import ImageCarousel from "@/components/ImageCarousel";
import {
    getProjectInfo,
    getProjectLongDescription
} from "@/components/ProjectCard";
import { ArrowRight, SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import type { Metadata } from "next";

type Params = {
    id: string;
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
    const resolvedParams = await params as Params;
    const project = getProjectInfo(resolvedParams.id);
    
    if (!project) {
        return {
            title: "Project niet gevonden",
            description: "Dit project kon niet worden gevonden.",
        };
    }
    
    return {
        title: project.name,
        description: project.description,
    };
}

export default async function ProjectPage({ params }: { params: Params }) {
    const resolvedParams = await params as Params;
    const project = getProjectInfo(resolvedParams.id);
    const description = getProjectLongDescription(resolvedParams.id);

    if (!project) {
        return (
            <div className="text-center">
                <h1 className="font-light text-5xl mb-8">Project niet gevonden.</h1>
                <Link href="/projecten" className="inline-flex items-center gap-2 bg-purple-700 text-white px-5 py-3 text-xl rounded-full cursor-pointer transition-colors hover:bg-purple-900">
                    <ArrowRight />
                    Terug naar projecten
                </Link>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 grid-rows-2 xl:grid-cols-2 xl:grid-rows-1 gap-20">
            <div className="text-start">
                <h1 className="font-light text-5xl mb-5">{project.title}</h1>
                <div className="mb-3 flex flex-wrap gap-2">
                    {project.tech.map(tech => (
                        <Link
                            key={tech}
                            href={`/projecten?filter=${encodeURIComponent(tech)}`}
                            className="inline-flex items-center rounded-full bg-neutral-800 px-3 py-1 text-white transition hover:bg-neutral-700"
                        >
                            {tech}
                        </Link>
                    ))}
                </div>
                <div className="prose prose-invert max-w-none mt-5 mb-8 space-y-5">
                    <ReactMarkdown>
                        {description}
                    </ReactMarkdown>
                </div>
                <div className="flex flex-wrap gap-5">
                    {project.links?.map(link => (
                        <Link key={link.url} href={link.url} target="_blank" className="inline-flex items-center gap-2 bg-purple-700 text-white px-5 py-3 text-xl rounded-full cursor-pointer transition-colors hover:bg-purple-900">
                            <SquareArrowOutUpRight size={22} />
                            {link.name}
                        </Link>
                    ))}
                </div>
            </div>
            <div>
                {project.images && (
                    <ImageCarousel
                        projectId={resolvedParams.id}
                        images={project.images}
                    />
                )}
            </div>
        </div>
    )
}