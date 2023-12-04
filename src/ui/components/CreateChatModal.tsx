import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select
} from '@chakra-ui/react'
import { FC } from 'react'
import { useChats } from '../../hooks/useChats'

export const CreateChatModal: FC = () => {
  const { disclosure, newChat, changeUserId, userId, users } = useChats()

  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={disclosure.isOpen}
      onClose={disclosure.onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Crear chat</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Select
            placeholder='Selecciona un usuario'
            onChange={e => changeUserId(e.target.value)}
            value={userId}
            my={2}
          >
            {users.map(item => {
              return (
                <option key={`user-option-${item.id}`} value={item.id}>
                  {item.username} ({item.name})
                </option>
              )
            })}
          </Select>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={newChat}>
            Crear
          </Button>
          <Button onClick={disclosure.onClose}>Cerrar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
