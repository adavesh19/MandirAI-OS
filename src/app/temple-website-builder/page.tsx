import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Temple Website Builder | Create Your Temple Website in Minutes — MandirAI OS',
  description:
    'The #1 AI-powered temple website builder in India. Build a stunning, SEO-optimized Hindu temple website in minutes. Free trial. Auto-generate pages, manage donations, seva bookings & devotees.',
  keywords: [
    'temple website builder',
    'free temple website builder',
    'hindu temple website maker',
    'build temple website online',
    'mandir website builder',
    'temple website design',
    'temple website creator',
    'ai temple website builder',
    'temple website generator india',
    'best temple website builder',
    'create temple website free',
    'online temple website builder',
  ],
  alternates: {
    canonical: 'https://mandir-ai-os.vercel.app/temple-website-builder',
  },
  openGraph: {
    title: 'Temple Website Builder | MandirAI OS — Build in Minutes',
    description:
      'Create a beautiful, fully-featured Hindu temple website in minutes using AI. No coding required. Free forever plan available.',
    url: 'https://mandir-ai-os.vercel.app/temple-website-builder',
    type: 'website',
  },
}

const features = [
  {
    icon: '🕉️',
    title: '6 Sacred Temple Themes',
    desc: 'Choose from Classic Serene, Heritage Grand, Modern Elegant, Divine Glow, Tech Sanctuary, or AI Omniscient — each crafted by designers who understand dharmic aesthetics.',
  },
  {
    icon: '🤖',
    title: 'AI Content Generation',
    desc: 'Describe your temple and our Gemini AI instantly writes your history page, seva descriptions, event notices, and more — in English, Hindi, Tamil, Telugu & Kannada.',
  },
  {
    icon: '📸',
    title: 'Media Upload & Gallery',
    desc: 'Upload temple photos, deity images, and event photos. Our gallery auto-organizes them into beautiful grids and 3D carousels.',
  },
  {
    icon: '🌐',
    title: 'Custom Domain Hosting',
    desc: 'Connect your own domain (e.g., srisiddhivinayak.org) with one click. We handle SSL, CDN, and uptime automatically.',
  },
  {
    icon: '📱',
    title: 'Mobile-First Responsive',
    desc: 'Every template is 100% mobile-optimized and scores 95+ on Google PageSpeed. Your devotees on mobile see a perfect experience.',
  },
  {
    icon: '🔍',
    title: 'Built-in SEO Tools',
    desc: 'Automatic sitemap generation, meta tags, Open Graph images, and structured data so your temple ranks on Google for local searches.',
  },
  {
    icon: '💳',
    title: 'Integrated Online Donations',
    desc: 'Accept donations via UPI, credit cards, and net banking directly on your website. Auto-generate 80G tax receipts for donors.',
  },
  {
    icon: '📅',
    title: 'Event & Seva Pages',
    desc: 'Auto-generate festival event pages and seva booking pages. Devotees can book directly from your website 24/7.',
  },
]

const steps = [
  { n: '01', title: 'Register & Enter Temple Details', desc: 'Give us your temple name, deity, location, and upload 2–3 photos. Takes less than 3 minutes.' },
  { n: '02', title: 'AI Builds Your Website', desc: 'Our AI instantly generates your full website with all pages — Home, History, Sevas, Gallery, Events, Contact, and more.' },
  { n: '03', title: 'Customize with Visual Editor', desc: 'Use our drag-and-drop visual editor to change colors, text, images, and add new sections. No coding needed.' },
  { n: '04', title: 'Go Live on Your Domain', desc: 'Publish to a free subdomain instantly, or connect your own domain. Your temple is now live on Google.' },
]

