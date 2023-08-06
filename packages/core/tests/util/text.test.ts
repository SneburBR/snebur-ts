import {
    concat, specialConcat, isNullOrWhiteSpace, countLines,
    countWords, countOccurrences, getLines
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
});