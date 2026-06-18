'use client'

import * as React from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils/cn'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-40 w-full transition-all duration-500 border-b border-transparent',
        isScrolled
          ? 'bg-white/80 dark:bg-stone-950/80 backdrop-blur-md shadow-sm border-stone-200/50 dark:border-stone-800/30 py-3'
          : 'bg-transparent py-5'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <span className="text-2xl font-bold tracking-tight text-saffron-500 group-hover:scale-105 transition-transform duration-300">🕉️</span>
            <span className="font-heading text-xl font-bold bg-gradient-to-r from-saffron-500 via-gold-500 to-maroon-600 bg-clip-text text-transparent dark:to-saffron-400">
              MandirAI OS
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="#features"
              className="text-sm font-medium text-stone-600 hover:text-saffron-600 dark:text-stone-300 dark:hover:text-saffron-400 transition-colors"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium text-stone-600 hover:text-saffron-600 dark:text-stone-300 dark:hover:text-saffron-400 transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium text-stone-600 hover:text-saffron-600 dark:text-stone-300 dark:hover:text-saffron-400 transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="#about"
              className="text-sm font-medium text-stone-600 hover:text-saffron-600 dark:text-stone-300 dark:hover:text-saffron-400 transition-colors"
            >
              About
            </Link>
          </nav>

          {/* CTAs */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost" className="text-stone-700 dark:text-stone-350">Login</Button>
            </Link>
            <Link href="/register">
              <Button>Get Started Free</Button>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-stone-400 hover:text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-900 focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'md:hidden fixed inset-x-0 top-[57px] z-30 w-full border-b border-stone-200 bg-white/95 px-4 pt-4 pb-6 shadow-lg backdrop-blur-lg dark:border-stone-850 dark:bg-stone-950/95 transition-all duration-300 ease-in-out',
          isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        )}
      >
        <div className="space-y-4 flex flex-col">
          <Link
            href="#features"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-base font-medium text-stone-600 hover:text-saffron-600 dark:text-stone-300"
          >
            Features
          </Link>
          <Link
            href="#how-it-works"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-base font-medium text-stone-600 hover:text-saffron-600 dark:text-stone-300"
          >
            How It Works
          </Link>
          <Link
            href="#pricing"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-base font-medium text-stone-600 hover:text-saffron-600 dark:text-stone-300"
          >
            Pricing
          </Link>
          <Link
            href="#about"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-base font-medium text-stone-600 hover:text-saffron-600 dark:text-stone-300"
          >
            About
          </Link>
          <div className="border-t border-stone-100 dark:border-stone-850 pt-4 flex flex-col space-y-3">
            <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
              <Button variant="outline" className="w-full">Login</Button>
            </Link>
            <Link href="/register" onClick={() => setIsMobileMenuOpen(false)}>
              <Button className="w-full">Get Started Free</Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
