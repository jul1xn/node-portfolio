"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
    children: React.ReactNode
    className?: string
    delay?: string
    once?: boolean
}

export default function ViewFadeWrapper({
    children,
    className = "",
    delay = "",
    once = true,
}: Props) {
    const ref = useRef<HTMLDivElement | null>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const element = ref.current;

        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);

                    if (once) {
                        observer.unobserve(element);
                    }
                } else if (!once) {
                    setVisible(false);
                }
            },
            {
                threshold: 0.15,
            },
        );

        observer.observe(element);

        return () => {
            observer.disconnect();
        };
    }, [once]);

    return (
        <div
            ref={ref}
            className={`
                ${className}
                ${visible ? "animate__animated animate__fadeIn" : "opacity-0"}
                ${delay}
            `}
        >
            {children}
        </div>
    );
}