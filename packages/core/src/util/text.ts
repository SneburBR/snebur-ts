

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
 * Returns a string containing only the numbers from the input string.
 * @param value - The input string to extract numbers from.
 * @param acceptOptions - Optional parameter to specify which special characters to accept in the input string.
 * @param replaceValue - Optional parameter to specify a replacement value for the extracted numbers.
 * @returns A string containing only the numbers from the input string.
 */
export function getOnlyNumbers(value: string, acceptOptions: SpecialCharsOptions = SpecialCharsOptions.None, replaceValue: string = ""): string {

    if (isNullOrWhiteSpace(value)) return "";
 
    const regex = getRegexInternal(RegexOnlyInternal.Numbers, acceptOptions);
    return value.replace(regex, replaceValue);
}

/**
 * Returns a new string containing only the letters from the input string.
 * 
 * @param value - The input string to extract letters from.
 * @param acceptOptions - An optional parameter to specify which special characters to allow in the output string.
 * @param replaceValue - An optional parameter to specify a replacement string for the removed characters.
 * @returns A new string containing only the letters from the input string.
 */
export function getOnlyLetters(value: string, acceptOptions: SpecialCharsOptions = SpecialCharsOptions.None, replaceValue: string = ""): string {

    if (isNullOrWhiteSpace(value)) return "";

    const regex = getRegexInternal(RegexOnlyInternal.Letters, acceptOptions);
    return value.replace(regex, replaceValue);
}

/**
 * Returns a new string containing only letters and numbers from the input string.
 * @param value The input string to filter.
 * @param acceptOptions The special characters to allow in the output string. Defaults to `SpecialCharsOptions.None`.
 * @param replaceValue The string to replace the filtered characters with. Defaults to an empty string.
 * @returns A new string containing only letters and numbers from the input string.
 */
export function getOnlyLettersAndNumbers(value: string, acceptOptions: SpecialCharsOptions = SpecialCharsOptions.None, replaceValue: string = ""): string {

    if (isNullOrWhiteSpace(value)) return "";

    const regex = getRegexInternal(RegexOnlyInternal.LettersAndNumbers, acceptOptions);
    return value.replace(regex, replaceValue);
}

/**
 * Determines whether a given string is null, undefined, or empty.
 * @param text The string to check.
 * @returns True if the string is null, undefined, or empty; otherwise, false.
 */
export function isNullOrEmpty(text: string): boolean {
    return text == null || text === "";
}

/**
 * Determines whether a given string is null, undefined, or consists only of whitespace characters.
 * @param text The string to check.
 * @returns True if the string is null, undefined, or consists only of whitespace characters; otherwise, false.
 */
export function isNullOrWhiteSpace(text: string): boolean {
    return text == null || text.trim() === "";
}

/**
 * Determines whether the given text is a single letter (a-z or A-Z).
 * @param text The text to check.
 * @returns True if the text is a single letter, false otherwise.
 */
export function isLetter(text: string): boolean {
    if(isNullOrEmpty(text)) return false;
    return text.length === 1 && text.match(/[a-z]/i) !== null;
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





/* eslint-disable no-unused-vars */
const punctuation = ".,;:!?";
const operators = `\\+\\-\\*\\/\\%=`;
const brackets = "\\(\\)\\[\\]\\{\\}";
const symbols = "~^\\/|@#$&";
const quotes = "\"'`";
const specialSymbols = "°ºª§";

/**
 * Options for including special characters in a regular expression pattern.
 */
export enum SpecialCharsOptions {
    None = 0,
    WhiteSpaces = 1,
    Punctuations = 2,
    Operators = 4,
    Symbols = 8,
    Brackets = 16,
    Quotes = 32,
    SpecialSymbols = 64,
}

function getRegexInternal(only: RegexOnlyInternal, options: SpecialCharsOptions): RegExp {
    let regex = only + "";
    if (options & SpecialCharsOptions.WhiteSpaces) regex += "\\s";
    if (options & SpecialCharsOptions.Punctuations) regex += punctuation;
    if (options & SpecialCharsOptions.Operators) regex += operators;
    if (options & SpecialCharsOptions.Brackets) regex += brackets;
    if (options & SpecialCharsOptions.Symbols) regex += symbols;
    if (options & SpecialCharsOptions.Quotes) regex += quotes;
    if (options & SpecialCharsOptions.SpecialSymbols) regex += specialSymbols;
    return new RegExp(`[^${regex}]`, "g");
}

enum RegexOnlyInternal {
    None = "",
    Numbers = "0-9",
    Letters = "a-zA-Z",
    LettersAndNumbers = "a-zA-Z0-9",
}

