import { NextRequest, NextResponse } from 'next/server'
import { deleteSession } from '@/lib/session'

export async function POST(req: NextRequest) {
  // CSRF Origin verification defense
  const origin = req.headers.get('origin')
  const host = req.headers.get('host')
  if (origin && host) {
    try {
      const originHost = new URL(origin).host
      if (originHost !== host) {
        return new NextResponse('Forbidden: Invalid Origin', { status: 403 })
      }
    } catch {
      return new NextResponse('Bad Request: Malformed Origin', { status: 400 })
    }
  }

  await deleteSession()
  return NextResponse.redirect(new URL('/admin/login', req.nextUrl.origin))
}
