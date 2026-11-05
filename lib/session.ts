import 'server-only'
import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

export interface SessionPayload {
  sessionId?: string
  adminId: string
  email: string
  name: string
  role: string
  expiresAt: Date
}

// Ensure session secret is present and at least 32 characters
const secretKey = process.env.SESSION_SECRET || 'dev_wertix_secure_session_secret_key_32_chars_min'
if (process.env.NODE_ENV === 'production' && (!process.env.SESSION_SECRET || process.env.SESSION_SECRET.length < 32)) {
  throw new Error('SESSION_SECRET environment variable must be at least 32 characters in production')
}

const encodedKey = new TextEncoder().encode(secretKey)

export async function encrypt(payload: SessionPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey)
}

export async function decrypt(
  token: string | undefined
): Promise<SessionPayload | null> {
  if (!token) return null
  try {
    const { payload } = await jwtVerify(token, encodedKey, {
      algorithms: ['HS256'],
    })
    return payload as unknown as SessionPayload
  } catch {
    return null
  }
}

export const SESSION_COOKIE = 'wertix_session'

export async function createSession(payload: Omit<SessionPayload, 'expiresAt' | 'sessionId'>) {
  const sessionId = crypto.randomUUID()
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

  const token = await encrypt({ ...payload, sessionId, expiresAt })
  const cookieStore = await cookies()

  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  })

  return sessionId
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE)?.value ?? cookieStore.get('itx_session')?.value
  return decrypt(token)
}

export async function updateSession() {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE)?.value ?? cookieStore.get('itx_session')?.value
  const payload = await decrypt(token)
  if (!payload || !token) return null

  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  })
}

export async function deleteSession() {
  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: new Date(0),
    sameSite: 'lax',
    path: '/',
  })
  cookieStore.delete('itx_session')
}
