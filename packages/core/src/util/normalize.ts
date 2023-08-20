import { getMonthDays } from "./date";
import { SpecialCharsOptions, getOnlyNumbers, isNullOrEmpty, isNullOrWhiteSpace } from "./text";

/**
 * Normalizes a number or string representation of a number by removing any non-numeric characters and formatting it as a decimal number with a dot as the decimal separator.
 * @param number - The number or string representation of a number to normalize.
 * @returns The normalized number as a string with a dot as the decimal separator.
 */
export function normalizeNumber(number: number | string): string {

    if (isNullOrWhiteSpace(number?.toString())) return "";

    const numbersAndPoints = getOnlyNumbers(number.toString(), SpecialCharsOptions.PointCommaSigns);
    const lastPointIndex = Math.max(numbersAndPoints.lastIndexOf("."), numbersAndPoints.lastIndexOf(","));

    if (lastPointIndex === -1) return numbersAndPoints;

    const decimalPart = numbersAndPoints.substring(lastPointIndex + 1);
    const integerPart = numbersAndPoints.substring(0, lastPointIndex).replace(/\.|,/g, "");
    return `${integerPart}.${decimalPart}`;
}

/**
 * Normalizes a date string or Date object to a string in the format "dd/mm/yyyy".
 * @param value - The date string or Date object to normalize.
 * @returns A string in the format "dd/mm/yyyy" representing the normalized date.
 */
export function normalizeDate(value: string | Date, isFormatZero:boolean = false): string {

    if (value instanceof Date) {
        if(isFormatZero)
            return `${formatNumberInternal(value.getDate())}/${formatNumberInternal(value.getMonth() + 1)}/${value.getFullYear()}`;
        return `${value.getDate()}/${value.getMonth() + 1}/${value.getFullYear()}`;
    }
        

    if (isNullOrEmpty(value?.toString())) return "";

    const separators = ["\\/", "\\-", "\\."];
    const dateParts = value.toString().split(new RegExp(`[${separators.join("")}]`));
    const dayOrYear = parseInt(dateParts[0]);
    const maybeMonth = parseInt(dateParts[1]);
    const yearOrDay = parseInt(dateParts[2]);

    if (isNaN(dayOrYear) && isNaN(maybeMonth) && isNaN(yearOrDay))
        return "";

    const [day, month, year] = normalizeDatePartsInternal(dayOrYear, maybeMonth, yearOrDay);
    const monthNormalized = Math.min(month, 12);
    const dayInMonth = getMonthDays(year, monthNormalized - 1);
    const dayNormalized = Math.min(day, dayInMonth);
    if(isFormatZero)
        return `${formatNumberInternal(dayNormalized)}/${formatNumberInternal(monthNormalized)}/${year}`;
    return `${dayNormalized}/${monthNormalized}/${year}`;
}

function normalizeDatePartsInternal(dayOrYear: number, maybeMonth: number, yearOrDay: number): [number, number, number] {

    const currentDate = new Date();

    if (isNaN(maybeMonth) && isNaN(yearOrDay)) {

        if (dayOrYear > 31)
            return [currentDate.getDate(), currentDate.getMonth() + 1, dayOrYear];

        return [dayOrYear, currentDate.getMonth() + 1, currentDate.getFullYear()];
    }

    if (isNaN(yearOrDay)) {

        if (dayOrYear > 31)
            return [currentDate.getDate(), maybeMonth, dayOrYear];

        return [dayOrYear, maybeMonth, currentDate.getFullYear()];
    }

    if (dayOrYear > 31) {
        return [yearOrDay, maybeMonth, dayOrYear];
    }

    const year = normalizeYear(yearOrDay);
    return [dayOrYear, maybeMonth, year];
}

function normalizeYear(year: number): number {

    if (year < 50)  
        return year + 2000;
  
    if (year < 100) 
        return year + 1900;

    return year;
}


function formatNumberInternal(value : number): string {
    return value.toString().padStart(2, "0");
}