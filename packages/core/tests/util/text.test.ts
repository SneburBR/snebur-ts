import {
    concat, specialConcat, countLines,
    countWords, countOccurrences, getLines, getWords, getOccurrences,
    getOnlyNumbers, getOnlyLetters, getOnlyLettersAndNumbers,
    isNullOrEmpty, isNullOrWhiteSpace, isLetter, isNumber, isLetterOrNumber,
    isWhiteSpace, isStartsWithNumber, isOnlyLetters, isOnlyNumbers, isOnlyLettersAndNumbers,
    isUpperCase, isLowerCase, isCapitalized, isCamelCase, isPascalCase, isSnakeCase, isKebabCase,
    removeSpecialChars, removeAccents, removerSpecialChars, removerAccentsAndSpecialChars,
    removeDiacritics, removeWhiteSpace, removeDoubleWhiteSpace,
    removeLeading, removeTrailing, removeLeadingAndTrailing, SpecialCharsOptions,
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
            expect(specialConcat(null)).toEqual("");
            expect(specialConcat(undefined)).toEqual("");
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
            expect(getOnlyNumbers(text, SpecialCharsOptions.Brackets)).toEqual("{}<>[]12300123(5)100000");
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

            expect(getOnlyNumbers(text, options)).toEqual("{}, <>  [] + 123,00 * -123 + (5%)  1.000,00");
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
            expect(getOnlyLetters(text, SpecialCharsOptions.Brackets)).toEqual("{Hello}<hello>[World]()R");
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

            expect(getOnlyLetters(text, options)).toEqual("{Hello}, <hello>  [World] + , * - + (%) R .,");
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
            expect(getOnlyLettersAndNumbers(text, SpecialCharsOptions.Brackets)).toEqual("{Hello}<hello>[World]12300123(5)R100000");
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

    describe("isWhiteSpace", () => {

        it("should return false for null or undefined", () => {
            expect(isWhiteSpace(null)).toBe(false);
            expect(isWhiteSpace(undefined)).toBe(false);
        });

        it("should return false for empty string", () => {
            expect(isWhiteSpace("")).toBe(false);
        });

        it("should return false for non-whitespace string", () => {
            expect(isWhiteSpace("hello")).toBe(false);
            expect(isWhiteSpace(" hello")).toBe(false);
            expect(isWhiteSpace("hello ")).toBe(false);
            expect(isWhiteSpace(" hello ")).toBe(false);
        });

        it("should return true for whitespace string", () => {
            expect(isWhiteSpace(" ")).toBe(true);
            expect(isWhiteSpace("\t")).toBe(true);
            expect(isWhiteSpace("\n")).toBe(true);
            expect(isWhiteSpace("\r\n")).toBe(true);
            expect(isWhiteSpace("\f")).toBe(true);
            expect(isWhiteSpace("\v")).toBe(true);
        });
    });

    describe("isStartsWithNumber", () => {

        it("should return false for null or undefined", () => {
            expect(isStartsWithNumber(null)).toBe(false);
            expect(isStartsWithNumber(undefined)).toBe(false);
        });

        it("should return false for empty string", () => {
            expect(isStartsWithNumber("")).toBe(false);
        });

        it("should return false for whitespace string", () => {

            expect(isStartsWithNumber(" ")).toBe(false);
            expect(isStartsWithNumber("  ")).toBe(false);
            expect(isStartsWithNumber(" \t ")).toBe(false);
            expect(isStartsWithNumber(" \t \n ")).toBe(false);
        });

        it("should return false for non-number string", () => {
            expect(isStartsWithNumber("ab")).toBe(false);
            expect(isStartsWithNumber("ca")).toBe(false);
            expect(isStartsWithNumber("a5")).toBe(false);
            expect(isStartsWithNumber("%")).toBe(false);
            expect(isStartsWithNumber("&")).toBe(false);
            expect(isStartsWithNumber("´")).toBe(false);
            expect(isStartsWithNumber("º")).toBe(false);
        });

        it("should return true for number string", () => {
            expect(isStartsWithNumber("1")).toBe(true);
            expect(isStartsWithNumber("2Hello")).toBe(true);
            expect(isStartsWithNumber("3Hello world")).toBe(true);
            expect(isStartsWithNumber("4.")).toBe(true);
            expect(isStartsWithNumber("5%")).toBe(true);
            expect(isStartsWithNumber("6% &")).toBe(true);
            expect(isStartsWithNumber("7 hello")).toBe(true);
            expect(isStartsWithNumber("8, 0 hello world")).toBe(true);
            expect(isStartsWithNumber("9")).toBe(true);
            expect(isStartsWithNumber("0")).toBe(true);
        });

    });

    describe("isOnlyLetters", () => {

        it("should return false for null or undefined", () => {
            expect(isOnlyLetters(null)).toBe(false);
            expect(isOnlyLetters(undefined)).toBe(false);
        });

        it("should return false for empty string", () => {
            expect(isOnlyLetters("")).toBe(false);
        });

        it("should return false for whitespace string", () => {

            expect(isOnlyLetters(" ")).toBe(false);
            expect(isOnlyLetters("  ")).toBe(false);
            expect(isOnlyLetters(" \t ")).toBe(false);
            expect(isOnlyLetters(" \t \n ")).toBe(false);
        });

        it("should return false for non-letter string", () => {
            expect(isOnlyLetters("1")).toBe(false);
            expect(isOnlyLetters("%")).toBe(false);
            expect(isOnlyLetters("2  hello")).toBe(false);
            expect(isOnlyLetters("3")).toBe(false);
            expect(isOnlyLetters("1a  hello")).toBe(false);
            expect(isOnlyLetters("1%  hello")).toBe(false);
            expect(isOnlyLetters(" hello 1&")).toBe(false);
            expect(isOnlyLetters(" hello 1´")).toBe(false);
            expect(isOnlyLetters(" hello 1º")).toBe(false);
            expect(isOnlyLetters("%  hello")).toBe(false);
            expect(isOnlyLetters("&  hello")).toBe(false);
            expect(isOnlyLetters("´  hello")).toBe(false);
            expect(isOnlyLetters("º  hello")).toBe(false);
        });

        it("should return true for letter string", () => {
            expect(isOnlyLetters("HelloWorld")).toBe(true);
            expect(isOnlyLetters("a")).toBe(true);

        });

        it("should return true for letter string and special chars ", () => {
            expect(isOnlyLetters("Hello World", SpecialCharsOptions.WhiteSpaces)).toBe(true);
            expect(isOnlyLetters("Hello.World", SpecialCharsOptions.Punctuations)).toBe(true);
            expect(isOnlyLetters("Hello World.", SpecialCharsOptions.WhiteSpaces | SpecialCharsOptions.Punctuations)).toBe(true);
            expect(isOnlyLetters("Hello World, world!\r\n world?", SpecialCharsOptions.WhiteSpaces | SpecialCharsOptions.Punctuations)).toBe(true);
        });
    });

    describe("isOnlyNumbers", () => {

        it("should return false for null or undefined", () => {
            expect(isOnlyNumbers(null)).toBe(false);
            expect(isOnlyNumbers(undefined)).toBe(false);
        });

        it("should return false for empty string", () => {
            expect(isOnlyNumbers("")).toBe(false);
        });

        it("should return false for whitespace string", () => {

            expect(isOnlyNumbers(" ")).toBe(false);
            expect(isOnlyNumbers("  ")).toBe(false);
            expect(isOnlyNumbers(" \t ")).toBe(false);
            expect(isOnlyNumbers(" \t \n ")).toBe(false);
        });

        it("should return false for non-number string", () => {
            expect(isOnlyNumbers("a")).toBe(false);
            expect(isOnlyNumbers("%")).toBe(false);
            expect(isOnlyNumbers("2  hello 1234")).toBe(false);
            expect(isOnlyNumbers("1a  1234")).toBe(false);
            expect(isOnlyNumbers("1%  1234")).toBe(false);
            expect(isOnlyNumbers(" 1234 1&")).toBe(false);
            expect(isOnlyNumbers(" 1234 1´")).toBe(false);
            expect(isOnlyNumbers(" 1234 1º")).toBe(false);
            expect(isOnlyNumbers("%  1234")).toBe(false);
            expect(isOnlyNumbers("&  1234")).toBe(false);
            expect(isOnlyNumbers("´  1234")).toBe(false);
            expect(isOnlyNumbers("º  1234")).toBe(false);
        });

        it("should return true for numbers string", () => {
            expect(isOnlyNumbers("1234567890")).toBe(true);
            expect(isOnlyNumbers("12345 67890", SpecialCharsOptions.WhiteSpaces)).toBe(true);
            expect(isOnlyNumbers("12345.67890", SpecialCharsOptions.Punctuations)).toBe(true);
            expect(isOnlyNumbers("12345 67890.", SpecialCharsOptions.WhiteSpaces | SpecialCharsOptions.Punctuations)).toBe(true);
            expect(isOnlyNumbers("12345, \r\n67890?", SpecialCharsOptions.WhiteSpaces | SpecialCharsOptions.Punctuations)).toBe(true);
        });
    });

    describe("isOnlyLettersAndNumbers", () => {

        it("should return false for null or undefined", () => {
            expect(isOnlyLettersAndNumbers(null)).toBe(false);
            expect(isOnlyLettersAndNumbers(undefined)).toBe(false);
        });

        it("should return false for empty string", () => {
            expect(isOnlyLettersAndNumbers("")).toBe(false);
        });

        it("should return false for whitespace string", () => {

            expect(isOnlyLettersAndNumbers(" ")).toBe(false);
            expect(isOnlyLettersAndNumbers("  ")).toBe(false);
            expect(isOnlyLettersAndNumbers(" \t ")).toBe(false);
            expect(isOnlyLettersAndNumbers(" \t \n ")).toBe(false);
        });

        it("should return false for non-number string", () => {
            expect(isOnlyLettersAndNumbers("%")).toBe(false);
            expect(isOnlyLettersAndNumbers("2  hello 1234")).toBe(false);
            expect(isOnlyLettersAndNumbers("1%  1234")).toBe(false);
            expect(isOnlyLettersAndNumbers(" 1234 1&")).toBe(false);
            expect(isOnlyLettersAndNumbers(" 1234 1´")).toBe(false);
            expect(isOnlyLettersAndNumbers(" 1234 1º")).toBe(false);
            expect(isOnlyLettersAndNumbers("%  1234")).toBe(false);
            expect(isOnlyLettersAndNumbers("&  1234")).toBe(false);
            expect(isOnlyLettersAndNumbers("´  1234")).toBe(false);
            expect(isOnlyLettersAndNumbers("º  1234")).toBe(false);
        });

        it("should return true for numbers string", () => {
            expect(isOnlyLettersAndNumbers("1234567890")).toBe(true);
            expect(isOnlyLettersAndNumbers("12345 67890", SpecialCharsOptions.WhiteSpaces)).toBe(true);
            expect(isOnlyLettersAndNumbers("12345.67890", SpecialCharsOptions.Punctuations)).toBe(true);
            expect(isOnlyLettersAndNumbers("12345 67890.", SpecialCharsOptions.WhiteSpaces | SpecialCharsOptions.Punctuations)).toBe(true);
            expect(isOnlyLettersAndNumbers("12345, \r\n67890?", SpecialCharsOptions.WhiteSpaces | SpecialCharsOptions.Punctuations)).toBe(true);
        });

        it("should return true for letters string and special chars ", () => {
            expect(isOnlyLettersAndNumbers("Hello World", SpecialCharsOptions.WhiteSpaces)).toBe(true);
            expect(isOnlyLettersAndNumbers("Hello.World", SpecialCharsOptions.Punctuations)).toBe(true);
            expect(isOnlyLettersAndNumbers("Hello World.", SpecialCharsOptions.WhiteSpaces | SpecialCharsOptions.Punctuations)).toBe(true);
            expect(isOnlyLettersAndNumbers("Hello World, world!\r\n world?", SpecialCharsOptions.WhiteSpaces | SpecialCharsOptions.Punctuations)).toBe(true);
        });

        it("should return true for letters and numbers string and special chars ", () => {

            expect(isOnlyLettersAndNumbers("Hello World 123", SpecialCharsOptions.WhiteSpaces)).toBe(true);
            expect(isOnlyLettersAndNumbers("Hello.World,123", SpecialCharsOptions.Punctuations)).toBe(true);
            expect(isOnlyLettersAndNumbers("Hello World. 123", SpecialCharsOptions.WhiteSpaces | SpecialCharsOptions.Punctuations)).toBe(true);
            expect(isOnlyLettersAndNumbers("Hello World, world!\r\n world? 123", SpecialCharsOptions.WhiteSpaces | SpecialCharsOptions.Punctuations)).toBe(true);
        });
    });

    describe("isUpperCase", () => {

        it("should return false for null or undefined", () => {
            expect(isUpperCase(null)).toBe(false);
            expect(isUpperCase(undefined)).toBe(false);
        });

        it("should return false for empty string", () => {
            expect(isUpperCase("")).toBe(false);
        });

        it("should return false for whitespace string", () => {
            expect(isUpperCase(" ")).toBe(false);
            expect(isUpperCase("  ")).toBe(false);
            expect(isUpperCase(" \t ")).toBe(false);
            expect(isUpperCase(" \t \n ")).toBe(false);
        });

        it("should return false for non-uppercase string", () => {
            expect(isUpperCase("a")).toBe(false);
            expect(isUpperCase("Aa")).toBe(false);
            expect(isUpperCase("aAAAAA")).toBe(false);
            expect(isUpperCase("AAAAa")).toBe(false);
        });

        it("should return true for uppercase string", () => {
            expect(isUpperCase("A")).toBe(true);
            expect(isUpperCase("AA")).toBe(true);
            expect(isUpperCase("AAA")).toBe(true);
            expect(isUpperCase("AAAA")).toBe(true);
            expect(isUpperCase("AAAA BBB")).toBe(true);
        });
    });

    describe("isLowerCase", () => {

        it("should return false for null or undefined", () => {
            expect(isLowerCase(null)).toBe(false);
            expect(isLowerCase(undefined)).toBe(false);
        });

        it("should return false for empty string", () => {
            expect(isLowerCase("")).toBe(false);
        });

        it("should return false for whitespace string", () => {
            expect(isLowerCase(" ")).toBe(false);
            expect(isLowerCase("  ")).toBe(false);
            expect(isLowerCase(" \t ")).toBe(false);
            expect(isLowerCase(" \t \n ")).toBe(false);
        });

        it("should return false for non-lowercase string", () => {
            expect(isLowerCase("A")).toBe(false);
            expect(isLowerCase("Aa")).toBe(false);
            expect(isLowerCase("AAAAA")).toBe(false);
            expect(isLowerCase("aaaaA")).toBe(false);
        });

        it("should return true for lowercase string", () => {
            expect(isLowerCase("a")).toBe(true);
            expect(isLowerCase("aa")).toBe(true);
            expect(isLowerCase("aaa")).toBe(true);
            expect(isLowerCase("aaaa")).toBe(true);
            expect(isLowerCase("aaaa bbb")).toBe(true);
        });

    });

    describe("isCapitalized", () => {

        it("should return false for null or undefined", () => {
            expect(isCapitalized(null)).toBe(false);
            expect(isCapitalized(undefined)).toBe(false);
        });

        it("should return false for empty string", () => {
            expect(isCapitalized("")).toBe(false);
        });

        it("should return false for whitespace string", () => {
            expect(isCapitalized(" ")).toBe(false);
            expect(isCapitalized("  ")).toBe(false);
            expect(isCapitalized(" \t ")).toBe(false);
            expect(isCapitalized(" \t \n ")).toBe(false);
        });

        it("should return false for non-capitalized string", () => {
            expect(isCapitalized("a")).toBe(false);
            expect(isCapitalized("aaaaa")).toBe(false);
            expect(isCapitalized("aaaaa bbbbb")).toBe(false);
        });

        it("should return true for capitalized string", () => {
            expect(isCapitalized("A")).toBe(true);
            expect(isCapitalized("Aa")).toBe(true);
            expect(isCapitalized("Aaaa")).toBe(true);
            expect(isCapitalized("Aaaa bbbbb")).toBe(true);
        });
    });

    describe("isCamelCase", () => {

        it("should return false for null or undefined", () => {
            expect(isCamelCase(null)).toBe(false);
            expect(isCamelCase(undefined)).toBe(false);
        });

        it("should return false for empty string", () => {
            expect(isCamelCase("")).toBe(false);
        });

        it("should return false for whitespace string", () => {
            expect(isCamelCase(" ")).toBe(false);
            expect(isCamelCase("  ")).toBe(false);
            expect(isCamelCase(" \t ")).toBe(false);
            expect(isCamelCase(" \t \n ")).toBe(false);
        });

        it("should return false for non-camelCase string", () => {
            expect(isCamelCase("Aa")).toBe(false);
            expect(isCamelCase("Aaaaaa")).toBe(false);
            expect(isCamelCase("aaaaa bbbbb")).toBe(false);
            expect(isCamelCase("Aaaa bbbbb")).toBe(false);
        });

        it("should return true for camelCase string", () => {
            expect(isCamelCase("a")).toBe(true);
            expect(isCamelCase("aaaaa")).toBe(true);
            expect(isCamelCase("aaaaaBbbbb")).toBe(true);
            expect(isCamelCase("aaaBbbbb")).toBe(true);
            expect(isCamelCase("_aaaBbbbb")).toBe(true);
        });

    });

    describe("isPascalCase", () => {

        it("should return false for null or undefined", () => {
            expect(isPascalCase(null)).toBe(false);
            expect(isPascalCase(undefined)).toBe(false);
        });

        it("should return false for empty string", () => {
            expect(isPascalCase("")).toBe(false);
        });

        it("should return false for whitespace string", () => {
            expect(isPascalCase(" ")).toBe(false);
            expect(isPascalCase("  ")).toBe(false);
            expect(isPascalCase(" \t ")).toBe(false);
            expect(isPascalCase(" \t \n ")).toBe(false);
        });

        it("should return false for non-pascalCase string", () => {
            expect(isPascalCase("a")).toBe(false);
            expect(isPascalCase("aaaaa")).toBe(false);
            expect(isPascalCase("aaaaa bbbbb")).toBe(false);
            expect(isPascalCase("aaaaaBbbbb")).toBe(false);
        });

        it("should return true for pascalCase string", () => {
            expect(isPascalCase("A")).toBe(true);
            expect(isPascalCase("Aaaaaa")).toBe(true);
            expect(isPascalCase("AaaaaBbbbb")).toBe(true);
            expect(isPascalCase("AaaaBbbbb")).toBe(true);
        });

    });

    describe("isSnakeCase", () => {

        it("should return false for null or undefined", () => {
            expect(isSnakeCase(null)).toBe(false);
            expect(isSnakeCase(undefined)).toBe(false);
        });

        it("should return false for empty string", () => {
            expect(isSnakeCase("")).toBe(false);
        });

        it("should return false for whitespace string", () => {
            expect(isSnakeCase(" ")).toBe(false);
            expect(isSnakeCase("  ")).toBe(false);
            expect(isSnakeCase(" \t ")).toBe(false);
            expect(isSnakeCase(" \t \n ")).toBe(false);
        });

        it("should return false for non-snakeCase string", () => {
            expect(isSnakeCase("aaaaa bbbbb")).toBe(false);
            expect(isSnakeCase("aaaaaBbbbb")).toBe(false);
            expect(isSnakeCase("aaaaa_bbbbb ")).toBe(false);
        });

        it("should return true for snakeCase string", () => {
            expect(isSnakeCase("a")).toBe(true);
            expect(isSnakeCase("aaaaa")).toBe(true);
            expect(isSnakeCase("aaaaa_bbbbb")).toBe(true);
            expect(isSnakeCase("aaaaa_bbbbb")).toBe(true);
            expect(isSnakeCase("aaaaa_bbbbb_aa")).toBe(true);
        });

    });

    describe("isKebabCase", () => {

        it("should return false for null or undefined", () => {
            expect(isKebabCase(null)).toBe(false);
            expect(isKebabCase(undefined)).toBe(false);
        });

        it("should return false for empty string", () => {
            expect(isKebabCase("")).toBe(false);
        });

        it("should return false for whitespace string", () => {
            expect(isKebabCase(" ")).toBe(false);
            expect(isKebabCase("  ")).toBe(false);
            expect(isKebabCase(" \t ")).toBe(false);
            expect(isKebabCase(" \t \n ")).toBe(false);
        });

        it("should return false for non-kebabCase string", () => {
            expect(isKebabCase("aaaaa bbbbb")).toBe(false);
            expect(isKebabCase("aaaaaBbbbb")).toBe(false);
            expect(isKebabCase("aaaaa-bbbbb ")).toBe(false);
        });

        it("should return true for kebabCase string", () => {
            expect(isKebabCase("a")).toBe(true);
            expect(isKebabCase("aaaaa")).toBe(true);
            expect(isKebabCase("aaaaa-bbbbb")).toBe(true);
            expect(isKebabCase("aaaaa-bbbbb")).toBe(true);
            expect(isKebabCase("aaaaa-bbbbb-aa")).toBe(true);
        });
    });

    describe("removeSpecialChars", () => {

        it("should return null for null or undefined", () => {
            expect(removeSpecialChars(null)).toBe("");
            expect(removeSpecialChars(undefined)).toBe("");
        });

        it("should return empty string for empty string", () => {
            expect(removeSpecialChars("")).toBe("");
        });

        it("should return string without special chars", () => {
            expect(removeSpecialChars("a")).toBe("a");
            expect(removeSpecialChars("a.", SpecialCharsOptions.Punctuations)).toBe("a");
            expect(removeSpecialChars("a!b", SpecialCharsOptions.Punctuations)).toBe("ab");
            expect(removeSpecialChars("a!b?", SpecialCharsOptions.Punctuations)).toBe("ab");
            expect(removeSpecialChars("(ab)", SpecialCharsOptions.Brackets)).toBe("ab");
            expect(removeSpecialChars("{(ab)}", SpecialCharsOptions.Brackets)).toBe("ab");
            expect(removeSpecialChars("<{(ab)}>", SpecialCharsOptions.Brackets)).toBe("ab");
            expect(removeSpecialChars("<{(ab)}> ?.a", SpecialCharsOptions.Brackets | SpecialCharsOptions.Punctuations | SpecialCharsOptions.WhiteSpaces)).toBe("aba");
            expect(removeSpecialChars("<{(ab)}> ?.a", SpecialCharsOptions.Brackets | SpecialCharsOptions.Punctuations)).toBe("ab a");
        });
    });

    describe("removeAccents", () => {

        it("should return null for null or undefined", () => {
            expect(removeAccents(null)).toBe("");
            expect(removeAccents(undefined)).toBe("");
        });

        it("should return empty string for empty string", () => {
            expect(removeAccents("")).toBe("");
        });

        it("should return string without accents", () => {
            expect(removeAccents("á")).toBe("a");
            expect(removeAccents("à")).toBe("a");
            expect(removeAccents("â")).toBe("a");
            expect(removeAccents("é")).toBe("e");
            expect(removeAccents("è")).toBe("e");
            expect(removeAccents("ê")).toBe("e");
            expect(removeAccents("î")).toBe("i");
            expect(removeAccents("ï")).toBe("i");
            expect(removeAccents("ô")).toBe("o");
            expect(removeAccents("ù")).toBe("u");
            expect(removeAccents("û")).toBe("u");
            expect(removeAccents("ü")).toBe("u");
            expect(removeAccents("ç")).toBe("c");
            expect(removeAccents("À")).toBe("A");
            expect(removeAccents("Â")).toBe("A");
            expect(removeAccents("É")).toBe("E");
            expect(removeAccents("È")).toBe("E");
            expect(removeAccents("Ê")).toBe("E");
            expect(removeAccents("Î")).toBe("I");
            expect(removeAccents("Ï")).toBe("I");
            expect(removeAccents("Ô")).toBe("O");
            expect(removeAccents("Ù")).toBe("U");
            expect(removeAccents("Û")).toBe("U");
            expect(removeAccents("Ü")).toBe("U");
            expect(removeAccents("Ç")).toBe("C");
            expect(removeAccents("àáã")).toBe("aaa");
            expect(removeAccents("àáãâ èéêë")).toBe("aaaa eeee");
            expect(removeAccents("ÀÁÃÂ ÈÉÊË")).toBe("AAAA EEEE");
        });
    });

    describe("removerSpecialChars", () => {

        it("should return null for null or undefined", () => {
            expect(removerSpecialChars(null)).toBe("");
            expect(removerSpecialChars(undefined)).toBe("");
        });

        it("should return empty string for empty string", () => {
            expect(removerSpecialChars("")).toBe("");
        });

        it("should return string without  special chars", () => {
            expect(removerSpecialChars("a%", " ")).toBe("a ");
            expect(removerSpecialChars("a%&")).toBe("a");
            expect(removerSpecialChars("a, a")).toBe("a, a");
            expect(removerSpecialChars("a: a")).toBe("a a");
        });
    });

    describe("removerAccentsAndSpecialChars", () => {

        it("should return null for null or undefined", () => {
            expect(removerAccentsAndSpecialChars(null)).toBe("");
            expect(removerAccentsAndSpecialChars(undefined)).toBe("");
        });

        it("should return empty string for empty string", () => {
            expect(removerAccentsAndSpecialChars("")).toBe("");
        });

        it("should return string without accents and special chars", () => {
            expect(removerAccentsAndSpecialChars("á%", " ")).toBe("a ");
            expect(removerAccentsAndSpecialChars("a%&")).toBe("a");
            expect(removerAccentsAndSpecialChars("a, a")).toBe("a, a");
            expect(removerAccentsAndSpecialChars("a: a")).toBe("a a");
            expect(removerAccentsAndSpecialChars("a")).toBe("a");
            expect(removerAccentsAndSpecialChars("à%")).toBe("a");
            expect(removerAccentsAndSpecialChars("â%")).toBe("a");
            //expect(removerAccentsAndSpecialChars("é&é", " ")).toBe("e e");
            expect(removerAccentsAndSpecialChars("è")).toBe("e");
            expect(removerAccentsAndSpecialChars("ê")).toBe("e");
            expect(removerAccentsAndSpecialChars("î")).toBe("i");
            expect(removerAccentsAndSpecialChars("ï")).toBe("i");
            expect(removerAccentsAndSpecialChars("ô")).toBe("o");
            expect(removerAccentsAndSpecialChars("ù")).toBe("u");
            expect(removerAccentsAndSpecialChars("û")).toBe("u");
            expect(removerAccentsAndSpecialChars("ü")).toBe("u");
            expect(removerAccentsAndSpecialChars("ç")).toBe("c");
            expect(removerAccentsAndSpecialChars("À")).toBe("A");
            expect(removerAccentsAndSpecialChars("Â")).toBe("A");
            expect(removerAccentsAndSpecialChars("É")).toBe("E");
            expect(removerAccentsAndSpecialChars("È")).toBe("E");
            expect(removerAccentsAndSpecialChars("Ê")).toBe("E");
            expect(removerAccentsAndSpecialChars("Î")).toBe("I");
            expect(removerAccentsAndSpecialChars("Ï")).toBe("I");
        });
    });

    describe("removeDiacritics", () => {

        it("should return null for null or undefined", () => {
            expect(removeDiacritics(null)).toBe("");
            expect(removeDiacritics(undefined)).toBe("");
        });

        it("should return empty string for empty string", () => {
            expect(removeDiacritics("")).toBe("");
        });

        it("should return string without accents and special chars", () => {
            expect(removeDiacritics("á")).toBe("a");
            expect(removeDiacritics("à")).toBe("a");
            expect(removeDiacritics("â")).toBe("a");
            expect(removeDiacritics("é")).toBe("e");
            expect(removeDiacritics("è")).toBe("e");
            expect(removeDiacritics("ê")).toBe("e");
            expect(removeDiacritics("î")).toBe("i");
            expect(removeDiacritics("ï")).toBe("i");
            expect(removeDiacritics("ô")).toBe("o");
            expect(removeDiacritics("ù")).toBe("u");
            expect(removeDiacritics("û")).toBe("u");
            expect(removeDiacritics("ü")).toBe("u");
            expect(removeDiacritics("ç")).toBe("c");
            expect(removeDiacritics("À")).toBe("A");
            expect(removeDiacritics("Â")).toBe("A");
            expect(removeDiacritics("É")).toBe("E");
            expect(removeDiacritics("È")).toBe("E");
            expect(removeDiacritics("Ê")).toBe("E");
            expect(removeDiacritics("Î")).toBe("I");
            expect(removeDiacritics("Ï")).toBe("I");
            expect(removeDiacritics("Ô")).toBe("O");
            expect(removeDiacritics("Ù")).toBe("U");
            expect(removeDiacritics("Û")).toBe("U");
            expect(removeDiacritics("Ü")).toBe("U");
            expect(removeDiacritics("Ç")).toBe("C");
            expect(removeDiacritics("àáã")).toBe("aaa");
            expect(removeDiacritics("àáãâ èéêë")).toBe("aaaa eeee");
            expect(removeDiacritics("ÀÁÃÂ ÈÉÊË")).toBe("AAAA EEEE");
        });
    });

    describe("removeWhiteSpace", () => {

        it("should return null for null or undefined", () => {
            expect(removeWhiteSpace(null)).toBe("");
            expect(removeWhiteSpace(undefined)).toBe("");
        });

        it("should return empty string for empty string", () => {
            expect(removeWhiteSpace("")).toBe("");
        });

        it("should return string without white spaces", () => {
            expect(removeWhiteSpace("a%")).toBe("a%");
            expect(removeWhiteSpace("a%&")).toBe("a%&");
            expect(removeWhiteSpace("a, a")).toBe("a,a");
            expect(removeWhiteSpace("a: a")).toBe("a:a");
            expect(removeWhiteSpace("a")).toBe("a");
            expect(removeWhiteSpace("a ")).toBe("a");
            expect(removeWhiteSpace(" a")).toBe("a");
            expect(removeWhiteSpace(" a ")).toBe("a");
            expect(removeWhiteSpace(" a b ")).toBe("ab");
        });
    });

    describe("removeDoubleWhiteSpace", () => {

        it("should return null for null or undefined", () => {
            expect(removeDoubleWhiteSpace(null)).toBe("");
            expect(removeDoubleWhiteSpace(undefined)).toBe("");
        });

        it("should return empty string for empty string", () => {
            expect(removeDoubleWhiteSpace("")).toBe("");
        });

        it("should return string without double white spaces", () => {
            expect(removeDoubleWhiteSpace("a%")).toBe("a%");
            expect(removeDoubleWhiteSpace("a%&")).toBe("a%&");
            expect(removeDoubleWhiteSpace("a, a")).toBe("a, a");
            expect(removeDoubleWhiteSpace("a: a")).toBe("a: a");
            expect(removeDoubleWhiteSpace("a")).toBe("a");
            expect(removeDoubleWhiteSpace("a ")).toBe("a ");
            expect(removeDoubleWhiteSpace(" a")).toBe(" a");
            expect(removeDoubleWhiteSpace(" a ")).toBe(" a ");
            expect(removeDoubleWhiteSpace(" a  b ")).toBe(" a b ");
        });

        it("should return string without double white spaces", () => {
            expect(removeDoubleWhiteSpace("a, \t a")).toBe("a, a");
            expect(removeDoubleWhiteSpace("a:   a")).toBe("a: a");
            expect(removeDoubleWhiteSpace("a \r\n   \ta")).toBe("a a");
            expect(removeDoubleWhiteSpace(" a \f \va ")).toBe(" a a ");
        });
    });

    describe("removeLeading", () => {

        it("should return null for null or undefined", () => {
            expect(removeLeading(null, "a")).toBe("");
            expect(removeLeading("", "a")).toBe("");
            expect(removeLeading(undefined, "a")).toBe("");
            expect(removeLeading(null, null)).toBe("");
            expect(removeLeading(undefined, undefined)).toBe("");
        });


        it("should return string without leading chars", () => {
            expect(removeLeading("/Hello World", "/")).toBe("Hello World");
            expect(removeLeading("//Hello World", "/")).toBe("/Hello World");
            expect(removeLeading("//Hello World", "/", true)).toBe("Hello World");
            expect(removeLeading("///Hello World", "/", true)).toBe("Hello World");
            expect(removeLeading("///Hello World", "/", false)).toBe("//Hello World");

            expect(removeLeading("\\Hello World", "\\")).toBe("Hello World");
            expect(removeLeading("\\\\Hello World", "\\")).toBe("\\Hello World");
            expect(removeLeading("\\\\Hello World", "\\", true)).toBe("Hello World");

            expect(removeLeading(".Hello World", ".")).toBe("Hello World");
            expect(removeLeading("..Hello World", ".")).toBe(".Hello World");
            expect(removeLeading("..Hello World", ".", true)).toBe("Hello World");
        });
    });

    describe("removeTrailing", () => {

        it("should return null for null or undefined", () => {
            expect(removeTrailing(null, "a")).toBe("");
            expect(removeTrailing("", "a")).toBe("");
            expect(removeTrailing(undefined, "a")).toBe("");
            expect(removeTrailing(null, null)).toBe("");
            expect(removeTrailing(undefined, undefined)).toBe("");
        });

        it("should return string without trailing chars", () => {
            expect(removeTrailing("Hello World/", "/")).toBe("Hello World");
            expect(removeTrailing("Hello World//", "/")).toBe("Hello World/");
            expect(removeTrailing("Hello World//", "/", true)).toBe("Hello World");
            expect(removeTrailing("Hello World///", "/", true)).toBe("Hello World");
            expect(removeTrailing("Hello World///", "/", false)).toBe("Hello World//");

            expect(removeTrailing("Hello World\\", "\\")).toBe("Hello World");
            expect(removeTrailing("Hello World\\\\", "\\")).toBe("Hello World\\");
            expect(removeTrailing("Hello World\\\\", "\\", true)).toBe("Hello World");

            expect(removeTrailing("Hello World.", ".")).toBe("Hello World");
            expect(removeTrailing("Hello World..", ".")).toBe("Hello World.");
            expect(removeTrailing("Hello World..", ".", true)).toBe("Hello World");
        });
    });

    describe("removeLeadingAndTrailing", () => {

        it("should return null for null or undefined", () => {
            expect(removeLeadingAndTrailing(null, "a")).toBe("");
            expect(removeLeadingAndTrailing("", "a")).toBe("");
            expect(removeLeadingAndTrailing(undefined, "a")).toBe("");
            expect(removeLeadingAndTrailing(null, null)).toBe("");
            expect(removeLeadingAndTrailing(undefined, undefined)).toBe("");
        });

        it("should return string without leading and trailing chars", () => {
            expect(removeLeadingAndTrailing("/Hello World/", "/")).toBe("Hello World");
            expect(removeLeadingAndTrailing("//Hello World//", "/")).toBe("/Hello World/");
            expect(removeLeadingAndTrailing("//Hello World//", "/", true)).toBe("Hello World");
            expect(removeLeadingAndTrailing("///Hello World///", "/", true)).toBe("Hello World");
            expect(removeLeadingAndTrailing("///Hello World///", "/", false)).toBe("//Hello World//");

            expect(removeLeadingAndTrailing("\\Hello World\\", "\\")).toBe("Hello World");
            expect(removeLeadingAndTrailing("\\\\Hello World\\\\", "\\")).toBe("\\Hello World\\");
            expect(removeLeadingAndTrailing("\\\\Hello World\\\\", "\\", true)).toBe("Hello World");

            expect(removeLeadingAndTrailing(".Hello World.", ".")).toBe("Hello World");
            expect(removeLeadingAndTrailing("..Hello World..", ".")).toBe(".Hello World.");
            expect(removeLeadingAndTrailing("..Hello World..", ".", true)).toBe("Hello World");
        });

    });
});