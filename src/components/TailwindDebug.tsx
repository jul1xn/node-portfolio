export default function TailwindDebug() {
    if (process.env.NODE_ENV !== "development") {
        return <></>;
    }

    return (
        <div className="fixed bottom-4 right-4 z-50 bg-slate-800 text-white text-xs font-bold px-3 py-1 rounded shadow-lg">
            <span className="sm:hidden">xs (&lt; 640px)</span>
            <span className="hidden sm:inline md:hidden">sm (640px+)</span>
            <span className="hidden md:inline lg:hidden">md (768px+)</span>
            <span className="hidden lg:inline xl:hidden">lg (1024px+)</span>
            <span className="hidden xl:inline 2xl:hidden">xl (1280px+)</span>
            <span className="hidden 2xl:inline">2xl (1536px+)</span>
        </div>
    );
}