import { NextRequest } from "next/server";

export function createRedirectUrl(req: NextRequest, path: string) {
    const requestUrl = new URL(req.url);
    const origin =
        getOriginHeader(req.headers) ??
        getForwardedOrigin(req.headers, requestUrl.protocol.replace(":", "")) ??
        requestUrl.origin;

    return new URL(path, origin);
}

function getOriginHeader(headers: Headers) {
    const origin = headers.get("origin");

    if (!origin) {
        return null;
    }

    try {
        return new URL(origin).origin;
    } catch {
        return null;
    }
}

function getForwardedOrigin(headers: Headers, fallbackProto: string) {
    const host = headers.get("x-forwarded-host") ?? headers.get("host");

    if (!host) {
        return null;
    }

    const proto = headers.get("x-forwarded-proto") ?? fallbackProto;
    const firstHost = host.split(",")[0]?.trim();
    const firstProto = proto.split(",")[0]?.trim();

    if (!firstHost || !firstProto) {
        return null;
    }

    return `${firstProto}://${firstHost}`;
}
