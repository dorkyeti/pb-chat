import { createContext } from "react";
import { PocketBaseContextType } from "../types/PocketBaseContext.type";

export const PocketBaseContext = createContext<PocketBaseContextType>(null);