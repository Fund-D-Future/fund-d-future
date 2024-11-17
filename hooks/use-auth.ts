import { useCallback } from "react"
import useStore from "../lib/stores/app-store"
import { User } from "types/user"

export function useAuth() {
  const user = useStore((state) => state.user)
  const loading = useStore((state) => state.loading)
  const error = useStore((state) => state.error)
  const refreshUser = useStore((state) => state.refreshUser)
  const clearError = useStore((state) => state.clearError)

  const isAuthenticated = Boolean(user)

  const hasRole = useCallback(
    (role: User["role"]) => {
      return user?.role === role
    },
    [user]
  )

  return {
    user,
    loading,
    error,
    isAuthenticated,
    hasRole,
    refreshUser,
    clearError,
  }
}
