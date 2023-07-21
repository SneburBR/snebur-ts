
/**
 * Hides the specified HTML element by setting its display style to "none".
 * @param element The HTML element to hide.
 */
export function hideElement(element: HTMLElement | null): void {
    if (element == null)
        return;

    element.style.display = "none";
}

/**
 * Shows the specified HTML element by setting its display style to an empty string.
 * @param element The HTML element to show.
 */
export function showElement(element: HTMLElement| null): void {
    if (element == null)
        return;

    element.style.display = "";
}