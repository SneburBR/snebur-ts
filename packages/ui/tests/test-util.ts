import { JSDOM } from "jsdom";

export function getDocument(): Document {
    return typeof window !== "undefined"
        ? window.document
        : new JSDOM().window.document;
}