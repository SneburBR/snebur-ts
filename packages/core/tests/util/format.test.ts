import { describe, expect, it } from "vitest";
import { FormattingType, format, formatCpf } from "../../src/util/format";

describe("formatCpf", () => {

    it("should be empty", () => {
        expect(formatCpf("")).toBe("");
        expect(formatCpf(null)).toBe("");
        expect(formatCpf(undefined)).toBe("");
    });

    it("should format cpf", () => {

        expect(formatCpf(" 123 ")).toBe("123");
        expect(formatCpf("123")).toBe("123");
        expect(formatCpf("1234")).toBe("123.4");
        expect(formatCpf("12345")).toBe("123.45");
        expect(formatCpf("123456")).toBe("123.456");
        expect(formatCpf("1234567")).toBe("123.456.7");
        expect(formatCpf("12345678")).toBe("123.456.78");
        expect(formatCpf("123456789")).toBe("123.456.789");
        expect(formatCpf("1234567890")).toBe("123.456.789-0");
        expect(formatCpf("123456 78901")).toBe("123.456.789-01");
        expect(formatCpf("12 3456789010 ")).toBe("123.456.789-01");

        expect(formatCpf("12345678901")).toBe("123.456.789-01");
        expect(formatCpf("123.456.789-01")).toBe("123.456.789-01");
        expect(formatCpf("123. 456. 789-01")).toBe("123.456.789-01");
        expect(format("12345678901", FormattingType.Cpf)).toBe("123.456.789-01");
    });

});