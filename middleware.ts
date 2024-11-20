import { NextResponse, type NextRequest } from "next/server"
import { getSession } from "lib/session"
import { RoutesMap } from "types/routes"

const PROTECTED_ROUTES = ["/dashboard"]

export async function middleware(req: NextRequest) {
  try {
    const isProtectedRoute = PROTECTED_ROUTES.some((route) => req.nextUrl.pathname.startsWith(route))
    if (isProtectedRoute) {
      const session = await getSession()
      if (!session) {
        return NextResponse.redirect(new URL(RoutesMap.LOGIN, req.url))
      }
    }

    return NextResponse.next()
  } catch {
    return Response.error()
  }
}

export const config = {
  matcher: ["/dashboard/:path*"],
}
