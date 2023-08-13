/* eslint-disable no-unused-vars */
const punctuation = ".,;:!?";
const operators = "+-*/%=";
const brackets = "()[]{}";
const symbols = "~^\\/|@#$&";
const quotes = "\"'`";
const specialSymbols = "°ºª§";



 
   






 

















/**
 * Removes a range of characters from a string.
 * @param str - The input string.
 * @param start - The starting index of the range to remove.
 * @param end - The ending index of the range to remove.
 * @returns The input string with the specified range removed.
 */
export function removeRange(str: string, start: number, end: number): string {

    if (start < 0) start = 0;
    if (start === end) end += 1;
    if (end > str.length) end = str.length;
    return str.substring(0, start) + str.substring(end, str.length);
}




/**
 * Represents the category of characters used in a regular expression pattern.
 */
export enum CharsCategory {
    None,
    Numbers,
    Letters,
    LettersAndNumbers,
}

/**
 * Options for including special characters in a regular expression pattern.
 */
export enum SpecialCharsOptions {
    None = 0,
    Punctuations = 1,
    Operators = 2,
    Symbols = 4,
    Brackets = 8,
    Quotes = 16,
    SpecialSymbols = 32,
}


function getRegexInternal(only: RegexOnlyInternal, options: SpecialCharsOptions): RegExp {
    let regex = only + "";
    if (options & SpecialCharsOptions.Punctuations) regex += punctuation;
    if (options & SpecialCharsOptions.Operators) regex += operators;
    if (options & SpecialCharsOptions.Brackets) regex += brackets;
    if (options & SpecialCharsOptions.Symbols) regex += symbols;
    if (options & SpecialCharsOptions.Quotes) regex += quotes;
    if (options & SpecialCharsOptions.SpecialSymbols) regex += specialSymbols;
    return new RegExp(regex, "g");
}

enum RegexOnlyInternal {
    None = "",
    Numbers = "0-9",
    Letters = "a-zA-Z",
    LettersAndNumbers = "a-zA-Z0-9",
}

