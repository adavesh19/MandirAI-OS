'use client'

import * as React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { useLanguage } from '@/components/shared/language-context'
import {
  Heart,
  Copy,
  CheckCircle2,
  Phone,
  MessageCircle,
  Landmark,
  QrCode,
  CreditCard,
  ArrowLeft,
  User,
  FileText,
  Smartphone,
  ChevronRight,
  Sparkles,
  Terminal,
  Cpu,
  Zap,
  RadioTower,
  Database,
  Shield
} from 'lucide-react'
import DigitalHundi from '@/components/temple/digital-hundi'

// ─── Types ───────────────────────────────────────────────────────────────────

interface Temple {
  id: string
  name: string
  slug: string
  upiId: string | null
  contactPhone: string | null
  bankDetails: Record<string, string> | null
  logoUrl: string | null
}

interface Category {
  id: string
  name: string
  description: string
  suggestedAmounts: number[]
}

interface DonateClientProps {
  temple: Temple
  categories: Category[]
  campaign: any | null
  isRazorpayEnabled: boolean
  templateId?: string
}

// ─── Constants ───────────────────────────────────────────────────────────────

const PRESET_AMOUNTS = [101, 251, 501, 1001, 2100, 5100, 11000]

type PaymentTab = 'upi' | 'whatsapp' | 'bank' | 'razorpay'

// ─── Success Screen ───────────────────────────────────────────────────────────

