import { getSession } from "lib/session"

export async function createApiClient() {
  const session = await getSession()

  return {
    async fetch(url: string, options: RequestInit = {}) {
      if (!session?.accessToken) {
        throw new Error("No valid session found")
      }

      const headers = new Headers(options.headers)
      headers.set("Authorization", `Bearer ${session.accessToken}`)

      const response = await fetch(url, {
        ...options,
        headers,
      })

      if (response.status === 401) {
        // Token might have expired during the request
        // Get a fresh session and try again
        const newSession = await getSession()
        if (!newSession) {
          throw new Error("Session expired")
        }

        headers.set("Authorization", `Bearer ${newSession.accessToken}`)
        return fetch(url, {
          ...options,
          headers,
        })
      }

      return response
    },
  }
}