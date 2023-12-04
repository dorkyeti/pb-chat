import { useContext } from "react";
import { PocketBaseContext } from "../contexts/PocketBase.context";

export const usePocketBase = () => useContext(PocketBaseContext);