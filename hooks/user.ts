import { useContext } from 'react'
import { UserContext } from '@/context/userContext'
import { type UserContextData } from '@/types/user.types'

export function useUser() {
  return useContext(UserContext) as UserContextData
}
