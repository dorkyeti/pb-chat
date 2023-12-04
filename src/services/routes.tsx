import { createBrowserRouter } from 'react-router-dom'

import { HomeLayout } from '../ui/layouts/HomeLayout'
import { HomePage } from '../ui/pages/HomePage'
import { Login } from '../ui/pages/auth/Login'
import { Register } from '../ui/pages/auth/Register'
import { ForgotPassword } from '../ui/pages/auth/ForgotPassword'

import { Error404 } from '../ui/pages/Error404'
import { VerifyEmail } from '../ui/pages/auth/VerifyEmail'
import { ChatPage } from '../ui/pages/ChatPage'

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    children: [
      {
        path: '/home',
        element: <HomePage />
      },
      {
        path: '/chat/:chatId',
        element: <ChatPage />
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/forgot_password',
    element: <ForgotPassword />
  },
  {
    path: '/verify_email/:token',
    element: <VerifyEmail />
  },
  {
    path: '*',
    element: <Error404 />
  }
])

const routesNames = [
  { name: 'home', route: '/home' },
  { name: 'login', route: '/login' },
  { name: 'register', route: '/register' },
  { name: 'forgot_password', route: '/forgot_password' },
  { name: 'chat', route: '/chat/:chatId' }
]

export function route (
  name: string,
  params?: { [name: string]: string }
): string | null {
  let route =
    routesNames.find(route => {
      return route.name == name
    })?.route ?? null

  if (route == null) return null

  return Object.entries(params ?? {}).reduce((accumulator, current) => {
    return accumulator.replace(`:${current[0]}`, current[1])
  }, route)
}
