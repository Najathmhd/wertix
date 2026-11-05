'use client'

import { useActionState } from 'react'
import { loginAction } from '@/app/actions/auth'
import type { AuthActionState } from '@/app/actions/auth'
import { WertixMark } from '@/components/Logo'

export default function AdminLoginPage() {
  const [state, action, pending] = useActionState<AuthActionState, FormData>(
    loginAction,
    undefined
  )

  return (
    <div className="min-h-screen bg-[#090D1A] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center justify-center text-center mb-8">
          <WertixMark className="w-10 h-10 mb-3" variant="light" />
          <span className="text-white font-bold text-2xl tracking-tight">WERTIX</span>
          <p className="text-slate-400 text-sm mt-1">Admin Portal</p>
        </div>

        {/* Login card */}
        <div className="bg-white rounded-2xl p-8 shadow-2xl">
          <h1 className="text-xl font-bold text-[#090D1A] mb-6">Sign in</h1>

          {state?.errors?.form && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
              {state.errors.form.join(' ')}
            </div>
          )}

          <form action={action} className="space-y-4">
            {/* Email */}
            <div>
              <label
                htmlFor="admin-email"
                className="block text-xs font-semibold text-slate-700 mb-1.5"
              >
                Email address
              </label>
              <input
                id="admin-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0055e5] focus:border-transparent transition-all"
                placeholder="admin@wertix.lk"
              />
              {state?.errors?.email && (
                <p className="mt-1 text-xs text-red-600">{state.errors.email[0]}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="admin-password"
                className="block text-xs font-semibold text-slate-700 mb-1.5"
              >
                Password
              </label>
              <input
                id="admin-password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0055e5] focus:border-transparent transition-all"
                placeholder="••••••••"
              />
              {state?.errors?.password && (
                <p className="mt-1 text-xs text-red-600">
                  {state.errors.password[0]}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={pending}
              className="w-full py-2.5 rounded-lg bg-[#090D1A] text-white text-sm font-semibold hover:bg-[#0055e5] active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {pending ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-slate-500 mt-6">
          WERTIX internal platform — restricted access only
        </p>
      </div>
    </div>
  )
}
