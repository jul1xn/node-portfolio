"use client"

import { useEffect, useRef } from "react";

type CounterProps = {
    value: number;
    text: string;
    extension?: string;
    animateTime?: number;
    delay?: number;
};

export default function Counter({
    value,
    text,
    extension = "",
    animateTime = 2000,
    delay = 0
}: CounterProps) {
    const valueText = useRef<HTMLParagraphElement>(null);
    const startTimeRef = useRef<number | null>(null);

    useEffect(() => {
        const endNumber = value;
        const power = 2;
        startTimeRef.current = null;

        let frameId: number | null = null;
        let timeoutId: number | null = null;

        const animate = (currentTime: number) => {
            if (startTimeRef.current === null) startTimeRef.current = currentTime;
            const elapsed = currentTime - startTimeRef.current;
            const t = Math.min(elapsed / animateTime, 1);

            const currentValue = Math.floor(endNumber * (1 - Math.pow(1 - t, power)));
            if (valueText.current) {
                valueText.current.textContent = currentValue.toString() + extension;
            }

            if (t < 1) {
                frameId = requestAnimationFrame(animate);
            } else if (valueText.current) {
                valueText.current.textContent = endNumber.toString() + extension;
            }
        };

        const startAnimation = () => {
            if (valueText.current) {
                valueText.current.textContent = "0" + extension;
            }
            frameId = requestAnimationFrame(animate);
        };

        if (delay > 0) {
            timeoutId = window.setTimeout(startAnimation, delay / 2);
        } else {
            startAnimation();
        }

        return () => {
            if (timeoutId !== null) window.clearTimeout(timeoutId);
            if (frameId !== null) cancelAnimationFrame(frameId);
        };
    }, [value, animateTime, extension, delay]);

    return (
        <div className="animate__animated animate__fast animate__fadeIn" style={{ animationDelay: `${delay}ms` }}>
          <p ref={valueText} className="text-5xl font-light text-purple-700 mb-2">0{extension}</p>
          <p className="text-white">{text}</p>
        </div>
    )
}