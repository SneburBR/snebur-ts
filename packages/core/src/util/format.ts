import { isNullOrEmpty, getOnlyNumbers } from "./text";

export enum FormattingType {
    Cpf,
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
        default:
            throw new Error(`Formatting type ${type} not suppoerted`);

    }
}

export function formatCpf(value: string | number): string {

    if (isNullOrEmpty(value?.toString())) return "";
    return formatMask(value, "###.###.###-##");

    // return `${numbers.substr(0, 3)}.${numbers.substr(3, 3)}.${numbers.substr(6, 3)}-${numbers.substr(9, 2)}`;
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