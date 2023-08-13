

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

    const regex = getRegexNotContains(RegexOnlyInternal.Numbers, acceptOptions);
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

    const regex = getRegexNotContains(RegexOnlyInternal.Letters, acceptOptions);
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

    const regex = getRegexNotContains(RegexOnlyInternal.LettersAndNumbers, acceptOptions);
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
 * @param char The string to check.
 * @returns True if the text is a single letter, false otherwise.
 */
export function isLetter(char: string): boolean {
    if (isNullOrEmpty(char)) return false;
    return char.length === 1 && char.match(/[a-z]/i) !== null;
}

/**
 * Determines whether a given string is a single digit number.
 * @param char The string to check.
 * @returns True if the string is a single digit number, false otherwise.
 */
export function isNumber(char: string): boolean {
    if (isNullOrEmpty(char)) return false;
    return char.length === 1 && char.match(/[0-9]/i) !== null;
}

/**
 * Checks if a given string is a letter or a number.
 * @param char - The string to check.
 * @returns True if the string is a letter or a number, false otherwise.
 */
export function isLetterOrNumber(char: string): boolean {
    if (isNullOrEmpty(char)) return false;
    return char.length === 1 && char.match(/[a-z0-9]/i) !== null;
}

/**
 * Determines if the given text is whitespace.
 * @param char The string to check.
 * @returns True if the text is whitespace, false otherwise.
 */
export function isWhiteSpace(char: string): boolean {
    return char === " " || char === "\t" || char === "\n" || char === "\r" || char === "\r\n" ||
        char === "\f" || char === "\v";
}

/**
 * Checks if a string starts with a number.
 * @param value - The string to check.
 * @returns True if the string starts with a number, false otherwise.
 */
export function isStartsWithNumber(value: string): boolean {
    if (value == null || value.length === 0) return false;
    return !isNaN(parseInt(value[0]));
}

/**
 * Checks if a string contains only letters.
 * @param text - The string to check.
 * @param specialCharsCategory - Optional parameter to allow additional special characters.
 * @returns True if the string contains only letters, false otherwise.
 */
export function isOnlyLetters(text: string, specialCharsCategory: SpecialCharsOptions = SpecialCharsOptions.None): boolean {
    if (text == null || text.length === 0) return false;
    const regex = getRegexTest(RegexOnlyInternal.Letters, specialCharsCategory);
    return regex.test(text);
}

/**
 * Checks if a string contains only numeric characters.
 * @param text The string to check.
 * @param specialCharsCategory The category of special characters to allow in the string. Defaults to `SpecialCharsOptions.None`.
 * @returns `true` if the string contains only numeric characters, `false` otherwise.
 */
export function isOnlyNumbers(text: string, specialCharsCategory: SpecialCharsOptions = SpecialCharsOptions.None): boolean {
    if (text == null || text.length === 0) return false;
    const regex = getRegexTest(RegexOnlyInternal.Numbers, specialCharsCategory);
    return regex.test(text);
}

/**
 * Checks if a string contains only letters and numbers.
 * @param text - The string to check.
 * @param specialCharsCategory - An optional parameter to allow additional special characters.
 * @returns True if the string contains only letters and numbers, false otherwise.
 */
export function isOnlyLettersAndNumbers(text: string, specialCharsCategory: SpecialCharsOptions = SpecialCharsOptions.None): boolean {
    if (text == null || text.length === 0) return false;
    const regex = getRegexTest(RegexOnlyInternal.LettersAndNumbers, specialCharsCategory);
    return regex.test(text);
}

/**
 * Checks if a given string is in all uppercase.
 * @param text - The string to check.
 * @returns True if the string is in all uppercase, false otherwise.
 */
export function isUpperCase(text: string): boolean {
    if (isNullOrWhiteSpace(text)) return false;
    return text === text.toUpperCase();
}

/**
 * Checks if a string is all lowercase.
 * @param text - The string to check.
 * @returns True if the string is all lowercase, false otherwise.
 */
export function isLowerCase(text: string): boolean {
    if (isNullOrWhiteSpace(text)) return false;
    return text === text.toLowerCase();
}

/**
 * Determines whether a given string is capitalized.
 * @param text - The string to check.
 * @returns `true` if the string is capitalized, `false` otherwise.
 */
export function isCapitalized(text: string): boolean {
    if (isNullOrWhiteSpace(text)) return false;
    if (text.length === 1) return isUpperCase(text);
    return isUpperCase(text[0]) && isLowerCase(text.substring(1));
}

/**
 * Determines whether a given string is in camelCase format.
 * @param text The string to check.
 * @returns True if the string is in camelCase format, false otherwise.
 */
export function isCamelCase(text: string): boolean {
    if (isNullOrWhiteSpace(text)) return false;
    if (text[0] === "_") text = text.substring(1);
    const lettersAndNumbers = getOnlyLettersAndNumbers(text);
    if (lettersAndNumbers.length !== text.length) return false;
    return isLowerCase(text[0]);
}

/**
 * Determines whether a string is in PascalCase format.
 * @param text The string to check.
 * @returns True if the string is in PascalCase format, false otherwise.
 */
export function isPascalCase(text: string): boolean {
    if (isNullOrWhiteSpace(text)) return false;
    const lettersAndNumbers = getOnlyLettersAndNumbers(text);
    if (lettersAndNumbers.length !== text.length) return false;
    return isUpperCase(text[0]);
}

