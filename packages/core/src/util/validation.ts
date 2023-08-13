
const base64Regex = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;

/**
 * Checks if a value is a string.
 * @param value The value to check.
 * @returns True if the value is a string, false otherwise.
 */
export function isString(value: unknown): value is string {
  return typeof value === "string";
}


/**
 * Checks if a value is a valid number.
 * @param value The value to check.
 * @returns True if the value is a valid number, false otherwise.
 */
export function isValidNumber(value: unknown): value is number {
  return typeof value === "number" && !isNaN(value) && isFinite(value);
}

/**
 * Determines whether a given string is a valid base64 string.
 * @param value The string to check.
 * @returns True if the string is a valid base64 string, false otherwise.
 */
export function isBase64(value: string): boolean {
  return isString(value) && base64Regex.test(value);
}

