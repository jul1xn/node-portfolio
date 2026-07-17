import { ImageIcon, Save } from "lucide-react";

type ImageItem = {
    url: string;
    description: string;
};

export default function ThumbnailEditor({
    projectId,
    currentThumbnail,
    images,
}: {
    projectId: string;
    currentThumbnail?: string;
    images?: ImageItem[];
}) {

    const hasImages = Boolean(images?.length);

    return (
        <form
            action="/admin/api/projects/update-thumbnail"
            method="POST"
            className="space-y-4"
        >
            <input
                type="hidden"
                name="projectId"
                value={projectId}
            />

            <div className="flex gap-2">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-neutral-800 bg-neutral-950 text-neutral-500">
                    <ImageIcon size={16} />
                </div>

                <select
                    name="thumbnail"
                    defaultValue={currentThumbnail ?? ""}
                    disabled={!hasImages}
                    className="flex-1 bg-neutral-950 border border-neutral-800 rounded-md px-3 py-2 text-sm text-neutral-300 disabled:cursor-not-allowed disabled:text-neutral-600 focus:outline-none focus:border-neutral-700"
                >
                    <option value="">
                        {hasImages ? "Kies thumbnail..." : "Geen afbeeldingen beschikbaar"}
                    </option>

                    {images?.map(image => (
                        <option
                            key={image.url}
                            value={image.url}
                        >
                            {image.url}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={!hasImages}
                    className="rounded-full bg-purple-700 px-5 py-2.5 text-white hover:bg-purple-600 disabled:cursor-not-allowed disabled:bg-neutral-800 disabled:text-neutral-500 cursor-pointer inline-flex items-center gap-2"
                >
                    <Save size={14} />
                    Opslaan
                </button>
            </div>
        </form>
    );
}
