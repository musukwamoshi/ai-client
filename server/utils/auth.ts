import crypto from "crypto";
type HashSalt = {
    hash: string,
    salt: string
}

export const setPassword = (password: string): HashSalt => {
    const salt = crypto.randomBytes(16).toString("hex");
    const hash = crypto
        .pbkdf2Sync(password, salt.toString(), 10000, 512, "sha512")
        .toString("hex");
    const hashSalt = { hash, salt };
    return hashSalt;
}

export const validatePassword = (password: string, dbHash: string, dbSalt: string): boolean => {
    const hash = crypto
        .pbkdf2Sync(password, dbSalt, 10000, 512, "sha512")
        .toString("hex");
    return dbHash === hash;
}