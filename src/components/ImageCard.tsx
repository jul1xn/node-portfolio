import ImageWithSpinner from "./ImageWithSpinner";

type Props = {
    src: string;
    description?: string;
}

export default function ImageCard({ src, description }: Props) {
    const hasDescription = Boolean(description);

    return (
        <div className="overflow-hidden rounded-3xl border border-neutral-800 bg-[#0b0a14] shadow-xl my-5">
            <div className="w-full h-96 overflow-hidden bg-neutral-900">
                <a
                    href={src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block h-full w-full"
                >
                    <ImageWithSpinner
                        src={src}
                        alt={description ?? "Project foto"}
                        className="h-full w-full object-cover cursor-zoom-in"
                    />
                </a>
            </div>

            {hasDescription && (
                <div className="p-6">
                    <p className="text-neutral-300 leading-relaxed">
                        {description}
                    </p>
                </div>
            )}
        </div>
    );
}