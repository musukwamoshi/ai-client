import { isArray, isObject, isString, map, mapValues } from "lodash";

/**
 * Trims the size of extremely large text fields for logging purposes
 */
export const trimForLog = (input: any): object => {
    const process = (value: any): any => {
        if (isObject(value)) {
            return trimForLog(value);
        } else if (isString(value) && value.length > 1024) {
            return `${value.slice(0, 1023)} [...]`;
        } else {
            return value;
        }
    };
    return isArray(input) ? map(input, process) : mapValues(input, process);
};
