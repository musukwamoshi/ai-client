import { Request } from "express";
import morgan from "morgan";

const logFormat = "[:method] :url :status :user-agent (:response-time ms)";
const logSkipper = (req: Request): boolean => {
    return (
        req.baseUrl === "/static" || //  skip logging for ALL static assets
        req.url === "/favicon.ico" || // and some one-off root static assets as well
        req.url === "/manifest.json" //  (ditto)
    );
};

export const requestLogger = morgan(logFormat, { skip: logSkipper });