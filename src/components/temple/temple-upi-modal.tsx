'use client'

import React, { useState } from 'react'
import { 
  Heart, QrCode, Smartphone, Copy, CheckCircle2, 
  ExternalLink, Shield, MessageCircle, ArrowRight, X,
  Sparkles, Download, Receipt
} from 'lucide-react'

interface TempleUpiModalProps {
  isOpen: boolean
  onClose: () => void
  templeName: string
  contactPhone?: string
  upiId?: string
  amount: number
  title?: string
  description?: string
  devoteeName?: string
  onDevoteeNameChange?: (name: string) => void
  sevaName?: string
}

export default function TempleUpiModal({
  isOpen,
  onClose,
  templeName,
  contactPhone = '',
  upiId = '',
  amount,
  title = 'Sacred E-Hundi Offering',
  description = 'Direct offering to temple sanctum and annadanam trust',
  devoteeName = '',
  onDevoteeNameChange,
  sevaName = ''
}: TempleUpiModalProps) {
  const [copied, setCopied] = useState(false)
  const [copiedPhone, setCopiedPhone] = useState(false)
  const [localDevoteeName, setLocalDevoteeName] = useState(devoteeName)
  const [panNumber, setPanNumber] = useState('')
  const [paidStep, setPaidStep] = useState(false)

  const playSacredBell = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext
      if (!AudioCtx) return
      const ctx = new AudioCtx()
      const now = ctx.currentTime
      const freqs = [528, 1056, 1584, 2112]
      const gains = [0.35, 0.18, 0.08, 0.04]
      
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = 'sine'
        osc.frequency.setValueAtTime(freq, now)
        gain.gain.setValueAtTime(gains[idx], now)
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.4)
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start(now)
        osc.stop(now + 2.5)
      })
    } catch (e) {
      // Audio autoplay policy fallback
    }
  }

  if (!isOpen) return null

  // Format clean digits phone
  const cleanPhone = (contactPhone || '').replace(/[^0-9]/g, '')
  const formattedPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone || '918000108108'

  // Format target UPI ID (use registered upiId, or phone@upi, or fallback)
  const targetUpi = (upiId && upiId.trim()) 
    ? upiId.trim() 
    : cleanPhone.length >= 10 
      ? `${cleanPhone.slice(-10)}@upi`
      : 'templedevasthanam@sbi'

  // Construct official UPI Deep Link (recognized by GPay, PhonePe, Paytm, BHIM, etc.)
  const note = sevaName ? `Seva: ${sevaName} - ${templeName}` : `Donation to ${templeName}`
  const upiLink = `upi://pay?pa=${encodeURIComponent(targetUpi)}&pn=${encodeURIComponent(templeName)}&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}`

  // Dynamic QR Code generation for the exact amount
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&margin=8&data=${encodeURIComponent(upiLink)}`

  // WhatsApp verification link to temple's registered phone
  const effectiveName = localDevoteeName.trim() || 'Devotee'
  const waMessage = `Namaste! I have offered ₹${amount} to ${templeName}.${sevaName ? ` (Seva: ${sevaName})` : ''}
