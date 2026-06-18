import * as React from 'react'
import Link from 'next/link'
import { ShieldAlert, ArrowLeft } from 'lucide-react'

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md space-y-6">
        <div className="flex justify-center">
          <div className="h-20 w-20 rounded-full bg-red-50 border border-red-100 flex items-center justify-center">
            <ShieldAlert className="h-10 w-10 text-red-500" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="font-heading text-3xl font-black text-stone-900 dark:text-white">
            Access Restricted
          </h1>
          <p className="text-stone-500 dark:text-stone-400 text-sm leading-relaxed">
            You do not have the necessary permissions to access this area.
            Please log in with an account that has the required role, or
            contact the platform administrator.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Link
            href="/login"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-saffron-600 hover:bg-saffron-700 text-white font-bold text-sm transition-colors shadow-md shadow-saffron-600/20"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Login
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-stone-200 hover:bg-stone-100 text-stone-700 font-semibold text-sm transition-colors"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  )
}
