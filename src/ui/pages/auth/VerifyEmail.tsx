import { FC } from 'react'
import { useParams } from 'react-router-dom'
// import { useAuth } from '../../../hooks/useAuth'

export const VerifyEmail: FC = () => {
  const { token } = useParams<{ token: string }>()
  // const auth = useAuth()
  return <div>hoooo {token}</div>
}
