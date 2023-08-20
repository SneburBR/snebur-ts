const MonthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const MonthDaysLeap = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export function isLeap(year: number): boolean {
    return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
}

export function getMonthDays(year: number, month: number) {
    return isLeap(year) ? MonthDaysLeap[month] : MonthDays[month];
}