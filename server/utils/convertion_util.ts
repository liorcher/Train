const toCamelCase = (str: string): string => {
    return str.replace(/([-_][a-z])/g, (group) => group.toUpperCase().replace('-', '').replace('_', ''));
};

const convertKeysToCamelCase = (obj: any): any => {
    if (Array.isArray(obj)) {
        return obj.map((v) => convertKeysToCamelCase(v));
    } else if (obj !== null && obj.constructor === Object) {
        return Object.keys(obj).reduce((result, key) => {
            const newKey = toCamelCase(key);
            result[newKey] = convertKeysToCamelCase(obj[key]);
            return result;
        }, {} as any);
    }
    return obj;
};

export { convertKeysToCamelCase };
