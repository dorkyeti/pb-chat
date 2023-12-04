import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react'
import { AuthContext } from '../contexts/Auth.context'
import { User } from '../interfaces/User.interface'
import { usePocketBase } from '../hooks/usePocketbase'

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const pocketBase = usePocketBase()
  const [user, setUser] = useState<User>(pocketBase!.authStore.model as User)
  const [isLoggedIn, setIsLoggedIn] = useState(
    pocketBase!.authStore.token != ''
  )

  useEffect(() => {
    pocketBase!.authStore.onChange((token: string, model: any) => {
      setUser(model as User)
      setIsLoggedIn(token != '')
    })
  }, [])

  const forgotPassword = useCallback(async (email: string) => {
    await pocketBase!.collection('users').requestPasswordReset(email)
  }, [])

  const logIn = useCallback(async (userOrEmail: string, password: string) => {
    await pocketBase!
      .collection('users')
      .authWithPassword(userOrEmail, password)
  }, [])

  const logOut = useCallback(async () => {
    await pocketBase!.authStore.clear()
  }, [])

  const signUp = useCallback(
    async (values: User & { password: string; passwordConfirm: string }) => {
      await pocketBase!.collection('users').create(values)
    },
    []
  )

  const verifyEmail = useCallback(async (token: string) => {
    await pocketBase!.collection('users').confirmVerification(token)
  }, [])

  const values = useMemo(
    () => ({
      forgotPassword,
      isLoggedIn,
      logIn,
      logOut,
      signUp,
      user,
      verifyEmail
    }),
    [isLoggedIn, forgotPassword, logIn, logOut, signUp, user, verifyEmail]
  )

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}
