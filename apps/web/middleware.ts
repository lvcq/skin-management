import type { NextRequest } from 'next/server'


 
export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get('access_token')?.value
 
 
  if (!currentUser && !request.nextUrl.pathname.startsWith('/login') && !request.nextUrl.pathname.startsWith("/initialize")) {
    return Response.redirect(new URL('/login', request.url))
  }
}
 
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}