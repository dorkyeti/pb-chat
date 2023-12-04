import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'

import theme from './services/theme'
import { AuthProvider } from './providers/AuthProvider'
import { PocketBaseProvider } from './providers/PocketBaseProvider'
import { RouterProvider } from 'react-router-dom'
import { routes } from './services/routes'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PocketBaseProvider>
      <AuthProvider>
        <ChakraProvider>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <RouterProvider router={routes} />
        </ChakraProvider>
      </AuthProvider>
    </PocketBaseProvider>
  </React.StrictMode>
)
