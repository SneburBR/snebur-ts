import { describe, expect, it } from "vitest";
import {
    FormattingType, format, formatCpf, formatCnpj, formatCpfCnpj,
    formatCep, formatMask, formatMoney, formatMoneyWithPositiveSign, formatPhone,
} from "../../src/util/format";
import { removeWhiteSpace } from "../../src/util/text";

describe("FormatUtil", () => {

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
            expect(formatCnpj("12.345.678/9012-34")).toBe("12.345.678/9012-34");
            expect(format("12345678901234", FormattingType.Cnpj)).toBe("12.345.678/9012-34");
        });
    });

    describe("formatCpfCnpj", () => {

        it("should be empty", () => {
            expect(formatCpfCnpj("")).toBe("");
            expect(formatCpfCnpj(null)).toBe("");
            expect(formatCpfCnpj(undefined)).toBe("");
        });

        it("should format cpf", () => {
            expect(formatCpfCnpj(" 123 ")).toBe("123");
            expect(formatCpfCnpj("123")).toBe("123");
            expect(formatCpfCnpj("1234")).toBe("123.4");
            expect(formatCpfCnpj("12345678")).toBe("123.456.78");
            expect(formatCpfCnpj("123456789")).toBe("123.456.789");
            expect(formatCpfCnpj("1234567890")).toBe("123.456.789-0");
            expect(formatCpfCnpj("123456 78901")).toBe("123.456.789-01");
            expect(formatCpfCnpj("123.456.789-01")).toBe("123.456.789-01");
            expect(formatCpfCnpj("12345678901")).toBe("123.456.789-01");
            expect(format("12345678901", FormattingType.CpfCnpj)).toBe("123.456.789-01");
        });

        it("should format cnpj", () => {
            expect(formatCpfCnpj("123456789012")).toBe("12.345.678/9012");
            expect(formatCpfCnpj("1234567890123")).toBe("12.345.678/9012-3");
            expect(formatCpfCnpj("12345678901234")).toBe("12.345.678/9012-34");
            expect(formatCpfCnpj("123456789012345")).toBe("12.345.678/9012-34");
            expect(formatCpfCnpj("12.345.678/9012-34")).toBe("12.345.678/9012-34");
            expect(format("12345678901234", FormattingType.CpfCnpj)).toBe("12.345.678/9012-34");
        });
    });

    describe("formatCep", () => {

        it("should be empty", () => {
            expect(formatCep("")).toBe("");
            expect(formatCep(null)).toBe("");
            expect(formatCep(undefined)).toBe("");
        });

        it("should format cep", () => {
            expect(formatCep(" 123 ")).toBe("12.3");
            expect(formatCep("123")).toBe("12.3");
            expect(formatCep("1234")).toBe("12.34");
            expect(formatCep("12345")).toBe("12.345");
            expect(formatCep("123456")).toBe("12.345-6");
            expect(formatCep("1234567")).toBe("12.345-67");
            expect(formatCep("12345678")).toBe("12.345-678");
            expect(formatCep("123456789")).toBe("12.345-678");
            expect(format("12345678", FormattingType.Cep)).toBe("12.345-678");
        });
    });

    describe("formatPhone", () => {

        it("should be empty", () => {
            expect(formatPhone("")).toBe("");
            expect(formatPhone(null)).toBe("");
            expect(formatPhone(undefined)).toBe("");
        });

        it("should format phone", () => {
            expect(formatPhone(" 123 ")).toBe("(12) 3");
            expect(formatPhone("123")).toBe("(12) 3");
            expect(formatPhone("1234")).toBe("(12) 34");
            expect(formatPhone("12345")).toBe("(12) 345");
            expect(formatPhone("123456")).toBe("(12) 3456");
            expect(formatPhone("1234567")).toBe("(12) 3456-7");
            expect(formatPhone("12345678")).toBe("(12) 3456-78");
            expect(formatPhone("123456789")).toBe("(12) 3456-789");
            expect(formatPhone("1234567890")).toBe("(12) 3456-7890");
            expect(formatPhone("12345678901")).toBe("(12) 34567-8901");
            expect(formatPhone("(12) 34567-8901")).toBe("(12) 34567-8901");
            expect(format("12345678901", FormattingType.Phone)).toBe("(12) 34567-8901");
        });
    });

    describe("formatMask", () => {

        it("should be empty", () => {
            expect(formatMask("", "##.##")).toBe("");
            expect(formatMask(null, "##.##")).toBe("");
            expect(formatMask(undefined, "##.##")).toBe("");
        });

        it("should throw error", () => {
            expect(() => formatMask("123", null)).toThrow();
        });

        it("should format mask", () => {
            expect(formatMask("123", "##.##")).toBe("12.3");
            expect(formatMask("1234", "##.(##.)-", true)).toBe("12.(34.)-");
            expect(formatMask("1234", "##.##.", true)).toBe("12.34.");
            expect(formatMask("1234", "+##.##-", true)).toBe("+12.34-");
            expect(formatMask("123", "##.##-", true)).toBe("12.3");
            expect(formatMask("12345", "##.##")).toBe("12.34");
            expect(formatMask("123", "##-##")).toBe("12-3");
            expect(formatMask("1234", "##-##")).toBe("12-34");
            expect(formatMask("123", "(##)-(##)")).toBe("(12)-(3");
            expect(formatMask("1234", "(##)-(##)")).toBe("(12)-(34)");
        });

    });

    describe("formatMoney", () => {

        it("should be empty", () => {
            expect(formatMoney("")).toBe("");
            expect(formatMoney(null)).toBe("");
            expect(formatMoney(undefined)).toBe("");
        });

        it("should format money", () => {
            expect(removeWhiteSpace(formatMoney("1234"))).toBe(removeWhiteSpace(`R$ 1.234,00`));
            expect(removeWhiteSpace(formatMoney(1234))).toBe(removeWhiteSpace(`R$ 1.234,00`));
            expect(removeWhiteSpace(formatMoney(1234.111))).toBe(removeWhiteSpace(`R$ 1.234,11`));
            expect(removeWhiteSpace(formatMoney("1234,111"))).toBe(removeWhiteSpace(`R$ 1.234,11`));
            expect(removeWhiteSpace(formatMoney("1234.195"))).toBe(removeWhiteSpace(`R$ 1.234,20`));
            expect(removeWhiteSpace(formatMoney("1234.194"))).toBe(removeWhiteSpace(`R$ 1.234,19`));
            expect(removeWhiteSpace(formatMoney("1234,195"))).toBe(removeWhiteSpace(`R$ 1.234,20`));
            expect(removeWhiteSpace(formatMoney("1234,194"))).toBe(removeWhiteSpace(`R$ 1.234,19`));
            expect(removeWhiteSpace(formatMoney("-1234,194"))).toBe(removeWhiteSpace(`-R$ 1.234,19`));
            expect(removeWhiteSpace(formatMoney("1234,194"))).toBe(removeWhiteSpace(`R$ 1.234,19`));
            expect(removeWhiteSpace(formatMoney(1234.194))).toBe(removeWhiteSpace(`R$ 1.234,19`));
            expect(removeWhiteSpace(format("1234,194", FormattingType.Money))).toBe(removeWhiteSpace(`R$ 1.234,19`));
        });
    });

    describe("formatMoneyWithPositiveSign", () => {

        it("should be empty", () => {
            expect(formatMoneyWithPositiveSign("")).toBe("");
            expect(formatMoneyWithPositiveSign(null)).toBe("");
            expect(formatMoneyWithPositiveSign(undefined)).toBe("");
        });

        it("should format money with positive sign ", () => {
            expect(removeWhiteSpace(formatMoneyWithPositiveSign("1234"))).toBe(removeWhiteSpace(`+R$ 1.234,00`));
            expect(removeWhiteSpace(formatMoneyWithPositiveSign(1234))).toBe(removeWhiteSpace(`+R$ 1.234,00`));
            expect(removeWhiteSpace(formatMoneyWithPositiveSign("1234.111"))).toBe(removeWhiteSpace(`+R$ 1.234,11`));
            expect(removeWhiteSpace(formatMoneyWithPositiveSign("1234,111"))).toBe(removeWhiteSpace(`+R$ 1.234,11`));
            expect(removeWhiteSpace(formatMoneyWithPositiveSign("1234.195"))).toBe(removeWhiteSpace(`+R$ 1.234,20`));
            expect(removeWhiteSpace(formatMoneyWithPositiveSign("1234.194"))).toBe(removeWhiteSpace(`+R$ 1.234,19`));
            expect(removeWhiteSpace(formatMoneyWithPositiveSign("1234,195"))).toBe(removeWhiteSpace(`+R$ 1.234,20`));
            expect(removeWhiteSpace(formatMoneyWithPositiveSign("1234,194"))).toBe(removeWhiteSpace(`+R$ 1.234,19`));
            expect(removeWhiteSpace(formatMoneyWithPositiveSign("-1234,194"))).toBe(removeWhiteSpace(`-R$ 1.234,19`));
            expect(removeWhiteSpace(formatMoneyWithPositiveSign("1234,194"))).toBe(removeWhiteSpace(`+R$ 1.234,19`));
            expect(removeWhiteSpace(formatMoneyWithPositiveSign(1234.194))).toBe(removeWhiteSpace(`+R$ 1.234,19`));
        });
    });

});
