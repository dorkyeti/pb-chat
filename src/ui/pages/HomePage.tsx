import { FC } from 'react'
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Text
} from '@chakra-ui/react'
import { useChats } from '../../hooks/useChats'
import { CreateChatModal } from '../components/CreateChatModal'

export const HomePage: FC = () => {
  const { chats, getChatTitle, getUsername, goToChat } = useChats()

  return (
    <Box maxW='md' mx='auto' p={2}>
      <CreateChatModal />
      <div>
        {chats.map(chat => {
          return (
            <Card
              key={`chats-card-${chat.id}`}
              variant='outline'
              onClick={_ => goToChat(chat.id)}
              style={{ cursor: 'pointer' }}
              my={2}
            >
              <CardHeader>
                <Heading size='md'>{getChatTitle(chat)}</Heading>
              </CardHeader>
              <CardBody>
                <Text noOfLines={1}>
                  <b>{getUsername(chat)}:</b>{' '}
                  {chat.settings.lastMessage?.message}
                </Text>
              </CardBody>
            </Card>
          )
        })}
      </div>
    </Box>
  )
}
