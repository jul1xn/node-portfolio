"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
    text: string
    type?: "success" | "error"
}

export default function StickyBanner({
    text,
    type = "success",
}: Props) {
    const [visible, setVisible] = useState(false);
    const [mounted, setMounted] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setVisible(true);
        }, 10);

        return () => clearTimeout(timeout);
    }, []);

    function closeBanner() {
        setVisible(false);

        setTimeout(() => {
            setMounted(false);
        }, 300);
    }

    if (!mounted) return null;

    return (
        <div
            className={`
                fixed inset-x-0 bottom-0 flex justify-center px-6 pb-5 lg:px-8
                transition-opacity duration-300
                ${visible ? "opacity-100" : "opacity-0 pointer-events-none"}
            `}
        >
            <div
                className={`
                    flex items-center justify-between gap-x-6 rounded-xl
                    px-6 py-3 shadow-lg ring-1 ring-white/10 outline
                    ${
                        type === "success"
                            ? "bg-green-900"
                            : "bg-red-900"
                    }
                    ${
                        type === "success"
                            ? "outline-green-700"
                            : "outline-red-700"
                    }
                `}
            >
                <p className="text-sm text-white">
                    {type === "error" && ("Fout:")} {text}
                </p>

                <button
                    type="button"
                    className="cursor-pointer text-white hover:opacity-70"
                    onClick={closeBanner}
                >
                    <span className="sr-only">
                        Dismiss
                    </span>

                    <X className="h-5 w-5" />
                </button>
            </div>
        </div>
    );
}