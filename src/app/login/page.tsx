'use client'

import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Mail, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const router = useRouter()
  const supabase = createClient()
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [error, setError] = React.useState<string | null>(null)
  const [loading, setLoading] = React.useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (signInError) {
        setError(signInError.message)
      } else if (data.user) {
        // Redirect based on role in user metadata
        const role = data.user.app_metadata?.role || 'devotee'
        const redirectMap: Record<string, string> = {
          super_admin: '/super-admin/overview',
          temple_admin: '/dashboard',
          staff: '/dashboard',
          devotee: '/my-dashboard',
        }
        router.push(redirectMap[role] || '/dashboard')
        router.refresh()
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 flex flex-col items-center justify-center p-4">
      {/* Back to Home Link */}
      <Link
        href="/"
        className="absolute top-6 left-6 inline-flex items-center space-x-1.5 text-xs font-semibold text-stone-500 hover:text-saffron-600 dark:hover:text-saffron-400 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Home</span>
      </Link>

      <div className="w-full max-w-md bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-850 rounded-2xl shadow-xl p-8 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-saffron-500/10 mb-2">
            <span className="text-2xl">🕉️</span>
          </div>
          <h1 className="font-heading text-2xl font-bold tracking-tight text-stone-900 dark:text-white">
            Welcome Back
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
            Sign in to access your MandirAI OS account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          {error && (
            <div className="p-3.5 rounded-lg bg-red-50 text-red-600 border border-red-200 text-xs font-medium dark:bg-red-950/20 dark:border-red-900/30">
              {error}
            </div>
          )}

          <Input
            type="email"
            label="Email Address"
            placeholder="name@temple.org"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            leftIcon={<Mail className="h-4 w-4" />}
          />

          <Input
            type="password"
            label="Password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            leftIcon={<Lock className="h-4 w-4" />}
          />

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center space-x-2 text-stone-600 dark:text-stone-400">
              <input type="checkbox" className="rounded border-stone-300 text-saffron-600 focus:ring-saffron-500" />
              <span>Remember me</span>
            </label>
            <Link
              href="/forgot-password"
              className="font-medium text-saffron-600 hover:underline dark:text-saffron-400"
            >
              Forgot password?
            </Link>
          </div>

          <Button type="submit" className="w-full font-semibold h-11" loading={loading}>
            Sign In
          </Button>
        </form>

        {/* Footer */}
        <div className="text-center text-xs text-stone-500 pt-4 border-t border-stone-100 dark:border-stone-850">
          <span>Don't have an account? </span>
          <Link
            href="/register"
            className="font-bold text-saffron-600 hover:underline dark:text-saffron-400"
          >
            Register your Temple
          </Link>
        </div>
      </div>
    </div>
  )
}
