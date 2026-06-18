import { Check, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function PricingPage() {
  const plans = [
    {
      name: 'Starter',
      priceYearly: 300,
      description: 'Ideal for local temples beginning their digital journey.',
      features: [
        'Automatic Website (Templates)',
        'Seva Booking & Management',
        'Basic CRM (100 Profiles)',
        'QR Donation Link',
      ],
      cta: 'Start with Starter',
      popular: false,
    },
    {
      name: 'Essential',
      priceYearly: 500,
      description: 'Perfect for active temples conducting regular events.',
      features: [
        'Everything in Starter',
        'Standard CRM (500 Profiles)',
        'Event Manager',
        'Automated Receipts',
      ],
      cta: 'Choose Essential',
      popular: false,
    },
    {
      name: 'Growth',
      priceYearly: 700,
      description: 'Unlock the power of AI to expand your reach.',
      features: [
        'Everything in Essential',
        'AI Website Builder Unlocked',
        'Unlimited CRM',
        'Multilingual AI',
        'WhatsApp Reminders',
      ],
      cta: 'Choose Growth',
      popular: false,
    },
    {
      name: 'Pro',
      priceYearly: 900,
      description: 'The complete command center for major temple trusts.',
      features: [
        'Everything in Growth',
        'Web3 Transparency Ledger',
        'Advanced Analytics',
        'Custom Domain',
        'Priority Support',
      ],
      cta: 'Go Pro',
      popular: true,
    },
    {
      name: 'Enterprise',
      priceYearly: 1300,
      description: 'Infinite scale for massive multi-temple organizations.',
      features: [
        'Everything in Pro',
        'Bio-Resonance Dashboard',
        'Multi-Tenant Admin',
        'Dedicated AI Priest',
        'API & Webhooks',
      ],
      cta: 'Contact Sales',
      popular: false,
    },
  ]

  return (
    <div className="max-w-[1400px] mx-auto py-12 px-4">
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 rounded-full bg-saffron-100 text-saffron-700 text-sm font-bold uppercase tracking-wider">
          SaaS Billing
        </div>
        <h1 className="font-heading text-4xl font-bold text-stone-900 mb-4">MandirAI OS Pricing</h1>
        <p className="text-lg text-stone-500 max-w-2xl mx-auto">
          Choose the perfect plan to digitize and grow your temple's community. Transparent pricing, billed annually.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`rounded-3xl p-6 border shadow-sm flex flex-col relative overflow-hidden transition-all duration-300 ${
              plan.popular
                ? 'bg-gradient-to-b from-saffron-600 to-amber-600 border-saffron-400 text-white shadow-2xl scale-[1.02] md:-translate-y-2'
                : 'bg-white border-stone-200 text-stone-900'
            }`}
          >
            {plan.popular && (
              <div className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-bl-xl shadow-md">
                Best Seller
              </div>
            )}
            
            <h3 className={`font-heading text-2xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-stone-900'}`}>
              {plan.name}
            </h3>
            <p className={`mb-6 text-[11px] h-[34px] ${plan.popular ? 'text-saffron-100' : 'text-stone-500'}`}>
              {plan.description}
            </p>
            
            <div className={`text-4xl font-bold mb-2 pb-6 border-b ${plan.popular ? 'border-saffron-400/50' : 'border-stone-100'}`}>
              ₹{plan.priceYearly}<span className={`text-sm font-normal ml-1 ${plan.popular ? 'text-saffron-200' : 'text-stone-400'}`}>/year</span>
            </div>
            
            <ul className={`space-y-4 text-xs flex-1 mb-8 pt-4 ${plan.popular ? 'text-saffron-50' : 'text-stone-600'}`}>
              {plan.features.map((feature, fIdx) => (
                <li key={fIdx} className="flex gap-2">
                  <Check className={`h-4 w-4 shrink-0 ${plan.popular ? 'text-white' : 'text-emerald-500'}`} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            
            <Button
              variant={plan.popular ? 'secondary' : 'outline'}
              className={`w-full font-bold ${
                plan.popular 
                  ? 'bg-white text-saffron-700 hover:bg-stone-50 shadow-lg' 
                  : 'border-stone-300 hover:bg-stone-50'
              }`}
            >
              {plan.cta}
            </Button>
          </div>
        ))}
      </div>
      
      <div className="mt-16 text-center text-sm text-stone-500 flex items-center justify-center gap-2">
        <Info className="h-4 w-4" /> Transactions are processed securely via Razorpay Subscription API
      </div>
    </div>
  )
}
