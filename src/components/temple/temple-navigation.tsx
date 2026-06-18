'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Heart } from 'lucide-react'
import LanguageSwitcher from '@/components/shared/language-switcher'
import { Button } from '@/components/ui/button'
import { Dropdown, DropdownItem } from '@/components/ui/dropdown'
import { useLanguage, type Language } from '@/components/shared/language-context'
import { cn } from '@/lib/utils/cn'

interface TempleNavigationProps {
  temple: {
    id: string
    name: string
    slug: string
    upiId: string | null
  }
  pages: Array<{
    id: string
    pageType: string
    title: any
  }>
}

export default function TempleNavigation({ temple, pages }: TempleNavigationProps) {
  const pathname = usePathname()
  const { language, setLanguage, t } = useLanguage()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

  // Language display map
  const languageNames: Record<Language, string> = {
    en: 'English',
    hi: 'हिन्दी (Hindi)',
    kn: 'ಕನ್ನಡ (Kannada)',
    ta: 'தமிழ் (Tamil)',
    te: 'తెలుగు (Telugu)',
  }

  // Links list based on the pages generated
  const navLinks = [
    { label: { en: 'Home', hi: 'होम', kn: 'ಮುಖಪುಟ', ta: 'முகப்பு', te: 'హోమ్' }, path: `/temple/${temple.slug}` },
    { label: { en: 'About Us', hi: 'हमारे बारे में', kn: 'ನಮ್ಮ ಬಗ್ಗೆ', ta: 'எங்களைப் பற்றி', te: 'మా గురించి' }, path: `/temple/${temple.slug}/about` },
    { label: { en: 'History & Legend', hi: 'इतिहास', kn: 'ಇತಿಹಾಸ', ta: 'வரலாறு', te: 'చరిత్ర' }, path: `/temple/${temple.slug}/history` },
    { label: { en: 'Panchang', hi: 'पंचांग', kn: 'ಪಂಚಾಂಗ', ta: 'பஞ்சாங்கம்', te: 'పంచాంగం' }, path: `/temple/${temple.slug}/panchang` },
    { label: { en: 'Library', hi: 'पुस्तकालय', kn: 'ಗ್ರಂಥಾಲಯ', ta: 'நூலகம்', te: 'గ్రంధాలయం' }, path: `/temple/${temple.slug}/scriptures` },
    { label: { en: 'Contact', hi: 'संपर्क', kn: 'ಸಂಪರ್ಕ', ta: 'தொடர்பு', te: 'సంప్రదింపులు' }, path: `/temple/${temple.slug}/contact` },
  ]

  return (
    <header className="sticky top-0 z-40 w-full border-b border-stone-200/30 bg-white/95 dark:border-stone-900/95 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          
          {/* Logo / Title */}
          <Link href={`/temple/${temple.slug}`} className="flex items-center space-x-3 group">
            <div className="h-10 w-10 rounded-full bg-saffron-50 dark:bg-saffron-950/30 border border-saffron-200/50 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
              <span className="text-xl">🕉️</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-black text-stone-900 dark:text-white text-base tracking-wide leading-tight group-hover:text-saffron-600 transition-colors">
                {temple.name}
              </span>
              <span className="text-[9px] text-stone-400 font-bold uppercase tracking-widest mt-0.5">Official Portal</span>
            </div>
          </Link>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={cn(
                  'text-sm font-serif font-bold tracking-wide transition-all hover:text-saffron-600 dark:hover:text-saffron-400 py-2 relative group',
                  pathname === link.path
                    ? 'text-saffron-650 dark:text-saffron-400'
                    : 'text-stone-650 dark:text-stone-300'
                )}
              >
                {t(link.label)}
                {pathname === link.path ? (
                  <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-saffron-500 to-amber-500 rounded-full" />
                ) : (
                  <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-transparent group-hover:bg-saffron-200/55 rounded-full transition-colors" />
                )}
              </Link>
            ))}
          </nav>

          {/* Right actions (Lang switch + Donation button) */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Selector */}
            <LanguageSwitcher />
 
            {/* Donate Action */}
            <Link href={`/temple/${temple.slug}/donate`}>
              <Button size="sm" className="gradient-primary text-white font-serif font-black px-5 py-2.5 rounded-xl shadow-md shadow-saffron-500/10 hover:shadow-saffron-500/20 transition-all flex items-center gap-1.5" leftIcon={<Heart className="h-4 w-4 fill-white animate-pulse" />}>
                {t({ en: 'Donate Now', hi: 'दान करें', kn: 'ದೇಣಿಗೆ ನೀಡಿ', ta: 'நன்கொடை', te: 'విరాళం ఇవ్వండి' })}
              </Button>
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex md:hidden items-center space-x-2">
            {/* Compact language switcher for mobile */}
            <LanguageSwitcher />

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1 rounded-md text-stone-500 hover:text-stone-700"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-stone-200 bg-white px-4 py-4 space-y-3 dark:border-stone-850 dark:bg-stone-950 transition-all duration-300">
          <nav className="flex flex-col space-y-2.5">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  'text-sm font-semibold py-1.5 px-3 rounded-md transition-colors',
                  pathname === link.path
                    ? 'bg-saffron-500/10 text-saffron-600'
                    : 'text-stone-600 dark:text-stone-300'
                )}
              >
                {t(link.label)}
              </Link>
            ))}
          </nav>
          <div className="border-t border-stone-100 dark:border-stone-850 pt-3 flex flex-col">
            <Link href={`/temple/${temple.slug}/donate`} onClick={() => setIsMobileMenuOpen(false)}>
              <Button className="w-full gradient-primary" leftIcon={<Heart className="h-4 w-4 fill-white" />}>
                {t({ en: 'Donate Now', hi: 'दान करें', kn: 'ದೇಣಿಗೆ ನೀಡಿ', ta: 'நன்கொடை', te: 'విరాళం ఇవ్వండి' })}
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
