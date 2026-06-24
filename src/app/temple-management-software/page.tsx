import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Temple Management Software | Best Hindu Temple Management System — MandirAI OS',
  description:
    'India\'s best temple management software. Automate seva bookings, online donations, devotee CRM, 80G receipts, festival events, and live darshan streaming. Free trial available.',
  keywords: [
    'temple management software',
    'temple management system',
    'hindu temple management software',
    'mandir management software',
    'temple administration software',
    'temple management app india',
    'mandir management system',
    'temple erp software',
    'best temple management software india',
    'free temple management software',
  ],
  alternates: {
    canonical: 'https://mandir-ai-os.vercel.app/temple-management-software',
  },
}

export default function TempleManagementSoftwarePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'MandirAI OS — Temple Management Software',
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Any',
            description: 'Complete Hindu temple management software for seva booking, donations, devotee CRM, and more.',
            url: 'https://mandir-ai-os.vercel.app/temple-management-software',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'INR',
              description: 'Free plan available',
            },
          }),
        }}
      />

      <main className="min-h-screen bg-white dark:bg-stone-950">
        <nav className="sticky top-0 z-50 bg-white/90 dark:bg-stone-950/90 backdrop-blur-md border-b border-stone-100 dark:border-stone-900">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="text-xl font-black text-stone-900 dark:text-white flex items-center gap-2">
              <span className="text-2xl">🕉️</span> MandirAI OS
            </Link>
            <Link href="/register" className="bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm px-5 py-2.5 rounded-xl transition-colors">
              Start Free →
            </Link>
          </div>
        </nav>

        <section className="py-24 px-4 text-center bg-gradient-to-b from-red-50 to-white dark:from-stone-900 dark:to-stone-950">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-red-100 dark:bg-red-950/40 text-red-700 dark:text-red-400 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6 border border-red-200 dark:border-red-900">
              🏛️ Temple Management Software
            </div>
            <h1 className="text-5xl sm:text-6xl font-black text-stone-900 dark:text-white mb-6 leading-tight">
              Complete{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">
                Temple Management
              </span>
              {' '}Software for India
            </h1>
            <p className="text-xl text-stone-600 dark:text-stone-300 max-w-3xl mx-auto mb-10 leading-relaxed">
              MandirAI OS is an all-in-one temple management system used by 1,000+ temples across India. 
              Digitize your operations — from seva bookings and donations to devotee CRM and 80G compliance.
            </p>
            <Link
              href="/register"
              className="inline-block bg-red-600 hover:bg-red-700 text-white font-black text-lg px-10 py-4 rounded-2xl transition-all shadow-2xl shadow-red-500/30 hover:scale-105"
            >
              Start Free — No Credit Card →
            </Link>
          </div>
        </section>

        <section className="py-24 px-4 bg-white dark:bg-stone-950">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-black text-center text-stone-900 dark:text-white mb-16">
              Complete Temple Operations in One Platform
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: '📅', title: 'Seva & Pooja Booking', desc: 'Online slot-based booking for all sevas. Devotees book from home, priests get daily manifests.' },
                { icon: '💰', title: 'Donation Management', desc: 'Accept UPI, cards, net banking. Auto-issue 80G receipts via WhatsApp and email.' },
                { icon: '👥', title: 'Devotee CRM', desc: 'Full devotee profiles with Gotra, Nakshatra, birthdays, and visit history.' },
                { icon: '🎉', title: 'Event & Festival Management', desc: 'Create festival events, manage registrations, and send notifications.' },
                { icon: '📊', title: 'Financial Reporting', desc: 'Real-time dashboards for income, expenses, and fund utilization reports.' },
                { icon: '🌐', title: 'AI Website Builder', desc: 'Auto-generate your temple website with all pages in minutes.' },
                { icon: '📱', title: 'WhatsApp Broadcasts', desc: 'Send festival greetings, event reminders, and receipts via WhatsApp.' },
                { icon: '🔒', title: 'Multi-user Access Control', desc: 'Assign roles to trustees, priests, and staff with granular permissions.' },
                { icon: '📸', title: 'Media Gallery', desc: 'Manage all temple photos and videos in one organized library.' },
              ].map((f) => (
                <div key={f.title} className="p-6 rounded-2xl border border-stone-100 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 hover:border-orange-300 dark:hover:border-orange-700 hover:shadow-lg transition-all">
                  <div className="text-4xl mb-4">{f.icon}</div>
                  <h3 className="font-bold text-stone-900 dark:text-white text-lg mb-2">{f.title}</h3>
                  <p className="text-stone-500 dark:text-stone-400 text-sm leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 px-4 bg-gradient-to-br from-red-600 to-orange-600 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-black text-white mb-6">Ready to Modernize Your Temple Management?</h2>
            <p className="text-red-100 text-xl mb-10">Join 1,000+ temples already using MandirAI OS. Start free today.</p>
            <Link href="/register" className="inline-block bg-white text-red-600 font-black text-xl px-12 py-5 rounded-2xl hover:scale-105 transition-all">
              Create Free Account →
            </Link>
          </div>
        </section>

        <footer className="bg-stone-950 text-stone-400 py-12 px-4 text-center text-sm">
          <div className="max-w-4xl mx-auto">
            <p className="font-bold text-white mb-2 text-lg">🕉️ MandirAI OS</p>
            <p className="mb-4">Best Temple Management Software in India</p>
            <div className="flex flex-wrap justify-center gap-4 text-xs">
              <Link href="/" className="hover:text-white">Home</Link>
              <Link href="/temple-website-builder" className="hover:text-white">Temple Website Builder</Link>
              <Link href="/pricing" className="hover:text-white">Pricing</Link>
              <Link href="/register" className="hover:text-white">Register Free</Link>
            </div>
          </div>
        </footer>
      </main>
    </>
  )
}
