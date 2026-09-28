'use client'

import * as React from 'react'
import Link from 'next/link'
import { Check, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils/cn'
import { useLanguage } from '@/components/shared/language-context'

const TooltipFeature = ({ name, description }: { name: string; description: string }) => {
  return (
    <div className="group relative flex items-center text-xs">
      <Check className="h-4 w-4 text-saffron-500 mr-2 shrink-0" />
      <span className="text-stone-600 dark:text-stone-300 font-medium border-b border-dashed border-stone-300 dark:border-stone-700 cursor-help">
        {name}
      </span>
      {/* Tooltip Popup */}
      <div className="pointer-events-none absolute left-0 bottom-full z-50 mb-2 w-48 opacity-0 transition-opacity group-hover:opacity-100">
        <div className="rounded-md bg-stone-900 px-3 py-2 text-[10px] text-white shadow-xl dark:bg-stone-100 dark:text-stone-900">
          {description}
          {/* Arrow */}
          <div className="absolute left-4 top-full h-2 w-2 -translate-y-1/2 rotate-45 bg-stone-900 dark:bg-stone-100" />
        </div>
      </div>
    </div>
  )
}

export default function PricingSection() {
  const { t, isKannada } = useLanguage()

  const plans = [
    {
      name: isKannada ? 'ಬಿಡುಗಡೆ ಕೊಡುಗೆ' : 'Launch Special',
      priceYearly: 299,
      originalPrice: 2999,
      description: isKannada 
        ? 'ವಿಶೇಷ ಬಿಡುಗಡೆ ಕೊಡುಗೆ! ನಿಮ್ಮ ಸಂಪೂರ್ಣ ದೇವಾಲಯದ ವೆಬ್‌ಸೈಟ್ ಪ್ರಾರಂಭಿಸಲು 90% ರಿಯಾಯಿತಿ.'
        : 'Special launch price! Everything you need to launch your complete temple website today.',
      features: [
        { name: isKannada ? 'ಸ್ವಯಂಚಾಲಿತ AI ವೆಬ್‌ಸೈಟ್' : 'Automatic AI Website', desc: 'Instantly generate a temple website using predefined gorgeous templates.' },
        { name: isKannada ? 'ಸೇವಾ ಬುಕಿಂಗ್ ಸಿಸ್ಟಮ್' : 'Online Seva Booking', desc: 'Accept online seva bookings and schedule them perfectly.' },
        { name: isKannada ? 'ಭಕ್ತರ ವಿವರ (100 ಪ್ರೊಫೈಲ್)' : 'Devotee CRM (100 Profiles)', desc: 'Store up to 100 devotee profiles with their details and gotra.' },
        { name: isKannada ? 'UPI ಇ-ಹುಂಡಿ QR ಕೋಡ್' : 'UPI QR Digital Hundi', desc: 'Generate UPI QR codes for instant digital hundi collections.' },
        { name: isKannada ? 'ಕನ್ನಡ ಮತ್ತು ಇಂಗ್ಲಿಷ್ ಸಿದ್ಧ' : 'Kannada & English Ready', desc: 'Full bilingual display and creation support.' },
      ],
      cta: isKannada ? '₹299 ಕ್ಕೆ ವೆಬ್‌ಸೈಟ್ ರಚಿಸಿ' : 'Create Website @ ₹299',
      popular: false,
      launchOffer: true,
      href: '/onboarding?plan=launch-299',
    },
    {
      name: 'Essential',
      priceYearly: 500,
      description: 'Perfect for active temples conducting regular events.',
      features: [
        { name: 'Everything in Launch', desc: 'Includes all features from the Launch tier.' },
        { name: 'Standard CRM (500 Profiles)', desc: 'Manage up to 500 devotees.' },
        { name: 'Event Manager', desc: 'Create and manage temple events and festivals.' },
        { name: 'Automated Receipts', desc: 'Automatically generate and email donation receipts.' },
      ],
      cta: 'Choose Essential',
      popular: false,
      launchOffer: false,
      href: '/onboarding?plan=essential',
    },
    {
      name: 'Growth',
      priceYearly: 700,
      description: 'Unlock the power of AI to expand your reach.',
      features: [
        { name: 'Everything in Essential', desc: 'Includes all features from the Essential tier.' },
        { name: 'AI Website Builder', desc: 'Unlock the Drag & Drop AI Copilot to fully customize your website blocks.' },
        { name: 'Unlimited CRM', desc: 'No limits on your devotee database.' },
        { name: 'Multilingual AI', desc: 'Instantly translate your website into 5 Indian languages.' },
        { name: 'WhatsApp Reminders', desc: 'Send automated WhatsApp messages for upcoming sevas and events.' },
      ],
      cta: 'Choose Growth',
      popular: false,
      launchOffer: false,
      href: '/onboarding?plan=growth',
    },
    {
      name: 'Pro',
      priceYearly: 900,
      description: 'The complete command center for major temple trusts.',
      features: [
        { name: 'Everything in Growth', desc: 'Includes all features from the Growth tier.' },
        { name: 'Web3 Transparency Ledger', desc: 'Publish immutable blockchain ledgers of charity usage for 100% transparency.' },
        { name: 'Advanced Analytics', desc: 'Deep financial and demographic reporting dashboards.' },
        { name: 'Custom Domain', desc: 'Link your own website domain (e.g. sriramatemple.org).' },
        { name: 'Priority Support', desc: '24/7 dedicated phone and email support.' },
      ],
      cta: 'Go Pro',
      popular: true,
      launchOffer: false,
      href: '/onboarding?plan=pro',
    },
    {
      name: 'Enterprise',
      priceYearly: 1300,
      description: 'Infinite scale for massive multi-temple organizations.',
      features: [
        { name: 'Everything in Pro', desc: 'Includes all features from the Pro tier.' },
        { name: 'Bio-Resonance', desc: 'Track spiritual health and bio-frequency of devotees.' },
        { name: 'Multi-Tenant Admin', desc: 'Manage multiple temple branches from a single super-admin login.' },
        { name: 'Dedicated AI Priest', desc: 'A custom-trained AI assistant for your exact scripture and tradition.' },
        { name: 'API & Webhooks', desc: 'Integrate directly with your own accounting software.' },
      ],
      cta: 'Contact Sales',
      popular: false,
      launchOffer: false,
      href: '/onboarding?plan=enterprise',
    },
  ]

  return (
    <section id="pricing" className="py-20 bg-stone-50 dark:bg-stone-900/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-saffron-100 dark:bg-saffron-950/60 text-saffron-700 dark:text-saffron-300 text-xs font-bold uppercase tracking-wider mb-4 border border-saffron-200 dark:border-saffron-800">
            <Sparkles className="h-3.5 w-3.5" />
            <span>{isKannada ? 'ಸೀಮಿತ ಅವಧಿಯ ಆಫರ್' : 'Limited Time Offer'}</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-white mb-4">
            {t('pricing.title')}
          </h2>
          <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300">
            {t('pricing.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-stretch max-w-7xl mx-auto">
          {plans.map((plan, index) => {
            return (
              <div
                key={index}
                className={cn(
                  'rounded-2xl border bg-white p-6 flex flex-col justify-between transition-all duration-300 dark:bg-stone-950 relative',
                  plan.launchOffer
                    ? 'border-amber-500 shadow-xl shadow-amber-500/15 ring-2 ring-amber-500 scale-[1.03] z-10 bg-gradient-to-b from-amber-50/40 to-white dark:from-amber-950/20 dark:to-stone-950'
                    : plan.popular
                    ? 'border-saffron-500 shadow-xl shadow-saffron-500/10 ring-1 ring-saffron-500 scale-[1.04] z-10 md:-translate-y-2'
                    : 'border-stone-200 dark:border-stone-800 hover:border-stone-300'
                )}
              >
                {plan.launchOffer && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-amber-600 via-saffron-600 to-amber-700 px-3.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white shadow-lg whitespace-nowrap animate-pulse">
                    ⚡ LAUNCH DEAL ₹299
                  </span>
                )}

                {plan.popular && !plan.launchOffer && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-saffron-550 to-amber-600 px-4 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-md whitespace-nowrap">
                    Best Seller
                  </span>
                )}

                <div>
                  <div className="mb-4">
                    <h3 className="font-heading text-lg font-bold text-stone-900 dark:text-white flex items-center justify-between">
                      <span>{plan.name}</span>
                      {plan.launchOffer && (
                        <span className="text-[10px] font-extrabold bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-400 px-2 py-0.5 rounded-full">
                          90% OFF
                        </span>
                      )}
                    </h3>
                    <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-1 min-h-[34px] leading-snug">
                      {plan.description}
                    </p>
                  </div>

                  <div className="flex flex-col mb-6 border-b border-stone-100 dark:border-stone-800 pb-5">
                    {plan.originalPrice && (
                      <span className="text-xs text-stone-400 line-through mb-0.5">
                        ₹{plan.originalPrice}/year
                      </span>
                    )}
                    <div className="flex items-baseline">
                      <span className={cn(
                        'text-3xl font-black text-stone-900 dark:text-white',
                        plan.launchOffer && 'text-amber-600 dark:text-amber-400 text-4xl'
                      )}>
                        ₹{plan.priceYearly}
                      </span>
                      <span className="text-xs text-stone-500 dark:text-stone-400 ml-1">/year</span>
                    </div>
                  </div>

                  <ul className="space-y-3.5 mb-8">
                    {plan.features.map((feature, fIdx) => (
                      <li key={fIdx}>
                        <TooltipFeature name={feature.name} description={feature.desc} />
                      </li>
                    ))}
                  </ul>
                </div>

                <Link href={plan.href} className="w-full mt-auto">
                  <Button
                    className={cn(
                      'w-full text-xs font-bold',
                      plan.launchOffer
                        ? 'bg-gradient-to-r from-amber-600 to-saffron-600 hover:from-amber-500 hover:to-saffron-500 text-white shadow-md shadow-amber-500/20'
                        : plan.popular
                        ? 'bg-saffron-600 hover:bg-saffron-700 text-white'
                        : 'border-stone-300 text-stone-700 hover:bg-stone-50 dark:border-stone-700 dark:text-stone-300'
                    )}
                    variant={plan.popular || plan.launchOffer ? 'default' : 'outline'}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

