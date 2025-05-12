import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Verificar si la ruta comienza con /admin y no es la página de login
  if (request.nextUrl.pathname.startsWith("/admin") && request.nextUrl.pathname !== "/admin") {
    // Aquí normalmente verificaríamos un token de sesión
    // Como no tenemos acceso a Firebase en el middleware, usaremos una cookie
    const session = request.cookies.get("admin_session")

    if (!session) {
      // Redirigir a la página de login si no hay sesión
      return NextResponse.redirect(new URL("/admin", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
