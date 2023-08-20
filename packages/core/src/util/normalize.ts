import { SpecialCharsOptions, getOnlyNumbers, isNullOrEmpty, isNullOrWhiteSpace } from "./text";

/**
 * Normalizes a number or string representation of a number by removing any non-numeric characters and formatting it as a decimal number with a dot as the decimal separator.
 * @param number - The number or string representation of a number to normalize.
 * @returns The normalized number as a string with a dot as the decimal separator.
 */
export function normalizeNumber(number: number | string): string {
   
    if (isNullOrWhiteSpace(number?.toString())) return "";

    const numbersAndPoints = getOnlyNumbers(number.toString(), SpecialCharsOptions.PointComma);
    const lastPointIndex = Math.max(numbersAndPoints.lastIndexOf("."), numbersAndPoints.lastIndexOf(","));

    if (lastPointIndex === -1) return numbersAndPoints;

    const decimalPart = numbersAndPoints.substring(lastPointIndex + 1);
    const integerPart = numbersAndPoints.substring(0, lastPointIndex).replace(/\.|,/g, "");
    return `${integerPart}.${decimalPart}`;
}