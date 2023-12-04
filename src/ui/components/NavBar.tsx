import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
  Text,
  useColorMode,
  useColorModeValue
} from '@chakra-ui/react'
import {
  ArrowBackIcon,
  MoonIcon,
  SmallAddIcon,
  SunIcon
} from '@chakra-ui/icons'
import { useAuth } from '../../hooks/useAuth'
import { useLocation, useNavigate } from 'react-router-dom'
import { route } from '../../services/routes'
import { useChats } from '../../hooks/useChats'

export const NavBar = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const { user, logOut } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const { disclosure } = useChats()

  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        {location.pathname == '/home' ? (
          <Button onClick={_ => disclosure.onOpen()}>
            <SmallAddIcon />
          </Button>
        ) : (
          <Button onClick={_ => navigate(route('home')!)}>
            <ArrowBackIcon />
          </Button>
        )}
        <Text as='b'>Sour-School</Text>

        <Flex alignItems={'center'}>
          <Stack direction={'row'} spacing={7}>
            <Button onClick={toggleColorMode}>
              {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            </Button>

            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}
              >
                <Avatar name={user!.name} size={'sm'} src={user!.avatar} />
              </MenuButton>
              <MenuList alignItems={'center'}>
                <br />
                <Center>
                  <Avatar name={user!.name} size={'2xl'} src={user!.avatar} />
                </Center>
                <br />
                <Center>
                  <p>{user!.username ?? ''}</p>
                </Center>
                <br />
                <MenuDivider />
                <MenuItem>Perfil</MenuItem>
                <MenuDivider />
                <MenuItem onClick={logOut}>Salir</MenuItem>
              </MenuList>
            </Menu>
          </Stack>
        </Flex>
      </Flex>
    </Box>
  )
}
