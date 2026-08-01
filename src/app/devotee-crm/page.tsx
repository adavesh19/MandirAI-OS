import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Devotee CRM | Temple Devotee Management Software | MandirAI OS',
  description: 'India\'s best devotee CRM for Hindu temples. Maintain devotee profiles with gotra, nakshatra, birthday, and donation history. Send automated birthday greetings, WhatsApp alerts, and seva reminders.',
  keywords: [
    'devotee crm', 'temple crm software', 'devotee management software',
    'temple devotee database', 'hindu devotee management', 'mandir member management',
    'temple whatsapp crm', 'devotee profile management', 'religious trust crm india',
    'temple management crm',
  ],
  alternates: { canonical: 'https://mandir-ai-os.vercel.app/devotee-crm' },
  openGraph: {
    title: 'Devotee CRM for Temples | MandirAI OS',
    description: 'Manage all your temple devotees with gotra, nakshatra, birthdays, and donation history. Auto-send WhatsApp greetings and reminders.',
    url: 'https://mandir-ai-os.vercel.app/devotee-crm',
    type: 'website',
  },
}

const crmFeatures = [
  { icon: '📋', title: 'Comprehensive Profiles', desc: 'Store name, family members, gotra, nakshatra, rashi, birthday, anniversary, address, and contact details.' },
  { icon: '💸', title: 'Donation History', desc: 'View all past donations by each devotee — amount, date, purpose, and 80G receipt status.' },
  { icon: '📿', title: 'Seva History', desc: 'See which sevas a devotee has booked and attended — great for building deeper relationships.' },
  { icon: '🎂', title: 'Auto Birthday Greetings', desc: 'Auto-send personalized birthday and anniversary WhatsApp messages with a temple blessing.' },
  { icon: '📢', title: 'WhatsApp Broadcasting', desc: 'Send festival greetings, event invites, and important announcements to all devotees at once.' },
  { icon: '📥', title: 'Bulk Import', desc: 'Import your existing devotee records from Excel or CSV — no re-entry needed.' },
  { icon: '🔍', title: 'Advanced Search', desc: 'Filter devotees by gotra, city, donation amount, or any other field.' },
  { icon: '📊', title: 'Engagement Reports', desc: 'See which devotees are most active and identify those who haven\'t visited in a while.' },
]

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Devotee CRM — MandirAI OS',
  applicationCategory: 'BusinessApplication',
  description: 'Complete devotee management CRM for Hindu temples. Profiles, donation history, WhatsApp alerts, and automated greetings.',
  url: 'https://mandir-ai-os.vercel.app/devotee-crm',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
}

export default function DevoteeCrmPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <div className="min-h-screen bg-white">
        <div className="bg-gradient-to-br from-blue-700 to-cyan-700 text-white py-24 px-4 text-center">
          <p className="text-blue-200 text-sm font-bold uppercase tracking-widest mb-4">Know Every Devotee · Build Deeper Connections</p>
          <h1 className="text-5xl md:text-7xl font-black mb-6">
            Temple Devotee CRM<br />Software
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-10">
            Maintain rich profiles for every devotee — gotra, nakshatra, donation history, and seva records. Send automated WhatsApp greetings and keep your community engaged.
          </p>
          <Link href="/register" className="inline-block px-10 py-5 bg-white text-blue-700 font-black text-xl rounded-full hover:shadow-2xl transition-all">
            Start Your Free Devotee CRM
          </Link>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-20">
          <h2 className="text-3xl font-bold text-center mb-4">Everything You Need to Know Your Devotees</h2>
          <p className="text-slate-500 text-center mb-16 max-w-2xl mx-auto">Stop using spreadsheets. MandirAI OS gives you a purpose-built CRM designed for Hindu temples.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {crmFeatures.map((f, i) => (
              <div key={i} className="p-6 border border-blue-100 rounded-2xl hover:shadow-md hover:border-blue-300 transition-all">
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">{f.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-blue-50 py-20 px-4 text-center">
          <h2 className="text-4xl font-black mb-6">Your Devotees Deserve Better</h2>
          <p className="text-slate-600 max-w-2xl mx-auto mb-10">
            A temple that remembers your birthday, your gotra, your past seva — that is a temple that feels like family. Give that experience to your devotees with MandirAI OS.
          </p>
          <Link href="/register" className="inline-block px-10 py-5 bg-blue-600 text-white font-black text-xl rounded-full hover:bg-blue-700 transition-colors shadow-lg">
            Start Free — No Credit Card
          </Link>
        </div>
      </div>
    </>
  )
}
