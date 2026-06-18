'use client'

import * as React from 'react'
import { useLanguage } from '@/components/shared/language-context'
import { Landmark, Copy, Check, QrCode } from 'lucide-react'

interface DonationCtaBlockProps {
  data: {
    title?: Record<string, string>
    description?: Record<string, string>
    upiId?: string
    bankName?: string
    accountNumber?: string
    ifsc?: string
    accountName?: string
  }
  settings?: {
    layout?: 'single-card' | 'split'
    showQr?: boolean
  }
  theme?: 'classic' | 'heritage' | 'modern' | 'divine-glow'
}

export default function DonationCtaBlock({ data, settings, theme = 'classic' }: DonationCtaBlockProps) {
  const { t } = useLanguage()
  const [copiedField, setCopiedField] = React.useState<string | null>(null)
  
  const showQr = settings?.showQr !== false
  const isSplit = settings?.layout === 'split'

  const upi = data.upiId || 'temple@upi'
  const accountName = data.accountName || 'Temple Trust'
  const bankName = data.bankName || 'State Bank of India'
  const accNum = data.accountNumber || '12345678901'
  const ifsc = data.ifsc || 'SBIN0001234'

  // Construct UPI payment URL: upi://pay?pa=address&pn=name&cu=INR
  const upiPayUrl = `upi://pay?pa=${upi}&pn=${encodeURIComponent(accountName)}&cu=INR`
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(upiPayUrl)}`

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
  }

  // Themes mapping
  let containerClasses = "p-8 rounded-3xl transition-all duration-300 border "
  let titleClasses = "font-serif text-2xl font-bold mb-2 "
  let subTitleClasses = "text-xs opacity-80 leading-relaxed mb-6 max-w-xl "
  let cardBgClasses = "p-5 rounded-2xl border flex flex-col justify-between "
  let qrContainerClasses = "p-4 bg-white rounded-2xl flex flex-col items-center justify-center border "
  let badgeColor = "bg-saffron-500 text-white"

  if (theme === 'heritage') {
    containerClasses += "border-[#D4AF37] bg-red-950 text-[#F5DEB3] shadow-lg "
    titleClasses += "font-serif text-[#D4AF37] "
    subTitleClasses += "font-serif text-red-100/90 "
    cardBgClasses += "bg-red-900/35 border-[#D4AF37]/30 "
    qrContainerClasses += "border-[#D4AF37]/40 "
    badgeColor = "bg-[#D4AF37] text-red-950 font-bold"
  } else if (theme === 'modern') {
    containerClasses += "border-stone-200/50 bg-[#F8FAFC] dark:bg-stone-900 shadow-md "
    titleClasses += "font-sans font-extrabold text-stone-900 dark:text-white "
    subTitleClasses += "font-sans text-stone-500 dark:text-stone-400 "
    cardBgClasses += "bg-white dark:bg-stone-800 border-stone-250/60 dark:border-stone-750 text-stone-850 dark:text-stone-200 "
    qrContainerClasses += "border-stone-200 dark:border-stone-700 bg-white "
    badgeColor = "bg-orange-600 text-white"
  } else if (theme === 'divine-glow') {
    containerClasses += "border-amber-500/20 bg-gradient-to-b from-[#1c0d02] to-[#0d0500] text-amber-100 shadow-lg "
    titleClasses += "font-serif text-transparent bg-clip-text bg-gradient-to-b from-[#FFFDD0] to-[#E5A93B] "
    subTitleClasses += "font-serif text-amber-100/80 "
    cardBgClasses += "bg-[#170a01] border-amber-500/15 "
    qrContainerClasses += "border-amber-500/20 bg-white "
    badgeColor = "bg-amber-500 text-stone-950 font-bold"
  } else {
    containerClasses += "border-stone-200/40 bg-white dark:bg-stone-950 shadow-sm "
    titleClasses += "font-serif text-stone-900 dark:text-stone-100 "
    subTitleClasses += "font-serif text-stone-600 dark:text-stone-300 "
    cardBgClasses += "bg-stone-50/50 dark:bg-stone-900/40 border-stone-200/60 dark:border-stone-800 text-stone-850 dark:text-stone-200 "
    qrContainerClasses += "border-stone-200 dark:border-stone-850 "
  }

  return (
    <div className={containerClasses}>
      <div className="text-center md:text-left flex flex-col items-center md:items-start">
        <h2 className={titleClasses}>
          {data.title ? t(data.title) : t({ en: 'Offerings & Donations', hi: 'दान और सेवा सहयोग' })}
        </h2>
        <p className={subTitleClasses}>
          {data.description ? t(data.description) : t({
            en: 'Support our temple activities, festivals, and charitable drives. Scan the UPI QR code or use the bank details below.',
            hi: 'हमारी मंदिर गतिविधियों, उत्सवों और धर्मार्थ पहलों का समर्थन करें। यूपीआई क्यूआर कोड स्कैन करें या बैंक खातों का उपयोग करें।'
          })}
        </p>
      </div>

      <div className={`grid grid-cols-1 ${isSplit && showQr ? 'md:grid-cols-2' : 'grid-cols-1'} gap-6`}>
        {/* QR Code Card */}
        {showQr && (
          <div className={cardBgClasses}>
            <div className="flex flex-col items-center justify-center p-4">
              <span className={`text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full mb-4 ${badgeColor} flex items-center gap-1.5 shadow-sm`}>
                <QrCode className="h-3 w-3" />
                Scan to Pay (UPI)
              </span>
              
              <div className={qrContainerClasses}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={qrCodeUrl} 
                  alt="UPI QR Code" 
                  className="w-48 h-48 object-contain"
                />
              </div>

              <p className="text-center text-[11px] opacity-75 font-semibold mt-4">
                Scan using any UPI App (GPay, PhonePe, Paytm, BHIM)
              </p>
            </div>
          </div>
        )}

        {/* Bank Account Info Card */}
        <div className={cardBgClasses}>
          <div className="space-y-4">
            <span className={`text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full self-start mb-2 ${badgeColor} flex items-center gap-1.5 shadow-sm`}>
              <Landmark className="h-3 w-3" />
              Direct Bank Transfer
            </span>

            {/* Account Name */}
            <div className="pb-3 border-b border-stone-250/20 dark:border-stone-700/20">
              <span className="text-[10px] opacity-60 uppercase font-bold block">Account Holder</span>
              <div className="flex items-center justify-between gap-2 mt-0.5">
                <span className="text-xs font-bold font-sans">{accountName}</span>
                <button 
                  onClick={() => handleCopy(accountName, 'name')}
                  className="text-stone-400 hover:text-amber-500 transition-colors"
                >
                  {copiedField === 'name' ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                </button>
              </div>
            </div>

            {/* Bank Name */}
            <div className="pb-3 border-b border-stone-250/20 dark:border-stone-700/20">
              <span className="text-[10px] opacity-60 uppercase font-bold block">Bank Name</span>
              <span className="text-xs font-semibold mt-0.5 block">{bankName}</span>
            </div>

            {/* Account Number */}
            <div className="pb-3 border-b border-stone-250/20 dark:border-stone-700/20">
              <span className="text-[10px] opacity-60 uppercase font-bold block">Account Number</span>
              <div className="flex items-center justify-between gap-2 mt-0.5">
                <span className="text-xs font-extrabold font-mono tracking-wide">{accNum}</span>
                <button 
                  onClick={() => handleCopy(accNum, 'number')}
                  className="text-stone-400 hover:text-amber-500 transition-colors"
                >
                  {copiedField === 'number' ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                </button>
              </div>
            </div>

            {/* IFSC Code */}
            <div className="pb-1">
              <span className="text-[10px] opacity-60 uppercase font-bold block">IFSC Code</span>
              <div className="flex items-center justify-between gap-2 mt-0.5">
                <span className="text-xs font-extrabold font-mono tracking-wide">{ifsc}</span>
                <button 
                  onClick={() => handleCopy(ifsc, 'ifsc')}
                  className="text-stone-400 hover:text-amber-500 transition-colors"
                >
                  {copiedField === 'ifsc' ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-stone-250/20 dark:border-stone-700/20 flex flex-col md:flex-row md:items-center justify-between gap-2 text-[10px] opacity-75 font-semibold">
            <span>UPI ID: <span className="font-bold underline">{upi}</span></span>
            <button 
              onClick={() => handleCopy(upi, 'upi')}
              className="text-stone-400 hover:text-amber-500 text-[9px] underline self-start md:self-auto"
            >
              {copiedField === 'upi' ? 'Copied!' : 'Copy UPI ID'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
