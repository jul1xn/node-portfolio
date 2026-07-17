import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

type Props = {
    filter?: string;
    maxPages: number;
    currentPage: number;
}

export default function Pagination({ filter, maxPages, currentPage }: Props) {
    const pageUrl = (page: number) => {
        const search = new URLSearchParams();

        if (filter)
            search.set("filter", filter);

        search.set("page", page.toString());

        return `/projecten?${search.toString()}`;
    };

    const paginationItems: (number | "...")[] = [];

    if (maxPages <= 7) {
        for (let i = 1; i <= maxPages; i++) {
            paginationItems.push(i);
        }
    } else {
        paginationItems.push(1);

        if (currentPage > 3) {
            paginationItems.push("...");
        }

        const start = Math.max(2, currentPage - 1);
        const end = Math.min(maxPages - 1, currentPage + 1);

        for (let i = start; i <= end; i++) {
            paginationItems.push(i);
        }

        if (currentPage < maxPages - 2) {
            paginationItems.push("...");
        }

        paginationItems.push(maxPages);
    }

    return (
        <>
            {/* Pagination */}
            <nav className="flex items-center justify-between px-4 py-4">
                {/* Previous */}
                <div className="flex flex-1">
                    {currentPage - 1 < 1 ? (
                        <span
                            className="inline-flex items-center pt-4 pr-1 text-sm font-medium text-neutral-500 opacity-40 cursor-not-allowed"
                        >
                            <ArrowLeft className="mr-3 h-5 w-5" />
                            Vorige
                        </span>
                    ) : (
                        <a
                            href={pageUrl(currentPage - 1)}
                            className="inline-flex items-center pt-4 pr-1 text-sm font-medium text-neutral-500 hover:text-purple-900 transition-colors"
                        >
                            <ArrowLeft className="mr-3 h-5 w-5" />
                            Vorige
                        </a>
                    )}
                </div>

                {/* Page numbers */}
                <div className="hidden md:flex">
                    {paginationItems.map((item, index) => {
                        if (item === "...") {
                            return (
                                <span
                                    key={`ellipsis-${index}`}
                                    className="inline-flex items-center px-4 pt-4 text-sm text-neutral-500"
                                >
                                    ...
                                </span>
                            );
                        }

                        return (
                            <Link
                                key={item}
                                href={pageUrl(item)}
                                className={`inline-flex items-center px-4 pt-4 text-sm font-medium transition-colors ${currentPage === item
                                    ? "text-purple-700"
                                    : "text-neutral-500 hover:text-purple-900"
                                    }`}
                            >
                                {item}
                            </Link>
                        );
                    })}
                </div>

                {/* Next */}
                <div className="flex flex-1 justify-end">
                    {currentPage + 1 > maxPages ? (
                        <span
                            className="inline-flex items-center pt-4 pr-1 text-sm font-medium text-neutral-500 opacity-40 cursor-not-allowed"
                        >
                            Volgende
                            <ArrowRight className="ml-3 h-5 w-5" />
                        </span>
                    ) : (
                        <a
                            href={pageUrl(currentPage + 1)}
                            className="inline-flex items-center pt-4 pr-1 text-sm font-medium text-neutral-500 hover:text-purple-900 transition-colors"
                        >
                            Volgende
                            <ArrowRight className="ml-3 h-5 w-5" />
                        </a>
                    )}
                </div>
            </nav>
        </>
    );
}