export interface Message {
    id: string;
    chat: string;
    from: string;
    fromAlias: string;
    isYou: boolean;
    message: string;
    read?: Date;
    created: Date;
    updated: Date;
}