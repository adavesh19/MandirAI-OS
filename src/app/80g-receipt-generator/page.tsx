import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '80G Receipt Generator | Automatic Tax Receipts for Temple Donations | MandirAI OS',
  description: 'Generate instant Section 80G tax exemption receipts for all temple donations. PDF receipts auto-sent on WhatsApp and email. Trusted by 500+ temples and religious trusts across India.',
  keywords: [
    '80g receipt generator', '80g certificate for temple donation', 'temple 80g receipt',
    'section 80g receipt temple', 'temple donation receipt india', 'religious trust 80g receipt',
    'automatic 80g receipt', 'temple tax receipt generator', '80g tax exemption donation',
    'temple donation certificate india',
  ],
  alternates: { canonical: 'https://mandir-ai-os.vercel.app/80g-receipt-generator' },
  openGraph: {
    title: '80G Receipt Generator for Temple Donations | MandirAI OS',
    description: 'Automatically generate and send 80G tax receipts for every donation. PDF on WhatsApp in seconds.',
    url: 'https://mandir-ai-os.vercel.app/80g-receipt-generator',
    type: 'website',
  },
}

const steps = [
  { step: '1', title: 'Devotee Donates Online', desc: 'Devotee makes a donation via UPI, card, or net banking on your temple\'s MandirAI OS website.' },
  { step: '2', title: 'System Auto-Captures Data', desc: 'Donor name, PAN (optional), amount, date, and trust registration number are recorded instantly.' },
  { step: '3', title: 'PDF Receipt Generated', desc: 'A beautifully designed 80G receipt PDF is generated within seconds, branded with your temple.' },
  { step: '4', title: 'Delivered via WhatsApp & Email', desc: 'The receipt is automatically sent to the donor\'s WhatsApp and email — no manual work.' },
]

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: '80G Receipt Generator — MandirAI OS',
  applicationCategory: 'BusinessApplication',
  description: 'Automatically generate and deliver Section 80G tax exemption receipts for all temple donations.',
  url: 'https://mandir-ai-os.vercel.app/80g-receipt-generator',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
}

export default function ReceiptGeneratorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <div className="min-h-screen bg-white">
        <div className="bg-gradient-to-br from-emerald-700 to-teal-800 text-white py-24 px-4 text-center">
          <p className="text-emerald-200 text-sm font-bold uppercase tracking-widest mb-4">100% Automated · Instant Delivery</p>
          <h1 className="text-5xl md:text-7xl font-black mb-6">
            80G Receipt Generator<br />for Temples
          </h1>
          <p className="text-xl text-emerald-100 max-w-3xl mx-auto mb-10">
            Stop manually creating tax receipts. MandirAI OS auto-generates Section 80G PDFs for every donation and sends them directly via WhatsApp and Email.
          </p>
          <Link href="/register" className="inline-block px-10 py-5 bg-white text-emerald-700 font-black text-xl rounded-full hover:shadow-2xl transition-all">
            Start Free — Auto 80G Receipts
          </Link>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-20">
          <h2 className="text-3xl font-bold text-center mb-16">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {steps.map((s, i) => (
              <div key={i} className="flex gap-6 p-6 border border-emerald-100 rounded-2xl">
                <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center font-black text-xl shrink-0">
                  {s.step}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2 text-lg">{s.title}</h3>
                  <p className="text-slate-600">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-emerald-50 py-20 px-4 text-center">
          <h2 className="text-4xl font-black mb-6">No More Manual Receipt Work</h2>
          <p className="text-slate-600 max-w-2xl mx-auto mb-10">
            Join 500+ temples who have eliminated manual 80G receipt generation. Save hours every week and delight your donors with instant tax documentation.
          </p>
          <Link href="/register" className="inline-block px-10 py-5 bg-emerald-600 text-white font-black text-xl rounded-full hover:bg-emerald-700 transition-colors shadow-lg">
            Start Your Free Trial
          </Link>
        </div>
      </div>
    </>
  )
}
