'use client'

import * as React from 'react'
import Link from 'next/link'

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
)

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
)

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
)

const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
)

export default function Footer() {
  return (
    <footer className="bg-stone-950 text-stone-400 border-t border-stone-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Logo & Tagline */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold tracking-tight text-saffron-500">🕉️</span>
              <span className="font-heading text-lg font-bold bg-gradient-to-r from-saffron-500 to-amber-500 bg-clip-text text-transparent">
                MandirAI OS
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-stone-500 leading-relaxed max-w-sm">
              The premier SaaS operating system designed specifically for Hindu temple trusts. Automating devotee CRM, secure donations, multilingual website creation, and trust analytics.
            </p>
            <div className="flex items-center space-x-4 pt-2">
              <a href="#" className="text-stone-500 hover:text-saffron-500 transition-colors">
                <FacebookIcon className="h-4 w-4" />
              </a>
              <a href="#" className="text-stone-500 hover:text-saffron-500 transition-colors">
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a href="#" className="text-stone-500 hover:text-saffron-500 transition-colors">
                <TwitterIcon className="h-4 w-4" />
              </a>
              <a href="#" className="text-stone-500 hover:text-saffron-500 transition-colors">
                <YoutubeIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Column 1: Product */}
          <div>
            <h4 className="font-heading text-xs font-semibold text-stone-300 uppercase tracking-widest mb-4">
              Product
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li><Link href="#features" className="hover:text-saffron-400 transition-colors">Features</Link></li>
              <li><Link href="#pricing" className="hover:text-saffron-400 transition-colors">Pricing</Link></li>
              <li><Link href="/demo" className="hover:text-saffron-400 transition-colors">Request Demo</Link></li>
              <li><Link href="/plans" className="hover:text-saffron-400 transition-colors">SaaS Plans</Link></li>
            </ul>
          </div>

          {/* Column 2: Trust Resources */}
          <div>
            <h4 className="font-heading text-xs font-semibold text-stone-300 uppercase tracking-widest mb-4">
              Resources
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li><a href="#" className="hover:text-saffron-400 transition-colors">80G Tax Help</a></li>
              <li><a href="#" className="hover:text-saffron-400 transition-colors">Trust Auditing</a></li>
              <li><a href="#" className="hover:text-saffron-400 transition-colors">FAQs</a></li>
              <li><a href="#" className="hover:text-saffron-400 transition-colors">Developer API</a></li>
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div>
            <h4 className="font-heading text-xs font-semibold text-stone-300 uppercase tracking-widest mb-4">
              Legal
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li><a href="#" className="hover:text-saffron-400 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-saffron-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-saffron-400 transition-colors">Refund Policy</a></li>
              <li><a href="#" className="hover:text-saffron-400 transition-colors">SLA Agreement</a></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-stone-900 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-stone-600">
            &copy; {new Date().getFullYear()} MandirAI OS. All rights reserved.
          </p>
          <p className="text-xs text-stone-650 flex items-center space-x-1">
            <span>Made with</span>
            <span className="text-red-500 text-sm">🙏</span>
            <span>in India</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
