"use server"

import { env } from "env.mjs"
import { signupFormSchema, FormState, SignupForm } from "lib/definitions"
import { saveSession } from "lib/session"
import { redirect, RedirectType } from "next/navigation"
import { RoutesMap } from "types/routes"
import { User } from "types/user"
import { createApiClient } from "utils/api"

export async function signup(state: FormState<SignupForm>, formData: FormData) {
  try {
    const data: Record<string, unknown> = {}
    for await (const [key, value] of formData.entries()) {
      if (!key.startsWith("$")) {
        data[key] = value
      }
    }

    const result = signupFormSchema.safeParse(data)
    if (!result.success) {
      return { errors: result.error.flatten().fieldErrors }
    }

    // Remove confirmPassword field before sending the data
    delete data.confirmPassword
    const response = await fetch(`${env.API_URL}/auth/register`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })

    if (!response.ok) {
      throw new Error("Registration failed")
    }

    // store access and refresh tokens as cookies
    const { access_token: accessToken, refresh_token: refreshToken } = (await response.json()) as {
      access_token: string
      refresh_token: string
    }
    // store tokens in cookies
    await saveSession({ accessToken, refreshToken })

    // redirect to dashboard after successful registration
    redirect(RoutesMap.ONBOARDING + "/complete", RedirectType.replace)
  } catch (error: any) {
    if (error.message && error.message.includes("NEXT_REDIRECT")) {
      throw error
    }

    return { message: (error as Error).message }
  }
}

export async function sendResetPasswordLink(formData: FormData) {
  const data = Object.fromEntries(formData.entries())
  try {
    const response = await fetch(`${env.API_URL}/users/forgot-password`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })

    if (!response.ok) {
      throw new Error("Failed to send reset password link")
    }
  } catch (error) {
    return { message: (error as Error).message }
  }
}

export async function resetPassword({ token, password, email }: { token: string; password: string; email: string }) {
  const response = await fetch(`${env.API_URL}/users/reset-password?token=${token}`, {
    method: "PUT",
    body: JSON.stringify({ password, email }),
    headers: { "Content-Type": "application/json" },
  })

  if (!response.ok) {
    throw new Error("Failed to reset password")
  }

  // redirect to login page after successful password reset
  redirect(RoutesMap.LOGIN)
}

export async function getUserData(throwError = true) {
  const api = await createApiClient()
  const response = await api.fetch(`${env.API_URL}/users/user-details`)
  if (!response.ok && throwError) {
    throw new Error("Failed to fetch user data")
  }

  if (!response.ok) {
    return null
  }

  try {
    const { body: user } = (await response.json()) as { body: User }
    return user
  } catch (error) {
    if (error instanceof SyntaxError || !throwError) {
      return null
    }

    throw error
  }
}

export async function loginUser(email: string, password: string) {
  try {
    const response = await fetch(`${env.API_URL}/auth/authenticate`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    })

    if (!response.ok) {
      throw new Error("Login failed")
    }

    const { access_token: accessToken, refresh_token: refreshToken } = (await response.json()) as {
      access_token: string
      refresh_token: string
    }
    // store tokens in cookies
    await saveSession({ accessToken, refreshToken })

    // redirect to dashboard after successful login
    redirect(RoutesMap.DASHBOARD)
  } catch (error: any) {
    if (error.message && error.message.includes("NEXT_REDIRECT")) {
      throw error
    }

    return { message: (error as Error).message, code: "LOGIN_FAILED" }
  }
}

export async function logoutUser() {
  const api = await createApiClient()
  const response = await api.fetch(`${env.API_URL}/auth/logout`)

  if (!response.ok) {
    throw new Error("Logout failed")
  }
}

export async function updateProfile(data: Partial<Omit<User, "id" | "email" | "role">>) {
  const api = await createApiClient()
  const response = await api.fetch(`${env.API_URL}/users/`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  })

  if (!response.ok) {
    throw new Error("Failed to update profile")
  }

  return true
}
