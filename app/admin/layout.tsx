import type { Metadata } from 'next'
import { getSession } from '@/lib/session'
import AdminNavbar from '@/components/admin/AdminNavbar'

export const instant = false

export const metadata: Metadata = {
  title: 'Admin — WERTIX',
  robots: { index: false, follow: false },
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Session is verified by proxy.ts — this layout provides the shell
  const session = await getSession()

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {session?.adminId && <AdminNavbar session={session} />}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-screen-xl mx-auto w-full pb-24 md:pb-8">
        {children}
      </main>
    </div>
  )
}
