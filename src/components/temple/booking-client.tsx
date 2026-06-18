'use client'

import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  CheckCircle2,
  Copy,
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  Smartphone,
  Building2,
  Home,
  Sparkles,
  ChevronRight,
  Share2,
  MessageCircle,
  Terminal,
  Cpu,
  Database,
  Layers
} from 'lucide-react'
import { cn } from '@/lib/utils/cn'

// ─── Types ────────────────────────────────────────────────────────────────────

interface SevaItem {
  id: string
  name: string
  description: string
  price: number
  durationMinutes: number | null
  isActive: boolean
}

interface TempleData {
  id: string
  name: string
  slug: string
  upiId: string | null
  contactPhone: string | null
  bankDetails: Record<string, string> | null
  logoUrl: string | null
}

interface BookingClientProps {
  temple: TempleData
  sevas: SevaItem[]
  preselectedSevaId: string | null
  templateId?: string
}

// ─── Constants ────────────────────────────────────────────────────────────────

const TIME_SLOTS = [
  { value: '06:00', label: '6:00 AM', icon: '🌅' },
  { value: '08:00', label: '8:00 AM', icon: '☀️' },
  { value: '10:00', label: '10:00 AM', icon: '🌤️' },
  { value: '12:00', label: '12:00 PM', icon: '🔆' },
  { value: '16:00', label: '4:00 PM', icon: '🌇' },
  { value: '18:00', label: '6:00 PM', icon: '🌆' },
]

const PAYMENT_METHODS = [
  { id: 'UPI', label: 'UPI / QR Pay', icon: Smartphone, color: 'from-violet-500 to-purple-600' },
  { id: 'WHATSAPP', label: 'WhatsApp', icon: MessageCircle, color: 'from-green-500 to-emerald-600' },
  { id: 'PAY_AT_TEMPLE', label: 'Pay at Temple', icon: Home, color: 'from-amber-500 to-orange-600' },
  { id: 'BANK', label: 'Bank Transfer', icon: Building2, color: 'from-blue-500 to-indigo-600' },
]

// ─── Helpers ─────────────────────────────────────────────────────────────────

function todayISO() {
  return new Date().toISOString().split('T')[0]
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  })
}

function formatPrice(n: number) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n)
}

function buildUpiUrl(upiId: string, amount: number, name: string) {
  const encoded = encodeURIComponent(name)
  return `upi://pay?pa=${encodeURIComponent(upiId)}&am=${amount}&pn=${encoded}&cu=INR`
}

function buildQrUrl(upiUrl: string) {
  return `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(upiUrl)}&color=7c3aed&bgcolor=ffffff&margin=12`
}

