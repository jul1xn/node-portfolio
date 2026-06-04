import StickyBanner from "@/components/StickerBanner";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Neem contact op met Julian Verwoerd. Stuur een bericht of ontdek hoe je mij kunt bereiken voor samenwerking en vragen.",
};

type Props = {
    searchParams: Promise<{
        success?: boolean;
        error?: string;
    }>;
};

export default async function ContactSection({ searchParams }: Props) {
    const params = await searchParams;

    return (
        <div className="isolate relative overflow-hidden">
            <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-5xl font-light text-white">
                    Contact
                </h2>
            </div>

            <form className="mx-auto mt-8 max-w-xl" action="/api/contact" method="POST">
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                    <div>
                        <label
                            htmlFor="first-name"
                            className="block font-semibold text-white"
                        >
                            Voornaam
                        </label>

                        <div className="mt-2.5">
                            <input
                                id="first-name"
                                type="text"
                                name="first-name"
                                autoComplete="given-name"
                                className="block w-full rounded-md transition-colors bg-white/5 px-3.5 py-2 text-white outline outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:outline-purple-600"
                            />
                        </div>
                    </div>

                    <div>
                        <label
                            htmlFor="last-name"
                            className="block font-semibold text-white"
                        >
                            Achternaam
                        </label>

                        <div className="mt-2.5">
                            <input
                                id="last-name"
                                type="text"
                                name="last-name"
                                autoComplete="family-name"
                                className="block w-full rounded-md transition-colors bg-white/5 px-3.5 py-2 text-white outline outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:outline-purple-600"
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-2">
                        <label
                            htmlFor="email"
                            className="block font-semibold text-white"
                        >
                            Email
                        </label>

                        <div className="mt-2.5">
                            <input
                                id="email"
                                type="email"
                                name="email"
                                autoComplete="email"
                                className="block w-full rounded-md transition-colors bg-white/5 px-3.5 py-2 text-white outline outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:outline-purple-600"
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-2">
                        <label
                            htmlFor="message"
                            className="block font-semibold text-white"
                        >
                            Bericht
                        </label>

                        <div className="mt-2.5">
                            <textarea
                                id="message"
                                name="message"
                                rows={4}
                                className="block w-full rounded-md transition-colors bg-white/5 px-3.5 py-2 text-white outline outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:outline-purple-600"
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-10">
                    <button
                        type="submit"
                        className="block w-full rounded-full cursor-pointer bg-purple-700 px-5 py-3 font-semibold text-white transition hover:bg-purple-600"
                    >
                        Versturen
                    </button>
                </div>
            </form>

            {params.success && (
                <StickyBanner type="success" text="Bericht successvol verzonden!"/>
            )}

            {params.error && (
                <StickyBanner type="error" text={params.error}/>
            )}
        </div>
    )
}