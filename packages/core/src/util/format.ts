import { isNullOrEmpty, getOnlyNumbers } from "./text";

export enum FormattingType {
    Cpf,
    Cnpj,
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