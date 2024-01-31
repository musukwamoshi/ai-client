
import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { dbClient } from "../db";
import { validatePassword } from "../utils/auth";

export const loggedIn = (req: Request, res: Response, next: NextFunction): any => {
    const user = req.user;
    if (user) {
        next();
    } else {
        res.status(401).send({ error: "Not logged in!" });
    }
};

passport.use("user", new LocalStrategy(
    {
        usernameField: "email",
    },
    async (email, password, done) => {
        const data = await dbClient.user.findUnique({ where: { email: email } });
        if (!data) {
            return done(null, false)
        }
        const { id, isAdmin, firstName, lastName, hash, salt } = data;
        const user = {
            id,
            firstName,
            lastName,
            email,
            isAdmin
        }
        if (!validatePassword(password, hash!, salt!)) {
            return done(null, false)
        }

        return done(null, user);
    }
));

passport.serializeUser((user: any, done) => {
    if (user) {
        done(null, user.id)
    }
});

passport.deserializeUser(async (id, done) => {
    const user = await dbClient.user.findUnique({ where: { id: id as number } });;
    if (user) {
        done(null, user)
    } else {
        console.warn(`User not found`, `${id}`);
        done(null, null)
    }
})