import { describe, expect, it } from "vitest";
import { getMonthDays, isLeap } from "../../src/util/date";

describe("DateUtil", () => {

    describe("isLeap", () => {

        it("should return true if the year is a leap year", () => {
            expect(isLeap(2020)).toBe(true);
            expect(isLeap(2016)).toBe(true);
            expect(isLeap(2012)).toBe(true);
            expect(isLeap(2008)).toBe(true);
            expect(isLeap(2004)).toBe(true);
            expect(isLeap(2000)).toBe(true);
        });

        it("should return false if the year is not a leap year", () => {
            expect(isLeap(2021)).toBe(false);
            expect(isLeap(2017)).toBe(false);
            expect(isLeap(2013)).toBe(false);
            expect(isLeap(2009)).toBe(false);
            expect(isLeap(2005)).toBe(false);
            expect(isLeap(2001)).toBe(false);
        });
    });

    describe("getMonthDays", () => {

        it("should return the number of days in the month for a non-leap year", () => {
            expect(getMonthDays(2020, 0)).toBe(31);
            expect(getMonthDays(2020, 1)).toBe(29);
            expect(getMonthDays(2021, 1)).toBe(28);
            expect(getMonthDays(2020, 2)).toBe(31);
            expect(getMonthDays(2020, 3)).toBe(30);
            expect(getMonthDays(2020, 4)).toBe(31);
            expect(getMonthDays(2020, 5)).toBe(30);
            expect(getMonthDays(2020, 6)).toBe(31);
            expect(getMonthDays(2020, 7)).toBe(31);
            expect(getMonthDays(2020, 8)).toBe(30);
            expect(getMonthDays(2020, 9)).toBe(31);
            expect(getMonthDays(2020, 10)).toBe(30);
            expect(getMonthDays(2020, 11)).toBe(31);
        });
    });

});