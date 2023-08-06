import { concat, specialConcat, isNullOrWhiteSpace, countLines } from "../../src/util/text";

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
            expect(specialConcat([" ", " ", ], ",")).toEqual(" , ");
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
});
