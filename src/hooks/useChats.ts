import { useContext } from "react";
import { ChatsContext } from "../contexts/Chats.context";

export const useChats = () => useContext(ChatsContext)