import { each, isNil, values } from 'lodash';
import { buildQueryString, Method } from './buildqueryString';

const prepSubmission = async (unPreppedBody: any): Promise<{ preppedHeaders: {}, preppedBody: string | FormData }> => {
    const formDataUnprocessed: any = values(unPreppedBody).some((value) => value instanceof File);
    if (formDataUnprocessed) {
        // body must be submitted as a FormData instance
        const formData = new FormData();
        each(formDataUnprocessed, (value: any, key: any) => {
            if (!isNil(value)) {
                if (value instanceof File) {
                    formData.append(key, value);
                } else {
                    formData.append(key, value.toString());
                }
            }
        });
        // no headers necessary for FormData body
        return { preppedHeaders: {}, preppedBody: formData };
    }
    // submit as json
    return {
        preppedHeaders: { 'Content-Type': 'application/json' },
        preppedBody: JSON.stringify(unPreppedBody),
    };
};


const run = async (path: any, method: any, headers?: any, body?: any) => {
    const baseUrl = 'http://0.0.0.0:8000/';
    const response = await fetch(`${baseUrl}v1${path}`, {
        body, credentials: 'include',
        headers, method,
    });
    console.log('response from fetch');
    console.log(response);
    const { ok } = response;
    let result;
    try {
        result = await response.json();
    } catch {
        result = {};
    }
    if (ok) {
        return result;
    }
    throw new Error(result.error || `Error:${response.statusText}`);
};

export const get = async (path: any, query?: any) => run(`${path}${buildQueryString(query)}`, Method.GET);

export const post = async (path: any, body: any) => {
    const { preppedHeaders, preppedBody } = await prepSubmission(body || {});
    return run(path, Method.POST, preppedHeaders, preppedBody);
};

export const put = async (path: any, body: any) => {
    const { preppedHeaders, preppedBody } = await prepSubmission(body || {});
    return run(path, Method.PUT, preppedHeaders, preppedBody);
};

export const destroy = async (path: any, body: any) => {
    const { preppedHeaders, preppedBody } = await prepSubmission(body || {});
    return run(path, Method.DELETE, preppedHeaders, preppedBody);
};

export const patch = async (path: any, body: any) => {
    const { preppedHeaders, preppedBody } = await prepSubmission(body || {});
    return run(path, Method.PATCH, preppedHeaders, preppedBody);
};
