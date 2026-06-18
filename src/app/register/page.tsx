'use client'

import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, User, Mail, Lock, Building } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { createClient } from '@/lib/supabase/client'

export default function RegisterPage() {
  const router = useRouter()
  const supabase = createClient()
  const [fullName, setFullName] = React.useState('')
  const [templeName, setTempleName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [error, setError] = React.useState<string | null>(null)
  const [loading, setLoading] = React.useState(false)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      // 1. Sign up user using Supabase auth
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      })

      if (signUpError) {
        setError(signUpError.message)
      } else if (data.user) {
        // Typically, we would write temple creation logic here (e.g. call API route)
        // Since we are building SaaS platform, the user gets redirected to dashboard onboarding
        // Let's set metadata role via a trigger or database row, and send user to dashboard.
        router.push('/onboarding')
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
            Register Your Temple
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
            Get started with MandirAI OS and digitize your operations
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleRegister} className="space-y-4">
          {error && (
            <div className="p-3.5 rounded-lg bg-red-50 text-red-600 border border-red-200 text-xs font-medium dark:bg-red-950/20 dark:border-red-900/30">
              {error}
            </div>
          )}

          <Input
            type="text"
            label="Your Full Name"
            placeholder="Aadesh Sharma"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            leftIcon={<User className="h-4 w-4" />}
          />

          <Input
            type="text"
            label="Temple Name"
            placeholder="Shree Siddhivinayak Temple"
            value={templeName}
            onChange={(e) => setTempleName(e.target.value)}
            required
            leftIcon={<Building className="h-4 w-4" />}
          />

          <Input
            type="email"
            label="Admin Email Address"
            placeholder="admin@temple.org"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            leftIcon={<Mail className="h-4 w-4" />}
          />

          <Input
            type="password"
            label="Create Password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            leftIcon={<Lock className="h-4 w-4" />}
          />

          <div className="text-xs text-stone-550 dark:text-stone-400 leading-relaxed">
            By signing up, you agree to our{' '}
            <a href="#" className="font-semibold text-saffron-600 dark:text-saffron-400 hover:underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="font-semibold text-saffron-600 dark:text-saffron-400 hover:underline">
              Privacy Policy
            </a>
            .
          </div>

          <Button type="submit" className="w-full font-semibold h-11" loading={loading}>
            Create Account
          </Button>
        </form>

        {/* Footer */}
        <div className="text-center text-xs text-stone-500 pt-4 border-t border-stone-100 dark:border-stone-850">
          <span>Already have an account? </span>
          <Link
            href="/login"
            className="font-bold text-saffron-600 hover:underline dark:text-saffron-400"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  )
}
