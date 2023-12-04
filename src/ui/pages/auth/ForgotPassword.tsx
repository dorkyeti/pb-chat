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

import { Link } from '../../components/Link'
import { route } from '../../../services/routes'
import { useForgotPassword } from '../../../hooks/pages/useForgotPassword'

export const ForgotPassword: FC = () => {
  const { bg, email, onInputChange, onSubmit, submitting } = useForgotPassword()
  return (
    <Box maxW='md' mx='auto'>
      <form onSubmit={onSubmit}>
        <Stack spacing={4} p={8} backgroundColor={bg} boxShadow='lg'>
          <FormControl id='email'>
            <FormLabel>Correo</FormLabel>
            <Input
              type='email'
              name='email'
              id='email'
              onInput={onInputChange}
              value={email}
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
            {submitting ? 'Procesando' : 'Enviar'}
          </Button>
          <Center>
            <b>
              <Link to={route('login')!}>¿Recordaste tu contraseña?</Link>
            </b>
          </Center>
        </Stack>
      </form>
    </Box>
  )
}
