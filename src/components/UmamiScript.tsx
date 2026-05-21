import Script from "next/script";

export default function UmamiScript() {
    const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
    if (!websiteId) {
        return <></>
    }

    return <Script async src="https://umami.prowser.nl/script.js" data-website-id={websiteId} />
}