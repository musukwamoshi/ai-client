import { createContext } from 'react';

interface UserType {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    isAdmin: boolean
    isVerified: boolean
}

export interface Session {
    user?: UserType
}

export interface AuthContextData extends Session {
    setSession: (session: Session) => void;
    // updateSessionUser: (user: Object | undefined, attributes: any) => void;
}

export const AuthContext = createContext<AuthContextData>({
    setSession: () => { },
    // updateSessionUser: () => { },
});
