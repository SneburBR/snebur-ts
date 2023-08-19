import { describe, expect, it } from "vitest";
import { FormattingType, format, formatCpf, formatCnpj } from "../../src/util/format";

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

describe("formatCnpj", () => {

    it("should be empty", () => {
        expect(formatCnpj("")).toBe("");
        expect(formatCnpj(null)).toBe("");
        expect(formatCnpj(undefined)).toBe("");
    });

    it("should format cnpj", () => {

        expect(formatCnpj(" 123 ")).toBe("12.3");
        expect(formatCnpj("123")).toBe("12.3");
        expect(formatCnpj("1234")).toBe("12.34"); 
        expect(formatCnpj("12345")).toBe("12.345");
        expect(formatCnpj("123456")).toBe("12.345.6");
        expect(formatCnpj("1234567")).toBe("12.345.67");
        expect(formatCnpj("12345678")).toBe("12.345.678");
        expect(formatCnpj("123456789")).toBe("12.345.678/9");
        expect(formatCnpj("1234567890")).toBe("12.345.678/90");
        expect(formatCnpj("12345678901")).toBe("12.345.678/901");
        expect(formatCnpj("123456789012")).toBe("12.345.678/9012");
        expect(formatCnpj("1234567890123")).toBe("12.345.678/9012-3");
        expect(formatCnpj("12345678901234")).toBe("12.345.678/9012-34");
        expect(formatCnpj("123456789012345")).toBe("12.345.678/9012-34");
        expect(formatCnpj("1234567890123456")).toBe("12.345.678/9012-34");
        expect(formatCnpj("12345678901234567")).toBe("12.345.678/9012-34");
        expect(formatCnpj("12 345678901234567 ")).toBe("12.345.678/9012-34");

    });
});
