import { Box, Text } from '@chakra-ui/react'

export const MessageBubble = ({ message, isOwnMessage, username }: any) => {
  return (
    <Box
      maxW='80%'
      p={2}
      borderRadius='lg'
      bg={isOwnMessage ? 'blue.500' : 'gray.200'}
      alignSelf={isOwnMessage ? 'flex-end' : 'flex-start'}
      color={isOwnMessage ? 'white' : 'black'}
      my={2}
    >
      {isOwnMessage ? (
        <Text>{message}</Text>
      ) : (
        <Text>
          <b>{username}:</b> {message}
        </Text>
      )}
    </Box>
  )
}