/**
 * Determines whether a given string is in snake_case format.
 * @param text The string to check.
 * @returns True if the string is in snake_case format, false otherwise.
 */
export function isSnakeCase(text: string): boolean {
    if (isNullOrWhiteSpace(text)) return false;
    const lettersAndNumbers = getOnlyLettersAndNumbers(text, SpecialCharsOptions.Underscore);
    if (lettersAndNumbers.length !== text.length) return false;
    return isLowerCase(text);
}

/**
 * Checks if a given string is in kebab-case format.
 * 
 * @param text - The string to check.
 * @returns True if the string is in kebab-case format, false otherwise.
 */
export function isKebabCase(text: string): boolean {
    if (isNullOrWhiteSpace(text)) return false;
    const lettersAndNumbers = getOnlyLettersAndNumbers(text, SpecialCharsOptions.Dash);
    if (lettersAndNumbers.length !== text.length) return false;
    return isLowerCase(text);
}

/**
 * Removes special characters from a string based on the provided options.
 * @param value - The string to remove special characters from.
 * @param options - The options for which special characters to remove.
 * @param replaceValue - The value to replace the removed special characters with.
 * @returns The string with the special characters removed.
 */
export function removeSpecialChars(value: string, options: SpecialCharsOptions = SpecialCharsOptions.None, replaceValue: string = ""): string {
    if(value == null || value.length === 0) return "";
    const regex = getRegexContains(RegexOnlyInternal.None, options);
    return value.replace(regex, replaceValue);
}

/**
 * Removes accents from a string by replacing them with the specified value or an empty string.
 * @param value - The string to remove accents from.
 * @param replaceValue - The value to replace the accents with. Defaults to an empty string.
 * @returns The string with accents removed.
 */
export function removeAccents(value: string): string {
    if (value == null || value.length === 0) return "";
    return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

/**
 * Removes all special characters from a string and returns the result.
 * @param value - The string to remove special characters from.
 * @param replaceValue - The value to replace the special characters with. Defaults to an empty string.
 * @returns The string with all special characters removed.
 */
export function removerSpecialChars(value: string, replaceValue: string = ""): string {
    if (value == null || value.length === 0) return "";
    const regex = new RegExp(`[^a-zA-Z0-9áàâãäéèêëíìîïóòôõöúùûüçÁÀÂÃÄÉÈÊËÍÌÎÏÓÒÔÕÖÚÙÛÜÇ\\.\\,\\s]`, "g");
    return value.replace(regex, replaceValue);
}

/**
 * Removes accents and special characters from a string.
 * @param value - The string to remove accents and special characters from.
 * @param replaceValue - The value to replace the removed characters with. Defaults to an empty string.
 * @returns The string with accents and special characters removed.
 */
export function removerAccentsAndSpecialChars(value: string, replaceValue: string = ""): string {
    return removerSpecialChars(removeAccents(value), replaceValue);
}

/**
 * Concatenates an array of strings into a single string, using the specified separator and end separator.
 * @param parts An array of strings to concatenate.
 * @param separator The separator to use between each string. Defaults to an empty string.
 * @param endSeparator The separator to use between the second-to-last and last string. If null, the separator parameter is used instead. Defaults to null.
 * @returns The concatenated string.
 */
export function specialConcat(parts: string[], separator: string = "", endSeparator: string | null = null): string {

    if (parts == null || parts.length === 0) return "";
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
const brackets = "\\(\\)\\[\\]\\{\\}\\<\\>";
const symbols = "~^\\/|@#$&";
const quotes = "\"'`";
const specialSymbols = "°ºª§";
const underscore = "_";

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
    Underscore = 128,
    Dash = 256,
}

function getRegexNotContains(only: RegexOnlyInternal, options: SpecialCharsOptions): RegExp {
    const regex = getRegexInternal("^" + only, options);
    return new RegExp(`[${regex}]`, "g");
}

function getRegexContains(only: RegexOnlyInternal, options: SpecialCharsOptions): RegExp {
    const regex = getRegexInternal(only, options);
    return new RegExp(`[${regex}]`, "g");
}

function getRegexTest(only: RegexOnlyInternal, options: SpecialCharsOptions): RegExp {
    const regex = getRegexInternal(only, options);
    return new RegExp(`^[${regex}]+$`);
}

function getRegexInternal(only: string, options: SpecialCharsOptions): string {
    let regex = only;
    if (options & SpecialCharsOptions.WhiteSpaces) regex += "\\s";
    if (options & SpecialCharsOptions.Punctuations) regex += punctuation;
    if (options & SpecialCharsOptions.Operators) regex += operators;
    if (options & SpecialCharsOptions.Brackets) regex += brackets;
    if (options & SpecialCharsOptions.Symbols) regex += symbols;
    if (options & SpecialCharsOptions.Quotes) regex += quotes;
    if (options & SpecialCharsOptions.SpecialSymbols) regex += specialSymbols;
    if (options & SpecialCharsOptions.Underscore) regex += underscore;
    if (options & SpecialCharsOptions.Dash) regex += "-";
    return regex;
}

enum RegexOnlyInternal {
    None = "",
    Numbers = "0-9",
    Letters = "a-zA-Z",
    LettersAndNumbers = "a-zA-Z0-9",
}