const faqs = [
  {
    q: 'Is MandirAI OS free to use as a temple website builder?',
    a: 'Yes! Our Starter plan is completely free and includes a full temple website with up to 5 pages, online donations, and seva booking. Paid plans add advanced features like custom domains, unlimited devotee CRM, and 80G receipts.',
  },
  {
    q: 'Do I need coding or technical knowledge?',
    a: 'Absolutely not. MandirAI OS is designed for temple trustees and priests with zero technical background. Our AI builds your website automatically, and our visual editor lets you customize it by clicking and typing.',
  },
  {
    q: 'Can I use my own domain (like mytemple.org)?',
    a: 'Yes! On our Essential plan and above, you can connect any domain you own. We provide step-by-step instructions and handle the SSL certificate and CDN automatically.',
  },
  {
    q: 'What languages does the temple website support?',
    a: 'MandirAI OS supports 5 Indian languages: English, Hindi (हिंदी), Tamil (தமிழ்), Telugu (తెలుగు), and Kannada (ಕನ್ನಡ). Your AI-generated content can be auto-translated into all languages.',
  },
  {
    q: 'Can devotees donate online through our temple website?',
    a: 'Yes. We integrate Razorpay and UPI payment gateway. Donors can pay via UPI, credit/debit cards, and net banking. You get the money directly in your temple bank account.',
  },
  {
    q: 'How is MandirAI OS different from a regular website builder like Wix or Squarespace?',
    a: 'Regular website builders are built for businesses. MandirAI OS is built specifically for Hindu temples, with features like seva booking, gotra-based CRM, 80G receipt generation, festival calendar, Hindu tithi tracking, and multilingual support in Indian languages — none of which exist in generic builders.',
  },
]

