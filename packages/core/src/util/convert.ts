const isNode = typeof process !== "undefined" && process.versions != null && process.versions.node != null;

export function stringToBase64(str: string): string {
   
    if (isNode)
        return Buffer.from(str).toString("base64");

    return globalThis.btoa(str);
}

export function base64ToString(base64: string): string {
    if (isNode)
        return Buffer.from(base64, "base64").toString();

    return globalThis.atob(base64);
}