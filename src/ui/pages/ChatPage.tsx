import {
  Box,
  Center,
  HStack,
  Text,
  Textarea,
  VStack,
  Button,
  Flex
} from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import { useMessages } from '../../hooks/useMessages'
import { ChevronRightIcon } from '@chakra-ui/icons'
import { MessageBubble } from '../components/BurbleMessage'

export const ChatPage = () => {
  const { chatId } = useParams<{ chatId: string }>()
  if (chatId == null) {
    return 'No hay chat'
  }

  const {
    createNewMessage,
    getUsername,
    messages,
    newMessage,
    onNewMessageInput,
    readyToSend,
    ref
  } = useMessages(chatId)

  return (
    <Box maxW='md' mx='auto' p={2}>
      <VStack h='90vh' spacing={0}>
        <Box h='70%' w='100%' overflow={'auto'} ref={ref} mx={5}>
          <Flex overflow={'auto'} direction={'column'}>
            {messages.map(message => {
              return (
                <MessageBubble
                  key={message.id}
                  message={message.message}
                  isOwnMessage={message.isYou}
                  username={getUsername(message)}
                />
              )
            })}
          </Flex>
        </Box>
        <Box h='20%' w='100%' mt='auto'>
          <form onSubmit={createNewMessage}>
            <HStack>
              <Box h='100%' w='80%'>
                <Text>Mensaje</Text>
                <Textarea value={newMessage} onInput={onNewMessageInput} />
              </Box>
              <Box h='100%' w='20%'>
                <Center>
                  <Button disabled={!readyToSend} type='submit'>
                    <ChevronRightIcon />
                  </Button>
                </Center>
              </Box>
            </HStack>
          </form>
        </Box>
      </VStack>
    </Box>
  )
}
