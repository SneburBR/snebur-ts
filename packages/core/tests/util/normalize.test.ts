import { describe, expect, it } from "vitest";
import { normalizeNumber } from "../../src/util/normalize";

describe("NormalizeUtil", () => {

    describe("normalizeNumber", () => {

        it("should return an empty string if the input is null or undefined", () => {
            expect(normalizeNumber("")).toBe("");
            expect(normalizeNumber(null)).toBe("");
            expect(normalizeNumber(undefined)).toBe("");
            expect(normalizeNumber(true as any)).toBe("");
            expect(normalizeNumber(false as any)).toBe("");
            expect(normalizeNumber({}as any)).toBe("");
            expect(normalizeNumber([]as any)).toBe("");
        });

        it("should return an empty string if the input is not a number or a string representation of a number", () => {
            expect(normalizeNumber("hello")).toBe("");
            expect(normalizeNumber("hello123")).toBe("123");
            expect(normalizeNumber("123hello")).toBe("123");
            expect(normalizeNumber("123hello123")).toBe("123123");
            expect(normalizeNumber("123.456.789")).toBe("123456.789");
            expect(normalizeNumber("123,456,789")).toBe("123456.789");
        });
    });
});