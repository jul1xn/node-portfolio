"use client";

import { useEffect, useRef, useState } from "react";
import Image from 'next/image';

type Props = {
  src: string;
  alt?: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: "eager" | "lazy" | undefined;
};

export default function ImageWithSpinner({ src, alt = "", className = "", width = 400, height = 300, loading = undefined }: Props) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    // If the image is already complete (from cache), update state accordingly
    if (img.complete) {
      if (img.naturalWidth && img.naturalWidth > 0) {
        setLoaded(true);
      } else {
        setErrored(true);
      }
    }
  }, [src]);

  return (
    <div className={`relative ${className}`}>
      {!loaded && !errored && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="h-full w-full bg-neutral-800 animate-pulse"
            style={{ animationDuration: '2500ms' }}
            aria-hidden
          />
        </div>
      )}

      {errored ? (
        <div className="flex items-center justify-center h-full w-full bg-neutral-800 text-neutral-400">Afbeelding niet gevonden</div>
      ) : (
        <Image
          width={width}
          height={height}
          ref={imgRef}
          src={src}
          alt={alt}
          className={`h-full w-full object-cover transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setLoaded(true)}
          onError={() => setErrored(true)}
          loading={loading}
        />
      )}
    </div>
  );
}
