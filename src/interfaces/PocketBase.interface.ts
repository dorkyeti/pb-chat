import PocketBase, { RecordService } from 'Pocketbase';

import { Chat, Message, User } from ".";

export interface TypedPocketBase extends PocketBase {
    collection(idOrName: string): RecordService
    collection(idOrName: 'messages'): RecordService<Message>
    collection(idOrName: 'users'): RecordService<User>
    collection(idOrName: 'chats'): RecordService<Chat>
}