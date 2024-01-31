import { each, isEmpty, isUndefined, toString } from "lodash";

export enum Method {
    DELETE = "DELETE",
    GET = "GET",
    PATCH = "PATCH",
    POST = "POST",
    PUT = "PUT",
}

// query string (?foo=1&bar=2)
export interface Query {
    [index: string]: any;
}

// HTTP headers
export interface Headers {
    [index: string]: string;
}

// JSON HTTP request body
export interface Body {
    [index: string]: any;
}

/**
 * Converts an Object of key/value pairs into a URL encoded query string
 */
export const buildQueryString = (query?: Query): string => {
    if (isEmpty(query)) {
        return "";
    }
    const result: string[] = [];
    each(query, (value, key) => {
        if (!isUndefined(value)) {
            result.push(`${key}=${encodeURIComponent(toString(value))}`);
        }
    });

    return `?${result.join("&")}`;
};
