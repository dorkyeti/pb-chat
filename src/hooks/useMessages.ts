import { useEffect, useRef, useState } from "react";
import { Message } from '../interfaces/Message.interface';
import { usePocketBase } from "./usePocketbase";
import { useChats } from "./useChats";
import { useAuth } from "./useAuth";

export const useMessages = (chatId: string) => {
  const pocketBase = usePocketBase();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const [readyToSend, setReadyToSend] = useState<boolean>(false);
  const { chats } = useChats();
  const { user } = useAuth();
  const ref = useRef<HTMLDivElement>(null)

  const getAllMessages = async () => {
    try {
      const data = await pocketBase!.collection('messages').getFullList({
        filter: `chat = '${chatId}'`,
        sort: 'created'
      })

      setMessages(data.map(mapMessage));

      setTimeout(() => {
        ref.current!.scrollTop = 9999;
      }, 30)
    } catch (err: any) {
      if (err.isAbort) {
        return
      }
    }
  }
  useEffect(() => {
    (async () => await getAllMessages())()
  }, []);

  useEffect(() => {
    pocketBase!.collection('chats').subscribe('*', async ({ record }) => {
      if (record.id == chatId) {
        await getAllMessages()
      }
    })

    return () => {
      pocketBase!.collection('messages').unsubscribe('*')
    }
  }, []);

  useEffect(() => {
    setReadyToSend(() => newMessage.trim() != '');
  }, [newMessage])

  const getUsername = (message: Message): string => {
    return chats
      .find(i => i.id == message.chat)!
      .settings.nicknames.find(i => i.id == message.from)!.name
  }

  const getIsYou = (message: Message): boolean => {
    return message.from == user!.id;
  }

  const mapMessage = (message: Message): Message => {
    message.fromAlias = getUsername(message);
    message.isYou = getIsYou(message);

    return message;
  }

  const createNewMessage = async (e: any): Promise<void> => {
    e.preventDefault();
    if (!readyToSend)
      return;

    try {
      await pocketBase!.send(`/api/v1/chats/${chatId}/messages`, {
        method: 'POST',
        body: {
          message: newMessage
        }
      })
      setNewMessage('');
    } catch (e: any) {
      alert(e);
    }
  }

  const onNewMessageInput = (e: any) => {
    setNewMessage(e.target.value);
  }

  return {
    createNewMessage,
    getUsername,
    messages,
    newMessage,
    onNewMessageInput,
    readyToSend,
    ref
  }
}