Devotee Name: ${effectiveName}
${panNumber ? `PAN for 80G: ${panNumber}` : ''}
Kindly confirm receipt and share the blessed prasadam update.`
  const waLink = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(waMessage)}`

  const copyUpi = () => {
    navigator.clipboard.writeText(targetUpi)
    setCopied(true)
    setTimeout(() => setCopied(false), 2200)
  }

  const copyPhone = () => {
    navigator.clipboard.writeText(cleanPhone || contactPhone)
    setCopiedPhone(true)
    setTimeout(() => setCopiedPhone(false), 2200)
  }

  const handleNameChange = (val: string) => {
    setLocalDevoteeName(val)
    if (onDevoteeNameChange) onDevoteeNameChange(val)
  }

  const handleMobilePay = () => {
    playSacredBell()
    window.location.href = upiLink
  }

  const handleConfirmPaid = () => {
    playSacredBell()
    setPaidStep(true)
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-lg rounded-3xl bg-gradient-to-b from-stone-900/95 via-stone-950 to-black border border-amber-500/35 p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.8)] text-white font-sans my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white flex items-center justify-center transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        {!paidStep ? (
          <div>
            {/* Header */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" /> Instant UPI Redirect
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-amber-100">
                {title}
              </h3>
              <p className="text-xs text-stone-400 mt-1 max-w-sm mx-auto">
                {description}
              </p>
            </div>

            {/* Amount Banner */}
            <div className="rounded-2xl bg-amber-500/10 border border-amber-500/30 p-4 mb-6 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-stone-400 uppercase tracking-widest font-semibold block">Offering Amount</span>
                <span className="text-3xl sm:text-4xl font-bold font-serif text-amber-200">₹{amount}</span>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-stone-400 uppercase tracking-widest font-semibold block">Beneficiary</span>
                <span className="text-xs font-semibold text-stone-200 max-w-[150px] truncate block">{templeName}</span>
              </div>
            </div>

            {/* QR Code & UPI Card */}
            <div className="rounded-2xl bg-black/60 border border-stone-800 p-5 mb-6 flex flex-col sm:flex-row items-center gap-5">
              <div className="relative p-2 rounded-xl bg-white shadow-xl flex-shrink-0">
                <img
                  src={qrCodeUrl}
                  alt={`UPI QR Code for ₹${amount}`}
                  className="w-36 h-36 object-contain"
                />
                <div className="text-[9px] font-bold text-black text-center mt-1 uppercase tracking-wider">
                  Scan with any UPI
                </div>
              </div>

              <div className="flex-1 text-center sm:text-left space-y-3 w-full">
                <div>
                  <div className="text-[10px] text-stone-400 uppercase tracking-wider font-semibold">Registered UPI ID</div>
                  <div className="flex items-center justify-center sm:justify-start gap-2 mt-0.5">
                    <span className="font-mono text-sm text-amber-300 font-bold truncate max-w-[190px]">
                      {targetUpi}
                    </span>
                    <button
                      onClick={copyUpi}
                      className="px-2 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-xs text-stone-200 flex items-center gap-1 transition-all shrink-0"
                    >
                      <Copy className="w-3 h-3" />
                      {copied ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                </div>

                {contactPhone && (
                  <div>
                    <div className="text-[10px] text-stone-400 uppercase tracking-wider font-semibold">Registered Temple Phone / UPI</div>
                    <div className="flex items-center justify-center sm:justify-start gap-2 mt-0.5">
                      <span className="font-mono text-xs text-stone-200 font-semibold">{contactPhone}</span>
                      <button
                        onClick={copyPhone}
                        className="px-2 py-0.5 rounded-lg bg-white/10 hover:bg-white/20 text-[11px] text-stone-300 flex items-center gap-1 transition-all shrink-0"
                      >
                        <Copy className="w-2.5 h-2.5" />
                        {copiedPhone ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                  </div>
                )}

                <div className="pt-1 flex flex-wrap gap-1.5 justify-center sm:justify-start text-[10px] text-stone-400">
                  <span className="px-2 py-0.5 rounded bg-stone-900 border border-stone-800">GPay</span>
                  <span className="px-2 py-0.5 rounded bg-stone-900 border border-stone-800">PhonePe</span>
                  <span className="px-2 py-0.5 rounded bg-stone-900 border border-stone-800">Paytm</span>
                  <span className="px-2 py-0.5 rounded bg-stone-900 border border-stone-800">BHIM</span>
                </div>
              </div>
            </div>

            {/* Devotee Input */}
            <div className="space-y-3 mb-6">
              <div>
                <label className="block text-[11px] font-semibold text-stone-300 mb-1">
                  Your Name (for Sankalpam & Prasadam)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Ramesh Kumar"
                  value={localDevoteeName}
                  onChange={(e) => handleNameChange(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-900/90 border border-stone-700 text-stone-100 placeholder-stone-500 text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-stone-300 mb-1">
                  PAN Number (Optional for 80G Tax Exemption)
                </label>
                <input
                  type="text"
                  placeholder="ABCDE1234F"
                  value={panNumber}
                  onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-900/90 border border-stone-700 text-stone-100 placeholder-stone-500 text-xs uppercase focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2.5">
              {/* Direct UPI Trigger (especially on mobile) */}
              <button
                onClick={handleMobilePay}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 text-stone-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-lg shadow-amber-500/25 transition-all flex items-center justify-center gap-2"
              >
                <Smartphone className="w-4 h-4" /> Pay ₹{amount} via Any UPI App (GPay / PhonePe)
              </button>

              {/* Confirm on WhatsApp with Temple Admin */}
              <a
                href={waLink}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 rounded-xl bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366]/30 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-current" /> Confirm on WhatsApp ({contactPhone || 'Admin'})
              </a>

              {/* Mark as Done */}
              <button
                type="button"
                onClick={handleConfirmPaid}
                className="w-full py-2.5 rounded-xl bg-stone-800/60 hover:bg-stone-800 border border-stone-700 text-stone-300 text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> I have made the payment
              </button>
            </div>

            <div className="mt-4 flex items-center justify-center gap-4 text-[10px] text-stone-400">
              <span className="flex items-center gap-1">
                <Shield className="w-3 h-3 text-emerald-400" /> 100% Direct to Temple
              </span>
              <span>•</span>
              <span>80G Income Tax Benefits</span>
            </div>
          </div>
        ) : (
          /* Payment Completed Celebration Screen */
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-4 text-3xl">
              ✓
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-300">
              Dhanyavadagalu • Blessed Devotee
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1 mb-2">
              Offering Recorded
            </h3>
            <p className="text-xs text-stone-300 max-w-sm mx-auto mb-6">
              Thank you, <span className="font-bold text-amber-200">{effectiveName}</span>. Your sacred contribution of <span className="font-bold text-amber-200">₹{amount}</span> has been consecrated for {templeName}.
            </p>

            <div className="p-4 rounded-2xl bg-black/60 border border-stone-800 mb-6 text-left space-y-2 text-xs">
              <div className="flex justify-between text-stone-400">
                <span>Receipt Number:</span>
                <span className="font-mono text-stone-200">MDR-{Date.now().toString().slice(-6)}</span>
              </div>
              <div className="flex justify-between text-stone-400">
                <span>Beneficiary:</span>
                <span className="text-stone-200">{templeName}</span>
              </div>
              <div className="flex justify-between text-stone-400">
                <span>Transaction Amount:</span>
                <span className="font-bold text-emerald-400">₹{amount}</span>
              </div>
              {panNumber && (
                <div className="flex justify-between text-stone-400">
                  <span>PAN (80G Exemption):</span>
                  <span className="font-mono text-amber-200">{panNumber}</span>
                </div>
              )}
            </div>

            <div className="space-y-2.5">
              <a
                href={waLink}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-stone-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-current" /> Send WhatsApp Confirmation to Temple
              </a>

              <button
                onClick={() => {
                  alert('Your 80G tax donation receipt will be downloaded once the temple accounts department approves.')
                  onClose()
                }}
                className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-stone-200 text-xs font-semibold transition-all flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" /> Download 80G Receipt Acknowledgement
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