function buildWhatsAppMessage(temple: TempleData, seva: SevaItem, date: string, time: string, name: string, phone: string) {
  const slot = TIME_SLOTS.find(t => t.value === time)?.label || time
  const msg = [
    `🙏 *Seva Booking Request*`,
    ``,
    `*Temple:* ${temple.name}`,
    `*Seva:* ${seva.name}`,
    `*Amount:* ${formatPrice(seva.price)}`,
    `*Date:* ${formatDate(date)}`,
    `*Time:* ${slot}`,
    ``,
    `*Devotee Details:*`,
    `Name: ${name}`,
    `Phone: ${phone}`,
    ``,
    `Please confirm my booking. 🙏`,
  ].join('\n')
  return `https://wa.me/${(temple.contactPhone || '').replace(/\D/g, '')}?text=${encodeURIComponent(msg)}`
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionHeading({ step, title, subtitle }: { step: number; title: string; subtitle?: string }) {
  return (
    <div className="flex items-start gap-3 mb-4">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-saffron-505 to-amber-600 text-white text-sm font-bold flex items-center justify-center shadow-md">
        {step}
      </div>
      <div>
        <h3 className="font-heading font-semibold text-stone-800 dark:text-stone-100">{title}</h3>
        {subtitle && <p className="text-xs text-stone-500 mt-0.5">{subtitle}</p>}
      </div>
    </div>
  )
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = React.useState(false)
  const handleCopy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 text-xs text-saffron-600 hover:text-saffron-700 dark:text-saffron-400 font-medium transition-colors cursor-pointer"
    >
      <Copy className="h-3.5 w-3.5" />
      {copied ? 'Copied!' : 'Copy'}
    </button>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function BookingClient({ temple, sevas, preselectedSevaId, templateId = 'classic' }: BookingClientProps) {
  // ── Booking form state
  const [selectedSevaId, setSelectedSevaId] = React.useState(preselectedSevaId || sevas[0]?.id || '')
  const [bookingDate, setBookingDate] = React.useState(todayISO())
  const [bookingTime, setBookingTime] = React.useState('06:00')
  const [devoteeName, setDevoteeName] = React.useState('')
  const [devoteePhone, setDevoteePhone] = React.useState('')
  const [devoteeEmail, setDevoteeEmail] = React.useState('')
  const [gotra, setGotra] = React.useState('')
  const [paymentMethod, setPaymentMethod] = React.useState('UPI')
  const [utrRef, setUtrRef] = React.useState('')

  // ── Submission state
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [errors, setErrors] = React.useState<Record<string, string>>({})
  const [bookingSuccess, setBookingSuccess] = React.useState<{ bookingId: string } | null>(null)

  const selectedSeva = sevas.find(s => s.id === selectedSevaId) || sevas[0]

  // ── Validation
  function validate() {
    const errs: Record<string, string> = {}
    if (!selectedSevaId) errs.seva = 'Please select a seva'
    if (!bookingDate) errs.date = 'Please select a date'
    if (!devoteeName.trim()) errs.name = 'Devotee name is required'
    if (!devoteePhone.trim()) errs.phone = 'Phone number is required'
    else if (!/^[6-9]\d{9}$/.test(devoteePhone.replace(/\s/g, '')))
      errs.phone = 'Enter a valid 10-digit Indian mobile number'
    return errs
  }

  // ── Submit handler
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }
    setErrors({})
    setIsSubmitting(true)

    try {
      const res = await fetch('/api/v1/seva-bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          templeId: temple.id,
          sevaId: selectedSevaId,
          bookingDate,
          bookingTime,
          donorName: devoteeName,
          donorPhone: devoteePhone,
          paymentMethod: paymentMethod === 'WHATSAPP' ? 'PENDING' : paymentMethod,
          paymentRef: utrRef || null,
        }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Booking failed')
      setBookingSuccess({ bookingId: data.bookingId })
    } catch (err: any) {
      setErrors({ submit: err.message || 'Something went wrong. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  // ── Success screen redirection
  if (bookingSuccess) {
    return (
      <SuccessScreen
        temple={temple}
        seva={selectedSeva!}
        bookingId={bookingSuccess.bookingId}
        date={bookingDate}
        time={bookingTime}
        name={devoteeName}
        phone={devoteePhone}
        paymentMethod={paymentMethod}
        templateId={templateId}
      />
    )
  }

  const upiUrl = temple.upiId && selectedSeva
    ? buildUpiUrl(temple.upiId, selectedSeva.price, temple.name)
    : null
  const qrUrl = upiUrl ? buildQrUrl(upiUrl) : null

  const whatsappUrl = selectedSeva && devoteeName && devoteePhone
    ? buildWhatsAppMessage(temple, selectedSeva, bookingDate, bookingTime, devoteeName, devoteePhone)
    : null

  // ─── HIGH TECH & AI OS THEMES (tech-sanctuary & ai-omniscient) ───
  if (templateId === 'tech-sanctuary' || templateId === 'ai-omniscient') {
    return (
      <div className="min-h-screen bg-black font-mono text-slate-300 selection:bg-cyan-900 selection:text-cyan-50 overflow-hidden relative pb-16">
        
        {/* Cyber grid overlays */}
        <div className="fixed inset-0 pointer-events-none opacity-20 z-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </div>
        <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-cyan-600/10 blur-[120px] rounded-full mix-blend-screen pointer-events-none z-0"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 pt-16">
          
          {/* Header HUD */}
          <div className="relative border border-cyan-800/40 bg-slate-950/80 p-8 rounded-3xl overflow-hidden shadow-[0_0_30px_rgba(6,182,212,0.15)] backdrop-blur-md mb-8">
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-500"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-500"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-500"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-500"></div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 bg-cyan-950/50 border border-cyan-800/50 text-cyan-400 px-4 py-1 rounded-lg text-xs font-bold uppercase">
                  <Terminal className="h-4 w-4 animate-pulse" />
                  INITIATE SEVA RESERVATION // CLIENT
                </div>
                <h1 className="text-3xl sm:text-4xl font-black text-white tracking-wider uppercase">
                  {temple.name} // POOJA_SCHEDULER
                </h1>
                <p className="text-xs text-slate-450 border-l-2 border-cyan-500 pl-3">
                  Calibrate birth chart parameters and gotra lineage targets to register a ritual slot in the temple cluster.
                </p>
              </div>
              
              <Link href={`/temple/${temple.slug}`} className="bg-slate-900 hover:bg-slate-850 text-white border border-slate-800 text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition-colors">
                <ArrowLeft className="h-3.5 w-3.5" /> Back to Home
              </Link>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Step 1: Seva Selection */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                1. Select Ritual Type Node
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {sevas.map(seva => (
                  <button
                    key={seva.id}
                    type="button"
                    onClick={() => setSelectedSevaId(seva.id)}
                    className={cn(
                      'relative text-left rounded-xl border p-4 transition-all duration-200 cursor-pointer flex flex-col justify-between h-full',
                      selectedSevaId === seva.id
                        ? 'border-cyan-500 bg-cyan-950/40 text-white shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                        : 'border-slate-800 bg-slate-950/30 text-slate-400 hover:border-cyan-800'
                    )}
                  >
                    <span className="font-bold text-white flex justify-between w-full">
                      <span>{seva.name}</span>
                      {selectedSevaId === seva.id && <span className="text-cyan-400">[selected]</span>}
                    </span>
                    {seva.description && <span className="text-[10px] text-slate-500 mt-2 leading-relaxed">{seva.description}</span>}
                    <div className="mt-4 flex items-center gap-3 border-t border-slate-900 pt-2 text-[10px]">
                      <span className="text-cyan-400 font-bold">{formatPrice(seva.price)}</span>
                      {seva.durationMinutes && (
                        <span className="text-slate-500 flex items-center gap-0.5">
                          <Clock className="h-3 w-3" /> {seva.durationMinutes} min
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Date & Time */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                2. Set Temporal Coordinates
              </h3>
              <div className="border border-slate-800 bg-slate-950 p-6 rounded-2xl space-y-6">
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">target_date</label>
                  <input
                    type="date"
                    min={todayISO()}
                    value={bookingDate}
                    onChange={e => setBookingDate(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-850 rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">target_time_sector</label>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {TIME_SLOTS.map(slot => (
                      <button
                        key={slot.value}
                        type="button"
                        onClick={() => setBookingTime(slot.value)}
                        className={cn(
                          'flex flex-col items-center gap-1.5 rounded-lg border py-2.5 text-center transition-all text-[10px] font-bold cursor-pointer',
                          bookingTime === slot.value
                            ? 'border-cyan-500 bg-cyan-950/50 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.15)]'
                            : 'border-slate-850 bg-slate-900/40 text-slate-500 hover:border-slate-800'
                        )}
                      >
                        <span className="text-sm">{slot.icon}</span>
                        <span>{slot.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Devotee parameters */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                3. Devotee Registry Variables
              </h3>
              <div className="border border-slate-800 bg-slate-950 p-6 rounded-2xl space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">devotee_name</label>
                  <input
                    placeholder="Ramesh Sharma"
                    value={devoteeName}
                    onChange={(e) => setDevoteeName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-850 rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 placeholder-slate-700"
                  />
                  {errors.name && <p className="text-[10px] text-red-500 font-bold">{errors.name}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">devotee_phone</label>
                    <input
                      placeholder="9876543210"
                      value={devoteePhone}
                      onChange={(e) => setDevoteePhone(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-850 rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 placeholder-slate-700"
                    />
                    {errors.phone && <p className="text-[10px] text-red-500 font-bold">{errors.phone}</p>}
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">devotee_email</label>
                    <input
                      type="email"
                      placeholder="ramesh@example.com"
                      value={devoteeEmail}
                      onChange={(e) => setDevoteeEmail(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-850 rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 placeholder-slate-700"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">gotra_lineage (optional)</label>
                  <input
                    placeholder="e.g. Kashyapa"
                    value={gotra}
                    onChange={(e) => setGotra(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-850 rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 placeholder-slate-700"
                  />
                </div>
              </div>
            </div>

            {/* Step 4: Payment Relay */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                4. Select Payment Relay Uplink
              </h3>
              <div className="border border-slate-800 bg-slate-950 p-6 rounded-2xl space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {PAYMENT_METHODS.map(method => {
                    const PMIcon = method.icon
                    return (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setPaymentMethod(method.id)}
                        className={cn(
                          'p-4 rounded-xl border flex flex-col items-center justify-center text-center gap-2 transition-all cursor-pointer',
                          paymentMethod === method.id
                            ? 'border-fuchsia-500 bg-fuchsia-950/40 text-white shadow-[0_0_15px_rgba(240,70,250,0.15)]'
                            : 'border-slate-850 bg-slate-900/30 text-slate-500 hover:border-slate-800'
                        )}
                      >
                        <PMIcon className="h-5 w-5 text-fuchsia-400" />
                        <span className="text-[10px] font-bold uppercase">{method.label}</span>
                      </button>
                    )
                  })}
                </div>

                {/* Sub tab payment details */}
                {paymentMethod === 'UPI' && temple.upiId && qrUrl && (
                  <div className="bg-black/60 border border-slate-900 p-6 rounded-xl flex flex-col md:flex-row items-center gap-6 justify-center">
                    <div className="p-2 bg-white rounded-2xl border border-slate-800">
                      <img src={qrUrl} alt="UPI QR" className="w-36 h-36" />
                    </div>
                    <div className="space-y-3 max-w-sm text-center md:text-left">
                      <p className="text-xs text-slate-400">
                        Scan with GPay/PhonePe to transfer <span className="font-bold text-white">₹{selectedSeva.price}</span>.
                      </p>
                      <div className="bg-slate-900 px-3 py-2 rounded-lg border border-slate-800 flex justify-between items-center text-xs gap-3">
                        <span className="font-bold text-white select-all truncate">{temple.upiId}</span>
                        <CopyButton text={temple.upiId} />
                      </div>
                      <input
                        placeholder="Enter 12-digit UPI Transaction Ref / UTR..."
                        value={utrRef}
                        onChange={e => setUtrRef(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-[10px] text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === 'BANK' && temple.bankDetails && (
                  <div className="bg-black/60 border border-slate-900 p-6 rounded-xl space-y-4">
                    <p className="text-xs text-slate-400">Execute IMPS/NEFT transfer to following parameters:</p>
                    <div className="grid grid-cols-2 gap-4 text-[10px] font-mono">
                      <div><span className="text-slate-500">ACC_NAME:</span> <span className="text-white select-all font-bold">{temple.bankDetails.account_name}</span></div>
                      <div><span className="text-slate-500">ACC_NO:</span> <span className="text-white select-all font-bold">{temple.bankDetails.account_number}</span></div>
                      <div><span className="text-slate-500">BANK_IFSC:</span> <span className="text-white select-all font-bold">{temple.bankDetails.ifsc}</span></div>
                      <div><span className="text-slate-500">BANK_NAME:</span> <span className="text-white select-all font-bold">{temple.bankDetails.bank_name}</span></div>
                    </div>
                    <input
                      placeholder="Enter Bank Transaction Reference Number..."
                      value={utrRef}
                      onChange={e => setUtrRef(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-[10px] text-white focus:outline-none"
                    />
                  </div>
                )}

                {paymentMethod === 'WHATSAPP' && (
                  <div className="bg-emerald-950/20 border border-emerald-900/40 p-6 rounded-xl text-center space-y-2">
                    <p className="text-xs text-slate-400">
                      Submit booking. A secure WhatsApp communication link will be generated on confirmation screen.
                    </p>
                  </div>
                )}

                {paymentMethod === 'PAY_AT_TEMPLE' && (
                  <div className="bg-amber-950/20 border border-amber-900/40 p-6 rounded-xl text-center space-y-2">
                    <p className="text-xs text-slate-400">
                      Reserve slot instantly. Pay directly at the temple desk on target schedule.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Summary + Execute Booking */}
            {selectedSeva && (
              <div className="border border-cyan-800/40 bg-slate-950/80 p-6 rounded-3xl space-y-4 shadow-[0_0_20px_rgba(6,182,212,0.1)]">
                <h3 className="text-xs uppercase font-bold text-white tracking-wider">// SUMMARY PREVIEW</h3>
                <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                  <div><span className="text-slate-500">SEVA_ID:</span> <span className="text-white font-bold">{selectedSeva.name}</span></div>
                  <div><span className="text-slate-500">TARGET_SCHEDULE:</span> <span className="text-cyan-400 font-bold">{bookingDate ? formatDate(bookingDate) : 'N/A'} // {TIME_SLOTS.find(t => t.value === bookingTime)?.label}</span></div>
                  <div><span className="text-slate-500">DEVOTEE:</span> <span className="text-white">{devoteeName || 'N/A'}</span></div>
                  <div><span className="text-slate-500">RELAY_PROTOCOL:</span> <span className="text-fuchsia-400 font-bold">{paymentMethod}</span></div>
                  <div className="col-span-2 border-t border-slate-900 pt-3 flex justify-between items-center text-sm font-bold">
                    <span className="text-white">TOTAL LOAD:</span>
                    <span className="text-cyan-400 text-base">{formatPrice(selectedSeva.price)}</span>
                  </div>
                </div>

                {errors.submit && (
                  <div className="text-xs text-red-500 bg-red-950/20 border border-red-900/40 p-3 rounded-lg font-bold">
                    [ERROR] {errors.submit}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-cyan-950 border border-cyan-800 hover:border-cyan-500 text-cyan-400 font-bold text-xs uppercase tracking-wider rounded-xl transition-all hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <span className="animate-pulse">🙏</span> EXECUTE BOOKING STREAM
                </button>
              </div>
            )}

          </form>

        </div>

      </div>
    )
  }

  // ─── ORIGINAL CLASSIC / OTHER THEMES ───
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-stone-50 to-white dark:from-stone-950 dark:via-stone-900 dark:to-stone-950">
      {/* ── Header Banner */}
      <div className="relative bg-gradient-to-r from-saffron-600 via-amber-600 to-orange-600 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-white blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-48 h-48 rounded-full bg-white blur-3xl translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="relative max-w-2xl mx-auto px-4 py-8 text-center">
          {temple.logoUrl && (
            <div className="inline-flex mb-3">
              <Image src={temple.logoUrl} alt={temple.name} width={52} height={52} className="rounded-full border-2 border-white/40 shadow-lg" />
            </div>
          )}
          <div className="inline-flex items-center gap-2 mb-2 bg-white/10 backdrop-blur-sm text-white/80 text-xs px-3 py-1 rounded-full font-medium">
            <Sparkles className="h-3 w-3" />
            Sacred Seva Booking
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-1">{temple.name}</h1>
          <p className="text-white/70 text-sm">Book your puja, archana, or special seva online</p>

          <Link
            href={`/temple/${temple.slug}`}
            className="inline-flex items-center gap-1.5 mt-4 text-white/70 hover:text-white text-xs transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to temple home
          </Link>
        </div>
      </div>

      {/* ── Form */}
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        <form onSubmit={handleSubmit} noValidate>

          {/* Step 1 ─ Seva Selection */}
          <Card className="border-stone-200 dark:border-stone-800 shadow-sm mb-6">
            <CardHeader className="pb-3">
              <SectionHeading step={1} title="Select Seva" subtitle="Choose the pooja or service you wish to book" />
            </CardHeader>
            <CardContent className="pt-0">
              {sevas.length === 0 ? (
                <p className="text-sm text-stone-500 text-center py-4">No sevas available at this time.</p>
              ) : sevas.length <= 4 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {sevas.map(seva => (
                    <button
                      key={seva.id}
                      type="button"
                      onClick={() => setSelectedSevaId(seva.id)}
                      className={cn(
                        'relative text-left rounded-xl border-2 p-4 transition-all duration-200 cursor-pointer',
                        selectedSevaId === seva.id
                          ? 'border-saffron-500 bg-saffron-50 dark:bg-saffron-950/20 shadow-md shadow-saffron-500/10'
                          : 'border-stone-200 dark:border-stone-700 hover:border-saffron-300 hover:bg-amber-50/50 dark:hover:bg-stone-800/50'
                      )}
                    >
                      {selectedSevaId === seva.id && (
                        <div className="absolute top-3 right-3">
                          <CheckCircle2 className="h-4 w-4 text-saffron-500" />
                        </div>
                      )}
                      <p className="font-semibold text-stone-800 dark:text-stone-100 text-sm pr-6">{seva.name}</p>
                      {seva.description && (
                        <p className="text-xs text-stone-500 mt-1 line-clamp-2">{seva.description}</p>
                      )}
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-saffron-600 dark:text-saffron-400 font-bold text-base">{formatPrice(seva.price)}</span>
                        {seva.durationMinutes && (
                          <span className="text-xs text-stone-400 flex items-center gap-0.5">
                            <Clock className="h-3 w-3" /> {seva.durationMinutes} min
                          </span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-stone-700 dark:text-stone-300">Seva / Pooja</label>
                  <select
                    value={selectedSevaId}
                    onChange={e => setSelectedSevaId(e.target.value)}
                    className="flex w-full h-11 rounded-md border border-stone-200 dark:border-stone-800 bg-background text-foreground text-sm px-3 focus:outline-none focus:ring-2 focus:ring-saffron-500/30 focus:border-saffron-500 transition-all"
                  >
                    {sevas.map(s => (
                      <option key={s.id} value={s.id}>{s.name} — {formatPrice(s.price)}</option>
                    ))}
                  </select>
                  {selectedSeva && (
                    <div className="mt-3 p-3 bg-saffron-50 dark:bg-saffron-950/20 rounded-lg border border-saffron-200 dark:border-saffron-800/40">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold text-stone-800 dark:text-stone-100 text-sm">{selectedSeva.name}</p>
                          {selectedSeva.description && <p className="text-xs text-stone-500 mt-0.5">{selectedSeva.description}</p>}
                        </div>
                        <span className="font-bold text-saffron-600 dark:text-saffron-400">{formatPrice(selectedSeva.price)}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
              {errors.seva && <p className="text-xs text-red-500 mt-2">{errors.seva}</p>}
            </CardContent>
          </Card>

          {/* Step 2 ─ Date & Time */}
          <Card className="border-stone-200 dark:border-stone-800 shadow-sm mb-6">
            <CardHeader className="pb-3">
              <SectionHeading step={2} title="Choose Date & Time" subtitle="Select your preferred date and time slot" />
            </CardHeader>
            <CardContent className="pt-0 space-y-4">
              <Input
                type="date"
                label="Booking Date"
                min={todayISO()}
                value={bookingDate}
                onChange={e => setBookingDate(e.target.value)}
                error={errors.date}
                leftIcon={<Calendar className="h-4 w-4" />}
              />

              <div>
                <label className="text-sm font-medium text-stone-700 dark:text-stone-300 block mb-2">Time Slot</label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {TIME_SLOTS.map(slot => (
                    <button
                      key={slot.value}
                      type="button"
                      onClick={() => setBookingTime(slot.value)}
                      className={cn(
                        'flex flex-col items-center gap-0.5 rounded-lg border-2 py-2 px-1 text-center transition-all duration-150 text-xs font-medium cursor-pointer',
                        bookingTime === slot.value
                          ? 'border-saffron-500 bg-saffron-50 dark:bg-saffron-950/20 text-saffron-700 dark:text-saffron-400'
                          : 'border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:border-saffron-300 hover:bg-amber-50/50'
                      )}
                    >
                      <span className="text-base leading-none">{slot.icon}</span>
                      <span>{slot.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Step 3 ─ Devotee Info */}
          <Card className="border-stone-200 dark:border-stone-800 shadow-sm mb-6">
            <CardHeader className="pb-3">
              <SectionHeading step={3} title="Devotee Details" subtitle="Your details will be recorded for the seva" />
            </CardHeader>
            <CardContent className="pt-0 space-y-4">
              <Input
                label="Devotee Full Name"
                placeholder="e.g. Ramesh Kumar"
                value={devoteeName}
                onChange={e => setDevoteeName(e.target.value)}
                error={errors.name}
                leftIcon={<User className="h-4 w-4" />}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Contact Phone"
                  placeholder="e.g. 9876543210"
                  value={devoteePhone}
                  onChange={e => setDevoteePhone(e.target.value)}
                  error={errors.phone}
                  leftIcon={<Phone className="h-4 w-4" />}
                />
                <Input
                  label="Email Address (Optional)"
                  placeholder="e.g. ramesh@example.com"
                  type="email"
                  value={devoteeEmail}
                  onChange={e => setDevoteeEmail(e.target.value)}
                  leftIcon={<Mail className="h-4 w-4" />}
                />
              </div>

              <Input
                label="Gotra (Optional)"
                placeholder="e.g. Kashyapa"
                value={gotra}
                onChange={e => setGotra(e.target.value)}
                leftIcon={<Sparkles className="h-4 w-4" />}
              />
            </CardContent>
          </Card>

          {/* Step 4 ─ Payment Option */}
          <Card className="border-stone-200 dark:border-stone-800 shadow-sm mb-6">
            <CardHeader className="pb-3">
              <SectionHeading step={4} title="Payment Option" subtitle="Choose how you wish to pay for the seva" />
            </CardHeader>
            <CardContent className="pt-0 space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {PAYMENT_METHODS.map(method => {
                  const PMIcon = method.icon
                  const isAvailable =
                    (method.id === 'UPI' && temple.upiId) ||
                    (method.id === 'WHATSAPP' && temple.contactPhone) ||
                    (method.id === 'BANK' && temple.bankDetails) ||
                    method.id === 'PAY_AT_TEMPLE'

                  if (!isAvailable) return null

                  return (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setPaymentMethod(method.id)}
                      className={cn(
                        'flex flex-col items-center gap-2 rounded-xl border-2 p-3 text-center transition-all cursor-pointer',
                        paymentMethod === method.id
                          ? 'border-saffron-500 bg-saffron-50 dark:bg-saffron-950/20'
                          : 'border-stone-200 dark:border-stone-700 hover:border-saffron-305'
                      )}
                    >
                      <div className={cn('w-9 h-9 rounded-full bg-gradient-to-br flex items-center justify-center text-white', method.color)}>
                        <PMIcon className="h-4.5 w-4.5" />
                      </div>
                      <span className="text-xs font-semibold text-stone-750 dark:text-stone-200">{method.label}</span>
                    </button>
                  )
                })}
              </div>

              {/* UPI instructions */}
              {paymentMethod === 'UPI' && temple.upiId && qrUrl && (
                <div className="bg-stone-50 dark:bg-stone-900/50 border border-stone-200 dark:border-stone-800 p-5 rounded-xl space-y-4">
                  <h4 className="font-semibold text-sm text-stone-800 dark:text-stone-200">Scan QR Code using any UPI App</h4>
                  <div className="flex flex-col sm:flex-row items-center gap-6 justify-center">
                    <div className="p-2 bg-white rounded-xl shadow-inner flex-shrink-0">
                      <img src={qrUrl} alt="UPI QR Code" className="w-36 h-36 object-contain" />
                    </div>
                    <div className="space-y-2.5 text-center sm:text-left text-sm max-w-sm">
                      <p className="text-stone-500 leading-normal text-xs">
                        Transfer the amount of <span className="font-bold text-stone-950 dark:text-white">{formatPrice(selectedSeva.price)}</span> using GPay, PhonePe, Paytm, or BHIM.
                      </p>
                      <div className="bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800/80 px-3 py-2 rounded-lg flex items-center justify-between text-xs gap-3">
                        <span className="font-mono text-stone-850 dark:text-stone-200 select-all font-bold truncate">{temple.upiId}</span>
                        <CopyButton text={temple.upiId} />
                      </div>
                      <input
                        placeholder="Enter UTR / UPI Transaction Reference..."
                        value={utrRef}
                        onChange={e => setUtrRef(e.target.value)}
                        className="flex w-full h-9 rounded-md border border-stone-200 dark:border-stone-800 bg-background text-foreground text-xs px-3 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Bank instructions */}
              {paymentMethod === 'BANK' && temple.bankDetails && (
                <div className="bg-stone-50 dark:bg-stone-900/50 border border-stone-200 dark:border-stone-800 p-5 rounded-xl space-y-3">
                  <h4 className="font-semibold text-sm text-stone-800 dark:text-stone-200">Bank Transfer Details</h4>
                  <div className="border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden text-xs">
                    {[
                      { key: 'account_name', label: 'Account Name', val: temple.bankDetails.account_name },
                      { key: 'account_number', label: 'Account Number', val: temple.bankDetails.account_number },
                      { key: 'ifsc', label: 'IFSC Code', val: temple.bankDetails.ifsc },
                      { key: 'bank_name', label: 'Bank Name', val: temple.bankDetails.bank_name },
                    ].map(row => (
                      <div key={row.key} className="flex justify-between items-center border-b border-stone-200 dark:border-stone-800 p-2.5 last:border-0 bg-white dark:bg-stone-900/30">
                        <span className="text-stone-400 font-semibold">{row.label}</span>
                        <span className="font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5 font-mono">
                          {row.val} <CopyButton text={row.val} />
                        </span>
                      </div>
                    ))}
                  </div>
                  <input
                    placeholder="Enter Bank Transaction Reference No..."
                    value={utrRef}
                    onChange={e => setUtrRef(e.target.value)}
                    className="flex w-full h-9 rounded-md border border-stone-200 dark:border-stone-800 bg-background text-foreground text-xs px-3 focus:outline-none"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Summary + Submit */}
          {selectedSeva && (
            <Card className="border-saffron-200 dark:border-saffron-800/40 bg-gradient-to-b from-saffron-50 to-amber-50/40 dark:from-saffron-950/20 dark:to-amber-950/10 shadow-sm mb-6">
              <CardContent className="p-5 space-y-3">
                <h3 className="font-heading font-semibold text-stone-800 dark:text-stone-100 text-sm">Booking Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-stone-500">Seva</span>
                    <span className="font-medium text-stone-800 dark:text-stone-200">{selectedSeva.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Date</span>
                    <span className="font-medium text-stone-800 dark:text-stone-200">{bookingDate ? formatDate(bookingDate) : '—'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Time</span>
                    <span className="font-medium text-stone-800 dark:text-stone-200">{TIME_SLOTS.find(t => t.value === bookingTime)?.label}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Payment</span>
                    <span className="font-medium text-stone-800 dark:text-stone-200">{PAYMENT_METHODS.find(m => m.id === paymentMethod)?.label}</span>
                  </div>
                  <div className="pt-2 border-t border-saffron-200 dark:border-saffron-800/30 flex justify-between items-center">
                    <span className="font-semibold text-stone-700 dark:text-stone-300">Total Amount</span>
                    <span className="font-bold text-saffron-600 dark:text-saffron-400 text-lg">{formatPrice(selectedSeva.price)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {errors.submit && (
            <div className="rounded-xl border border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-800/40 px-4 py-3 text-sm text-red-600 dark:text-red-400 mb-4">
              ⚠️ {errors.submit}
            </div>
          )}

          <Button
            type="submit"
            loading={isSubmitting}
            size="lg"
            className="w-full h-14 text-base font-bold rounded-2xl shadow-lg shadow-saffron-500/25 relative overflow-hidden"
          >
            {!isSubmitting && (
              <>
                <span className="mr-2">🙏</span>
                Confirm Seva Booking
                <ChevronRight className="h-5 w-5 ml-1" />
              </>
            )}
          </Button>
          <p className="text-center text-xs text-stone-400 mt-3">
            By confirming, you agree that this seva will be performed as per temple schedule.
          </p>
        </form>
      </div>
    </div>
  )
}

// ─── Success Screen Component ──────────────────────────────────────────────────

function SuccessScreen({
  temple, seva, bookingId, date, time, name, phone, paymentMethod, templateId = 'classic',
}: {
  temple: TempleData
  seva: SevaItem
  bookingId: string
  date: string
  time: string
  name: string
  phone: string
  paymentMethod: string
  templateId?: string
}) {
  const slot = TIME_SLOTS.find(t => t.value === time)?.label || time
  const whatsappUrl = temple.contactPhone
    ? buildWhatsAppMessage(temple, seva, date, time, name, phone)
    : null

  const shareText = `🙏 I just booked ${seva.name} at ${temple.name} on ${formatDate(date)} at ${slot}.\n\nBooking ID: ${bookingId.slice(0, 8).toUpperCase()}`

  async function handleShare() {
    if (navigator.share) {
      await navigator.share({ title: `${seva.name} Booking`, text: shareText })
    } else {
      await navigator.clipboard.writeText(shareText)
    }
  }

  // High Tech Success Screen
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
              SEVA RESERVATION // CONFIRMED
            </h2>
            <p className="text-xs text-slate-500">
              The ritual parameters have been committed to the temple scheduling database.
            </p>
          </div>

          <div className="bg-black/60 border border-slate-900 p-4 rounded-xl text-left text-[10px] space-y-2 leading-relaxed text-slate-500 font-mono">
            <div>&gt;&gt; BOOKING_ID: {bookingId.slice(0, 8).toUpperCase()}</div>
            <div>&gt;&gt; RITUAL: {seva.name}</div>
            <div>&gt;&gt; PRICE: {formatPrice(seva.price)}</div>
            <div>&gt;&gt; SCHEDULE: {formatDate(date)} @ {slot}</div>
            <div>&gt;&gt; STATUS: SYNC_CONFIRMED</div>
          </div>

          <div className="space-y-3 pt-2">
            {whatsappUrl && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-green-950 hover:bg-green-900 border border-green-800 text-green-400 font-bold text-xs uppercase tracking-wider transition-colors shadow-md shadow-green-500/20"
              >
                <MessageCircle className="h-4 w-4" /> Notify Temple via WhatsApp
              </a>
            )}
            <Button
              variant="outline"
              className="w-full py-3.5 text-xs font-bold uppercase rounded-xl border-slate-800 hover:bg-slate-900 text-white"
              onClick={handleShare}
            >
              Share Booking Parameters
            </Button>
            <Link href={`/temple/${temple.slug}`} className="block">
              <Button variant="ghost" className="w-full text-xs font-bold uppercase rounded-xl hover:bg-slate-900 text-slate-400">
                Exit Protocol
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-emerald-50 to-white dark:from-green-950/30 dark:via-stone-950 dark:to-stone-950 flex flex-col">
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 py-10 text-center px-4">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white shadow-xl shadow-green-500/20 mb-4">
          <CheckCircle2 className="h-10 w-10 text-green-500" />
        </div>
        <h1 className="font-heading text-2xl font-bold text-white mb-1">Booking Confirmed! 🎉</h1>
        <p className="text-green-100 text-sm">Your seva has been successfully booked</p>
      </div>

      <div className="max-w-lg mx-auto px-4 py-8 w-full space-y-5">
        <div className="text-center">
          <p className="text-xs text-stone-500 mb-1">Your Booking Reference</p>
          <div className="inline-flex items-center gap-2 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl px-5 py-3 shadow-sm">
            <span className="font-mono text-lg font-bold text-stone-800 dark:text-stone-100 tracking-widest">
              {bookingId.slice(0, 8).toUpperCase()}
            </span>
            <CopyButton text={bookingId.slice(0, 8).toUpperCase()} />
          </div>
        </div>

        <Card className="border-green-200 dark:border-green-800/30 shadow-sm">
          <CardContent className="p-5 space-y-3">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center">
                <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-heading font-semibold text-stone-800 dark:text-stone-100">Seva Details</h3>
            </div>

            {[
              { label: 'Temple', value: temple.name },
              { label: 'Seva', value: seva.name },
              { label: 'Amount', value: formatPrice(seva.price) },
              { label: 'Date', value: formatDate(date) },
              { label: 'Time Slot', value: slot },
              { label: 'Booked For', value: name },
              { label: 'Payment', value: PAYMENT_METHODS.find(m => m.id === paymentMethod)?.label || paymentMethod },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between items-start gap-2 text-sm">
                <span className="text-stone-500 flex-shrink-0">{label}</span>
                <span className="font-medium text-stone-800 dark:text-stone-200 text-right">{value}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {paymentMethod === 'PAY_AT_TEMPLE' && (
          <div className="rounded-xl border border-amber-200 dark:border-amber-800/40 bg-amber-50 dark:bg-amber-950/20 px-4 py-3 text-sm text-amber-700 dark:text-amber-400">
            💡 Please arrive 15 minutes early and quote your booking ID at the seva counter.
          </div>
        )}

        {paymentMethod === 'BANK' || paymentMethod === 'UPI' ? (
          <div className="rounded-xl border border-blue-200 dark:border-blue-800/40 bg-blue-50 dark:bg-blue-950/20 px-4 py-3 text-sm text-blue-700 dark:text-blue-400">
            📋 Your booking is confirmed. Please keep your transaction reference ready when you visit.
          </div>
        ) : null}

        <div className="space-y-3 pt-2">
          {whatsappUrl && (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-green-500 hover:bg-green-600 text-white font-semibold text-sm transition-colors shadow-md shadow-green-500/20"
            >
              <MessageCircle className="h-4 w-4" />
              Notify Temple via WhatsApp
            </a>
          )}

          <Button
            variant="outline"
            className="w-full"
            onClick={handleShare}
            leftIcon={<Share2 className="h-4 w-4" />}
          >
            Share Booking Details
          </Button>

          <Link href={`/temple/${temple.slug}/book`}>
            <Button variant="secondary" className="w-full" leftIcon={<Sparkles className="h-4 w-4" />}>
              Book Another Seva
            </Button>
          </Link>

          <Link href={`/temple/${temple.slug}`}>
            <Button variant="ghost" className="w-full" leftIcon={<ArrowLeft className="h-4 w-4" />}>
              Back to Temple Home
            </Button>
          </Link>
        </div>

        <p className="text-center text-xs text-stone-400 pt-2">
          🙏 May the divine blessings be with you and your family
        </p>
      </div>
    </div>
  )
}
