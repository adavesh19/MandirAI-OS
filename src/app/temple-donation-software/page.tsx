import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Temple Donation Software | Online Donation System for Temples — MandirAI OS',
  description:
    'Collect online donations for your temple via UPI, credit cards, and net banking. Auto-generate 80G tax receipts. India\'s best temple donation software. Free to start.',
  keywords: [
    'temple donation software',
    'online donation for temple',
    'temple donation system',
    'mandir donation software',
    'digital hundi online',
    'temple online donation india',
    '80g receipt generator',
    'temple upi donation',
    'donate to temple online india',
    'temple crowdfunding',
  ],
  alternates: {
    canonical: 'https://mandir-ai-os.vercel.app/temple-donation-software',
  },
}

export default function TempleDonationSoftwarePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'MandirAI OS — Temple Donation Software',
            applicationCategory: 'FinanceApplication',
            description: 'Online donation management software for Hindu temples with UPI integration and 80G receipt generation.',
            url: 'https://mandir-ai-os.vercel.app/temple-donation-software',
          }),
        }}
      />

      <main className="min-h-screen bg-white dark:bg-stone-950">
        <nav className="sticky top-0 z-50 bg-white/90 dark:bg-stone-950/90 backdrop-blur-md border-b border-stone-100 dark:border-stone-900">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="text-xl font-black text-stone-900 dark:text-white flex items-center gap-2">
              <span className="text-2xl">🕉️</span> MandirAI OS
            </Link>
            <Link href="/register" className="bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm px-5 py-2.5 rounded-xl">
              Start Free →
            </Link>
          </div>
        </nav>

        <section className="py-24 px-4 text-center bg-gradient-to-b from-amber-50 to-white dark:from-stone-900 dark:to-stone-950">
          <div className="max-w-4xl mx-auto">
            <div className="text-5xl mb-4">💛</div>
            <h1 className="text-5xl sm:text-6xl font-black text-stone-900 dark:text-white mb-6 leading-tight">
              Temple{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">
                Donation Software
              </span>
              {' '}That Just Works
            </h1>
            <p className="text-xl text-stone-600 dark:text-stone-300 max-w-3xl mx-auto mb-10">
              Accept online donations via UPI, credit cards, and net banking directly on your temple website. 
              Automatically generate 80G tax receipts and send them to donors via WhatsApp and email.
            </p>
            <Link
              href="/register"
              className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-black text-lg px-10 py-4 rounded-2xl transition-all shadow-2xl shadow-amber-500/30 hover:scale-105"
            >
              Start Accepting Donations Free →
            </Link>
          </div>
        </section>

        <section className="py-24 px-4 bg-white dark:bg-stone-950">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-black text-center text-stone-900 dark:text-white mb-16">
              Complete Donation Management for Temples
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: '📲', title: 'UPI & QR Code Donations', desc: 'Devotees scan a QR code or tap UPI to donate instantly. No app download needed.' },
                { icon: '💳', title: 'Credit Card & Net Banking', desc: 'Accept international donations via Razorpay\'s global payment gateway.' },
                { icon: '🧾', title: 'Auto 80G Receipt Generation', desc: 'Instantly generate legally compliant 80G receipts as PDF and send via WhatsApp.' },
                { icon: '📊', title: 'Donation Analytics Dashboard', desc: 'Real-time charts showing daily, monthly, and category-wise donation trends.' },
                { icon: '🎯', title: 'Campaign-based Crowdfunding', desc: 'Create fundraising campaigns for temple renovation, festivals, or community projects.' },
                { icon: '👤', title: 'Donor CRM & History', desc: 'Full donor history, repeat donor tracking, and personalized thank-you messages.' },
              ].map((f) => (
                <div key={f.title} className="flex gap-4 p-6 rounded-2xl border border-stone-100 dark:border-stone-800 bg-stone-50 dark:bg-stone-900">
                  <div className="text-3xl">{f.icon}</div>
                  <div>
                    <h3 className="font-bold text-stone-900 dark:text-white mb-1">{f.title}</h3>
                    <p className="text-stone-500 dark:text-stone-400 text-sm">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 px-4 bg-gradient-to-br from-amber-500 to-orange-600 text-center">
          <h2 className="text-4xl font-black text-white mb-6">Start Accepting Temple Donations Online Today</h2>
          <Link href="/register" className="inline-block bg-white text-amber-600 font-black text-xl px-12 py-5 rounded-2xl hover:scale-105 transition-all">
            Create Free Account →
          </Link>
        </section>

        <footer className="bg-stone-950 text-stone-400 py-8 px-4 text-center text-sm">
          <p className="font-bold text-white mb-2 text-lg">🕉️ MandirAI OS</p>
          <p>Best Temple Donation Software in India · <Link href="/temple-website-builder" className="hover:text-white">Temple Website Builder</Link> · <Link href="/temple-management-software" className="hover:text-white">Management Software</Link></p>
        </footer>
      </main>
    </>
  )
}
