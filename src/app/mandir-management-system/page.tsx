import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Mandir Management System | Hindu Temple Software India | MandirAI OS',
  description: 'India\'s best mandir management system. Manage your temple\'s finances, festivals, sevas, volunteers, and devotees — all in one platform. Free to start. Used by 500+ mandirs.',
  keywords: [
    'mandir management system', 'mandir management software', 'temple management system india',
    'mandir software', 'mandir app india', 'hindu mandir management', 'temple ERP india',
    'mandir digital solution', 'temple management system free', 'pooja management system',
  ],
  alternates: { canonical: 'https://mandir-ai-os.vercel.app/mandir-management-system' },
  openGraph: {
    title: 'Mandir Management System | MandirAI OS',
    description: 'Complete digital management for your mandir. Website, donations, sevas, devotees, and festivals — all managed from one dashboard.',
    url: 'https://mandir-ai-os.vercel.app/mandir-management-system',
    type: 'website',
  },
}

const pillars = [
  { emoji: '🌐', title: 'Digital Presence', desc: 'Launch a beautiful mandir website with AI in under 3 minutes. Six stunning design themes to choose from.' },
  { emoji: '💰', title: 'Donation Management', desc: 'Accept online donations via UPI and cards. Get instant 80G receipts auto-generated for each donor.' },
  { emoji: '📅', title: 'Festival Calendar', desc: 'Auto-load all major Hindu festivals with tithi, nakshatra, and special pooja recommendations.' },
  { emoji: '📿', title: 'Seva Booking', desc: 'Let devotees book Archana, Abhishekam, and special poojas online with real-time slot availability.' },
  { emoji: '👥', title: 'Devotee Database', desc: 'Maintain records for every devotee — name, gotra, nakshatra, birthday, and donation history.' },
  { emoji: '📊', title: 'Finance Reports', desc: 'Monthly income-expense reports, categorized by seva, donation, and other sources.' },
]

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'MandirAI OS — Mandir Management System',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  description: 'India\'s most complete mandir management system. Manage website, donations, sevas, devotees, and festivals from one AI-powered platform.',
  url: 'https://mandir-ai-os.vercel.app/mandir-management-system',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '800', bestRating: '5' },
}

export default function MandirManagementPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <div className="min-h-screen bg-white">
        <div className="bg-gradient-to-br from-amber-600 to-orange-700 text-white py-24 px-4 text-center">
          <p className="text-amber-200 text-sm uppercase tracking-widest font-bold mb-4">Trusted by 500+ Mandirs Across India</p>
          <h1 className="text-5xl md:text-7xl font-black mb-6">
            Complete Mandir<br />Management System
          </h1>
          <p className="text-xl text-amber-100 max-w-3xl mx-auto mb-10">
            Digitize your mandir operations from seva bookings to financial reports. MandirAI OS is the all-in-one software built for Hindu temples and religious trusts.
          </p>
          <Link href="/register" className="inline-block px-10 py-5 bg-white text-amber-700 font-black text-xl rounded-full hover:shadow-2xl transition-all">
            🕉️ Start Free Today
          </Link>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-20">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-4">Six Pillars of Modern Mandir Management</h2>
          <p className="text-center text-slate-500 mb-16 max-w-2xl mx-auto">Everything your mandir committee needs to run smoothly — digitally.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pillars.map((p, i) => (
              <div key={i} className="p-8 border border-amber-100 rounded-3xl hover:shadow-lg hover:border-amber-300 transition-all bg-amber-50/50">
                <div className="text-5xl mb-6">{p.emoji}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{p.title}</h3>
                <p className="text-slate-600 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-amber-50 py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-black text-slate-900 mb-6">Why Mandirs Choose MandirAI OS</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
              {[['500+', 'Temples'], ['₹2Cr+', 'Donations Processed'], ['50k+', 'Devotees Managed'], ['5 Min', 'Setup Time']].map(([v, l], i) => (
                <div key={i} className="text-center">
                  <p className="text-4xl font-black text-amber-600 mb-2">{v}</p>
                  <p className="text-slate-600 text-sm font-semibold">{l}</p>
                </div>
              ))}
            </div>
            <Link href="/register" className="inline-block px-10 py-5 bg-amber-600 text-white font-black text-xl rounded-full hover:bg-amber-700 transition-colors shadow-lg">
              Start Your Free Trial
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
