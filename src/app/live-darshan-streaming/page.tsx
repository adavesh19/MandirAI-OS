import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Live Darshan Streaming for Temples | HD Aarti Live Stream | MandirAI OS',
  description: 'Stream your temple\'s aarti and darshan live on your website — in HD. Thousands of devotees can attend virtually from anywhere in the world. Integrated YouTube and custom streaming support.',
  keywords: [
    'live darshan streaming', 'temple live stream', 'aarti live stream', 'online darshan',
    'virtual darshan', 'temple youtube live', 'mandir live streaming', 'pooja live stream',
    'temple live darshan website', 'online temple darshan india',
  ],
  alternates: { canonical: 'https://mandir-ai-os.vercel.app/live-darshan-streaming' },
  openGraph: {
    title: 'Live Darshan Streaming for Temples | MandirAI OS',
    description: 'Let devotees worldwide attend aarti and darshan virtually. HD streaming integrated directly into your temple website.',
    url: 'https://mandir-ai-os.vercel.app/live-darshan-streaming',
    type: 'website',
  },
}

const liveFeatures = [
  { icon: '📺', title: 'HD Live Streaming', desc: 'Crystal-clear HD darshan stream embedded directly on your temple website — no third-party app needed.' },
  { icon: '🌍', title: 'Global Reach', desc: 'Devotees in the US, UK, Australia, and everywhere can attend aarti live from their phone.' },
  { icon: '📅', title: 'Scheduled Streams', desc: 'Schedule aarti timings in advance. Devotees get reminders on WhatsApp before the stream begins.' },
  { icon: '📱', title: 'Mobile-First Player', desc: 'The live darshan player is fully optimized for mobile — works seamlessly on all devices.' },
  { icon: '🎬', title: 'YouTube Integration', desc: 'Connect your temple\'s existing YouTube channel for zero-friction streaming setup.' },
  { icon: '🔔', title: 'Live Notifications', desc: 'Auto-notify all subscribers when a new aarti is about to begin via WhatsApp and email.' },
]

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Live Darshan Streaming — MandirAI OS',
  applicationCategory: 'MultimediaApplication',
  description: 'Live darshan streaming solution for Hindu temples. HD video, global reach, YouTube integration, WhatsApp notifications.',
  url: 'https://mandir-ai-os.vercel.app/live-darshan-streaming',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
}

export default function LiveDarshanPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <div className="min-h-screen bg-white">
        <div className="bg-gradient-to-br from-rose-700 to-pink-800 text-white py-24 px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-red-500/30 border border-red-400/40 px-4 py-2 rounded-full text-sm font-bold mb-8">
            <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
            LIVE — Darshan Now Available
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6">
            Live Darshan Streaming<br />for Your Temple
          </h1>
          <p className="text-xl text-rose-100 max-w-3xl mx-auto mb-10">
            Bring your aarti and darshan to devotees worldwide. Integrate live HD streaming directly into your MandirAI OS temple website — in minutes.
          </p>
          <Link href="/register" className="inline-block px-10 py-5 bg-white text-rose-700 font-black text-xl rounded-full hover:shadow-2xl transition-all">
            Start Streaming Free
          </Link>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-20">
          <h2 className="text-3xl font-bold text-center mb-16">Why 500+ Temples Stream Live with MandirAI OS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {liveFeatures.map((f, i) => (
              <div key={i} className="p-8 border border-rose-100 rounded-3xl hover:shadow-lg hover:border-rose-200 transition-all">
                <div className="text-5xl mb-6">{f.icon}</div>
                <h3 className="font-bold text-slate-900 text-xl mb-3">{f.title}</h3>
                <p className="text-slate-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-20 px-4 text-center">
          <h2 className="text-4xl font-black mb-6">Your Darshan. The Whole World's Blessing.</h2>
          <p className="text-slate-400 max-w-2xl mx-auto mb-10">
            No matter where your devotees are — live darshan connects them to the divine, from your temple to their screen.
          </p>
          <Link href="/register" className="inline-block px-10 py-5 bg-rose-500 text-white font-black text-xl rounded-full hover:bg-rose-600 transition-colors shadow-lg">
            Enable Live Darshan Free
          </Link>
        </div>
      </div>
    </>
  )
}
