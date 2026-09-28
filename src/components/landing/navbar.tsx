'use client'

import * as React from 'react'
import Link from 'next/link'
import { Menu, X, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils/cn'
import { useLanguage } from '@/components/shared/language-context'
import LanguageSwitcher from '@/components/shared/language-switcher'
import LaunchBanner from '@/components/landing/launch-banner'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const { t, isKannada } = useLanguage()

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
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-40 w-full transition-all duration-300 border-b border-transparent',
          isScrolled
            ? 'bg-white/90 dark:bg-stone-950/90 backdrop-blur-md shadow-sm border-stone-200/50 dark:border-stone-800/30'
            : 'bg-transparent'
        )}
      >
        {/* Top Launch Discount Banner */}
        <LaunchBanner />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center group">
              <img 
                src="/logo-long.png" 
                alt="MandirAI OS - Intelligent Temple Operating System" 
                className="h-12 sm:h-14 w-auto max-w-[200px] sm:max-w-[220px] object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-7">
              <Link
                href="#features"
                className="text-sm font-medium text-stone-600 hover:text-saffron-600 dark:text-stone-300 dark:hover:text-saffron-400 transition-colors"
              >
                {t('nav.features')}
              </Link>
              <Link
                href="#how-it-works"
                className="text-sm font-medium text-stone-600 hover:text-saffron-600 dark:text-stone-300 dark:hover:text-saffron-400 transition-colors"
              >
                {t('nav.howItWorks')}
              </Link>
              <Link
                href="#pricing"
                className="text-sm font-medium text-stone-600 hover:text-saffron-600 dark:text-stone-300 dark:hover:text-saffron-400 transition-colors"
              >
                {t('nav.pricing')}
              </Link>
              <Link
                href="#about"
                className="text-sm font-medium text-stone-600 hover:text-saffron-600 dark:text-stone-300 dark:hover:text-saffron-400 transition-colors"
              >
                {t('nav.about')}
              </Link>
            </nav>

            {/* CTAs & Language Switcher */}
            <div className="hidden md:flex items-center space-x-3">
              {/* Language Switcher */}
              <LanguageSwitcher />

              <Link href="/login">
                <Button variant="ghost" className="text-stone-700 dark:text-stone-350 text-xs sm:text-sm font-medium">
                  {t('nav.login')}
                </Button>
              </Link>

              {/* Special ₹299 Launch Offer CTA */}
              <Link href="/onboarding?plan=launch-299">
                <Button className="bg-gradient-to-r from-saffron-600 to-amber-600 hover:from-saffron-500 hover:to-amber-500 text-white font-bold shadow-md shadow-saffron-500/20 hover:scale-105 transition-all text-xs sm:text-sm gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-yellow-200" />
                  <span>{t('nav.claim299')}</span>
                </Button>
              </Link>
            </div>

            {/* Mobile Actions: Lang switcher + Menu Button */}
            <div className="flex items-center gap-2 md:hidden">
              <LanguageSwitcher />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-stone-500 hover:text-stone-700 hover:bg-stone-100 dark:hover:bg-stone-900 focus:outline-none"
                aria-label="Toggle navigation menu"
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
            'md:hidden fixed inset-x-0 top-[110px] z-30 w-full border-b border-stone-200 bg-white/98 px-5 pt-4 pb-6 shadow-2xl backdrop-blur-xl dark:border-stone-850 dark:bg-stone-950/98 transition-all duration-300 ease-in-out',
            isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
          )}
        >
          <div className="space-y-4 flex flex-col">
            <Link
              href="#features"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-base font-semibold text-stone-700 hover:text-saffron-600 dark:text-stone-200"
            >
              {t('nav.features')}
            </Link>
            <Link
              href="#how-it-works"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-base font-semibold text-stone-700 hover:text-saffron-600 dark:text-stone-200"
            >
              {t('nav.howItWorks')}
            </Link>
            <Link
              href="#pricing"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-base font-semibold text-stone-700 hover:text-saffron-600 dark:text-stone-200"
            >
              {t('nav.pricing')}
            </Link>
            <Link
              href="#about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-base font-semibold text-stone-700 hover:text-saffron-600 dark:text-stone-200"
            >
              {t('nav.about')}
            </Link>

            <div className="border-t border-stone-200 dark:border-stone-800 pt-4 flex flex-col space-y-3">
              <Link href="/onboarding?plan=launch-299" onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="w-full bg-gradient-to-r from-saffron-600 to-amber-600 text-white font-bold gap-2">
                  <Sparkles className="h-4 w-4 text-yellow-200" />
                  <span>{t('nav.claim299')}</span>
                </Button>
              </Link>
              <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full font-medium">
                  {t('nav.login')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

