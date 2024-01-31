import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { dbClient } from "../db";
import { setPassword } from "../utils/auth";

export async function signUp(req: Request, res: Response, next: NextFunction): Promise<any> {
    const { firstName, lastName, email, password } = req.body;
    if (!email) {
        return res.status(400).send({ error: "Email is required", success: false });
    }
    try {
        const existingUser = await dbClient.user.findUnique({ where: { email: email } });
        if (existingUser) {
            return res.status(401).send({ error: "That email is already registered", success: false });
        }
        //save user
        const saltHash = setPassword(password);
        const hash = saltHash.hash;
        const salt = saltHash.salt;
        const isAdmin = true;
        const result = await dbClient.user.create({
            data: {
                firstName,
                lastName,
                email,
                salt,
                hash,
                isAdmin
            }
        })
        let data = null;
        if (result) {
            data = await dbClient.user.findUnique({ where: { email: email } });
            console.debug("user created!");
        }

        if (data) {
            const { id, isAdmin } = data;
            const user = {
                id,
                firstName,
                lastName,
                email,
                isAdmin
            }
            req.login(user, async err => {
                if (err) {
                    return next(err);
                }
                res.locals.currentUser = req.user;
                return res.send({ data: user, success: true });
            });
        }
    } catch (error) {
        console.error("Failed to create user", error);
        return res.status(500).send({ error: "There was an error signing you up. Please try again.", success: false });
    }
}

export async function passwordReset(req: Request, res: Response, next: NextFunction): Promise<any> {
    const { email, password } = req.body;
    if (!email) {
        return res.status(400).send({ error: "Email is required", success: false });
    }
    try {
        const checkUserExists = await dbClient.user.findUnique({ where: { email: email } });
        if (!checkUserExists) {
            return res.status(401).send({ error: "That email does not exist", success: false });
        }
        //save user
        const saltHash = setPassword(password);
        const hash = saltHash.hash;
        const salt = saltHash.salt;
        const result = await dbClient.user.update({
            where: {
                email: email,
            },
            data: {
                salt: salt,
                hash: hash
            },
        })
        let data = null;
        if (result) {
            data = await dbClient.user.findUnique({ where: { email: email } });
            console.debug("user updated!");
        }

        if (data) {
            const { id, isAdmin, firstName, lastName } = data;
            const user = {
                id,
                firstName,
                lastName,
                email,
                isAdmin
            }
            req.login(user, async err => {
                if (err) {
                    return next(err);
                }
                res.locals.currentUser = req.user;
                return res.send({ data: user, success: true });
            });
        }
    } catch (error) {
        console.error("Failed to update user", error);
        return res.status(500).send({ error: "There was an error updating your credentials. Please try again.", success: false });
    }
}

export async function signIn(req: Request, res: Response, next: NextFunction): Promise<void> {
    passport.authenticate("user", (err, user) => {
        if (err) {
            return next(err);
        }

        if (!user) {
            return res.status(401).send({ error: "There was an error logging you in.Please try again", success: false })
        }
        req.login(user, async err => {
            if (err) {
                return next(err);
            }
            return res.send({ data: user, success: true });
        });
    })(req, res, next);
}

export const signOut = (req: Request, res: Response): any => {
    req.logout();
    req.session = null;
    return res.send({ success: true });
}