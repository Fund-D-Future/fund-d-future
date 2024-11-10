"use server"

import { env } from "env.mjs"
import { signupFormSchema, FormState } from "lib/definitions"
import { User } from "types/user"
import { createApiClient } from "utils/api"

export async function signup(state: FormState, formData: FormData) {
  const data = Object.fromEntries(formData.entries())
  console.log(data)

  // Validate form data
  const result = signupFormSchema.safeParse(data)
  if (!result.success) {
    console.log(result.error.flatten().fieldErrors)
    return { errors: result.error.flatten().fieldErrors }
  }

  // TODO: Submit data without confirmPassword field to the API
  delete data.confirmPassword
  console.log(data)
}

export async function sendResetPasswordLink(formData: FormData) {
  const data = Object.fromEntries(formData.entries())
  console.log(data)
}

export async function getUserData() {
  const api = await createApiClient()
  const response = await api.fetch(`${env.API_URL}/user/user-details`)

  if (!response.ok) {
    throw new Error("Failed to fetch user data")
  }

  return response.json() as Promise<User>
}
