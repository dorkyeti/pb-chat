import { useContext } from "react";
import { AuthContext } from "../contexts/Auth.context";

export const useAuth = () => useContext(AuthContext);