function SuccessScreen({
  temple,
  amount,
  onReset,
  templateId = 'classic',
}: {
  temple: Temple
  amount: string
  onReset: () => void
  templateId?: string
}) {
  const { t } = useLanguage()

  if (templateId === 'tech-sanctuary' || templateId === 'ai-omniscient') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4 py-10 font-mono text-slate-300">
        <div className="max-w-md w-full text-center space-y-6 border border-cyan-850 bg-slate-950 p-8 rounded-[2rem] shadow-[0_0_40px_rgba(6,182,212,0.15)] relative">
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-500"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-500"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-500"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-500"></div>

          <div className="w-16 h-16 rounded-full bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400 mx-auto animate-pulse">
            <CheckCircle2 className="h-8 w-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-black text-white uppercase tracking-wider">
              TRANSACTION CONFIRMED // SUCCESS
            </h2>
            <p className="text-xs text-slate-500 leading-normal">
              Sacred deposit completed. Recorded on the node ledger of <span className="font-bold text-cyan-400">{temple.name}</span>.
            </p>
            {amount && (
              <p className="text-3xl font-black text-white mt-4 border-y border-slate-900 py-3">
                ₹{parseFloat(amount).toLocaleString('en-IN')}.00
              </p>
            )}
          </div>

          <div className="bg-black/50 border border-slate-900 p-4 rounded-xl text-left text-[10px] space-y-1.5 leading-relaxed text-slate-500 font-mono">
            <div>&gt;&gt; LEDGER STATUS: WRITE_COMPLETE</div>
            <div>&gt;&gt; RELAY NODES: broadcast_success</div>
            <div>&gt;&gt; RITUAL TRIGGERS: puja_slot_initialized</div>
            <div>&gt;&gt; BLESSINGS: routed_to_devotee_hash</div>
          </div>

          <div className="flex gap-4">
            <Button
              onClick={onReset}
              className="flex-1 py-3 bg-cyan-950 hover:bg-cyan-900 border border-cyan-800 text-cyan-400 font-bold text-xs uppercase rounded-xl transition-all"
            >
              Donate Again
            </Button>
            <Link href={`/temple/${temple.slug}`} className="flex-1">
              <Button variant="outline" className="w-full py-3 text-xs font-bold uppercase rounded-xl border-slate-800 hover:bg-slate-900 text-white">
                Exit Protocol
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-saffron-50 flex items-center justify-center px-4 py-10">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-saffron-400 to-amber-500 shadow-2xl shadow-saffron-500/40 mx-auto animate-bounce">
          <span className="text-4xl text-white font-bold">🙏</span>
        </div>

        <div className="space-y-2">
          <h2 className="font-heading text-3xl font-extrabold text-stone-900">
            {t({ en: 'Dhanyavaad!', hi: 'धन्यवाद!', kn: 'ಧನ್ಯವಾದ!', ta: 'நன்றி!', te: 'ధన్యవాదాలు!' })}
          </h2>
          <p className="text-stone-600 text-base leading-relaxed">
            {t({
              en: 'Your sacred offering to',
              hi: 'आपका पवित्र दान',
              kn: 'ನಿಮ್ಮ ಪವಿತ್ರ ದೇಣಿಗೆ',
              ta: 'உங்கள் புனித காணிக்கை',
              te: 'మీ పవిత్ర నివేదన',
            })}{' '}
            <span className="font-bold text-saffron-700">{temple.name}</span>{' '}
            {t({ en: 'has been received.', hi: 'प्राप्त हुआ।', kn: 'ಸ್ವೀಕರಿಸಲಾಗಿದೆ.', ta: 'பெறப்பட்டது.', te: 'ಸ್వీకరించబడింది.' })}
          </p>
          {amount && (
            <p className="text-2xl font-extrabold text-saffron-600">
              ₹{parseFloat(amount).toLocaleString('en-IN')}
            </p>
          )}
        </div>

        <Card className="bg-amber-50 border-amber-200">
          <CardContent className="p-4 text-sm text-amber-800">
            ✨{' '}
            {t({
              en: 'May the blessings of the divine be upon you and your family. Your contribution supports temple services, daily poojas, and annadanam.',
              hi: 'देवी-देवताओं का आशीर्वाद आप और आपके परिवार पर सदा बना रहे।',
              kn: 'ದೇವರ ಆಶೀರ್ವಾದ ನಿಮ್ಮ ಮೇಲಿರಲಿ.',
              ta: 'தெய்வ ஆசி உங்களுக்கும் குடும்பத்திற்கும் கிடைக்கட்டும்.',
              te: 'దేవుని ఆశీర్వాదం మీకు సదా ఉండాలి.',
            })}
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={onReset}
            className="bg-saffron-600 hover:bg-saffron-700 text-white font-semibold"
            leftIcon={<Heart className="h-4 w-4 fill-white" />}
          >
            {t({ en: 'Donate Again', hi: 'फिर से दान करें', kn: 'ಮತ್ತೆ ದೇಣಿಗೆ', ta: 'மீண்டும் வழங்க', te: 'మళ్లీ దానం' })}
          </Button>
          <Link href={`/temple/${temple.slug}`}>
            <Button variant="outline" className="w-full sm:w-auto">
              {t({ en: 'Back to Temple', hi: 'मंदिर पर वापस', kn: 'ದೇವಾಲಯಕ್ಕೆ', ta: 'ஆலயம் திரும்ப', te: 'ఆలయానికి' })}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function DonateClient({ temple, categories, campaign, isRazorpayEnabled, templateId = 'classic' }: DonateClientProps) {
  const { t } = useLanguage()

  // Form state
  const [amount, setAmount] = React.useState('501')
  const [customAmount, setCustomAmount] = React.useState('')
  const [isCustom, setIsCustom] = React.useState(false)
  const [selectedCategory, setSelectedCategory] = React.useState(categories[0]?.id ?? '')
  const [donorName, setDonorName] = React.useState('')
  const [donorPhone, setDonorPhone] = React.useState('')
  const [donorPan, setDonorPan] = React.useState('')
  const [want80G, setWant80G] = React.useState(false)

  // Payment tab state
  const [activeTab, setActiveTab] = React.useState<PaymentTab>('upi')

  // UX state
  const [copiedUpi, setCopiedUpi] = React.useState(false)
  const [copiedBank, setCopiedBank] = React.useState('')
  const [showSuccess, setShowSuccess] = React.useState(false)
  const [razorpayLoading, setRazorpayLoading] = React.useState(false)

  const effectiveAmount = isCustom ? customAmount : amount
  const numAmount = parseFloat(effectiveAmount) || 0
  const activeCategory = categories.find((c) => c.id === selectedCategory) ?? categories[0]

  const stepBase = categories.length > 0 ? 1 : 0

  // UPI values
  const upiId = temple.upiId ?? ''
  const qrUrl =
    upiId && numAmount > 0
      ? `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(
          `upi://pay?pa=${upiId}&am=${numAmount}&pn=${encodeURIComponent(temple.name)}&cu=INR`
        )}`
      : null
  const upiDeepLink =
    upiId && numAmount > 0
      ? `upi://pay?pa=${upiId}&am=${numAmount}&pn=${encodeURIComponent(temple.name)}&cu=INR`
      : null

  // WhatsApp values
  const phone = temple.contactPhone?.replace(/\D/g, '') ?? ''
  const waMessage = encodeURIComponent(
    `Namaste 🙏 I want to donate ₹${numAmount.toLocaleString('en-IN')} to ${temple.name}. Please guide me.`
  )
  const waLink = phone
    ? `https://wa.me/${phone.startsWith('91') ? phone : '91' + phone}?text=${waMessage}`
    : null
  const callLink = phone ? `tel:+91${phone.replace(/^91/, '')}` : null

  // Bank details
  const bank = temple.bankDetails

  // Available tabs
  const tabs: { id: PaymentTab; label: string; icon: React.ReactNode }[] = [
    ...(upiId ? [{ id: 'upi' as PaymentTab, label: 'UPI / QR', icon: <QrCode className="h-4 w-4" /> }] : []),
    ...(phone ? [{ id: 'whatsapp' as PaymentTab, label: 'WhatsApp', icon: <MessageCircle className="h-4 w-4" /> }] : []),
    ...(bank ? [{ id: 'bank' as PaymentTab, label: 'Bank Transfer', icon: <Landmark className="h-4 w-4" /> }] : []),
    ...(isRazorpayEnabled
      ? [{ id: 'razorpay' as PaymentTab, label: 'Card / Net', icon: <CreditCard className="h-4 w-4" /> }]
      : []),
  ]

  // Set active tab to first available on mount
  React.useEffect(() => {
    if (tabs.length > 0) setActiveTab(tabs[0].id)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  function copyUpi() {
    navigator.clipboard.writeText(upiId)
    setCopiedUpi(true)
    setTimeout(() => setCopiedUpi(false), 2500)
  }

  function copyBankField(val: string) {
    navigator.clipboard.writeText(val)
    setCopiedBank(val)
    setTimeout(() => setCopiedBank(''), 2500)
  }

  async function handleRazorpay() {
    if (!numAmount || numAmount < 1) return alert('Please enter a valid amount.')
    setRazorpayLoading(true)
    try {
      const res = await fetch('/api/v1/payments/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          templeId: temple.id,
          amount: numAmount,
          categoryId: selectedCategory || categories[0]?.id,
          campaignId: campaign?.id || null,
          donorName,
          donorPhone,
          donorPan,
        }),
      })
      if (!res.ok) throw new Error('Could not create payment order')
      const order = await res.json()
      const win = window as any
      if (!win.Razorpay) {
        alert('Razorpay SDK not available. Please refresh and try again.')
        return
      }
      const rzp = new win.Razorpay({
        key: order.razorpayKeyId,
        amount: order.amount,
        currency: 'INR',
        name: temple.name,
        description: `Donation — ${activeCategory?.name ?? 'General'}`,
        order_id: order.id,
        prefill: { name: donorName, contact: donorPhone },
        theme: { color: '#f97316' },
        handler: () => setShowSuccess(true),
      })
      rzp.open()
    } catch (e: any) {
      alert(e.message || 'Payment failed. Please try again.')
    } finally {
      setRazorpayLoading(false)
    }
  }

  function resetForm() {
    setShowSuccess(false)
    setAmount('501')
    setCustomAmount('')
    setIsCustom(false)
    setDonorName('')
    setDonorPhone('')
    setDonorPan('')
    setWant80G(false)
  }

  if (showSuccess) {
    return <SuccessScreen temple={temple} amount={effectiveAmount} onReset={resetForm} templateId={templateId} />
  }

  // ─── HIGH TECH & AI OS THEMES (tech-sanctuary & ai-omniscient) ───
  if (templateId === 'tech-sanctuary' || templateId === 'ai-omniscient') {
    return (
      <div className="min-h-screen bg-black font-mono text-slate-300 selection:bg-cyan-900 selection:text-cyan-50 overflow-hidden relative pb-16">
        
        {/* Cyber grid overlays */}
        <div className="fixed inset-0 pointer-events-none opacity-20 z-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </div>
        <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-cyan-600/10 blur-[120px] rounded-full mix-blend-screen pointer-events-none z-0"></div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 pt-16">
          
          {/* Header */}
          <div className="relative border border-cyan-800/40 bg-slate-950/80 p-8 rounded-3xl overflow-hidden shadow-[0_0_30px_rgba(6,182,212,0.15)] backdrop-blur-md mb-8">
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-500"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-500"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-500"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-500"></div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 bg-cyan-950/50 border border-cyan-800/50 text-cyan-400 px-4 py-1 rounded-lg text-xs font-bold uppercase">
                  <Terminal className="h-4 w-4 animate-pulse" />
                  INITIATE FINANCIAL PROTOCOL // HUNDI
                </div>
                <h1 className="text-3xl sm:text-4xl font-black text-white tracking-wider uppercase">
                  {temple.name} // RELAY
                </h1>
                <p className="text-xs text-slate-400 border-l-2 border-cyan-500 pl-3">
                  Make a secure digital offering. Funds are committed instantly to the trust ledger database.
                </p>
              </div>

              {/* Status board */}
              <div className="bg-black/50 border border-slate-900 p-4 rounded-xl space-y-1 text-[10px] text-slate-500 min-w-[180px]">
                <div className="flex justify-between"><span>SECURE_UPLINK:</span> <span className="text-emerald-400 font-bold">ACTIVE</span></div>
                <div className="flex justify-between"><span>ENCRYPTION:</span> <span className="text-cyan-400">AES-256</span></div>
                <div className="flex justify-between"><span>TAX_CREDIT:</span> <span className="text-fuchsia-400">80G_VALID</span></div>
              </div>
            </div>
          </div>

          {/* Campaign Widget */}
          {campaign && (
            <div className="border border-fuchsia-800/40 bg-slate-950/60 p-6 rounded-3xl mb-8 relative overflow-hidden backdrop-blur-sm">
              <div className="absolute top-0 right-0 px-3 py-1 bg-fuchsia-950 text-fuchsia-400 border-l border-b border-slate-800 text-[8px] font-bold uppercase tracking-wider">
                Active Campaign Node
              </div>
              <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                <Heart className="w-4 h-4 text-fuchsia-400 fill-fuchsia-950" />
                {campaign.title}
              </h3>
              <p className="text-xs text-slate-500 mb-4">{campaign.description}</p>
              
              {/* Progress bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-bold">
                  <span className="text-slate-400">PROGRESS: {Math.round((campaign.currentAmount / campaign.targetAmount) * 100)}%</span>
                  <span className="text-fuchsia-400">₹{campaign.currentAmount.toLocaleString()} Raised / ₹{campaign.targetAmount.toLocaleString()} Goal</span>
                </div>
                <div className="w-full bg-slate-900 border border-slate-800 h-2.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-fuchsia-500 to-cyan-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, (campaign.currentAmount / campaign.targetAmount) * 100)}%` }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Input Form (Spans 7 cols) */}
            <div className="lg:col-span-7 space-y-8">
              {/* Purpose */}
              {categories.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                    1. Select Purpose Node
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`p-4 rounded-xl border text-left transition-all font-mono text-xs flex flex-col justify-between cursor-pointer ${
                          selectedCategory === cat.id
                            ? 'border-cyan-500 bg-cyan-950/40 text-white shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                            : 'border-slate-800 bg-slate-950/30 text-slate-400 hover:border-cyan-800'
                        }`}
                      >
                        <span className="font-bold text-white flex justify-between w-full">
                          <span>{cat.name}</span>
                          {selectedCategory === cat.id && <span className="text-cyan-400">[active]</span>}
                        </span>
                        {cat.description && <span className="text-[10px] text-slate-500 mt-2 leading-snug">{cat.description}</span>}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Amount */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                  2. Set Transaction Load (Amount)
                </h3>
                <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
                  {PRESET_AMOUNTS.map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => {
                        setAmount(val.toString())
                        setIsCustom(false)
                        setCustomAmount('')
                      }}
                      className={`py-2 px-1 rounded-xl border text-xs font-bold font-mono transition-all cursor-pointer ${
                        !isCustom && amount === val.toString()
                          ? 'border-cyan-500 bg-cyan-950/60 text-white shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                          : 'border-slate-800 bg-slate-950/30 text-slate-400 hover:border-cyan-800'
                      }`}
                    >
                      ₹{val}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setIsCustom(true)}
                    className={`col-span-2 py-2 px-1 rounded-xl border text-xs font-bold font-mono transition-all cursor-pointer ${
                      isCustom
                        ? 'border-cyan-500 bg-cyan-950/60 text-white shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                        : 'border-slate-800 bg-slate-950/30 text-slate-400 hover:border-cyan-800'
                    }`}
                  >
                    Custom
                  </button>
                </div>

                {isCustom && (
                  <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm focus-within:border-cyan-500 mt-2">
                    <span className="text-cyan-400 mr-2">₹ &gt; </span>
                    <input
                      type="number"
                      placeholder="Enter load value..."
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      className="bg-transparent text-white focus:outline-none flex-1 font-mono text-xs"
                    />
                  </div>
                )}
              </div>

              {/* Devotee Info */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                  3. Set Devotee Profile Parameters
                </h3>
                <div className="border border-slate-800 bg-slate-950 p-6 rounded-2xl space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">devotee_full_name</label>
                    <input
                      placeholder="e.g. Adavesh Kumar"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-850 rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 placeholder-slate-700"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">devotee_phone</label>
                      <input
                        placeholder="e.g. 9876543210"
                        value={donorPhone}
                        onChange={(e) => setDonorPhone(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-850 rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 placeholder-slate-700"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">devotee_pan (optional)</label>
                      <input
                        placeholder="e.g. ABCDE1234F"
                        value={donorPan}
                        onChange={(e) => setDonorPan(e.target.value.toUpperCase())}
                        className="w-full bg-slate-900 border border-slate-850 rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 placeholder-slate-700"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Payment Uplink Node (Spans 5 cols) */}
            <div className="lg:col-span-5 space-y-8">
              <div className="border border-slate-800 bg-slate-950 p-6 rounded-3xl space-y-6">
                <h4 className="text-xs uppercase font-bold tracking-widest text-fuchsia-400 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-fuchsia-500 animate-pulse"></span>
                  Select Payment Uplink
                </h4>

                {/* Tab buttons */}
                <div className="flex flex-wrap gap-2 border-b border-slate-900 pb-4">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-3 py-1.5 rounded-lg border text-[10px] font-bold uppercase flex items-center gap-1.5 transition-all cursor-pointer ${
                        activeTab === tab.id
                          ? 'border-fuchsia-500 bg-fuchsia-950/40 text-white'
                          : 'border-slate-800 bg-slate-900/30 text-slate-500 hover:border-slate-700'
                      }`}
                    >
                      {tab.icon}
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Tab content */}
                {activeTab === 'upi' && upiId && (
                  <div className="space-y-6 text-center">
                    {qrUrl && numAmount > 0 ? (
                      <div className="space-y-4">
                        <div className="relative w-48 h-48 mx-auto p-2 bg-white rounded-2xl border-4 border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                          <img src={qrUrl} alt="UPI QR Code" className="w-full h-full object-contain" />
                        </div>
                        <p className="text-[10px] text-slate-500 leading-normal">
                          Scan the dynamic QR code above using any UPI application (GPay, PhonePe, BHIM) to execute ₹{numAmount.toLocaleString('en-IN')}.
                        </p>
                      </div>
                    ) : (
                      <div className="py-8 border-2 border-dashed border-slate-800 rounded-xl text-xs text-slate-500">
                        Set amount load to generate dynamic QR node.
                      </div>
                    )}

                    <div className="border border-slate-900 p-4 rounded-xl flex items-center justify-between text-xs bg-slate-900/40">
                      <span className="truncate select-all text-white font-bold">{upiId}</span>
                      <button
                        onClick={copyUpi}
                        className="bg-cyan-950 border border-cyan-800 text-cyan-400 px-3 py-1.5 rounded-lg font-bold hover:bg-cyan-900 text-[10px] uppercase transition-all cursor-pointer"
                      >
                        {copiedUpi ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === 'whatsapp' && phone && (
                  <div className="text-center space-y-4 py-4">
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Establish a communication channel to coordinate manual donations or cash offerings.
                    </p>
                    {waLink && (
                      <a
                        href={waLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-4 bg-emerald-950 hover:bg-emerald-900 border border-emerald-800 text-emerald-400 font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2"
                      >
                        <MessageCircle className="w-4 h-4" /> Initialize WhatsApp Link
                      </a>
                    )}
                  </div>
                )}

                {activeTab === 'bank' && bank && (
                  <div className="space-y-4">
                    <p className="text-xs text-slate-500 leading-normal">
                      Direct IMPS/NEFT transfer details. Confirm ledger commits with remarks.
                    </p>
                    <div className="bg-black/60 border border-slate-900 rounded-xl p-4 text-[10px] space-y-3 font-mono">
                      {[
                        { label: 'account_name', val: bank.account_name },
                        { label: 'account_no', val: bank.account_number },
                        { label: 'bank_ifsc', val: bank.ifsc },
                        { label: 'bank_name', val: bank.bank_name },
                      ].map((item) => (
                        <div key={item.label} className="flex justify-between border-b border-slate-900 pb-1.5 last:border-0 last:pb-0">
                          <span className="text-slate-500 uppercase">{item.label}:</span>
                          <span className="text-white font-bold select-all">{item.val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'razorpay' && isRazorpayEnabled && (
                  <div className="space-y-4 text-center">
                    <p className="text-xs text-slate-500">
                      Coordinate online payments using credit cards, net banking, or web wallets.
                    </p>
                    {numAmount > 0 ? (
                      <button
                        onClick={handleRazorpay}
                        disabled={razorpayLoading}
                        className="w-full py-4 bg-fuchsia-950 border border-fuchsia-800 hover:border-fuchsia-500 text-fuchsia-400 font-bold text-xs uppercase tracking-wider rounded-xl transition-all hover:shadow-[0_0_15px_rgba(240,70,250,0.3)] flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <CreditCard className="w-4 h-4" />
                        {razorpayLoading ? 'Loading Gateway...' : `Initialize Pay ₹${numAmount}`}
                      </button>
                    ) : (
                      <div className="py-6 border-2 border-dashed border-slate-800 rounded-xl text-xs text-slate-500">
                        Set amount load first.
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Devotees mock ledger feed */}
              <div className="border border-slate-800 bg-slate-950/40 p-5 rounded-3xl space-y-3 text-[10px]">
                <h4 className="font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 border-b border-slate-900 pb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-ping"></span>
                  Uplink Log Stream
                </h4>
                <div className="space-y-2 font-mono h-24 overflow-y-auto text-slate-500">
                  <div>[15:40:01] Node initialized. Awaiting user interaction...</div>
                  <div>[15:40:08] Category selected: {activeCategory?.name || 'General'}</div>
                  <div>[15:41:20] Set transaction load to ₹{numAmount}</div>
                  <div>[15:41:22] Awaiting deposit node handshake...</div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    )
  }

  // ─── ORIGINAL CLASSIC / OTHER THEMES ───
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-stone-50">
      {/* ── Hero Banner ─────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden bg-gradient-to-r from-saffron-600 via-amber-500 to-orange-500 text-white">
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-white/10 blur-2xl pointer-events-none" />

        <div className="relative max-w-3xl mx-auto px-4 py-10 sm:py-14 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm mb-4 ring-2 ring-white/30">
            {temple.logoUrl ? (
              <img
                src={temple.logoUrl}
                alt={temple.name}
                className="w-12 h-12 object-contain rounded-full"
              />
            ) : (
              <span className="text-3xl">🛕</span>
            )}
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight drop-shadow-sm">
            {temple.name}
          </h1>
          <p className="mt-2 text-white/80 text-sm sm:text-base max-w-lg mx-auto">
            {t({
              en: 'Make a sacred offering. Every rupee serves the divine.',
              hi: 'पवित्र दान करें। हर रुपया देव-सेवा में लगता है।',
              kn: 'ಪವಿತ್ರ ದೇಣಿಗೆ ನೀಡಿ. ಪ್ರತಿ ರೂಪಾಯಿ ದೇವ ಸೇವೆಗೆ.',
              ta: 'புனித காணிக்கை செலுத்துங்கள்.',
              te: 'పవిత్ర నివేదన చేయండి.',
            })}
          </p>

          <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs text-white/90">
            {[
              { icon: <CheckCircle2 className="h-3 w-3" />, label: '100% Secure' },
              { icon: <Sparkles className="h-3 w-3" />, label: '80G Eligible' },
              { icon: <Heart className="h-3 w-3 fill-white" />, label: 'Zero Platform Fee' },
            ].map(({ icon, label }) => (
              <span
                key={label}
                className="flex items-center gap-1 bg-white/15 backdrop-blur-sm rounded-full px-3 py-1"
              >
                {icon} {label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main Content ────────────────────────────────────────────────────── */}
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
        
        {/* ── Digital Hundi ─────────────────────────────────────────────────── */}
        {campaign && (
          <div className="mb-4">
            <DigitalHundi campaign={campaign} />
          </div>
        )}

        {/* ── Step 1: Choose Purpose ────────────────────────────────────────── */}
        {categories.length > 0 && (
          <section className="space-y-3">
            <h2 className="font-heading text-base font-bold text-stone-700 uppercase tracking-widest flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-saffron-500 text-white text-xs font-bold">
                1
              </span>
              {t({ en: 'Choose Purpose', hi: 'उद्देश्य चुनें', kn: 'ಉದ್ದೇಶ ಆಯ್ಕೆ', ta: 'நோக்கம் தேர்ந்தெடுக்க', te: 'లక్ష్యం ఎంచుకోండి' })}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`relative p-3.5 rounded-2xl border-2 text-left transition-all duration-200 cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'border-saffron-500 bg-gradient-to-br from-saffron-50 to-amber-50 shadow-md shadow-saffron-200/60 ring-1 ring-saffron-400'
                      : 'border-stone-200 bg-white hover:border-saffron-300 hover:shadow-sm'
                  }`}
                >
                  {selectedCategory === cat.id && (
                    <span className="absolute top-2 right-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-saffron-500" />
                    </span>
                  )}
                  <p className="font-heading text-sm font-bold text-stone-900 pr-4">{cat.name}</p>
                  {cat.description && (
                    <p className="text-[10px] text-stone-500 mt-0.5 line-clamp-2 leading-tight">
                      {cat.description}
                    </p>
                  )}
                </button>
              ))}
            </div>
          </section>
        )}

        {/* ── Step 2: Select Amount ────────────────────────────────────────── */}
        <section className="space-y-3">
          <h2 className="font-heading text-base font-bold text-stone-700 uppercase tracking-widest flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-saffron-500 text-white text-xs font-bold">
              {stepBase + 1}
            </span>
            {t({ en: 'Select Amount', hi: 'राशि चुनें', kn: 'ಮೊತ್ತ ಆಯ್ಕೆ', ta: 'தொகை தேர்ந்தெடுக்க', te: 'మొత్తం ఎంచుకోండి' })}
          </h2>

          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
            {PRESET_AMOUNTS.map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => {
                  setAmount(val.toString())
                  setIsCustom(false)
                  setCustomAmount('')
                }}
                className={`col-span-1 py-2.5 px-1 rounded-xl border-2 font-bold text-sm transition-all duration-200 cursor-pointer ${
                  !isCustom && amount === val.toString()
                    ? 'border-saffron-500 bg-gradient-to-b from-saffron-500 to-amber-500 text-white shadow-lg shadow-saffron-300/50 scale-105'
                    : 'border-stone-200 bg-white text-stone-700 hover:border-saffron-300 hover:bg-saffron-50'
                }`}
              >
                ₹{val >= 1000 ? `${val / 1000}k` : val}
              </button>
            ))}
            <button
              type="button"
              onClick={() => {
                setIsCustom(true)
                setAmount('')
              }}
              className={`col-span-2 py-2.5 px-1 rounded-xl border-2 font-bold text-sm transition-all duration-200 cursor-pointer ${
                isCustom
                  ? 'border-saffron-500 bg-gradient-to-b from-saffron-500 to-amber-500 text-white shadow-lg shadow-saffron-300/50 scale-105'
                  : 'border-stone-200 bg-white text-stone-700 hover:border-saffron-300 hover:bg-saffron-50'
              }`}
            >
              {t({ en: 'Custom', hi: 'अन्य राशि', kn: 'ಇತರೆ ಮೊತ್ತ', ta: 'மற்ற தொகை', te: 'ఇతర మొత్తం' })}
            </button>
          </div>

          {isCustom && (
            <div className="relative flex items-center bg-white border-2 border-stone-200 focus-within:border-saffron-500 rounded-xl px-4 py-3 h-12 shadow-sm transition-all animate-in slide-in-from-top-2 duration-300">
              <span className="text-stone-400 font-bold mr-1.5">₹</span>
              <input
                type="number"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                placeholder={t({ en: 'Enter amount...', hi: 'राशि लिखें...', kn: 'ಮೊತ್ತ ನಮೂದಿಸಿ...', ta: 'தொகை உள்ளிடவும்...', te: 'మొత్తం రాయండి...' })}
                className="w-full bg-transparent text-stone-900 placeholder-stone-400 text-sm font-bold focus:outline-none"
              />
            </div>
          )}
        </section>

        {/* ── Step 3: Donor Details ────────────────────────────────────────── */}
        <section className="space-y-3">
          <h2 className="font-heading text-base font-bold text-stone-700 uppercase tracking-widest flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-saffron-500 text-white text-xs font-bold">
              {stepBase + 2}
            </span>
            {t({ en: 'Donor Details', hi: 'दाता विवरण', kn: 'ದಾನಿಗಳ ವಿವರ', ta: 'வழங்குபவர் விவரங்கள்', te: 'దాత వివరాలు' })}
          </h2>

          <Card className="border-0 shadow-lg bg-white ring-1 ring-stone-200/50 rounded-2xl p-6 space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest flex items-center gap-1">
                <User className="h-3 w-3" /> {t({ en: 'Full Name', hi: 'पूरा नाम', kn: 'ಪೂರ್ಣ ಹೆಸರು', ta: 'முழு பெயர்', te: 'పూర్తి పేరు' })}
              </label>
              <Input
                placeholder="e.g. Ramesh Sharma"
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
                className="bg-stone-50/50 border-stone-200 focus:bg-white h-11 rounded-xl focus-visible:ring-saffron-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest flex items-center gap-1">
                  <Smartphone className="h-3 w-3" /> {t({ en: 'Phone Number', hi: 'फ़ोन नंबर', kn: 'ಮೊಬೈಲ್ ಸಂಖ್ಯೆ', ta: 'தொலைபேசி எண்', te: 'ఫోన్ నంబర్' })}
                </label>
                <Input
                  placeholder="e.g. 9876543210"
                  value={donorPhone}
                  onChange={(e) => setDonorPhone(e.target.value)}
                  className="bg-stone-50/50 border-stone-200 focus:bg-white h-11 rounded-xl focus-visible:ring-saffron-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest flex items-center gap-1">
                  <FileText className="h-3 w-3" /> {t({ en: 'PAN Card (Optional)', hi: 'पैन कार्ड (वैकल्पिक)', kn: 'ಪ್ಯಾನ್ ಕಾರ್ಡ್ (ಐಚ್ಛಿಕ)', ta: 'பான் கார்டு', te: 'పాన్ కార్డ్' })}
                </label>
                <Input
                  placeholder="e.g. ABCDE1234F"
                  value={donorPan}
                  onChange={(e) => setDonorPan(e.target.value.toUpperCase())}
                  className="bg-stone-50/50 border-stone-200 focus:bg-white h-11 rounded-xl focus-visible:ring-saffron-500"
                />
              </div>
            </div>
          </Card>
        </section>

        {/* ── Step 4: Payment Method ───────────────────────────────────────── */}
        <section className="space-y-3">
          <h2 className="font-heading text-base font-bold text-stone-700 uppercase tracking-widest flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-saffron-500 text-white text-xs font-bold">
              {stepBase + 3}
            </span>
            {t({ en: 'Select Payment Method', hi: 'भुगतान विधि चुनें', kn: 'ಪಾವತಿ ವಿಧಾನ', ta: 'கொடுப்பனவு முறை', te: 'పద్ధతి ఎంచుకోండి' })}
          </h2>

          <div className="flex rounded-xl bg-stone-100 p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-white text-saffron-600 shadow-sm'
                    : 'text-stone-500 hover:text-stone-700'
                }`}
              >
                {tab.icon}
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* ── UPI Tab ────────────────────────────────────────────────────── */}
          {activeTab === 'upi' && upiId && (
            <div className="bg-white rounded-2xl border-2 border-stone-100 shadow-sm p-6 space-y-6 text-center">
              {qrUrl && numAmount > 0 ? (
                <div className="space-y-4">
                  <div className="relative inline-block p-3 bg-white rounded-2xl shadow-md border border-stone-100">
                    <img src={qrUrl} alt="UPI QR Code" className="w-44 h-44 mx-auto object-contain" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-stone-800 font-bold">Scan QR to pay ₹{numAmount.toLocaleString('en-IN')}</p>
                    <p className="text-xs text-stone-400">Scan using any UPI App (GPay, PhonePe, Paytm, BHIM)</p>
                  </div>
                </div>
              ) : (
                <div className="py-8 text-stone-400 text-sm border-2 border-dashed border-stone-200 rounded-2xl">
                  Please select or enter a donation amount to generate a QR code.
                </div>
              )}

              <div className="border border-stone-200 p-4 rounded-xl flex items-center justify-between text-xs bg-stone-50/50">
                <span className="truncate select-all text-stone-700 font-bold">{upiId}</span>
                <button
                  type="button"
                  onClick={copyUpi}
                  className="bg-saffron-600 hover:bg-saffron-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all cursor-pointer"
                >
                  {copiedUpi ? 'Copied!' : 'Copy UPI'}
                </button>
              </div>
            </div>
          )}

          {/* ── WhatsApp Tab ─────────────────────────────────────────────────── */}
          {activeTab === 'whatsapp' && phone && (
            <div className="bg-white rounded-2xl border-2 border-stone-100 shadow-sm p-6 space-y-4 text-center">
              <div className="text-5xl">💬</div>
              <h3 className="font-heading text-lg font-bold text-stone-900">Contact Temple Directly</h3>
              <p className="text-sm text-stone-500 max-w-sm mx-auto">
                Connect with our team to arrange manual cash collections, cheque deposits, or other custom donations.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                {waLink && (
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-12 rounded-xl text-sm transition-all"
                  >
                    <MessageCircle className="h-4 w-4 fill-white" /> WhatsApp Temple
                  </a>
                )}
                {callLink && (
                  <a
                    href={callLink}
                    className="flex-1 flex items-center justify-center gap-2 bg-stone-100 hover:bg-stone-250 text-stone-800 font-bold h-12 rounded-xl text-sm transition-all"
                  >
                    <Phone className="h-4 w-4" /> Call Temple Office
                  </a>
                )}
              </div>
            </div>
          )}

          {/* ── Bank Tab ────────────────────────────────────────────────────── */}
          {activeTab === 'bank' && bank && (
            <div className="bg-white rounded-2xl border-2 border-stone-100 shadow-sm p-6 space-y-5">
              <h3 className="font-heading text-lg font-bold text-stone-900 text-center">Direct Bank Transfer</h3>
              <div className="border border-stone-200 rounded-2xl overflow-hidden bg-stone-50">
                <table className="w-full text-xs text-left text-stone-600">
                  <tbody className="divide-y divide-stone-200">
                    {[
                      { key: 'account_name', label: 'Account Name', val: bank.account_name },
                      { key: 'account_number', label: 'Account Number', val: bank.account_number },
                      { key: 'ifsc', label: 'IFSC Code', val: bank.ifsc },
                      { key: 'bank_name', label: 'Bank Name', val: bank.bank_name },
                      { key: 'branch', label: 'Branch', val: bank.branch },
                    ].map((row) => (
                      <tr key={row.key} className="hover:bg-stone-100/50">
                        <td className="px-4 py-3 font-semibold text-stone-500 w-1/3">{row.label}</td>
                        <td className="px-4 py-3 font-mono font-bold text-stone-900 flex justify-between items-center gap-2">
                          <span className="truncate select-all">{row.val}</span>
                          <button
                            type="button"
                            onClick={() => copyBankField(row.val)}
                            className="text-[10px] text-saffron-600 hover:underline shrink-0 cursor-pointer"
                          >
                            {copiedBank === row.val ? 'Copied' : 'Copy'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {numAmount > 0 && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-center">
                  <p className="text-sm text-amber-800 font-semibold">
                    Transfer{' '}
                    <span className="font-extrabold text-saffron-700">
                      ₹{numAmount.toLocaleString('en-IN')}
                    </span>{' '}
                    and mention your name in the remarks.
                  </p>
                </div>
              )}

              <p className="text-xs text-center text-stone-400 bg-stone-50 rounded-lg p-3">
                📝 After transfer, WhatsApp your transaction screenshot to receive an official receipt.
              </p>
            </div>
          )}

          {/* ── Razorpay Tab ─────────────────────────────────────────────────── */}
          {activeTab === 'razorpay' && isRazorpayEnabled && (
            <div className="bg-white rounded-2xl border-2 border-stone-100 shadow-sm p-6 space-y-5">
              <div className="text-center space-y-1">
                <div className="text-5xl mb-2">💳</div>
                <h3 className="font-heading text-xl font-bold text-stone-900">
                  Card / Net Banking / Wallet
                </h3>
                <p className="text-sm text-stone-500">Powered by Razorpay — India&apos;s most trusted gateway</p>
              </div>

              <div className="flex flex-wrap justify-center gap-2">
                {['💳 Credit Card', '💳 Debit Card', '🏦 Net Banking', '📱 UPI', '👛 Wallets'].map((m) => (
                  <span key={m} className="text-xs font-medium bg-stone-100 text-stone-600 rounded-full px-3 py-1">
                    {m}
                  </span>
                ))}
              </div>

              {numAmount > 0 ? (
                <Button
                  onClick={handleRazorpay}
                  loading={razorpayLoading}
                  className="w-full h-14 text-base font-bold rounded-xl gradient-primary shadow-xl shadow-saffron-400/30"
                  leftIcon={<CreditCard className="h-5 w-5" />}
                >
                  Pay ₹{numAmount.toLocaleString('en-IN')} Securely
                </Button>
              ) : (
                <div className="text-center py-5 text-stone-400 text-sm border-2 border-dashed border-stone-200 rounded-xl">
                  Please select or enter an amount first
                </div>
              )}

              <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-stone-400">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3 text-emerald-500" /> PCI DSS Secured
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3 text-emerald-500" /> 256-bit SSL
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3 text-emerald-500" /> Instant Receipt
                </span>
              </div>
            </div>
          )}

          {/* No payment methods configured */}
          {tabs.length === 0 && (
            <div className="bg-white rounded-2xl border-2 border-dashed border-stone-200 p-8 text-center text-stone-400">
              <Landmark className="h-10 w-10 mx-auto mb-3 opacity-30" />
              <p className="font-semibold">Payment methods not configured yet.</p>
              <p className="text-sm mt-1">Please contact the temple administration.</p>
            </div>
          )}
        </section>

        {/* ── Footer ───────────────────────────────────────────────────────── */}
        <div className="text-center space-y-2 pb-6">
          <Link href={`/temple/${temple.slug}`}>
            <button
              type="button"
              className="inline-flex items-center gap-2 text-sm text-stone-400 hover:text-saffron-600 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to {temple.name}
            </button>
          </Link>
          <p className="text-[10px] text-stone-300">
            All donations are subject to the temple trust&apos;s terms. 80G receipts issued as per Income Tax Act.
          </p>
        </div>
      </div>
    </div>
  )
}
