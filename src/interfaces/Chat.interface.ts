export interface Chat {
    id: string;
    title?: string;
    photo?: string;
    users: string[];
    settings: Settings;
    created: Date;
    updated: Date;
}

interface Settings {
    lastMessage: LastMessage;
    nicknames: Nickname[];
    random: string;
}

interface LastMessage {
    fromId: string;
    id?: string;
    message: string;
}

interface Nickname {
    id: string;
    name: string;
}