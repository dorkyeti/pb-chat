import { UseDisclosureReturn } from "@chakra-ui/react";
import { Chat, User } from "../interfaces"

export type ChatsContextType = {
    changeUserId: (value: string) => void;
    chats: Chat[];
    disclosure: UseDisclosureReturn;
    getChatTitle: (chat: Chat) => string;
    getUsername: (message: Chat) => string;
    goToChat: (chatId: string) => void;
    newChat: () => void;
    next: () => void;
    prev: () => void;
    userId: string;
    users: User[];
}