import { describe, expect, it } from "vitest";
import { isString, isValidNumber } from "@snebur/core/src/util/validation";

describe("validation", () => {

  describe("isString", () => {
    it("should return true for a string value", () => {
      expect(isString("hello")).toBe(true);
    });

    it("should return false for a non-string value", () => {
      expect(isString(123)).toBe(false);
      expect(isString(true)).toBe(false);
      expect(isString({})).toBe(false);
      expect(isString([])).toBe(false);
      expect(isString(null)).toBe(false);
      expect(isString(undefined)).toBe(false);
    });
  });

  describe("isValidNumber", () => {
    it("should return true for a valid number value", () => {
      expect(isValidNumber(123)).toBe(true);
      expect(isValidNumber(0)).toBe(true);
      expect(isValidNumber(-123)).toBe(true);
      expect(isValidNumber(1.23)).toBe(true);
    });

    it("should return false for a non-number value", () => {
      expect(isValidNumber("123")).toBe(false);
      expect(isValidNumber(true)).toBe(false);
      expect(isValidNumber({})).toBe(false);
      expect(isValidNumber([])).toBe(false);
      expect(isValidNumber(null)).toBe(false);
      expect(isValidNumber(undefined)).toBe(false);
    });

    it("should return false for an invalid number value", () => {
      expect(isValidNumber(NaN)).toBe(false);
      expect(isValidNumber(Infinity)).toBe(false);
      expect(isValidNumber(-Infinity)).toBe(false);
    });
  });
});