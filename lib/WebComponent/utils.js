/**
 * Converts a string to camelCase.
 * @param {string} str - The string to convert
 * @returns {string}
 * @since 1.0.0
 * @version 1.0.0
 */
export function toKebabCase(str) {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

/**
 * Creates a CSSStyleSheet from a CSS string
 * @param {string} css - The CSS string
 * @returns {CSSStyleSheet}
 * @since 1.0.0
 * @version 1.0.0
 */
export function toCSSStyleSheet(css) {
    const stylesheet = new CSSStyleSheet();
    stylesheet.replaceSync(css);
    return stylesheet;
}

/**
 * Converts an object to an array if it is not already an array
 * @param {any} obj - The object to convert to an array
 * @returns {Array}
 */
export function toArray(obj) {
    if (!obj)
        return [];
    return Array.isArray(obj) ? obj : [obj];
}
