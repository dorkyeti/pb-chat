import { createContext } from "react";
import { ChatsContextType } from '../types/ChatsContext.type';
import { Chat } from "../interfaces";

export const ChatsContext = createContext<ChatsContextType>({
    chats: [],
    users: [],
    newChat: function (): void {
        throw new Error("Function not implemented.");
    },
    next: function (): void {
        throw new Error("Function not implemented.");
    },
    prev: function (): void {
        throw new Error("Function not implemented.");
    },
    getChatTitle: function (_: Chat): string {
        throw new Error("Function not implemented.");
    },
    getUsername: function (_: Chat): string {
        throw new Error("Function not implemented.");
    },
    goToChat: function (_: string): void {
        throw new Error("Function not implemented.");
    },
    userId: "",
    changeUserId: function (_: string): void {
        throw new Error("Function not implemented.");
    },
    disclosure: {
        isOpen: false,
        onOpen: function (): void {
            throw new Error("Function not implemented.");
        },
        onClose: function (): void {
            throw new Error("Function not implemented.");
        },
        onToggle: function (): void {
            throw new Error("Function not implemented.");
        },
        isControlled: false,
        getButtonProps: function (_?: any) {
            throw new Error("Function not implemented.");
        },
        getDisclosureProps: function (_?: any) {
            throw new Error("Function not implemented.");
        }
    }
});