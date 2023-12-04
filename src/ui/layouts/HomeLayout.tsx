import { FC } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { NavBar } from '../components/NavBar'
import { route } from '../../services/routes'
import { ChatsProvider } from '../../providers/ChatsProvider'

export const HomeLayout: FC = () => {
  const { isLoggedIn } = useAuth()

  if (!isLoggedIn) {
    return <Navigate to={route('login')!} />
  }

  return (
    <main>
      <ChatsProvider>
        <NavBar />
        <Outlet />
      </ChatsProvider>
    </main>
  )
}
