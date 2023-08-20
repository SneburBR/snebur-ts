import { isNullOrEmpty, getOnlyNumbers } from "./text";

export enum FormattingType {
    Cpf,
    Cnpj,
    CpfCnpj,
    Cep,
    Phone,
    Money,
    Percent,
    Date,
    DateTime,
    Time,
    Decimal,
    Integer,
    Bytes,
    MoneyWithSignal,
    Dimension,
    Margin,
    DimensionCm,
    DimensionPixels,
}

/**
 * Formats a string or number based on the specified formatting type.
 * @param value The value to format.
 * @param type The type of formatting to apply.
 * @returns The formatted string.
 * @throws An error if the specified formatting type is not supported.
 */
export function format(value: string | number, type: FormattingType): string {

    if (isNullOrEmpty(value?.toString())) return "";

    switch (type) {
        case FormattingType.Cpf:
            return formatCpf(value);
        case FormattingType.Cnpj:
            return formatCnpj(value);
        case FormattingType.CpfCnpj:
            return formatCpfCnpj(value);
        case FormattingType.Cep:
            return formatCep(value);
        case FormattingType.Phone:
            return formatPhone(value);
        default:
            throw new Error(`Formatting type ${type} not suppoerted`);

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