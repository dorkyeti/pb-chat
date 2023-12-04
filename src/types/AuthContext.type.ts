import { User } from "../interfaces/User.interface"

export type AuthContextType = {
    user: User | null;
    isLoggedIn: true | false;
    forgotPassword: (email: string) => Promise<void>
    logIn: (userOrEmail: string, password: string) => Promise<void>
    signUp: (values: User & { password: string, passwordConfirm: string }) => Promise<void>
    logOut: () => void
}