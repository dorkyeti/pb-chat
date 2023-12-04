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

import { useRegister } from '../../../hooks/pages/useRegister'
import { Link } from '../../components/Link'
import { route } from '../../../services/routes'

export const Register: FC = () => {
  const { bg, formState, onInputChange, onSubmit, submitting } = useRegister()

  return (
    <Box maxW='md' mx='auto'>
      <form onSubmit={onSubmit}>
        <Stack spacing={4} p={8} backgroundColor={bg} boxShadow='lg'>
          <FormControl id='name'>
            <FormLabel>Nombre</FormLabel>
            <Input
              type='text'
              id='name'
              name='name'
              onInput={onInputChange}
              value={formState.name}
              required
            />
          </FormControl>
          <FormControl id='email'>
            <FormLabel>Email</FormLabel>
            <Input
              type='email'
              id='email'
              name='email'
              onInput={onInputChange}
              value={formState.email}
              required
            />
          </FormControl>
          <FormControl id='password'>
            <FormLabel>Contraseña</FormLabel>
            <Input
              type='password'
              name='password'
              id='password'
              onInput={onInputChange}
              value={formState.password}
              required
            />
          </FormControl>
          <Button
            colorScheme='teal'
            size='lg'
            fontSize='md'
            type='submit'
            disabled={!submitting}
          >
            {submitting ? 'Cargando...' : 'Registrarse'}
          </Button>
          <Center>
            <b>
              <Link to={route('login')!}>¿Ya tienes cuenta?</Link>
            </b>
          </Center>
        </Stack>
      </form>
    </Box>
  )
}
