'use client'

import * as React from 'react'
import Link from 'next/link'
import { ArrowLeft, Mail, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { createClient } from '@/lib/supabase/client'

export default function ForgotPasswordPage() {
  const supabase = createClient()
  const [email, setEmail] = React.useState('')
  const [error, setError] = React.useState<string | null>(null)
  const [sent, setSent] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })
      if (resetError) {
        setError(resetError.message)
      } else {
        setSent(true)
      }
    } catch {
      setError('An unexpected error occurred.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 flex flex-col items-center justify-center p-4">
      <Link
        href="/login"
        className="absolute top-6 left-6 inline-flex items-center space-x-1.5 text-xs font-semibold text-stone-500 hover:text-saffron-600 dark:hover:text-saffron-400 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Login</span>
      </Link>

      <div className="w-full max-w-md bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-xl p-8 space-y-6">
        {sent ? (
          <div className="text-center space-y-4 py-4">
            <div className="flex justify-center">
              <CheckCircle className="h-14 w-14 text-emerald-500" />
            </div>
            <h1 className="font-heading text-2xl font-bold text-stone-900 dark:text-white">
              Check Your Email
            </h1>
            <p className="text-sm text-stone-500 dark:text-stone-400">
              We sent a password reset link to{' '}
              <span className="font-semibold text-stone-700 dark:text-stone-300">{email}</span>.
              Click the link in the email to reset your password.
            </p>
            <Link
              href="/login"
              className="inline-block mt-2 text-sm font-bold text-saffron-600 hover:underline dark:text-saffron-400"
            >
              Return to Login
            </Link>
          </div>
        ) : (
          <>
            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-saffron-500/10 mb-2">
                <span className="text-2xl">🔑</span>
              </div>
              <h1 className="font-heading text-2xl font-bold tracking-tight text-stone-900 dark:text-white">
                Forgot Password?
              </h1>
              <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
                Enter your email and we&apos;ll send you a reset link.
              </p>
            </div>

            <form onSubmit={handleReset} className="space-y-4">
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

              <Button type="submit" className="w-full font-semibold h-11" loading={loading}>
                Send Reset Link
              </Button>
            </form>

            <div className="text-center text-xs text-stone-500 pt-4 border-t border-stone-100 dark:border-stone-800">
              <span>Remember your password? </span>
              <Link
                href="/login"
                className="font-bold text-saffron-600 hover:underline dark:text-saffron-400"
              >
                Sign In
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
