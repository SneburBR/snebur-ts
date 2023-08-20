import { describe, expect, it } from "vitest";
import { convertToDate } from "../../src/util/convert";

describe("ConvertUtil", () => {

    describe("convertToDate", () => {

        it("should return null if the input is null or undefined", () => {
            expect(convertToDate("")).toBeNull();
            expect(convertToDate(null)).toBeNull();
            expect(convertToDate(undefined)).toBeNull();
        });

        it("should return null if the input is not a date or a string representation of a date", () => {
            expect(convertToDate("hello")).toBeNull();
            expect(convertToDate("hello123")).toBeNull();
        });

        it("should throw an error if the input is a invalid input type", () => {
            expect(() => convertToDate(true as any)).toThrow();
            expect(() => convertToDate(false as any)).toThrow();
            expect(() => convertToDate({} as any)).toThrow();
            expect(() => convertToDate([] as any)).toThrow();
        });

        it("should return a date if the input is a date", () => {
            expect(convertToDate(new Date(2020, 0, 1))).toEqual(new Date(2020, 0, 1));
            expect(convertToDate(new Date(2020, 0, 1, 1, 1, 1))).toEqual(new Date(2020, 0, 1, 1, 1, 1));
        });

        it("should return a date if the input is a string representation of a date", () => {
            expect(convertToDate("1/1/2020")).toEqual(new Date(2020, 0, 1));
            expect(convertToDate("2020/1/1")).toEqual(new Date(2020, 0, 1));
         });
    });

});