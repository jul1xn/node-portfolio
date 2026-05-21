"use client"

import { useEffect, useRef, useState } from "react"

type CounterProps = {
    value: number
    text: string
    extension?: string
    animateTime?: number
    delay?: number
}

export default function Counter({
    value,
    text,
    extension = "",
    animateTime = 2000,
    delay = 0,
}: CounterProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const valueText = useRef<HTMLParagraphElement>(null)

    const [hasStarted, setHasStarted] = useState(false)

    useEffect(() => {
        const element = containerRef.current

        if (!element) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setHasStarted(true)
                    observer.unobserve(element)
                }
            },
            {
                threshold: 0.25,
            }
        )

        observer.observe(element)

        return () => {
            observer.disconnect()
        }
    }, [])

    useEffect(() => {
        if (!hasStarted) return

        const endNumber = value
        const power = 2

        let startTime: number | null = null
        let frameId: number | null = null
        let timeoutId: number | null = null

        const animate = (currentTime: number) => {
            if (startTime === null) {
                startTime = currentTime
            }

            const elapsed = currentTime - startTime
            const t = Math.min(elapsed / animateTime, 1)

            const currentValue = Math.floor(
                endNumber * (1 - Math.pow(1 - t, power))
            )

            if (valueText.current) {
                valueText.current.textContent =
                    currentValue.toString() + extension
            }

            if (t < 1) {
                frameId = requestAnimationFrame(animate)
            } else if (valueText.current) {
                valueText.current.textContent =
                    endNumber.toString() + extension
            }
        }

        const startAnimation = () => {
            if (valueText.current) {
                valueText.current.textContent = "0" + extension
            }

            frameId = requestAnimationFrame(animate)
        }

        timeoutId = window.setTimeout(startAnimation, delay)

        return () => {
            if (timeoutId) clearTimeout(timeoutId)
            if (frameId) cancelAnimationFrame(frameId)
        }
    }, [hasStarted, value, animateTime, extension, delay])

    return (
        <div
            ref={containerRef}
            className={`transition-opacity duration-500 ${hasStarted ? "animate__animated animate__fast animate__fadeIn opacity-100" : "opacity-0"}`}
            style={{
                animationDelay: `${delay}ms`,
            }}
        >
            <p
                ref={valueText}
                className="mb-2 text-5xl font-light text-purple-700"
            >
                0{extension}
            </p>

            <p className="text-white">
                {text}
            </p>
        </div>
    )
}