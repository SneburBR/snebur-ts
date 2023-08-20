import { describe, expect, it } from "vitest";
import { normalizeNumber, normalizeDate } from "../../src/util/normalize";
import { getMonthDays } from "../../src/util/date";

describe("NormalizeUtil", () => {

    describe("normalizeNumber", () => {

        it("should return an empty string if the input is null or undefined", () => {
            expect(normalizeNumber("")).toBe("");
            expect(normalizeNumber(null)).toBe("");
            expect(normalizeNumber(undefined)).toBe("");
            expect(normalizeNumber(true as any)).toBe("");
            expect(normalizeNumber(false as any)).toBe("");
            expect(normalizeNumber({} as any)).toBe("");
            expect(normalizeNumber([] as any)).toBe("");
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

    describe("normalizeDate", () => {

        it("should return an empty string if the input is null or undefined", () => {
            expect(normalizeDate("")).toBe("");
            expect(normalizeDate(null)).toBe("");
            expect(normalizeDate(undefined)).toBe("");
            expect(normalizeDate(true as any)).toBe("");
            expect(normalizeDate(false as any)).toBe("");
            expect(normalizeDate({} as any)).toBe("");
            expect(normalizeDate([] as any)).toBe("");
        });

        it("should return an empty string if the input is not a date or a string representation of a date", () => {
            expect(normalizeDate("hello")).toBe("");
            expect(normalizeDate("hello123")).toBe("");
        });

        //it("should return a string representation of the date if the input is a  date", () => {
        it("should return a string representation of the date if the input is a partial date string", () => {

            const currentDate = new Date();
            const day = currentDate.getDate();
            const month = currentDate.getMonth() + 1;
            const year = currentDate.getFullYear();
            const daysInFebruary = getMonthDays(year, 1);
             
            expect(normalizeDate("1")).toBe(`1/${month}/${year}`);
            expect(normalizeDate("2020")).toBe(`${day}/${month}/2020`);
            expect(normalizeDate("1/1")).toBe(`1/1/${year}`);
            expect(normalizeDate("1/1", true)).toBe(`01/01/${year}`);
            expect(normalizeDate("1/4")).toBe(`1/4/${year}`);
            expect(normalizeDate("31/2")).toBe(`${daysInFebruary}/2/${year}`);
            expect(normalizeDate("1/1/20")).toBe("1/1/2020");
            expect(normalizeDate("1/4/80")).toBe("1/4/1980");
            expect(normalizeDate("1/1/2020")).toBe("1/1/2020");
            expect(normalizeDate("1/4/1980")).toBe("1/4/1980");
            expect(normalizeDate("1/1/2020", true)).toBe("01/01/2020");
            expect(normalizeDate("1/4/1980", true)).toBe("01/04/1980");
        });

        it("should return a string representation of the date if the input is a date", () => {
            expect(normalizeDate(new Date(2020, 0, 1))).toBe("1/1/2020");
            expect(normalizeDate(new Date(2020, 0, 1), true)).toBe("01/01/2020");
            expect(normalizeDate(new Date(1980, 3, 1))).toBe("1/4/1980");
            expect(normalizeDate(new Date(1980, 3, 1), true)).toBe("01/04/1980");
        });
    });
});