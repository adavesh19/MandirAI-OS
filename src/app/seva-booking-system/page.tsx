import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Seva Booking System | Online Pooja Booking for Temples | MandirAI OS',
  description: 'Let devotees book Archana, Abhishekam, Sahasranama, and all temple sevas online — 24/7. Real-time slot availability, instant confirmation on WhatsApp. India\'s best online pooja booking system.',
  keywords: [
    'seva booking system', 'online pooja booking', 'temple seva booking software',
    'online archana booking', 'abhishekam booking online', 'temple booking system india',
    'pooja booking app india', 'mandir seva booking', 'online puja booking',
    'temple slot booking software', 'virtual seva booking',
  ],
  alternates: { canonical: 'https://mandir-ai-os.vercel.app/seva-booking-system' },
  openGraph: {
    title: 'Online Seva Booking System for Hindu Temples | MandirAI OS',
    description: 'Let devotees book poojas online 24/7. Real-time slots, WhatsApp confirmations, priest scheduling — all automated.',
    url: 'https://mandir-ai-os.vercel.app/seva-booking-system',
    type: 'website',
  },
}

const sevaTypes = [
  { name: 'Archana', desc: 'Book 108-name archana with flower offering. Choose the deity and preferred time.' },
  { name: 'Abhishekam', desc: 'Sacred bath with panchamrit, milk, honey, and rose water. Online slot booking.' },
  { name: 'Sahasranama', desc: 'Recitation of 1000 names. Book individual or group sessions.' },
  { name: 'Kalyana Utsavam', desc: 'The celestial wedding of the deities. Special booking for festive seasons.' },
  { name: 'Annadanam', desc: 'Sponsor meals for devotees. Select the number of people and date.' },
  { name: 'Vahana Seva', desc: 'Deity procession on the vahana. Limited slots — book in advance.' },
]

const benefits = [
  { icon: '⚡', title: '24/7 Booking', desc: 'Devotees can book sevas any time, from anywhere in the world.' },
  { icon: '✅', title: 'Instant Confirmation', desc: 'WhatsApp + Email confirmation sent immediately after booking.' },
  { icon: '📅', title: 'Calendar View', desc: 'Priests and admins see all upcoming bookings in a clear calendar view.' },
  { icon: '🔄', title: 'Auto-Reminders', desc: 'Devotees get a reminder 24 hours before their booked seva.' },
  { icon: '💳', title: 'Online Payment', desc: 'Collect seva fees online — UPI, cards, net banking — all supported.' },
  { icon: '📊', title: 'Seva Reports', desc: 'Daily, weekly, and monthly reports of all bookings and revenue.' },
]

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Seva Booking System — MandirAI OS',
  applicationCategory: 'BusinessApplication',
  description: 'Online seva and pooja booking system for Hindu temples. Accept bookings 24/7 with real-time confirmation.',
  url: 'https://mandir-ai-os.vercel.app/seva-booking-system',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
}

export default function SevaBookingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <div className="min-h-screen bg-white">
        <div className="bg-gradient-to-br from-purple-700 to-indigo-800 text-white py-24 px-4 text-center">
          <p className="text-purple-200 text-sm font-bold uppercase tracking-widest mb-4">24/7 Online Booking · WhatsApp Confirmation</p>
          <h1 className="text-5xl md:text-7xl font-black mb-6">
            Online Seva Booking<br />System for Temples
          </h1>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto mb-10">
            Let devotees book Archana, Abhishekam, and all poojas online — from their phone, at any time. Zero phone calls. Zero manual registers.
          </p>
          <Link href="/register" className="inline-block px-10 py-5 bg-white text-purple-700 font-black text-xl rounded-full hover:shadow-2xl transition-all">
            Start Free Seva Booking System
          </Link>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-20">
          <h2 className="text-3xl font-bold text-center mb-4">Supported Seva Types</h2>
          <p className="text-slate-500 text-center mb-16">Configure any seva your temple offers. Unlimited types.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sevaTypes.map((seva, i) => (
              <div key={i} className="p-6 border border-purple-100 rounded-2xl bg-purple-50/50 hover:shadow-md transition-all">
                <h3 className="font-bold text-slate-900 text-lg mb-2">📿 {seva.name}</h3>
                <p className="text-slate-600 text-sm">{seva.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-50 py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-16">Benefits for Your Temple</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((b, i) => (
                <div key={i} className="p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all">
                  <div className="text-4xl mb-4">{b.icon}</div>
                  <h3 className="font-bold text-slate-900 text-lg mb-2">{b.title}</h3>
                  <p className="text-slate-600">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="py-20 px-4 text-center">
          <h2 className="text-4xl font-black mb-6">Ready to Go Fully Digital?</h2>
          <p className="text-slate-600 max-w-2xl mx-auto mb-10">
            500+ temples use MandirAI OS for online seva bookings. Join them today — free to start.
          </p>
          <Link href="/register" className="inline-block px-10 py-5 bg-purple-600 text-white font-black text-xl rounded-full hover:bg-purple-700 transition-colors shadow-lg">
            Start Free Today
          </Link>
        </div>
      </div>
    </>
  )
}
