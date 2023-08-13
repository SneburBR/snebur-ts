import {
    concat, specialConcat, countLines,
    countWords, countOccurrences, getLines, getWords, getOccurrences,
    getOnlyNumbers, getOnlyLetters, getOnlyLettersAndNumbers,
    isNullOrEmpty, isNullOrWhiteSpace, isLetter, isNumber, isLetterOrNumber,
    SpecialCharsOptions,

} from "../../src/util/text";

import { describe, expect, it } from "vitest";

describe("TextUtil", () => {

    describe("concat", () => {

        it("should concat empty string", () => {
            const result = concat("");
            expect(result).toEqual("");
            expect(concat("")).toEqual("");
            expect(concat("", "", "")).toEqual("");
            expect(concat("", null)).toEqual("");
            expect(concat(null, null)).toEqual("");
        });

        it("should concat single string", () => {
            const result = concat("hello");
            expect(result).toEqual("hello");
        });

        it("should concat multiple strings", () => {
            const result = concat("hello", " ", "world");
            expect(result).toEqual("hello world");
        });
    });

    describe("countLines", () => {

        it("should return 1 for a single-line string", () => {
            const text = "Hello, world!";
            const result = countLines(text);
            expect(result).toEqual(1);
        });

        it("should return the correct number of lines for a multi-line string", () => {
            const text = "Hello,\nworld!";
            const result = countLines(text);
            expect(result).toEqual(2);
        });

        it("should return 0 for an empty string", () => {
            const text = "";
            const result = countLines(text);
            expect(result).toEqual(0);
            expect(countLines(null)).toEqual(0);
        });
    });

    describe("countWords", () => {

        it("should return 0 for empty string", () => {
            expect(countWords("")).toBe(0);
            expect(countWords(null)).toBe(0);
            expect(countWords(undefined)).toBe(0);
        });

        it("should return 1 for single word", () => {
            expect(countWords(" hello ")).toBe(1);
            expect(countWords("hello")).toBe(1);
        });

        it("should return 2 for two words", () => {
            expect(countWords("hello world!")).toBe(2);
            expect(countWords("  hello   world  ")).toBe(2);
        });

        it("should return 3 for three words", () => {
            expect(countWords("hello, hello world!")).toBe(3);
            expect(countWords("  hello   world !  ")).toBe(3);
        });
    });

    describe("countOccurrences", () => {

        it("should return 0 when the word is not found", () => {
            const text = "The quick brown fox jumps over the lazy dog";
            const word = "cat";
            const result = countOccurrences(text, word);
            expect(result).toEqual(0);
            expect(countOccurrences(text, null)).toEqual(0);
            expect(countOccurrences(text, "")).toEqual(0);
            expect(countOccurrences(null, word)).toEqual(0);
            expect(countOccurrences("", word)).toEqual(0);
            expect(countOccurrences(null, null)).toEqual(0);
            expect(countOccurrences(undefined, undefined)).toEqual(0);
            expect(countOccurrences("", "")).toEqual(0);
        });

        it("should return the correct number of occurrences when the word is found", () => {
            const text = "The quick brown fox jumps over the lazy dog";
            const word = "o";
            const result = countOccurrences(text, word);
            expect(result).toEqual(4);
        });

        it("should return the correct number of occurrences when the word is found multiple times in a row", () => {
            const text = "The quick brown fox jumps over the lazy dog";
            const word = "fox";
            const result = countOccurrences(text, word);
            expect(result).toEqual(1);
        });

        it("should return the correct number of occurrences when the word is found at the beginning of the text", () => {
            const text = "The quick brown fox jumps over the lazy dog";
            const word = "The";
            const result = countOccurrences(text, word);
            const resultIgnoreCase = countOccurrences(text, word, true);
            expect(result).toEqual(1);
            expect(resultIgnoreCase).toEqual(2);
        });

        it("should return the correct number of occurrences when the word is found at the end of the text", () => {
            const text = "The quick brown fox jumps over the lazy dog";
            const word = "dog";
            const result = countOccurrences(text, word);
            expect(result).toEqual(1);
        });

        it("should return the correct number of occurrences when the word is found in the middle of the text", () => {
            const text = "The quick brown fox jumps over the lazy dog";
            const word = "brown";
            const result = countOccurrences(text, word);
            expect(result).toEqual(1);
        });
    });

    describe("specialConcat", () => {

        it("should concat empty string", () => {
            expect(specialConcat([])).toEqual("");
            expect(specialConcat([""])).toEqual("");
            expect(specialConcat(["", ""])).toEqual("");
            expect(specialConcat([null])).toEqual("");
            expect(specialConcat([null, null])).toEqual("");
            expect(specialConcat([" "])).toEqual(" ");
            expect(specialConcat([" ", " ",], ",")).toEqual(" , ");
        });

        it("should concat single string", () => {
            const result = specialConcat(["hello"]);
            expect(result).toEqual("hello");
        });

        it("should concat multiple strings", () => {
            expect(specialConcat(["hello", " ", "world"])).toEqual("hello world");
            expect(specialConcat(["hello", "world"], ", ")).toEqual("hello, world");
            expect(specialConcat(["a", "b"], ", ", " and ")).toEqual("a and b");
            expect(specialConcat(["a", "b", "c"], ", ", " and ")).toEqual("a, b and c");
        });
    });

    describe("getLines", () => {

        it("should return empty array for empty string", () => {
            expect(getLines("")).toEqual([]);
            expect(getLines(null)).toEqual([]);
        });

        it("should return array with single line for single-line string", () => {
            const text = "Hello, world!";
            const result = getLines(text);
            expect(result).toEqual([text]);
        });

        it("should return array with multiple lines for multi-line string", () => {
            const text = "Hello,\nworld!";
            const result = getLines(text);
            expect(result).toEqual(["Hello,", "world!"]);
        });

        it("should return array with multiple lines for multi-line string with different line endings", () => {
            const text = "Hello,\r\nworld!";
            const result = getLines(text);
            expect(result).toEqual(["Hello,", "world!"]);
        });
    });

    describe("getWords", () => {

        it("should return empty array for empty string", () => {
            expect(getWords("")).toEqual([]);
            expect(getWords(null)).toEqual([]);
        });

        it("should return array with single word for single-word string", () => {
            const text = "hello";
            const result = getWords(text);
            expect(result).toEqual([text]);
        });

        it("should return array with multiple words for multi-word string", () => {
            const text = "hello world!";
            const result = getWords(text);
            expect(result).toEqual(["hello", "world!"]);
        });

        it("should return array with multiple words for multi-word string with different line endings", () => {
            const text = "hello\r\nworld!";
            const result = getWords(text);
            expect(result).toEqual(["hello", "world!"]);
        });
    });

    describe("getOccurrences", () => {

        it("should return empty array when the word is not found", () => {
            const text = "The quick brown fox jumps over the lazy dog";
            const word = "cat";
            const result = getOccurrences(text, word);
            expect(result).toEqual([]);
            expect(getOccurrences(text, null)).toEqual([]);
            expect(getOccurrences(text, "")).toEqual([]);
            expect(getOccurrences(null, word)).toEqual([]);
            expect(getOccurrences("", word)).toEqual([]);
            expect(getOccurrences(null, null)).toEqual([]);
            expect(getOccurrences(undefined, undefined)).toEqual([]);
            expect(getOccurrences("", "")).toEqual([]);
        });

        it("should return the correct number of occurrences when the word is found", () => {
            const text = "The quick brown fox jumps over the lazy dog";
            const word = "o";
            const result = getOccurrences(text, word);
            expect(result).toEqual(["o", "o", "o", "o"]);
        });

        it("should return the correct number of occurrences when the word is found multiple times in a row", () => {
            const text = "The quick brown fox jumps over the lazy dog";
            const word = "fox";
            const result = getOccurrences(text, word);
            expect(result).toEqual(["fox"]);
        });
    });

    describe("getOnlyNumbers", () => {

        const text = "{\"'Hello'\"}, <hello>ºª & [World] + 123,00 * -123° + (5%) R$ 1.000,00";
        it("should return empty string for empty string", () => {
            expect(getOnlyNumbers("")).toEqual("");
            expect(getOnlyNumbers(null)).toEqual("");
        });

        it("should return empty string for string with no numbers", () => {
            expect(getOnlyNumbers("hello")).toEqual("");
        });

        it("should return string with only numbers for string with numbers", () => {
            expect(getOnlyNumbers(text)).toEqual("123001235100000");
        });

        it("should return string with only numbers for string with numbers and white spaces", () => {
            expect(getOnlyNumbers(text, SpecialCharsOptions.WhiteSpaces)).toEqual("     12300  123  5  100000");
        });
        it("should return string with only numbers for string with numbers and punctuations", () => {
            expect(getOnlyNumbers(text, SpecialCharsOptions.Punctuations)).toEqual(",123,0012351.000,00");
        });

        it("should return string with only numbers for string with numbers and operators", () => {
            expect(getOnlyNumbers(text, SpecialCharsOptions.Operators)).toEqual("+12300*-123+5%100000");
        });

        it("should return string with only numbers for string with numbers and brackets", () => {
            expect(getOnlyNumbers(text, SpecialCharsOptions.Brackets)).toEqual("{}[]12300123(5)100000");
        });

        it("should return string with only numbers for string with numbers and symbols", () => {
            expect(getOnlyNumbers(text, SpecialCharsOptions.Symbols)).toEqual("&123001235$100000");
        });

        it("should return string with only numbers for string with numbers and quotes", () => {
            expect(getOnlyNumbers(text, SpecialCharsOptions.Quotes)).toEqual("\"''\"123001235100000");
        });

        it("should return string with only numbers for string with numbers and special symbols", () => {
            expect(getOnlyNumbers(text, SpecialCharsOptions.SpecialSymbols)).toEqual("ºª12300123°5100000");
        });

        it("should return string with only numbers for string with numbers, punctuations and spaces", () => {
            const options = SpecialCharsOptions.Punctuations | SpecialCharsOptions.WhiteSpaces;
            expect(getOnlyNumbers(text, options)).toEqual(",     123,00  123  5  1.000,00");
        });

        it("should return string with only numbers for string with numbers, punctuations, spaces, and operators", () => {
            const options = SpecialCharsOptions.Punctuations | SpecialCharsOptions.WhiteSpaces | SpecialCharsOptions.Operators;
            expect(getOnlyNumbers(text, options)).toEqual(",    + 123,00 * -123 + 5%  1.000,00");
        });

        it("should return string with only numbers for string with numbers, punctuations, spaces, operators, and brackets", () => {
            const options = SpecialCharsOptions.Punctuations | SpecialCharsOptions.WhiteSpaces |
                SpecialCharsOptions.Operators | SpecialCharsOptions.Brackets;

            expect(getOnlyNumbers(text, options)).toEqual("{},   [] + 123,00 * -123 + (5%)  1.000,00");
        });

    });

    describe("getOnlyLetters", () => {

        const text = "{\"'Hello'\"}, <hello>ºª & [World] + 123,00 * -123° + (5%) R$ 1.000,00";
        it("should return empty string for empty string", () => {
            expect(getOnlyLetters("")).toEqual("");
            expect(getOnlyLetters(null)).toEqual("");
        });

        it("should return empty string for string with no letters", () => {
            expect(getOnlyLetters("123")).toEqual("");
        });

        it("should return string with only letters for string with letters", () => {
            expect(getOnlyLetters(text)).toEqual("HellohelloWorldR");
        });

        it("should return string with only letters for string with letters and white spaces", () => {
            expect(getOnlyLetters(text, SpecialCharsOptions.WhiteSpaces)).toEqual("Hello hello  World       R ");
        });

        it("should return string with only letters for string with letters and punctuations", () => {
            expect(getOnlyLetters(text, SpecialCharsOptions.Punctuations)).toEqual("Hello,helloWorld,R.,");
        });

        it("should return string with only letters for string with letters and operators", () => {
            expect(getOnlyLetters(text, SpecialCharsOptions.Operators)).toEqual("HellohelloWorld+*-+%R");
        });

        it("should return string with only letters for string with letters and brackets", () => {
            expect(getOnlyLetters(text, SpecialCharsOptions.Brackets)).toEqual("{Hello}hello[World]()R");
        });

        it("should return string with only letters for string with letters and symbols", () => {
            expect(getOnlyLetters(text, SpecialCharsOptions.Symbols)).toEqual("Hellohello&WorldR$");
        });

        it("should return string with only letters for string with letters and quotes", () => {
            expect(getOnlyLetters(text, SpecialCharsOptions.Quotes)).toEqual(`"'Hello'"helloWorldR`);
        });

        it("should return string with only letters for string with letters and special symbols", () => {
            expect(getOnlyLetters(text, SpecialCharsOptions.SpecialSymbols)).toEqual("HellohelloºªWorld°R");
        });

        it("should return string with only letters for string with letters, punctuations and spaces", () => {
            const options = SpecialCharsOptions.Punctuations | SpecialCharsOptions.WhiteSpaces;
            expect(getOnlyLetters(text, options)).toEqual("Hello, hello  World  ,     R .,");
        });

        it("should return string with only letters for string with letters, punctuations, spaces, and operators", () => {
            const options = SpecialCharsOptions.Punctuations | SpecialCharsOptions.WhiteSpaces | SpecialCharsOptions.Operators;
            expect(getOnlyLetters(text, options)).toEqual("Hello, hello  World + , * - + % R .,");
        });

        it("should return string with only letters for string with letters, punctuations, spaces, operators, and brackets", () => {
            const options = SpecialCharsOptions.Punctuations | SpecialCharsOptions.WhiteSpaces |
                SpecialCharsOptions.Operators | SpecialCharsOptions.Brackets;

            expect(getOnlyLetters(text, options)).toEqual("{Hello}, hello  [World] + , * - + (%) R .,");
        });
    });

    describe("getOnlyLettersAndNumbers", () => {

        const text = "{\"'Hello'\"}, <hello>ºª & [World] + 123,00 * -123° + (5%) R$ 1.000,00";
        it("should return empty string for empty string", () => {
            expect(getOnlyLettersAndNumbers("")).toEqual("");
            expect(getOnlyLettersAndNumbers(null)).toEqual("");
        });

        it("should return empty string for string with no letters and numbers", () => {
            expect(getOnlyLettersAndNumbers("()[]{}")).toEqual("");
        });

        it("should return string with only letters and numbers for string with letters and numbers", () => {
            expect(getOnlyLettersAndNumbers(text)).toEqual("HellohelloWorld123001235R100000");
        });

        it("should return string with only letters and numbers for string with letters, numbers and white spaces", () => {
            expect(getOnlyLettersAndNumbers(text, SpecialCharsOptions.WhiteSpaces)).toEqual("Hello hello  World  12300  123  5 R 100000");
        });

        it("should return string with only letters and numbers for string with letters, numbers and punctuations", () => {
            expect(getOnlyLettersAndNumbers(text, SpecialCharsOptions.Punctuations)).toEqual("Hello,helloWorld123,001235R1.000,00");
        });

        it("should return string with only letters and numbers for string with letters, numbers and operators", () => {
            expect(getOnlyLettersAndNumbers(text, SpecialCharsOptions.Operators)).toEqual(`HellohelloWorld+12300*-123+5%R100000`);
        });

        it("should return string with only letters and numbers for string with letters, numbers and brackets", () => {
            expect(getOnlyLettersAndNumbers(text, SpecialCharsOptions.Brackets)).toEqual("{Hello}hello[World]12300123(5)R100000");
        });

        it("should return string with only letters and numbers for string with letters, numbers and symbols", () => {
            expect(getOnlyLettersAndNumbers(text, SpecialCharsOptions.Symbols)).toEqual("Hellohello&World123001235R$100000");
        });
    });

    describe("isNullOrWhiteSpace", () => {

        it("should return true for null or undefined", () => {
            expect(isNullOrWhiteSpace(null)).toBe(true);
            expect(isNullOrWhiteSpace(undefined)).toBe(true);
        });

        it("should return true for empty string", () => {
            expect(isNullOrWhiteSpace("")).toBe(true);
        });

        it("should return true for whitespace string", () => {

            expect(isNullOrWhiteSpace(" ")).toBe(true);
            expect(isNullOrWhiteSpace("  ")).toBe(true);
            expect(isNullOrWhiteSpace(" \t ")).toBe(true);
            expect(isNullOrWhiteSpace(" \t \n ")).toBe(true);
        });

        it("should return false for non-whitespace string", () => {
            expect(isNullOrWhiteSpace("hello")).toBe(false);
            expect(isNullOrWhiteSpace(" hello")).toBe(false);
            expect(isNullOrWhiteSpace("hello ")).toBe(false);
            expect(isNullOrWhiteSpace(" hello ")).toBe(false);
        });

    });

    describe("isNullOrEmpty", () => {

        it("should return true for null or undefined", () => {
            expect(isNullOrEmpty(null)).toBe(true);
            expect(isNullOrEmpty(undefined)).toBe(true);
        });

        it("should return true for empty string", () => {
            expect(isNullOrEmpty("")).toBe(true);
        });

        it("should return false for whitespace string", () => {

            expect(isNullOrEmpty(" ")).toBe(false);
            expect(isNullOrEmpty("  ")).toBe(false);
            expect(isNullOrEmpty(" \t ")).toBe(false);
            expect(isNullOrEmpty(" \t \n ")).toBe(false);
        });

        it("should return false for non-whitespace string", () => {
            expect(isNullOrEmpty("hello")).toBe(false);
            expect(isNullOrEmpty(" hello")).toBe(false);
            expect(isNullOrEmpty("hello ")).toBe(false);
            expect(isNullOrEmpty(" hello ")).toBe(false);
        });

    });

    describe("isLetter", () => {

        it("should return false for null or undefined", () => {
            expect(isLetter(null)).toBe(false);
            expect(isLetter(undefined)).toBe(false);
        });

        it("should return false for empty string", () => {
            expect(isLetter("")).toBe(false);
        });

        it("should return false for whitespace string", () => {

            expect(isLetter(" ")).toBe(false);
            expect(isLetter("  ")).toBe(false);
            expect(isLetter(" \t ")).toBe(false);
            expect(isLetter(" \t \n ")).toBe(false);
        });

        it("should return false for non-letter string", () => {
            expect(isLetter("ab")).toBe(false);
            expect(isLetter("ca")).toBe(false);
            expect(isLetter("5")).toBe(false);
            expect(isLetter("1")).toBe(false);
            expect(isLetter("%")).toBe(false);
            expect(isLetter("&")).toBe(false);
            expect(isLetter("´")).toBe(false);
            expect(isLetter("º")).toBe(false);
        });

        it("should return true for letter string", () => {
            expect(isLetter("a")).toBe(true);
            expect(isLetter("b")).toBe(true);
            expect(isLetter("c")).toBe(true);
        });

    });

    describe("isNumber", () => {

        it("should return false for null or undefined", () => {
            expect(isNumber(null)).toBe(false);
            expect(isNumber(undefined)).toBe(false);
        });

        it("should return false for empty string", () => {
            expect(isNumber("")).toBe(false);
        });

        it("should return false for whitespace string", () => {

            expect(isNumber(" ")).toBe(false);
            expect(isNumber("  ")).toBe(false);
            expect(isNumber(" \t ")).toBe(false);
            expect(isNumber(" \t \n ")).toBe(false);
        });

        it("should return false for non-number string", () => {
            expect(isNumber("ab")).toBe(false);
            expect(isNumber("ca")).toBe(false);
            expect(isNumber("a5")).toBe(false);
            expect(isNumber("1a")).toBe(false);
            expect(isNumber("%")).toBe(false);
            expect(isNumber("&")).toBe(false);
            expect(isNumber("´")).toBe(false);
            expect(isNumber("º")).toBe(false);
            expect(isNumber("12")).toBe(false);
            expect(isNumber("34")).toBe(false);
        });

        it("should return true for number string", () => {
            expect(isNumber("1")).toBe(true);
            expect(isNumber("2")).toBe(true);
            expect(isNumber("3")).toBe(true);
            expect(isNumber("4")).toBe(true);
            expect(isNumber("5")).toBe(true);
            expect(isNumber("6")).toBe(true);
            expect(isNumber("7")).toBe(true);
            expect(isNumber("8")).toBe(true);
            expect(isNumber("9")).toBe(true);
            expect(isNumber("0")).toBe(true);
        });
    });

    describe("isLetterOrNumber", () => {

        it("should return false for null or undefined", () => {
            expect(isLetterOrNumber(null)).toBe(false);
            expect(isLetterOrNumber(undefined)).toBe(false);
        });

        it("should return false for empty string", () => {
            expect(isLetterOrNumber("")).toBe(false);
        });

        it("should return false for whitespace string", () => {

            expect(isLetterOrNumber(" ")).toBe(false);
            expect(isLetterOrNumber("  ")).toBe(false);
            expect(isLetterOrNumber(" \t ")).toBe(false);
            expect(isLetterOrNumber(" \t \n ")).toBe(false);
        });

        it("should return false for non-letter or non-number string", () => {
            expect(isLetterOrNumber("ab")).toBe(false);
            expect(isLetterOrNumber("ca")).toBe(false);
            expect(isLetterOrNumber("a5")).toBe(false);
            expect(isLetterOrNumber("1a")).toBe(false);
            expect(isLetterOrNumber("%")).toBe(false);
            expect(isLetterOrNumber("&")).toBe(false);
            expect(isLetterOrNumber("´")).toBe(false);
            expect(isLetterOrNumber("º")).toBe(false);
        });

        it("should return true for letter or number string", () => {
            expect(isLetterOrNumber("1")).toBe(true);
            expect(isLetterOrNumber("2")).toBe(true);
            expect(isLetterOrNumber("3")).toBe(true);
            expect(isLetterOrNumber("4")).toBe(true);
            expect(isLetterOrNumber("5")).toBe(true);
            expect(isLetterOrNumber("6")).toBe(true);
            expect(isLetterOrNumber("7")).toBe(true);
            expect(isLetterOrNumber("8")).toBe(true);
            expect(isLetterOrNumber("9")).toBe(true);
            expect(isLetterOrNumber("0")).toBe(true);
            expect(isLetterOrNumber("a")).toBe(true);
            expect(isLetterOrNumber("b")).toBe(true);
            expect(isLetterOrNumber("c")).toBe(true);
        });
    });

});
