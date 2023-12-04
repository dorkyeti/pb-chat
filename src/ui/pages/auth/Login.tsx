import { FC } from 'react'
import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  Stack
} from '@chakra-ui/react'

import { useLogin } from '../../../hooks/pages/useLogin'
import { Link } from '../../components/Link'
import { route } from '../../../services/routes'

export const Login: FC = () => {
  const { bg, onInputChange, onSubmit, password, submitting, username } =
    useLogin()

  return (
    <Box maxW='md' mx='auto'>
      <form onSubmit={onSubmit}>
        <Stack spacing={4} p={8} backgroundColor={bg} boxShadow='lg'>
          <FormControl id='username'>
            <FormLabel>Correo o usuario</FormLabel>
            <Input
              type='text'
              name='username'
              id='username'
              onInput={onInputChange}
              value={username}
              required
            />
          </FormControl>
          <FormControl id='password'>
            <FormLabel>Password</FormLabel>
            <Input
              type='password'
              name='password'
              id='password'
              onInput={onInputChange}
              value={password}
              required
            />
          </FormControl>
          <Button
            colorScheme='teal'
            size='lg'
            fontSize='md'
            type='submit'
            disabled={submitting}
          >
            {submitting ? 'Ingresando...' : 'Entrar'}
          </Button>
          <Center>
            <b>
              <Link to={route('register')!}>¿No tienes cuenta?</Link>
            </b>
          </Center>
          <Center>
            <b>
              <Link to={route('forgot_password')!}>
                ¿Olvidaste la contraseña?
              </Link>
            </b>
          </Center>
        </Stack>
      </form>
    </Box>
  )
}
