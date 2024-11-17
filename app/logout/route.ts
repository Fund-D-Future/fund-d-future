import { logoutUser } from "app/actions/auth"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { RoutesMap } from "types/routes"

export async function GET() {
  // Clear the tokens from the cookies
  const cookieStore = cookies()
  cookieStore.delete("access-token")
  cookieStore.delete("refresh-token")

  // Send a logout request to the server
  try {
    logoutUser()
  } catch {}

  // Redirect to the login page
  redirect(RoutesMap.LOGIN)
}
