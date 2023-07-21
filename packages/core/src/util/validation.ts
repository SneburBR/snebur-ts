
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