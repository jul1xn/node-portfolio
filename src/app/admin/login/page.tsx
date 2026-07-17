import StickyBanner from "@/components/StickerBanner";

type Props = {
    searchParams: Promise<{
        error?: string;
    }>;
};

export default async function AdminLoginPage({ searchParams }: Props) {
    const { error } = await searchParams;

    return (
        <div className="isolate relative overflow-hidden">
            <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-5xl font-light text-white">
                    Admin Login
                </h2>

                <p className="mt-4 text-gray-400">
                    Voer je admin sleutel in om toegang te krijgen.
                </p>
            </div>

            <form
                className="mx-auto mt-8 max-w-xl"
                action="/admin"
                method="POST"
            >
                <div className="grid grid-cols-1 gap-y-6">
                    <div>
                        <label
                            htmlFor="key"
                            className="block font-semibold text-white"
                        >
                            Admin Key
                        </label>

                        <div className="mt-2.5">
                            <input
                                id="key"
                                type="password"
                                name="key"
                                placeholder="Enter admin key..."
                                autoComplete="current-password"
                                required
                                className="block w-full rounded-md transition-colors bg-white/5 px-3.5 py-2 text-white outline outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:outline-purple-600"
                            />
                        </div>
                    </div>
                </div>

                {error && (
                    <StickyBanner type="error" text={decodeURIComponent(error)}/>
                )}

                <div className="mt-10">
                    <button
                        type="submit"
                        className="block w-full cursor-pointer rounded-full bg-purple-700 px-5 py-3 font-semibold text-white transition hover:bg-purple-600"
                    >
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
}