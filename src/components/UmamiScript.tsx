import Script from "next/script";

export default function UmamiScript() {
    const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
    if (!websiteId || process.env.NODE_ENV !== "production") {
        return <></>
    }

    return <Script async src="https://umami.prowser.nl/script.js" data-website-id={websiteId} />
}