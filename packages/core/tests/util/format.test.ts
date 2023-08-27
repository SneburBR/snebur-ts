import { describe, expect, it } from "vitest";
import {
    FormattingType, format, formatBytes, formatCep, formatCnpj, formatCpf, formatCpfCnpj,
    formatDate, formatMask, formatMoney, formatMoneyWithPositiveSign, formatPhone,
    formatZeroPadding,
} from "../../src/util/format";
import { removeWhiteSpace } from "../../src/util/text";

describe("FormatUtil", () => {

    describe("format", () => {

        it("should be empty", () => {
            expect(format("", FormattingType.Cep)).toBe("");
            expect(format(null, FormattingType.Cep)).toBe("");
            expect(format(undefined, FormattingType.Cep)).toBe("");
        });

        it("should format bytes", () => {
            expect(format("0", FormattingType.Bytes)).toBe("0 bytes");
            expect(format("1", FormattingType.Bytes)).toBe("1 bytes");
            expect(format("1023", FormattingType.Bytes)).toBe("1023 bytes");
            expect(format("1024", FormattingType.Bytes)).toBe("1.0 KB");
        });

        it("should format cep", () => {
            expect(format("12345678", FormattingType.Cep)).toBe("12.345-678");
        });

        it("should format cpf", () => {
            expect(format("12345678901", FormattingType.Cpf)).toBe("123.456.789-01");
        });

        it("should format cnpj", () => {
            expect(format("12345678901234", FormattingType.Cnpj)).toBe("12.345.678/9012-34");
        });

        it("should format cpf/cnpj", () => {
            expect(format("12345678901", FormattingType.CpfCnpj)).toBe("123.456.789-01");
            expect(format("12345678901234", FormattingType.CpfCnpj)).toBe("12.345.678/9012-34");
        });

        it("should format phone", () => {
            expect(format("1234567890", FormattingType.Phone)).toBe("(12) 3456-7890");
            expect(format("12345678901", FormattingType.Phone)).toBe("(12) 34567-8901");
        });

        it("should format money", () => {
            expect(removeWhiteSpace(format("1234,194", FormattingType.Money))).toBe(removeWhiteSpace(`R$ 1.234,19`));
            expect(removeWhiteSpace(format("1234,195", FormattingType.Money))).toBe(removeWhiteSpace(`R$ 1.234,20`));
            expect(removeWhiteSpace(format("-1234,195", FormattingType.Money))).toBe(removeWhiteSpace(`-R$ 1.234,20`));
        });

        it("should format money with positive sign", () => {
            expect(removeWhiteSpace(format("1234,194", FormattingType.MoneyWithPositiveSign))).toBe(removeWhiteSpace(`+R$ 1.234,19`));
            expect(removeWhiteSpace(format("1234,195", FormattingType.MoneyWithPositiveSign))).toBe(removeWhiteSpace(`+R$ 1.234,20`));
            expect(removeWhiteSpace(format("-1234,195", FormattingType.MoneyWithPositiveSign))).toBe(removeWhiteSpace(`-R$ 1.234,20`));
        });

        it("should format date", () => {
            expect(format(new Date(), FormattingType.Date)).toBe(formatDate(new Date()));
        });

        it("should format number", () => {
            expect(format(1, "00")).toBe("01");
            expect(format(10, "00")).toBe("10");
            expect(format(100, "00")).toBe("100");
            expect(format(100, "0000")).toBe("0100");

            expect(format(1, "00.0")).toBe("01.0");
            expect(format(1, "00,0")).toBe("01,0");
            expect(format(1, "0,0")).toBe("1,0");
            expect(format(1, "000.0")).toBe("001.0");
            expect(format(1, "0.000.0")).toBe("0.001.0");
            expect(format(1, "0.000,0")).toBe("0.001,0");
            expect(format(1000, "0.000.000,00")).toBe("0.001.000,00");
        });

        it("should format text",()=>{
            expect(format("0", "Valor {00}")).toBe("Valor 00");
            expect(format("4236231870", "Telefone {Phone}")).toBe("Telefone (42) 3623-1870");
        });
    });

    describe("formatBytes", () => {

        it("should be empty", () => {
            expect(formatBytes("")).toBe("");
            expect(formatBytes(null)).toBe("");
            expect(formatBytes(undefined)).toBe("");
        });

        it("should format bytes", () => {
            expect(formatBytes(0)).toBe("0 bytes");
            expect(formatBytes(1)).toBe("1 bytes");
            expect(formatBytes(1023)).toBe("1023 bytes");
            expect(formatBytes(1024)).toBe("1.0 KB");
            expect(formatBytes(1025)).toBe("1.0 KB");
            expect(formatBytes(1500)).toBe("1.5 KB");
            expect(formatBytes(2060)).toBe("2.0 KB");
            expect(formatBytes(1024 * 1024)).toBe("1.0 MB");
            expect(formatBytes(1024 * 1024 * 1024)).toBe("1.0 GB");
            expect(formatBytes(1024 * 1024 * 1024 * 1024)).toBe("1.0 TB");
            expect(formatBytes(1024 * 1024 * 1024 * 1024 * 1024)).toBe("1024.0 TB");
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

    describe("formatDate", () => {

        it("should be empty", () => {
            expect(formatDate("")).toBe("");
            expect(formatDate(null)).toBe("");
            expect(formatDate(undefined)).toBe("");
        });

        it("should format date", () => {

            const currentDate = new Date();
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth() + 1;

            expect(formatDate("2020-01-01")).toBe("01/01/2020");
            expect(formatDate("2020-01-01 00:00:00")).toBe("01/01/2020");
            expect(formatDate("2018-1-1")).toBe("01/01/2018");
            expect(formatDate("2018.1.1")).toBe("01/01/2018");
            expect(formatDate("2018/1/1")).toBe("01/01/2018");
            expect(formatDate("2018/1/30")).toBe("30/01/2018");
            expect(formatDate("2018-1/1")).toBe("01/01/2018");
            expect(formatDate("1-1-2018")).toBe("01/01/2018");
            expect(formatDate("1/1/2018")).toBe("01/01/2018");
            expect(formatDate("30/1/2018")).toBe("30/01/2018");
            expect(formatDate("30/1-2018")).toBe("30/01/2018");
            expect(formatDate("30-1-2018")).toBe("30/01/2018");
            expect(formatDate("30.1.2018")).toBe("30/01/2018");
            expect(formatDate("01")).toBe(`01/${formatZeroPadding(month, 2)}/${year}`);

            expect(formatDate(new Date(2018, 0, 1))).toBe("01/01/2018");
            expect(formatDate(new Date(2018, 0, 30))).toBe("30/01/2018");
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
            expect(formatMask("1234", "##.(##.)-")).toBe("12.(34.)-");
            expect(formatMask("1234", "##.##.")).toBe("12.34.");
            expect(formatMask("1234", "+##.##-")).toBe("+12.34-");
            expect(formatMask("123", "##.##-")).toBe("12.3");
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

});
