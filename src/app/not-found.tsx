import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
    return (
        <div className="flex items-center justify-center">
            <div className="text-center max-w-xl">
                <h1 className="text-8xl font-light mb-4">
                    404
                </h1>

                <h2 className="text-4xl font-light mb-5">
                    Pagina niet gevonden
                </h2>

                <p className="text-lg mb-8 text-gray-600 dark:text-gray-400">
                    De pagina die je probeert te bezoeken bestaat niet of is
                    verplaatst. Misschien kun je via de homepage verder zoeken.
                </p>

                <Link
                    href="/"
                    className="inline-flex items-center gap-2 bg-purple-700 text-white px-5 py-3 text-xl rounded-full cursor-pointer transition-colors hover:bg-purple-900"
                >
                    <ArrowRight />
                    Terug naar homepage
                </Link>
            </div>
        </div>
    );
}