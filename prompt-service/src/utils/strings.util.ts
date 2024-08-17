export const formatString = (query: string, replacements: { [key: string]: string | number }): string => {
    return query.replace(/\{(\w+)\}/g, (match, key) => {
        return typeof replacements[key] !== "undefined" ? replacements[key].toString() : match;
    });
}