"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";

export default function UmamiScript() {
    const pathname = usePathname();
    const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;

    if (
        !websiteId ||
        process.env.NODE_ENV !== "production" ||
        pathname.startsWith("/admin")
    ) {
        return null;
    }

    return (
        <Script
            async
            src="https://umami.prowser.nl/script.js"
            data-website-id={websiteId}
        />
    );
}