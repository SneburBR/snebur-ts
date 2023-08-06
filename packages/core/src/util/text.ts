

/**
 * Concatenates multiple strings into a single string.
 * @param parts The strings to concatenate.
 * @returns The concatenated string.
 */
export function concat(...parts: string[]): string {
    return parts.join("");
}

 /**
 * Counts the number of lines in a given string of text.
 * 
 * @param text - The text to count lines in.
 * @returns The number of lines in the text.
 */
 export function countLines(text: string): number {

    if (isNullOrWhiteSpace(text)) return 0;
    return text.split(/\r\n|\r|\n/).length;
}

/**
 * Counts the number of words in a given text.
 * @param text The text to count words from.
 * @returns The number of words in the text.
 */
export function countWords(text: string): number {
    
    if (isNullOrWhiteSpace(text)) return 0;
    return text.trim().split(/\s+/).length;
}

/**
 * Counts the number of occurrences of a word in a given text.
 * @param text The text to search for occurrences of the word.
 * @param word The word to count occurrences of in the text.
 * @returns The number of occurrences of the word in the text.
 */
export function countOccurrences(text: string, word: string, isIgnoreCase: boolean = false): number {

    if (isNullOrWhiteSpace(text)) return 0;
    if (isNullOrWhiteSpace(word)) return 0;

    if (isIgnoreCase) {
        text = text.toLowerCase();
        word = word.toLowerCase();
    }
    return text.split(word).length - 1;
}

/**
 * Splits a string into an array of lines, using any combination of carriage return and line feed characters as the separator.
 * @param text The string to split into lines.
 * @returns An array of lines.
 */
export function getLines(text: string): string[] {

    if (isNullOrWhiteSpace(text)) return [];
    return text.split(/\r\n|\r|\n/);
}

/**
 * Splits a string into an array of words.
 * @param text - The string to split.
 * @returns An array of words.
 */
export function getWords(text: string): string[] {

    if (isNullOrWhiteSpace(text)) return [];
    return text.split(/\s+/);
}

/**
 * Returns an array of substrings in the given `text` that match the specified `word`.
 * @param text The text to search for occurrences of the `word`.
 * @param word The word to search for in the `text`.
 * @returns An array of substrings in the `text` that match the specified `word`.
 */
export function getOccurrences(text: string, word: string): string[] {

    if (isNullOrWhiteSpace(text)) return [];
    if (isNullOrWhiteSpace(word)) return [];

    const occurrences: string[] = [];
    let index = 0;
    // eslint-disable-next-line no-constant-condition
    while (true) {
        index = text.indexOf(word, index);
        if (index === -1) break;
        occurrences.push(text.substr(index, word.length));
        //occurrences.push(text.slice(index, index + word.length));
        index += word.length;
    }
    return occurrences;
    
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

/**
 * Determines whether a given string is null, undefined, or consists only of whitespace characters.
 * @param text The string to check.
 * @returns True if the string is null, undefined, or consists only of whitespace characters; otherwise, false.
 */
export function isNullOrWhiteSpace(text: string): boolean {
    return text === null || text === undefined || text.trim() === "";
}

