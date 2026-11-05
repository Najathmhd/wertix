import { NextRequest, NextResponse } from 'next/server'
import { decrypt } from './lib/session'

// Routes that require authentication
const ADMIN_ROUTES = ['/admin']
const AUTH_ROUTES = ['/admin/login']

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl

  const isAdminRoute = ADMIN_ROUTES.some(
    (r) => pathname === r || pathname.startsWith(r + '/')
  )
  const isAuthRoute = AUTH_ROUTES.some((r) => pathname === r)

  const sessionToken =
    req.cookies.get('wertix_session')?.value ??
    req.cookies.get('itx_session')?.value
  const session = await decrypt(sessionToken)

  // If trying to access admin routes but not authenticated → redirect to login
  if (isAdminRoute && !isAuthRoute && !session?.adminId) {
    const loginUrl = new URL('/admin/login', req.nextUrl.origin)
    loginUrl.searchParams.set('from', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // If already authenticated and trying to access login → redirect to dashboard
  if (isAuthRoute && session?.adminId) {
    return NextResponse.redirect(new URL('/admin', req.nextUrl.origin))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Run on /admin routes; skip static assets and API routes
    '/admin/:path*',
    '/admin',
  ],
}
