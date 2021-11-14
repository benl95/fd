/**
 * Takes an object and converts property keys to lowercased string
 * @param obj object to perform lowercasing on
 */
export function toLowerCase(obj) {
    const upperCase = Object.entries(obj).map(([key, val]) => [
        key.toLowerCase(),
        val,
    ]);

    return Object.fromEntries(upperCase);
}
