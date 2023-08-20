import { normalizeNumber } from "./normalize";
import { isNullOrEmpty, getOnlyNumbers } from "./text";

export enum FormattingType {
    Bytes = "bytes",
    Cep = "cep",
    Cnpj = "cnpj",
    Cpf = "cpf",
    CpfCnpj = "cpfcnpj",
    Date = "date",
    DateTime = "datetime",
    Decimal = "decimal",
    Dimension = "dimension",
    DimensionCm = "dimensioncm",
    DimensionPixels = "dimensionpixels",
    Integer = "integer",
    Margin = "margin",
    Money = "money",
    MoneyWithPositiveSign = "moneywithpositivesign",
    Percent = "percent",
    Phone = "phone",
    Time = "time",
}

/**
 * Formats a string or number based on the specified formatting type.
 * @param value The value to format.
 * @param type The type of formatting to apply.
 * @returns The formatted string.
 * @throws An error if the specified formatting type is not supported.
 */
export function format(value: string | number, type: FormattingType | string): string {

    if (isNullOrEmpty(value?.toString())) return "";

    switch (type) {
        case FormattingType.Cep:
            return formatCep(value);
        case FormattingType.Cnpj:
            return formatCnpj(value);
        case FormattingType.Cpf:
            return formatCpf(value);
        case FormattingType.CpfCnpj:
            return formatCpfCnpj(value);
        case FormattingType.Money:
            return formatMoney(value);
        case FormattingType.MoneyWithPositiveSign:
            return formatMoneyWithPositiveSign(value);
        case FormattingType.Phone:
            return formatPhone(value);
        default:
            throw new Error(`Formatting type ${type} not supported`);
    }
}

/**
 * Formats a Brazilian CPF (Cadastro de Pessoas Físicas) number by adding a mask.
 * @param value - The CPF number to be formatted. Can be a string or a number.
 * @returns The formatted CPF number as a string.
 */
export function formatCpf(value: string | number): string {

    if (isNullOrEmpty(value?.toString())) return "";
    return formatMask(value, "###.###.###-##");
}

/**
 * Formats a CNPJ (Brazilian company registration number) string or number into the format ##.###.###/####-##.
 * @param value The CNPJ value to be formatted.
 * @returns The formatted CNPJ string.
 */
export function formatCnpj(value: string | number): string {

    if (isNullOrEmpty(value?.toString())) return "";
    return formatMask(value, "##.###.###/####-##");
}

/**
 * Formats a Brazilian CPF or CNPJ number.
 * @param value The CPF or CNPJ number to be formatted.
 * @returns The formatted CPF or CNPJ number.
 */
export function formatCpfCnpj(value: string | number): string {

    if (isNullOrEmpty(value?.toString())) return "";
    const numbers = getOnlyNumbers(value.toString());

    if (numbers.toString().length <= 11)
        return formatCpf(numbers);

    return formatCnpj(numbers);
}

/**
 * Formats a Brazilian zip code (CEP) string or number to the format "#####-###".
 * @param value The value to be formatted.
 * @returns The formatted string.
 */
export function formatCep(value: string | number): string {

    if (isNullOrEmpty(value?.toString())) return "";
    return formatMask(value, "##.###-###");
}

/**
 * Formats a phone number string or number to a Brazilian phone number format.
 * @param value - The phone number to be formatted.
 * @returns The formatted phone number string.
 */
export function formatPhone(value: string | number): string {

    if (isNullOrEmpty(value?.toString())) return "";
    const numbers = getOnlyNumbers(value.toString());

    if (numbers.length <= 10)
        return formatMask(value, "(##) ####-####");

    return formatMask(value, "(##) #####-####");
}

/**
 * Formats a money value as a string using the specified options.
 * @param value The value to format as a string.
 * @param options The options to use when formatting the value.
 * @returns A string representation of the formatted money value.
 * @throws An error if the money value is invalid.
 */
export function formatMoney(value: string | number, options?: Intl.NumberFormatOptions): string {
    return formatMoneyInternal(value, false, options);
}

/**
 * Formats a number as a currency string with a positive sign.
 * @param value - The number to format.
 * @param options - The options to use when formatting the number.
 * @returns The formatted currency string with a positive sign.
 */
export function formatMoneyWithPositiveSign(value: string | number, options?: Intl.NumberFormatOptions): string {
    return formatMoneyInternal(value, true, options);
}

function formatMask(value: string | number, mask: string) {

    const numbers = getOnlyNumbers(value.toString());
    let result = "";
    let valueIndex = 0;
    for (let i = 0; i < mask.length; i++) {

        if (valueIndex >= numbers.length)
            break;
        if (mask[i] === "#") {
            result += numbers[valueIndex];
            valueIndex++;
        }
        else {
            result += mask[i];
        }
    }
    return result;
}

function formatMoneyInternal(value: string | number, isAddPositiveSign: boolean, options?: Intl.NumberFormatOptions): string {

    if (isNullOrEmpty(value?.toString())) return "";

    const number = Number(normalizeNumber(value));
    if (isNaN(number))
        throw new Error(`Money value ${value} is invalid`);

    if (options == null) {
        options = {
            style: "currency",
            currency: "BRL",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        };
    }

    const result = number.toLocaleString("pt-BR", options);
    if (isAddPositiveSign && number > 0)
        return `+${result}`;

    return result;
}