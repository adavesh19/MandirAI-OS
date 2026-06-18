'use client'

import * as React from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeft, CheckCircle2, Heart } from 'lucide-react'
import QRCode from 'react-qr-code'
import { submitDonation, markDonationAsPaid } from './actions'

interface Seva {
  id: string
  name: string
  price: number
  description: string | null
}

export default function DonateClient({ temple, sevas }: { temple: any, sevas: Seva[] }) {
  const searchParams = useSearchParams()
  const sevaIdParam = searchParams.get('seva')
  
  const [selectedSevaId, setSelectedSevaId] = React.useState<string | null>(sevaIdParam)
  const [customAmount, setCustomAmount] = React.useState<string>('')
  const [loading, setLoading] = React.useState(false)
  const [success, setSuccess] = React.useState(false)
  const [showQR, setShowQR] = React.useState(false)
  const [createdDonationId, setCreatedDonationId] = React.useState<string | null>(null)
  const [error, setError] = React.useState('')

  const [formData, setFormData] = React.useState({
    donorName: '',
    donorPhone: '',
    donorPan: ''
  })

  // Calculate final amount
  let finalAmount = 0
  if (selectedSevaId === 'general') {
    finalAmount = Number(customAmount) || 0
  } else if (selectedSevaId) {
    const s = sevas.find(s => s.id === selectedSevaId)
    if (s) finalAmount = s.price
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (finalAmount <= 0) {
      setError('Please select a seva or enter a valid amount.')
      return
    }

    setLoading(true)
    setError('')

    const res = await submitDonation({
      templeId: temple.id,
      sevaId: selectedSevaId !== 'general' ? selectedSevaId : null,
      amount: finalAmount,
      ...formData
    })

    if (res.success && res.donationId) {
      setCreatedDonationId(res.donationId)
      if (temple.upiId) {
        setShowQR(true)
      } else {
        // Fallback if no UPI ID configured
        await markDonationAsPaid(res.donationId)
        setSuccess(true)
      }
    } else {
      setError(res.error || 'Failed to process offering')
    }
    setLoading(false)
  }

  const handlePaidConfirm = async () => {
    if (!createdDonationId) return
    setLoading(true)
    const res = await markDonationAsPaid(createdDonationId)
    setLoading(false)
    if (res.success) {
      setSuccess(true)
    } else {
      setError('Failed to confirm payment.')
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 text-center shadow-sm border border-stone-100 animate-in zoom-in duration-500">
          <CheckCircle2 className="h-16 w-16 text-emerald-500 mx-auto mb-6" />
          <h2 className="text-3xl font-black text-stone-900 mb-2">Thank you for your Seva</h2>
          <p className="text-stone-500 font-medium mb-8">
            Your sacred offering of <strong className="text-stone-900">₹{finalAmount}</strong> has been successfully received. May the blessings of {temple.name} be with you.
          </p>
          
          <div className="space-y-3">
            {createdDonationId && (
              <Link href={`/receipts/${createdDonationId}/print`} target="_blank" className="block w-full">
                <Button className="w-full bg-stone-900 hover:bg-stone-800 text-white py-6 rounded-xl font-bold shadow-md">
                  Download Official Receipt
                </Button>
              </Link>
            )}
            <Link href={`/temple/${temple.slug}`} className="block w-full">
              <Button variant="outline" className="w-full bg-white hover:bg-stone-50 text-stone-900 border-stone-200 py-6 rounded-xl font-bold">
                Return to Temple Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (showQR) {
    const upiString = `upi://pay?pa=${temple.upiId}&pn=${encodeURIComponent(temple.name)}&am=${finalAmount}&cu=INR`
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 text-center shadow-sm border border-stone-100">
          <h2 className="text-2xl font-bold text-stone-900 mb-2">Complete Your Offering</h2>
          <p className="text-stone-500 mb-6">
            Pay <strong className="text-stone-900">₹{finalAmount}</strong> directly to {temple.name}
          </p>
          
          {/* Mobile UPI Deep Links */}
          <div className="space-y-3 mb-8">
            <a 
              href={upiString} 
              className="flex items-center justify-center gap-2 w-full bg-stone-900 hover:bg-stone-800 text-white py-4 rounded-2xl font-bold transition-all shadow-md"
            >
              <span>Pay via Any UPI App</span>
              <span className="text-xs font-normal text-stone-400">(PhonePe, GPay, Paytm)</span>
            </a>
          </div>

          <div className="relative flex items-center py-2 mb-6">
            <div className="flex-grow border-t border-stone-200"></div>
            <span className="flex-shrink-0 mx-4 text-stone-400 text-xs font-bold uppercase tracking-widest">Or Scan QR Code</span>
            <div className="flex-grow border-t border-stone-200"></div>
          </div>

          {/* Desktop QR Code */}
          <div className="bg-white p-4 rounded-2xl inline-block border-2 border-stone-100 mb-4 mx-auto">
            <QRCode value={upiString} size={180} />
          </div>

          <div className="text-sm font-bold text-stone-700 bg-stone-50 py-3 rounded-xl mb-6 flex justify-between px-4">
            <span>UPI ID:</span>
            <span className="font-mono text-saffron-600">{temple.upiId}</span>
          </div>

          {error && <div className="bg-red-50 text-red-600 p-3 rounded-xl mb-6 text-sm font-medium border border-red-100">{error}</div>}

          <Button 
            onClick={handlePaidConfirm} 
            loading={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-6 text-lg rounded-2xl shadow-lg shadow-emerald-600/20"
          >
            I have Completed Payment
          </Button>
          
          <Button 
            onClick={() => setShowQR(false)} 
            variant="ghost"
            disabled={loading}
            className="w-full mt-2 text-stone-500 hover:bg-stone-100"
          >
            Cancel
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-stone-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <div className="mb-8">
          <Link href={`/temple/${temple.slug}`} className="text-stone-500 hover:text-stone-900 inline-flex items-center gap-2 text-sm font-semibold transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to {temple.name}
          </Link>
        </div>

        <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-stone-100">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-saffron-50 mb-4">
              <Heart className="h-8 w-8 text-saffron-500" />
            </div>
            <h1 className="text-3xl font-bold text-stone-900 mb-2">Make an Offering</h1>
            <p className="text-stone-500">Support {temple.name} or book a sacred seva.</p>
          </div>

          {error && <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm font-medium border border-red-100">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Step 1: Select Offering */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-stone-900">1. Select Offering Type</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div 
                  onClick={() => setSelectedSevaId('general')}
                  className={`cursor-pointer p-4 rounded-2xl border-2 transition-all ${selectedSevaId === 'general' ? 'border-saffron-500 bg-saffron-50/50' : 'border-stone-200 hover:border-saffron-200'}`}
                >
                  <h4 className="font-bold text-stone-900">General Donation</h4>
                  <p className="text-sm text-stone-500 mt-1">Support temple maintenance and charitable activities.</p>
                </div>
                {sevas.map(seva => (
                  <div 
                    key={seva.id}
                    onClick={() => setSelectedSevaId(seva.id)}
                    className={`cursor-pointer p-4 rounded-2xl border-2 transition-all flex flex-col justify-between ${selectedSevaId === seva.id ? 'border-saffron-500 bg-saffron-50/50' : 'border-stone-200 hover:border-saffron-200'}`}
                  >
                    <div>
                      <h4 className="font-bold text-stone-900">{seva.name}</h4>
                      {seva.description && <p className="text-sm text-stone-500 mt-1 line-clamp-2">{seva.description}</p>}
                    </div>
                    <div className="mt-4 font-bold text-saffron-600">₹{seva.price}</div>
                  </div>
                ))}
              </div>

              {selectedSevaId === 'general' && (
                <div className="mt-4 p-4 bg-stone-50 rounded-2xl border border-stone-200">
                  <label className="text-sm font-bold text-stone-700 block mb-2">Enter Amount (₹)</label>
                  <Input 
                    type="number" 
                    min="1" 
                    value={customAmount} 
                    onChange={e => setCustomAmount(e.target.value)} 
                    placeholder="e.g. 1001" 
                    className="text-lg bg-white"
                  />
                </div>
              )}
            </div>

            {/* Step 2: Devotee Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-stone-900">2. Devotee Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input 
                  label="Full Name" 
                  value={formData.donorName}
                  onChange={e => setFormData(prev => ({ ...prev, donorName: e.target.value }))}
                  required 
                />
                <Input 
                  label="Phone Number" 
                  type="tel"
                  value={formData.donorPhone}
                  onChange={e => setFormData(prev => ({ ...prev, donorPhone: e.target.value }))}
                  required 
                />
                <div className="md:col-span-2">
                  <Input 
                    label="PAN Number (Optional, for 80G Tax Exemption)" 
                    value={formData.donorPan}
                    onChange={e => setFormData(prev => ({ ...prev, donorPan: e.target.value.toUpperCase() }))}
                  />
                </div>
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={loading || finalAmount <= 0}
              className="w-full bg-saffron-600 hover:bg-saffron-700 text-white py-6 text-lg rounded-2xl shadow-lg shadow-saffron-600/20"
            >
              {loading ? 'Processing...' : `Proceed to Pay ₹${finalAmount || '0'}`}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
