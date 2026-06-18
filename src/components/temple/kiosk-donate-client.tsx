'use client'

import * as React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, CheckCircle2 } from 'lucide-react'
import QRCode from 'react-qr-code'
import { submitDonation, markDonationAsPaid } from '@/app/temple/[slug]/donate/actions'

interface KioskDonateClientProps {
  temple: any
  categories: any[]
}

const PRESET_AMOUNTS = [101, 501, 1001, 2100, 5100, 11000]

export default function KioskDonateClient({ temple, categories }: KioskDonateClientProps) {
  const [amount, setAmount] = React.useState('501')
  const [isCustom, setIsCustom] = React.useState(false)
  const [customAmount, setCustomAmount] = React.useState('')
  const [selectedCategory, setSelectedCategory] = React.useState(categories[0]?.id ?? '')
  
  const [step, setStep] = React.useState<'AMOUNT' | 'PAYMENT' | 'SUCCESS'>('AMOUNT')
  const [createdDonationId, setCreatedDonationId] = React.useState<string | null>(null)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState('')

  const effectiveAmount = isCustom ? customAmount : amount
  const numAmount = parseFloat(effectiveAmount) || 0

  // Idle timeout to return to standby
  React.useEffect(() => {
    let timeout: NodeJS.Timeout
    const resetIdle = () => {
      clearTimeout(timeout)
      // If idle for 60 seconds on any screen except SUCCESS (which resets automatically), go to standby
      if (step !== 'SUCCESS') {
        timeout = setTimeout(() => {
          window.location.href = `/kiosk/${temple.slug}`
        }, 60000)
      }
    }
    
    window.addEventListener('touchstart', resetIdle)
    window.addEventListener('click', resetIdle)
    resetIdle()
    
    return () => {
      window.removeEventListener('touchstart', resetIdle)
      window.removeEventListener('click', resetIdle)
      clearTimeout(timeout)
    }
  }, [step, temple.slug])

  const handleKeypadPress = (key: string) => {
    if (key === 'CLEAR') {
      setCustomAmount('')
    } else if (key === 'DEL') {
      setCustomAmount(prev => prev.slice(0, -1))
    } else {
      if (customAmount.length < 7) {
        setCustomAmount(prev => prev + key)
      }
    }
  }

  const handleProceed = async () => {
    if (numAmount < 1) {
      setError('Please enter a valid amount')
      return
    }
    setLoading(true)
    setError('')
    
    try {
      // In Kiosk mode, we don't force phone/name to speed up the flow, so we mark it anonymous
      const res = await submitDonation({
        templeId: temple.id,
        amount: numAmount,
        donorName: 'Kiosk Devotee',
        donorPhone: '0000000000'
      })

      if (res.success && res.donationId) {
        setCreatedDonationId(res.donationId)
        setStep('PAYMENT')
      } else {
        setError(res.error || 'Failed to initialize payment')
      }
    } catch (e: any) {
      setError('System error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handlePaidConfirm = async () => {
    if (!createdDonationId) return
    setLoading(true)
    const res = await markDonationAsPaid(createdDonationId)
    setLoading(false)
    if (res.success) {
      setStep('SUCCESS')
      // Auto redirect to home after 10 seconds
      setTimeout(() => {
        window.location.href = `/kiosk/${temple.slug}`
      }, 10000)
    } else {
      setError('Failed to confirm payment.')
    }
  }

  if (step === 'SUCCESS') {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-stone-950">
        <div className="bg-stone-900 border border-stone-800 rounded-3xl p-12 text-center max-w-2xl w-full animate-in zoom-in duration-500 shadow-2xl">
          <CheckCircle2 className="h-32 w-32 text-emerald-500 mx-auto mb-8" />
          <h2 className="text-5xl font-bold text-white mb-4">Dhanyavaad!</h2>
          <p className="text-2xl text-stone-400 mb-8">
            Your sacred offering of <strong className="text-white">₹{numAmount.toLocaleString()}</strong> has been received.
          </p>
          <div className="text-stone-500 text-lg uppercase tracking-widest mt-12 animate-pulse">
            Returning to home screen...
          </div>
        </div>
      </div>
    )
  }

  if (step === 'PAYMENT') {
    const upiString = `upi://pay?pa=${temple.upiId}&pn=${encodeURIComponent(temple.name)}&am=${numAmount}&cu=INR`
    return (
      <div className="w-full h-full flex flex-col p-8 bg-stone-950 overflow-hidden">
        <div className="flex justify-between items-center mb-12">
          <Button 
            variant="ghost" 
            size="lg"
            onClick={() => setStep('AMOUNT')} 
            className="text-stone-400 hover:text-white hover:bg-stone-900 text-xl py-8 px-6 rounded-2xl"
          >
            <ArrowLeft className="h-8 w-8 mr-4" /> Cancel
          </Button>
          <div className="text-3xl font-bold text-white tracking-widest uppercase opacity-50">
            Secure Payment
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto w-full">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-white mb-4">Scan to Pay</h2>
            <p className="text-3xl text-stone-400">
              Offering Amount: <span className="text-white font-bold">₹{numAmount.toLocaleString()}</span>
            </p>
          </div>

          <div className="bg-white p-8 rounded-[3rem] shadow-[0_0_80px_rgba(255,255,255,0.1)] mb-12">
            <QRCode value={upiString} size={400} />
          </div>

          {error && <div className="text-red-500 text-xl font-bold mb-8">{error}</div>}

          <Button 
            size="lg"
            onClick={handlePaidConfirm}
            disabled={loading}
            className="bg-emerald-600 hover:bg-emerald-700 text-white text-3xl py-12 px-16 rounded-[2rem] shadow-xl w-full max-w-2xl"
          >
            I have scanned & paid
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-full flex flex-col p-8 bg-stone-950 overflow-hidden">
      <div className="flex justify-between items-center mb-8">
        <Link href={`/kiosk/${temple.slug}`}>
          <Button variant="ghost" size="lg" className="text-stone-400 hover:text-white hover:bg-stone-900 text-xl py-8 px-6 rounded-2xl">
            <ArrowLeft className="h-8 w-8 mr-4" /> Back to Home
          </Button>
        </Link>
        <div className="text-3xl font-bold text-white tracking-widest uppercase opacity-50">
          Make Offering
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto w-full">
        {/* Left Col: Presets */}
        <div className="flex flex-col justify-center space-y-12">
          <div>
            <h3 className="text-3xl text-stone-400 mb-6 font-semibold">Select Amount (₹)</h3>
            <div className="grid grid-cols-2 gap-4">
              {PRESET_AMOUNTS.map(val => (
                <button
                  key={val}
                  onClick={() => {
                    setIsCustom(false)
                    setAmount(val.toString())
                  }}
                  className={`py-8 rounded-3xl text-4xl font-bold transition-all ${
                    !isCustom && amount === val.toString()
                      ? 'bg-saffron-600 text-white shadow-[0_0_30px_rgba(234,88,12,0.3)]'
                      : 'bg-stone-900 text-stone-300 border-2 border-stone-800'
                  }`}
                >
                  ₹{val}
                </button>
              ))}
            </div>
          </div>
          
          <Button 
            onClick={() => setIsCustom(true)}
            className={`py-10 rounded-3xl text-3xl font-bold w-full transition-all ${
              isCustom 
                ? 'bg-saffron-600 text-white shadow-[0_0_30px_rgba(234,88,12,0.3)] hover:bg-saffron-600' 
                : 'bg-stone-900 text-stone-300 hover:bg-stone-800 border-2 border-stone-800'
            }`}
          >
            Custom Amount
          </Button>
        </div>

        {/* Right Col: Custom Keypad or Proceed */}
        <div className="flex flex-col justify-center border-l-2 border-stone-900 pl-12">
          {isCustom ? (
            <div className="w-full max-w-md mx-auto">
              <div className="bg-stone-900 border-2 border-stone-800 rounded-3xl p-6 mb-8 text-center">
                <span className="text-4xl text-stone-500 mr-2">₹</span>
                <span className="text-6xl font-bold text-white">{customAmount || '0'}</span>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-8">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 'CLEAR', 0, 'DEL'].map((key) => (
                  <button
                    key={key}
                    onClick={() => handleKeypadPress(key.toString())}
                    className={`py-6 rounded-2xl text-3xl font-bold ${
                      key === 'CLEAR' || key === 'DEL' 
                        ? 'bg-stone-800 text-stone-400 text-xl' 
                        : 'bg-stone-900 text-white hover:bg-stone-800 border border-stone-800'
                    }`}
                  >
                    {key}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="text-center mb-12">
                <p className="text-3xl text-stone-500 mb-4">Total Offering</p>
                <h2 className="text-8xl font-bold text-white">₹{numAmount}</h2>
              </div>
            </div>
          )}

          {error && <div className="text-red-500 text-xl font-bold text-center mb-6">{error}</div>}

          <Button 
            size="lg"
            onClick={handleProceed}
            disabled={loading || numAmount < 1}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-3xl py-12 rounded-[2rem] shadow-xl"
          >
            {loading ? 'Processing...' : 'Proceed to Pay'}
          </Button>
        </div>
      </div>
    </div>
  )
}
