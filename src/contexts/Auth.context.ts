import { createContext } from "react";
import { AuthContextType } from "../types/AuthContext.type";
import { User } from "../interfaces/User.interface";

export const AuthContext = createContext<AuthContextType>({
    user: null,
    isLoggedIn: false,
    forgotPassword: function (_: string): Promise<void> {
        throw new Error("Function not implemented.");
    },
    logIn: function (_: string, __: string): Promise<void> {
        throw new Error("Function not implemented.");
    },
    signUp: function (_: User & { password: string; passwordConfirm: string; }): Promise<void> {
        throw new Error("Function not implemented.");
    },
    logOut: function (): void {
        throw new Error("Function not implemented.");
    },
});