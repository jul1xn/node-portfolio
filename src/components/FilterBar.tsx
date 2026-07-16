"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FILTERS } from "@/utils/site.config";

type Props = {
    active?: string;
};

export default function FilterBar({ active }: Props) {
    const ref = useRef<HTMLDivElement>(null);

    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const updateScrollButtons = () => {
        const el = ref.current;
        if (!el) return;

        setCanScrollLeft(el.scrollLeft > 0);

        setCanScrollRight(
            el.scrollLeft < el.scrollWidth - el.clientWidth - 1
        );
    };

    useEffect(() => {
        updateScrollButtons();

        const el = ref.current;
        if (!el) return;

        el.addEventListener("scroll", updateScrollButtons);
        window.addEventListener("resize", updateScrollButtons);

        return () => {
            el.removeEventListener("scroll", updateScrollButtons);
            window.removeEventListener("resize", updateScrollButtons);
        };
    }, []);

    const scroll = (amount: number) => {
        ref.current?.scrollBy({
            left: amount,
            behavior: "smooth",
        });
    };

    return (
        <div className="relative mx-auto mb-8 max-w-5xl">

            {/* left fade */}
            <div
                className={`
                    pointer-events-none absolute left-10 top-0 bottom-0 w-8
                    bg-gradient-to-r from-neutral-900 to-transparent
                    transition-opacity duration-300
                    ${canScrollLeft ? "opacity-100" : "opacity-0"}
                `}
            />

            {/* right face */}
            <div
                className={`
                    pointer-events-none absolute right-10 top-0 bottom-0 w-8
                    bg-gradient-to-l from-neutral-900 to-transparent
                    transition-opacity duration-300
                    ${canScrollRight ? "opacity-100" : "opacity-0"}
                `}
            />

            <button
                onClick={() => scroll(-250)}
                className={`
                    absolute left-0 top-1/2 -translate-y-1/2 z-10
                    rounded-full bg-neutral-900 p-2
                    transition-opacity duration-300
                    ${canScrollLeft
                        ? "opacity-100 cursor-pointer"
                        : "opacity-0 pointer-events-none"}
                `}
            >
                <ChevronLeft size={20} />
            </button>

            <div
                ref={ref}
                className="mx-10 px-5 flex gap-2 overflow-x-auto scroll-smooth scrollbar-none"
            >
                {/* All button */}
                <Link
                    href="/projecten"
                    className={`whitespace-nowrap rounded-full px-4 py-2 text-sm transition ${!active
                        ? "bg-purple-700"
                        : "bg-neutral-800 hover:bg-neutral-700"
                        }`}
                >
                    Alles
                </Link>

                {FILTERS.map((filter) => (
                    <Link
                        key={filter}
                        href={`/projecten?filter=${encodeURIComponent(filter)}`}
                        className={`whitespace-nowrap rounded-full px-4 py-2 text-sm transition ${active === filter
                            ? "bg-purple-700"
                            : "bg-neutral-800 hover:bg-neutral-700"
                            }`}
                    >
                        {filter}
                    </Link>
                ))}
            </div>

            <button
                onClick={() => scroll(250)}
                className={`
                    absolute right-0 top-1/2 -translate-y-1/2 z-10
                    rounded-full bg-neutral-900 p-2
                    transition-opacity duration-300
                    ${canScrollRight
                        ? "opacity-100 cursor-pointer"
                        : "opacity-0 pointer-events-none"}
                `}
            >
                <ChevronRight size={20} />
            </button>
        </div>
    );
}