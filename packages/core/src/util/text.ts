

/**
 * Concatenates multiple strings into a single string.
 * @param parts The strings to concatenate.
 * @returns The concatenated string.
 */
export function concat(...parts: string[]): string {
    return parts.join("");
}

/**
 * Concatenates an array of strings into a single string, using the specified separator and end separator.
 * @param parts An array of strings to concatenate.
 * @param separator The separator to use between each string. Defaults to an empty string.
 * @param endSeparator The separator to use between the second-to-last and last string. If null, the separator parameter is used instead. Defaults to null.
 * @returns The concatenated string.
 */
export function specialConcat(parts: string[], separator: string = "", endSeparator: string | null = null): string {

    if (parts.length === 0) return "";
    if (endSeparator != null) {

        if (parts.length > 1) {
            const lastParte = parts.pop();
            return parts.join(separator) + endSeparator + lastParte;
        }
        return parts.join(endSeparator);
    }
    return parts.join(separator);
}