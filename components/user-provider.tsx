"use client"

import { createContext, useEffect } from "react"
import { User } from "types/user"
import useStore from "lib/stores/app-store"

interface UserContextType {
  user: User
  refreshUserData: () => Promise<void>
}

interface UserProviderProps {
  initialUser: User
  children: React.ReactNode
}

export const UserContext = createContext<UserContextType | null>(null)

interface UserProviderProps {
  initialUser: User
  children: React.ReactNode
}

export function UserProvider({ initialUser, children }: UserProviderProps) {
  const setUser = useStore((state) => state.setUser)
  const refreshUser = useStore((state) => state.refreshUser)

  // Initialize store with user data from props
  useEffect(() => {
    setUser(initialUser)
  }, [initialUser, setUser])

  // Export the original context for backward compatibility
  const contextValue = {
    user: initialUser,
    refreshUserData: refreshUser,
  }

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
}
