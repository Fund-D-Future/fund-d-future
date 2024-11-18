"use server"

import { getIronSession } from "iron-session"
import { cookies } from "next/headers"
import { jwtDecode } from "jwt-decode"
import { env } from "env.mjs"

interface SessionData {
  accessToken: string
  refreshToken: string
  lastActivity: number
}

const sessionOptions = {
  password: env.IRON_SESSION_PASSWORD,
  cookieName: "fdf-session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "strict" as const,
  },
}

interface JWTPayload {
  exp: number
}

async function refreshTokens(refreshToken: string): Promise<{ accessToken: string; refreshToken: string } | null> {
  try {
    const response = await fetch(`${env.API_URL}/auth/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    })

    if (!response.ok) {
      return null
    }

    return response.json() as Promise<{ accessToken: string; refreshToken: string }>
  } catch (error) {
    return null
  }
}

export async function getSession() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions)
  if (!session.accessToken || !session.refreshToken) {
    return null
  }

  // Check if the access token is expired
  try {
    const decoded = jwtDecode<JWTPayload>(session.accessToken)
    const isAccessTokenExpired = Date.now() >= decoded.exp * 1000

    if (isAccessTokenExpired) {
      // Refresh the tokens
      const newTokens = await refreshTokens(session.refreshToken)
      if (!newTokens) {
        session.destroy()
        return null
      }

      await saveSession(newTokens)
    }

    return session
  } catch (error) {
    return null
  }
}

export async function saveSession(session: Omit<SessionData, "lastActivity">) {
  const ironSession = await getIronSession<SessionData>(cookies(), sessionOptions)

  // Update the session with the new tokens
  ironSession.accessToken = session.accessToken
  ironSession.refreshToken = session.refreshToken
  ironSession.lastActivity = Date.now()

  await ironSession.save()
}
