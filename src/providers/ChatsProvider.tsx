import { PropsWithChildren, useEffect, useMemo, useState } from 'react'
import { ChatsContext } from '../contexts/Chats.context'
import { Chat, User } from '../interfaces'
import { usePocketBase } from '../hooks/usePocketbase'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { route } from '../services/routes'
import { useDisclosure, useToast } from '@chakra-ui/react'

export const ChatsProvider = ({ children }: PropsWithChildren) => {
  const disclosure = useDisclosure()
  const toast = useToast()
  const pocketBase = usePocketBase()
  const navigate = useNavigate()
  const { user } = useAuth()

  const [chats, setChats] = useState<Chat[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [page, setPage] = useState<number>(1)
  const [userId, setUserId] = useState<string>('')

  useEffect(() => {
    pocketBase!
      .collection('chats')
      .getList(1, 15, {
        sort: '-updated',
        page
      })
      .then(data => {
        setChats(data.items)
      })
      .catch(err => {
        if (err.isAbort) {
          return
        }
      })
  }, [page])

  useEffect(() => {
    pocketBase!
      .collection('users')
      .getFullList({
        filter: `id != '${user!.id}'`,
        sort: 'username'
      })
      .then(data => {
        setUsers(data)
      })
      .catch(err => {
        if (err.isAbort) {
          return
        }
      })
  }, [])

  useEffect(() => {
    pocketBase!.collection('chats').subscribe('*', event => {
      switch (event.action) {
        case 'create':
          setChats(data => [event.record, ...data])
          break
        case 'delete':
          setChats(data => data.filter(item => item.id != event.record.id))
          break
        case 'update':
          setChats(data =>
            data.map(item => {
              if (item.id == event.record.id) {
                return event.record
              }

              return item
            })
          )
          break
      }
    })

    pocketBase!.collection('users').subscribe('*', event => {
      switch (event.action) {
        case 'create':
          setUsers(data => [event.record, ...data])
          break
        case 'delete':
          setUsers(data => data.filter(item => item.id != event.record.id))
          break
        case 'update':
          if (event.record.id == user!.id) return

          setUsers(data =>
            data.map(item => {
              if (item.id == event.record.id) {
                return event.record
              }

              return item
            })
          )
          break
      }
    })

    return () => {
      pocketBase!.collection('chats').unsubscribe('*')
      pocketBase!.collection('users').unsubscribe('*')
    }
  }, [])

  const newChat = async () => {
    if (userId == '')
      return toast({
        title: `No hay ningún usuario seleccionado`,
        status: 'error',
        isClosable: true
      })

    let chatId

    try {
      const data = await pocketBase!.send('/api/v1/chats', {
        method: 'POST',
        body: {
          userId
        }
      })

      chatId = data.id
    } catch (e: any) {
      if (e.data.code == 400) {
        chatId = e.data.data.chatId
      } else {
        alert(e.message)
      }
    }

    setUserId('')
    disclosure.onClose()
    return goToChat(chatId)
  }

  const getChatTitle = (chat: Chat): string => {
    if (chat.title != '') return chat.title!

    return chat.settings.nicknames.find(item => item.id != user!.id)!.name
  }

  const getUsername = (chat: Chat): string => {
    if (chat.settings.lastMessage.fromId == '') return ''

    return chats
      .find(i => i.id == chat.id)!
      .settings.nicknames.find(i => i.id == chat.settings.lastMessage.fromId)!
      .name
  }

  const next = () => setPage(p => p + 1)

  const prev = () => {
    if (page == 1) return

    setPage(p => p - 1)
  }

  const changeUserId = (value: string) => setUserId(value)

  const goToChat = (chatId: string) => {
    return navigate(route('chat', { chatId })!)
  }

  const values = useMemo(
    () => ({
      changeUserId,
      chats,
      disclosure,
      getChatTitle,
      getUsername,
      goToChat,
      newChat,
      next,
      prev,
      userId,
      users
    }),
    [
      changeUserId,
      chats,
      disclosure,
      getChatTitle,
      getUsername,
      goToChat,
      newChat,
      next,
      prev,
      userId,
      users
    ]
  )

  return (
    <ChatsContext.Provider value={values}>{children}</ChatsContext.Provider>
  )
}
