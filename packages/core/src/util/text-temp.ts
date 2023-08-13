/* eslint-disable no-unused-vars */
const punctuation = ".,;:!?";
const operators = "+-*/%=";
const brackets = "()[]{}";
const symbols = "~^\\/|@#$&";
const quotes = "\"'`";
const specialSymbols = "°ºª§";



 
   






 





















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