export default function TempleWebsiteBuilderPage() {
  return (
    <>
      {/* JSON-LD Structured Data for Google Rich Results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'MandirAI OS — Temple Website Builder',
            applicationCategory: 'WebApplication',
            operatingSystem: 'Any',
            description:
              'AI-powered temple website builder for Hindu temples in India. Create stunning websites, manage donations, and handle seva bookings.',
            url: 'https://mandir-ai-os.vercel.app/temple-website-builder',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'INR',
              description: 'Free plan available',
            },
            creator: {
              '@type': 'Organization',
              name: 'MandirAI OS',
              url: 'https://mandir-ai-os.vercel.app',
            },
            featureList: [
              'AI website generation',
              'Online donation integration',
              'Seva booking system',
              '80G tax receipt generator',
              'Multilingual support (Hindi, Tamil, Telugu, Kannada)',
              'Custom domain hosting',
              'SEO optimization',
              'Mobile responsive design',
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.q,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.a,
              },
            })),
          }),
        }}
      />

      <main className="min-h-screen bg-white dark:bg-stone-950">
        {/* ── NAV ─────────────────────────────────────────────────────── */}
        <nav className="sticky top-0 z-50 bg-white/90 dark:bg-stone-950/90 backdrop-blur-md border-b border-stone-100 dark:border-stone-900">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="text-xl font-black text-stone-900 dark:text-white flex items-center gap-2">
              <span className="text-2xl">🕉️</span> MandirAI OS
            </Link>
            <div className="flex items-center gap-3">
              <Link href="/login" className="text-sm font-semibold text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors">
                Login
              </Link>
              <Link
                href="/register"
                className="bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm px-5 py-2.5 rounded-xl transition-colors"
              >
                Start Free →
              </Link>
            </div>
          </div>
        </nav>

        {/* ── HERO ────────────────────────────────────────────────────── */}
        <section className="relative bg-gradient-to-b from-orange-50 via-amber-50 to-white dark:from-stone-900 dark:via-stone-950 dark:to-stone-950 py-24 px-4 text-center overflow-hidden">
          {/* Decorative blobs */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-400/10 rounded-full blur-3xl -z-0" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl -z-0" />

          <div className="relative max-w-5xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-orange-100 dark:bg-orange-950/50 text-orange-700 dark:text-orange-400 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6 border border-orange-200 dark:border-orange-900">
              <span className="h-2 w-2 rounded-full bg-orange-500 animate-pulse inline-block" />
              #1 Temple Website Builder in India
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-stone-900 dark:text-white mb-6 leading-tight tracking-tight">
              Build Your{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">
                Temple Website
              </span>
              <br />
              in Minutes — with AI
            </h1>

            <p className="text-xl text-stone-600 dark:text-stone-300 max-w-3xl mx-auto mb-10 leading-relaxed">
              MandirAI OS is the only temple website builder designed specifically for Hindu temples. 
              Enter your temple details and our AI instantly creates a complete website — with history, 
              seva pages, donation system, gallery, and multilingual support.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Link
                href="/register"
                className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white font-black text-lg px-10 py-4 rounded-2xl transition-all shadow-2xl shadow-orange-500/30 hover:scale-105 hover:shadow-orange-500/50"
              >
                Create Your Free Temple Website →
              </Link>
              <Link
                href="/pricing"
                className="w-full sm:w-auto bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 font-bold text-lg px-8 py-4 rounded-2xl hover:border-orange-400 transition-all"
              >
                View Pricing Plans
              </Link>
            </div>

            {/* Trust signals */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-semibold text-stone-500 dark:text-stone-400">
              <span className="flex items-center gap-1.5">✅ No credit card required</span>
              <span className="flex items-center gap-1.5">✅ Free forever plan</span>
              <span className="flex items-center gap-1.5">✅ Live in 3 minutes</span>
              <span className="flex items-center gap-1.5">✅ 1,000+ temples trust us</span>
            </div>
          </div>
        </section>

        {/* ── FEATURES GRID ───────────────────────────────────────────── */}
        <section className="py-24 px-4 bg-white dark:bg-stone-950">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-black text-stone-900 dark:text-white mb-4">
                Everything Your Temple Website Needs
              </h2>
              <p className="text-lg text-stone-500 dark:text-stone-400 max-w-2xl mx-auto">
                Unlike generic website builders, MandirAI OS is built from the ground up for Hindu temples — with features that no other platform offers.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="group p-6 rounded-2xl border border-stone-100 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 hover:border-orange-300 dark:hover:border-orange-700 hover:shadow-lg hover:shadow-orange-500/10 transition-all duration-300"
                >
                  <div className="text-4xl mb-4">{f.icon}</div>
                  <h3 className="font-bold text-stone-900 dark:text-white text-lg mb-2">{f.title}</h3>
                  <p className="text-stone-500 dark:text-stone-400 text-sm leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ────────────────────────────────────────────── */}
        <section className="py-24 px-4 bg-gradient-to-b from-orange-50 to-white dark:from-stone-900 dark:to-stone-950">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-black text-stone-900 dark:text-white mb-4">
                How to Build Your Temple Website in 4 Steps
              </h2>
              <p className="text-lg text-stone-500 dark:text-stone-400">
                No designers, no developers, no technical knowledge needed.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {steps.map((s) => (
                <div key={s.n} className="flex gap-5 p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800 shadow-sm">
                  <div className="shrink-0 h-12 w-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 text-white font-black text-lg flex items-center justify-center shadow-md">
                    {s.n}
                  </div>
                  <div>
                    <h3 className="font-bold text-stone-900 dark:text-white text-lg mb-1">{s.title}</h3>
                    <p className="text-stone-500 dark:text-stone-400 text-sm leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── COMPARISON TABLE ────────────────────────────────────────── */}
        <section className="py-24 px-4 bg-white dark:bg-stone-950">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-black text-stone-900 dark:text-white mb-4">
                MandirAI OS vs Other Website Builders
              </h2>
              <p className="text-stone-500 dark:text-stone-400">Why generic builders fall short for temples</p>
            </div>
            <div className="overflow-x-auto rounded-2xl border border-stone-200 dark:border-stone-800">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-orange-50 dark:bg-stone-900">
                    <th className="text-left p-4 font-bold text-stone-900 dark:text-white">Feature</th>
                    <th className="p-4 font-bold text-orange-600 dark:text-orange-400">MandirAI OS</th>
                    <th className="p-4 font-bold text-stone-500">Wix / Squarespace</th>
                    <th className="p-4 font-bold text-stone-500">WordPress</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                  {[
                    ['Temple-specific design themes', '✅ 6 Sacred Themes', '❌ Generic only', '⚠️ Paid plugins needed'],
                    ['AI website generation', '✅ Instant, no prompts', '❌ None', '❌ None'],
                    ['Seva booking system', '✅ Built-in', '❌ None', '⚠️ Expensive plugin'],
                    ['Online donation + UPI', '✅ Built-in', '⚠️ Limited', '⚠️ Plugin + fees'],
                    ['80G receipt generator', '✅ Automated PDF', '❌ None', '❌ None'],
                    ['Devotee CRM', '✅ Full CRM with Gotra', '❌ None', '❌ None'],
                    ['Multilingual (Hindi, Tamil, etc)', '✅ 5 Indian languages', '⚠️ Manual', '⚠️ Plugin needed'],
                    ['Festival calendar integration', '✅ Hindu tithi calendar', '❌ None', '❌ None'],
                    ['Setup time', '✅ 3 minutes', '⚠️ Days', '⚠️ Weeks'],
                    ['Cost (basic plan)', '✅ Free forever', '⚠️ ₹1,500/month', '⚠️ ₹2,000+/month'],
                  ].map(([feat, mandir, wix, wp]) => (
                    <tr key={feat} className="hover:bg-stone-50 dark:hover:bg-stone-900/50 transition-colors">
                      <td className="p-4 font-semibold text-stone-700 dark:text-stone-300">{feat}</td>
                      <td className="p-4 text-center text-green-700 dark:text-green-400 font-medium">{mandir}</td>
                      <td className="p-4 text-center text-stone-500 dark:text-stone-400">{wix}</td>
                      <td className="p-4 text-center text-stone-500 dark:text-stone-400">{wp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── FAQ ─────────────────────────────────────────────────────── */}
        <section className="py-24 px-4 bg-orange-50 dark:bg-stone-900">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-black text-stone-900 dark:text-white mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-stone-500 dark:text-stone-400">About our temple website builder</p>
            </div>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <details
                  key={faq.q}
                  className="group bg-white dark:bg-stone-950 rounded-2xl border border-stone-200 dark:border-stone-800 overflow-hidden"
                >
                  <summary className="flex items-center justify-between p-6 cursor-pointer font-bold text-stone-900 dark:text-white hover:text-orange-600 dark:hover:text-orange-400 transition-colors list-none">
                    <span>{faq.q}</span>
                    <span className="ml-4 shrink-0 text-stone-400 group-open:rotate-180 transition-transform duration-200">▼</span>
                  </summary>
                  <div className="px-6 pb-6 text-stone-600 dark:text-stone-300 leading-relaxed text-sm">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ───────────────────────────────────────────────── */}
        <section className="py-24 px-4 bg-gradient-to-br from-orange-600 to-amber-600 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="text-6xl mb-6">🕉️</div>
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-6">
              Start Building Your Temple Website Today
            </h2>
            <p className="text-orange-100 text-xl mb-10 leading-relaxed">
              Join 1,000+ temples that use MandirAI OS to power their digital presence. 
              Free plan available. No credit card required. Live in 3 minutes.
            </p>
            <Link
              href="/register"
              className="inline-block bg-white text-orange-600 font-black text-xl px-12 py-5 rounded-2xl hover:scale-105 transition-all shadow-2xl hover:shadow-orange-900/30"
            >
              Create Free Temple Website →
            </Link>
            <p className="text-orange-200 text-sm mt-6">
              Already registered?{' '}
              <Link href="/login" className="text-white underline font-semibold">
                Sign in here
              </Link>
            </p>
          </div>
        </section>

        {/* ── FOOTER ──────────────────────────────────────────────────── */}
        <footer className="bg-stone-950 text-stone-400 py-12 px-4 text-center text-sm">
          <div className="max-w-4xl mx-auto">
            <p className="font-bold text-white mb-4 text-lg">🕉️ MandirAI OS</p>
            <p className="mb-6">The #1 Temple Website Builder and Management Platform in India</p>
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
              <Link href="/features" className="hover:text-white transition-colors">Features</Link>
              <Link href="/temple-management-software" className="hover:text-white transition-colors">Temple Management</Link>
              <Link href="/temple-donation-software" className="hover:text-white transition-colors">Donation Software</Link>
              <Link href="/register" className="hover:text-white transition-colors">Register Free</Link>
            </div>
            <p className="text-stone-600 text-xs">
              © 2026 MandirAI OS. Built with ❤️ for Hindu Temples across India.
            </p>
          </div>
        </footer>
      </main>
    </>
  )
}
