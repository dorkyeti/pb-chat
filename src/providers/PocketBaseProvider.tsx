import { PropsWithChildren } from 'react'
import { PocketBaseContext } from '../contexts/PocketBase.context'
import pb from '../services/pb'

export const PocketBaseProvider = ({ children }: PropsWithChildren) => {
  return (
    <PocketBaseContext.Provider value={pb}>
      {children}
    </PocketBaseContext.Provider>
  )
}
