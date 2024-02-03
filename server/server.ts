import express from "express";
import { attachRoutes } from "./routes";
import helmet from "helmet";
import cors from "cors";
import cookieSession from "cookie-session";
import passport from "passport";
import { requestLogger } from "./middleware/loggingmiddleware";


export const app = express();
app.use(
    cookieSession({
        name: "session",
        keys: [process.env.SESSION_SECRET || ""]
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(helmet({ contentSecurityPolicy: { useDefaults: true, directives: { 'script-src': ["'self'", "https://cdn.tiny.cloud/"], 'img-src': ["'self'", "https://tailwindui.com/", "https://sp.tinymce.com/", "http://www.w3.org/", "https://yoruikitenkai.s3.amazonaws.com/"], } } }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(requestLogger);
attachRoutes(app);

if (process.argv[1] === __filename) {
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, async () => {
        console.log(`ai.dev is now running on port ${PORT}`)
    })
}