import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'MandirAI OS Features | AI Temple Website Builder, Donations, Seva Booking & More',
  description: 'Explore all features of MandirAI OS — India\'s most complete temple management platform. AI website builder, online donations, seva booking, 80G receipts, devotee CRM, live darshan, WhatsApp notifications, and more.',
  keywords: [
    'temple management features', 'temple website features', 'mandir software features',
    'online pooja booking', 'temple crm features', 'digital hundi india',
    'temple software india', 'mandir app features', 'seva booking app',
  ],
  alternates: { canonical: 'https://mandir-ai-os.vercel.app/features' },
  openGraph: {
    title: 'MandirAI OS Features | Complete Temple Management Platform',
    description: 'Everything your temple needs: AI website builder, online donations, seva booking, 80G receipts, devotee CRM, live darshan, and more.',
    url: 'https://mandir-ai-os.vercel.app/features',
    type: 'website',
  },
}

const features = [
  {
    category: 'Temple Website',
    icon: '🌐',
    items: [
      { title: 'AI Website Builder', desc: 'Build a full temple website in 3 minutes using AI. Choose from 6 stunning themes.' },
      { title: '6 Sacred Templates', desc: 'Classic Calm, Heritage Grand, Modern Elegant, Divine Glow, Tech Sanctuary, AI Omniscient.' },
      { title: 'Multilingual Pages', desc: 'Auto-generate content in English, Hindi, Tamil, Telugu, and Kannada.' },
      { title: 'Custom Domain', desc: 'Connect your own domain (e.g. shrirammandir.com) with one click.' },
    ]
  },
  {
    category: 'Donations & Finance',
    icon: '💳',
    items: [
      { title: 'Online Donations', desc: 'Accept UPI, cards, net banking via Razorpay with instant settlement.' },
      { title: 'Digital Hundi', desc: 'Replace the physical hundi box with a secure digital alternative.' },
      { title: '80G Receipt Generator', desc: 'Auto-generate Section 80G tax exemption receipts as PDFs, instantly.' },
      { title: 'Expense Tracker', desc: 'Track all temple income and expenses with category-wise reports.' },
    ]
  },
  {
    category: 'Seva Booking',
    icon: '📿',
    items: [
      { title: 'Pooja Booking System', desc: 'Allow devotees to book Archana, Abhishekam, and other sevas online.' },
      { title: 'Time-Slot Management', desc: 'Define slots, set capacities, and manage priest schedules.' },
      { title: 'Booking Confirmation', desc: 'Instant WhatsApp and email confirmation with seva details.' },
      { title: 'Virtual Seva', desc: 'Accept sevas from devotees across the world via a virtual puja.' },
    ]
  },
  {
    category: 'Devotee CRM',
    icon: '👥',
    items: [
      { title: 'Devotee Database', desc: 'Maintain detailed profiles with name, gotra, nakshatra, and contact.' },
      { title: 'Birthday & Anniversary Alerts', desc: 'Auto-send personalized greetings and seva reminders.' },
      { title: 'WhatsApp Broadcasting', desc: 'Send festival greetings, event updates, and receipts via WhatsApp.' },
      { title: 'Bulk SMS & Email', desc: 'Mass communicate with your entire devotee database.' },
    ]
  },
  {
    category: 'Live Darshan & Media',
    icon: '📡',
    items: [
      { title: 'Live Darshan Streaming', desc: 'Stream aarti and darshan live via YouTube or your own feed.' },
      { title: 'Media Gallery', desc: 'Manage festival photos, deity images, and event albums beautifully.' },
      { title: 'Virtual Reality Tour', desc: 'Let devotees take a 360° virtual tour of your temple.' },
      { title: 'Livestream Scheduler', desc: 'Schedule and promote live events in advance to devotees.' },
    ]
  },
  {
    category: 'Events & Festivals',
    icon: '🎉',
    items: [
      { title: 'Hindu Festival Calendar', desc: 'Auto-populate major festivals with timings and descriptions.' },
      { title: 'Event Registration', desc: 'Manage entries for Brahmotsavam, Rathotsavam, and cultural programs.' },
      { title: 'QR Check-In System', desc: 'Scan-to-check-in attendees for special events.' },
      { title: 'Volunteer Management', desc: 'Recruit, assign, and track volunteers for events.' },
    ]
  },
]

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'MandirAI OS Features',
  description: 'Complete list of features for MandirAI OS — India\'s #1 temple management software',
  itemListElement: features.flatMap((cat, ci) =>
    cat.items.map((item, ii) => ({
      '@type': 'ListItem',
      position: ci * 4 + ii + 1,
      name: item.title,
      description: item.desc,
    }))
  ),
}

export default function FeaturesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
        {/* Hero */}
        <div className="bg-gradient-to-br from-orange-600 to-rose-700 text-white py-24 px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-black mb-6">
            Every Feature Your Temple Needs
          </h1>
          <p className="text-xl text-orange-100 max-w-3xl mx-auto mb-10">
            MandirAI OS is the most complete temple management platform in India.
            From AI website builder to devotee CRM — everything in one place.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/register" className="px-8 py-4 bg-white text-orange-600 font-bold rounded-full hover:shadow-xl transition-all">
              Start Free — No Credit Card
            </Link>
            <Link href="/pricing" className="px-8 py-4 border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-all">
              View Pricing
            </Link>
          </div>
        </div>

        {/* Feature Categories */}
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="space-y-24">
            {features.map((cat, i) => (
              <div key={i}>
                <div className="flex items-center gap-4 mb-10">
                  <span className="text-5xl">{cat.icon}</span>
                  <h2 className="text-3xl font-bold text-slate-900">{cat.category}</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {cat.items.map((item, j) => (
                    <div key={j} className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all">
                      <h3 className="text-lg font-bold text-slate-900 mb-3">{item.title}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-slate-900 text-white py-20 px-4 text-center">
          <h2 className="text-4xl font-black mb-4">Ready to Modernize Your Temple?</h2>
          <p className="text-slate-400 mb-10 max-w-2xl mx-auto">
            Join 500+ temples across India already using MandirAI OS. Setup takes 3 minutes.
          </p>
          <Link href="/register" className="px-10 py-5 bg-orange-500 text-white font-bold rounded-full text-lg hover:bg-orange-600 transition-colors shadow-lg">
            Create Your Temple Website Free
          </Link>
        </div>
      </div>
    </>
  )
}
