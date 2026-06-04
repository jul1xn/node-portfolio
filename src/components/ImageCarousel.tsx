// components/ImageCarousel.tsx

"use client";

import { useEffect, useState } from "react";
import ImageCard from "./ImageCard";
import { ArrowLeft, ArrowRight } from "lucide-react";

type ImageItem = {
    url: string;
    description?: string;
};

type Props = {
    projectId: string;
    images: ImageItem[];
};

export default function ImageCarousel({ projectId, images }: Props) {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        if (images.length <= 1) return;

        const interval = setInterval(() => {
            setCurrent(prev => (prev + 1) % images.length);
        }, 10000);

        return () => clearInterval(interval);
    }, [images.length]);

    const previous = () => {
        setCurrent(prev => (prev - 1 + images.length) % images.length);
    };

    const next = () => {
        setCurrent(prev => (prev + 1) % images.length);
    };

    return (
        <div className="w-full">
            <div className="relative overflow-hidden">
                <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{
                        transform: `translateX(-${current * 100}%)`,
                    }}
                >
                    {images.map(image => (
                        <div
                            key={image.url}
                            className="min-w-full"
                        >
                            <ImageCard
                                src={`/projecten/api/${projectId}/${image.url}`}
                                description={image.description}
                            />
                        </div>
                    ))}
                </div>

                {images.length > 1 && (
                    <>
                        <button
                            onClick={previous}
                            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 px-4 py-2 text-white backdrop-blur transition hover:bg-black/70 cursor-pointer"
                        >
                            <ArrowLeft />
                        </button>

                        <button
                            onClick={next}
                            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 px-4 py-2 text-white backdrop-blur transition hover:bg-black/70 cursor-pointer"
                        >
                            <ArrowRight />
                        </button>
                    </>
                )}
            </div>

            {images.length > 1 && (
                <div className="mt-4 flex justify-center gap-2">
                    {images.map((_, index) => (
                        <button
                            key={_.url}
                            onClick={() => setCurrent(index)}
                            className={`h-3 w-3 rounded-full transition ${
                                current === index
                                    ? "bg-purple-500"
                                    : "bg-neutral-600"
                            }`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}