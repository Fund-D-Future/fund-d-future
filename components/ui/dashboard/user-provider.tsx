"use client"

import { useState, useCallback, createContext, useContext } from "react"
import { User } from "types/user"
import { getUserData } from "app/actions/auth"

interface UserContextType {
  user: User
  refreshUserData: () => Promise<void>
}

interface UserProviderProps {
  initialUser: User
  children: React.ReactNode
}

export const UserContext = createContext<UserContextType | null>(null)

export function useUser() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}

export function UserProvider({ initialUser, children }: UserProviderProps) {
  const [user, setUser] = useState(initialUser)

  const refreshUserData = useCallback(async () => {
    const userData = await getUserData()
    setUser(userData)
  }, [])

  return <UserContext.Provider value={{ user, refreshUserData }}>{children}</UserContext.Provider>
}
