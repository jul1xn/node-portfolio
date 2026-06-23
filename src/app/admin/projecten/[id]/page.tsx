import ImageCarousel from "@/components/ImageCarousel";
import { ArrowRight, SquareArrowOutUpRight, Save, Trash2, Plus } from "lucide-react";
import Link from "next/link";
import { getProjectInfo, getProjectLongDescription } from "@/utils/projects";
import ImageUploadForm from "@/components/admin/ImageUploadForm";
import TechEditor from "@/components/admin/TechEditor";
import ThumbnailEditor from "@/components/admin/ThumbnailEditor";
import { FILTERS } from "@/utils/site.config";

export const dynamic = "force-dynamic";

type Params = {
    id: string;
}

export default async function AdminProjectPage({ params }: { params: Params }) {
    const resolvedParams = await params as Params;
    const project = getProjectInfo(resolvedParams.id);
    const description = getProjectLongDescription(resolvedParams.id);

    if (!project) {
        return (
            <div className="text-center py-20">
                <h1 className="font-light text-5xl mb-8 text-neutral-200">
                    Project niet gevonden.
                </h1>

                <Link
                    href="/admin/projecten"
                    className="inline-flex items-center gap-2 rounded-full bg-purple-700 px-5 py-2.5 text-white transition hover:bg-purple-600"
                >
                    <ArrowRight />
                    Terug naar projecten
                </Link>
            </div>
        );
    }

    return (
        <div className="mx-auto space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
                <div>
                    <div className="flex items-center gap-2 text-sm text-neutral-400 mb-1">
                        <Link
                            href="/admin/dashboard"
                            className="hover:text-neutral-200 transition-colors"
                        >
                            Projecten
                        </Link>

                        <span>/</span>

                        <span className="text-neutral-200">
                            {project.title}
                        </span>
                    </div>

                    <h1 className="font-light text-4xl text-white">
                        {project.title}
                    </h1>
                </div>

                <Link
                    href={`/projecten/${resolvedParams.id}`}
                    target="_blank"
                    className="inline-flex items-center gap-1.5 rounded-md border border-neutral-800 bg-neutral-950 px-3 py-2 text-neutral-300 transition hover:bg-neutral-900"
                >
                    Bekijk project
                    <SquareArrowOutUpRight size={14} />
                </Link>
            </div>


            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

                <div className="xl:col-span-2 space-y-6">

                    {/* Description */}
                    <div className="border border-neutral-800 bg-neutral-950 rounded-md p-5">
                        <div className="mb-4">
                            <h2 className="text-lg font-medium text-white">
                                Projectbeschrijving
                            </h2>

                            <p className="text-sm text-neutral-400">
                                Pas de uitgebreide projectbeschrijving aan.
                            </p>
                        </div>


                        <form
                            action="/admin/api/projects/update-description"
                            method="POST"
                            className="space-y-4"
                        >
                            <input
                                type="hidden"
                                name="projectId"
                                value={resolvedParams.id}
                            />

                            <textarea
                                name="description"
                                defaultValue={description}
                                rows={12}
                                className="w-full bg-neutral-950 border border-neutral-800 rounded-md p-3 text-sm focus:outline-none focus:border-neutral-700 text-neutral-300 placeholder-neutral-600"
                                placeholder={"# Projectbeschrijving\n\nBeschrijf hier het project..."}
                            />

                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="rounded-full cursor-pointer bg-purple-700 px-5 py-2.5 text-white transition hover:bg-purple-600 inline-flex items-center gap-2"
                                >
                                    <Save size={14} />
                                    Opslaan
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Technologies */}
                    <div className="border border-neutral-800 bg-neutral-950 rounded-md p-5">

                        <div className="mb-4">
                            <h2 className="text-lg font-medium text-white">
                                Technologieën
                            </h2>

                            <p className="text-sm text-neutral-400">
                                Kies de technieken die bij dit project horen.
                            </p>
                        </div>


                        <TechEditor
                            projectId={resolvedParams.id}
                            currentTech={project.tech}
                            availableTech={FILTERS}
                        />

                    </div>


                    {/* Links */}
                    <div className="border border-neutral-800 bg-neutral-950 rounded-md p-5">
                        <div className="mb-4">
                            <h2 className="text-lg font-medium text-white">
                                Links
                            </h2>

                            <p className="text-sm text-neutral-400">
                                Links naar GitHub, demo&apos;s of andere relevante pagina&apos;s.
                            </p>
                        </div>


                        <div className="space-y-2 mb-4">
                            {project.links?.map(link => (
                                <div
                                    key={link.url}
                                    className="flex items-center justify-between bg-neutral-950 px-3 py-2.5 rounded-md text-sm"
                                >
                                    <div className="flex items-center gap-4 truncate mr-4">
                                        <span className="text-neutral-300 font-medium">
                                            {link.name}
                                        </span>

                                        <span className="text-neutral-500 truncate text-xs font-mono">
                                            {link.url}
                                        </span>
                                    </div>

                                    <form
                                        action="/admin/api/projects/delete-link"
                                        method="POST"
                                    >
                                        <input
                                            type="hidden"
                                            name="projectId"
                                            value={resolvedParams.id}
                                        />

                                        <input
                                            type="hidden"
                                            name="url"
                                            value={link.url}
                                        />

                                        <button
                                            type="submit"
                                            className="text-neutral-500 cursor-pointer hover:text-red-400 transition"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </form>
                                </div>
                            ))}

                            {(!project.links || project.links.length === 0) && (
                                <p className="text-sm text-neutral-500 italic">
                                    Nog geen links toegevoegd.
                                </p>
                            )}
                        </div>


                        <form
                            action="/admin/api/projects/add-link"
                            method="POST"
                            className="grid grid-cols-1 sm:grid-cols-3 gap-2"
                        >
                            <input
                                type="hidden"
                                name="projectId"
                                value={resolvedParams.id}
                            />

                            <input
                                type="text"
                                name="name"
                                placeholder="Bijv. GitHub"
                                required
                                className="bg-neutral-950 border border-neutral-800 rounded-md px-3 py-2 text-sm text-neutral-300 focus:outline-none"
                            />

                            <input
                                type="url"
                                name="url"
                                placeholder="https://..."
                                required
                                className="bg-neutral-950 border border-neutral-800 rounded-md px-3 py-2 text-sm text-neutral-300 focus:outline-none sm:col-span-2 font-mono"
                            />

                            <div className="sm:col-span-3 flex justify-end">
                                <button
                                    type="submit"
                                    className="rounded-md cursor-pointer border border-neutral-800 bg-neutral-950 px-3 py-2 text-neutral-300 transition hover:bg-neutral-900 inline-flex items-center gap-2"
                                >
                                    <Plus size={14} />
                                    Link toevoegen
                                </button>
                            </div>
                        </form>
                    </div>

                </div>


                {/* Images */}
                <div className="space-y-6">

                    <div className="border border-neutral-800 bg-neutral-950 rounded-md p-5">
                        <div className="mb-4">
                            <h2 className="text-lg font-medium text-white">
                                Thumbnail
                            </h2>

                            <p className="text-sm text-neutral-400">
                                Kies welke afbeelding als thumbnail wordt gebruikt.
                            </p>
                        </div>

                        <ThumbnailEditor
                            projectId={resolvedParams.id}
                            currentThumbnail={project.thumbnail}
                            images={project.images}
                        />
                    </div>

                    <div className="border border-neutral-800 bg-neutral-950 rounded-md p-5">
                        <div className="mb-4">
                            <h2 className="text-lg font-medium text-white">
                                Afbeeldingen
                            </h2>

                            <p className="text-sm text-neutral-400">
                                Upload afbeeldingen voor dit project.
                            </p>
                        </div>


                        <ImageUploadForm
                            projectId={resolvedParams.id}
                        />


                        {project.images && project.images.length > 0 && (
                            <div className="mt-4 space-y-2">
                                <h3 className="text-sm text-neutral-400">
                                    Geüploade afbeeldingen
                                </h3>

                                {project.images.map((img, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between bg-neutral-950 p-2 rounded-md text-sm"
                                    >
                                        <span className="truncate max-w-45 font-mono text-neutral-400">
                                            {img.url}
                                        </span>

                                        <form
                                            action="/admin/api/projects/delete-image"
                                            method="POST"
                                        >
                                            <input
                                                type="hidden"
                                                name="projectId"
                                                value={resolvedParams.id}
                                            />

                                            <input
                                                type="hidden"
                                                name="imageName"
                                                value={img.url}
                                            />

                                            <button
                                                type="submit"
                                                className="text-neutral-500 hover:text-red-400 cursor-pointer transition"
                                            >
                                                Verwijderen
                                            </button>
                                        </form>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>


                    {/* Preview */}
                    <div className="border border-neutral-800 bg-neutral-950 rounded-md p-5">
                        <h2 className="text-lg font-medium text-white mb-3">
                            Voorbeeld
                        </h2>

                        {project.images && (
                            <ImageCarousel
                                projectId={resolvedParams.id}
                                images={project.images}
                            />
                        )}
                    </div>

                </div>
            </div>
        </div>
    )
}