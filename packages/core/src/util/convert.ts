import { normalizeDate } from "./normalize";
import { isNullOrWhiteSpace } from "./text";

const isNode = typeof process !== "undefined" && process.versions != null && process.versions.node != null;

export function base64ToString(base64: string): string {
    if (isNode)
        return Buffer.from(base64, "base64").toString();

    return globalThis.atob(base64);
}


/**
 * Converts a value to a Date object.
 * @param value - The value to convert. Can be a string, number or Date object.
 * @param isNullable - Whether the value can be null or undefined. Defaults to true.
 * @returns A Date object representing the input value.
 * @throws An error if the input type is not supported.
 */
export function convertToDate(value: string | number | Date, isNullable?: boolean): Date | null
export function convertToDate(value: string | number | Date, isNullable: false): Date
export function convertToDate(value: string | number | Date, isNullable: true): Date | null
export function convertToDate(value: string | number | Date, isNullable: boolean = true): Date | null {

    if (value == null) {
        if (isNullable)
            return null;
        return new Date();
    }

    if (value instanceof Date)
        return value;

    if (typeof value === "number")
        return new Date(value);

    if (typeof value === "string") {
        
        const normalized = normalizeDate(value);
        if (isNullOrWhiteSpace(normalized)) {
            if (isNullable)
                return null;
            return new Date();
        }
        return new Date(normalized);
    }

    throw new Error(`Cannot convert value '${value}' to Date`);
}

export function stringToBase64(str: string): string {

    if (isNode)
        return Buffer.from(str).toString("base64");

    return globalThis.btoa(str);
}