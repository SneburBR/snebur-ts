import { convertToDate } from "./convert";
import { normalizeNumber, normalizeDate } from "./normalize";
import { isNullOrEmpty, getOnlyNumbers, countOccurrences } from "./text";

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
    None = "none",
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
export function format(value: string | number | Date, type: FormattingType | string): string {

    if (isNullOrEmpty(value?.toString())) return "";

    if (value instanceof Date) {
        return formatDate(value);
    }

    switch (type) {
        case FormattingType.Bytes:
            return formatBytes(value);
        case FormattingType.Cep:
            return formatCep(value);
        case FormattingType.Cnpj:
            return formatCnpj(value);
        case FormattingType.Cpf:
            return formatCpf(value);
        case FormattingType.CpfCnpj:
            return formatCpfCnpj(value);
        case FormattingType.Date:
            return formatDate(value);
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
 * Formats a given value in bytes to a human-readable string representation with the appropriate unit (bytes, KB, MB, GB, TB).
 * @param value - The value in bytes to be formatted.
 * @returns A string representation of the value with the appropriate unit.
 */
export function formatBytes(value: string | number): string {

    if (isNullOrEmpty(value?.toString())) return "";
    const number = normalizeNumber(value);
    const bytes = parseFloat(number);

    if (bytes < 1024) return `${bytes.toFixed(0)} bytes`;
    const kilobytes = bytes / 1024;

    if (kilobytes < 1024) return `${kilobytes.toFixed(1)} KB`;

    const megabytes = kilobytes / 1024;
    if (megabytes < 1024) return `${megabytes.toFixed(1)} MB`;

    const gigabytes = megabytes / 1024;
    if (gigabytes < 1024) return `${gigabytes.toFixed(1)} GB`;

    const terabytes = gigabytes / 1024;
    return `${terabytes.toFixed(1)} TB`;
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
 * Formats a CNPJ (Brazilian company registration number) string or number into the format ##.###.###/####-##.
 * @param value The CNPJ value to be formatted.
 * @returns The formatted CNPJ string.
 */
export function formatCnpj(value: string | number): string {

    if (isNullOrEmpty(value?.toString())) return "";
    return formatMask(value, "##.###.###/####-##");
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
 * Formats a date value as a string in the format "MM/DD/YYYY".
 * @param value - The date value to format. Can be a string, number, or Date object.
 * @returns A string representation of the date value in the format "MM/DD/YYYY".
 */
export function formatDate(value: string | number | Date): string {

    if (isNullOrEmpty(value?.toString())) return "";
    if (typeof value === "number")
        value = new Date(value);

    const dateString = normalizeDate(value, true);
    return formatMask(dateString, "##/##/####");
}

/**
 * Formats a string or number value using a given mask.
 * @param value The value to format.
 * @param mask The mask to use for formatting.
 * @returns The formatted string.
 */
export function formatMask(value: string | number, mask: string, isDebug: boolean = false) {

    if (isNullOrEmpty(value?.toString())) return "";
    if (isNullOrEmpty(mask))
        throw new Error("Mask cannot be null or empty");

    const numbers = getOnlyNumbers(value.toString());
    const countMaskMark = countOccurrences(mask, "#");

    let result = "";
    let valueIndex = 0;
    const isIncomplete = numbers.length < countMaskMark;

    if (isDebug)
        console.log("isIncomplete", isIncomplete);

    for (let i = 0; i < mask.length; i++) {

        if (isIncomplete)
            if (valueIndex >= numbers.length)
                break;

        if (mask[i] === "#") {

            if (valueIndex >= numbers.length)
                break;

            result += numbers[valueIndex];
            valueIndex++;
        }
        else {
            result += mask[i];
        }
    }
    return result;
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
 * Pads a string or number with leading zeros until it reaches the specified length.
 * If the input value is null, undefined, or an empty string, an empty string is returned.
 * If the specified length is less than or equal to zero, the input value is returned as a string.
 * @param value - The string or number to pad with leading zeros.
 * @param length - The desired length of the resulting string.
 * @returns A string with leading zeros, or an empty string if the input value is null, undefined, or an empty string.
 */
export function formatZeroPad(value: string | number, length: number): string {

    if (isNullOrEmpty(value?.toString())) return "";
    if (length <= 0) return value.toString();

    const numbers = getOnlyNumbers(value.toString());
    if (numbers.length >= length)
        return numbers;

    return numbers.padStart(length, "0");
}


//#region Internal

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

//#endregion