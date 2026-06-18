'use client'

import * as React from 'react'
import { X, User, Phone, Mail, CheckCircle2, AlertCircle, MessageCircle, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface EventRegistrationModalProps {
  event: {
    id: string
    title: string
    startDate: string
    location: string
    templeId: string
    templeName: string
    templePhone?: string | null
  }
  onClose: () => void
}

export default function EventRegistrationModal({ event, onClose }: EventRegistrationModalProps) {
  const [name, setName] = React.useState('')
  const [phone, setPhone] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState('')
  const [success, setSuccess] = React.useState<{ registrationId: string; eventTitle: string } | null>(null)

  const eventDate = new Date(event.startDate).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !phone.trim()) { setError('Name and phone are required'); return }
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/v1/event-registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventId: event.id, templeId: event.templeId, name: name.trim(), phone: phone.trim(), email: email.trim() || undefined }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Registration failed')
      setSuccess({ registrationId: data.registrationId, eventTitle: data.eventTitle })
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const whatsappMsg = success
    ? `🎉 My registration for *${success.eventTitle}* at *${event.templeName}* is confirmed!\n\n📅 Date: ${eventDate}\n📍 Venue: ${event.location}\n🆔 Reg ID: ${success.registrationId.slice(0, 8).toUpperCase()}\n\nSee you there! 🙏`
    : ''

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="bg-gradient-to-r from-saffron-600 to-amber-500 p-5 text-white relative">
          <button onClick={onClose} className="absolute top-4 right-4 p-1 rounded-full hover:bg-white/20 transition-colors"><X className="h-5 w-5" /></button>
          <p className="text-saffron-100 text-xs font-semibold uppercase tracking-wider mb-1">Register for Event</p>
          <h2 className="font-heading text-xl font-bold leading-tight">{event.title}</h2>
          <p className="text-saffron-100 text-sm mt-1">📅 {eventDate} · 📍 {event.location}</p>
        </div>

        <div className="p-5">
          {success ? (
            <div className="text-center space-y-4">
              <div className="h-16 w-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="h-9 w-9 text-emerald-500" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-bold text-stone-900">Registration Confirmed! 🎉</h3>
                <p className="text-sm text-stone-500 mt-1">Your spot has been reserved for <strong>{success.eventTitle}</strong></p>
              </div>
              <div className="bg-stone-50 rounded-xl p-4 border border-stone-100 space-y-2">
                <p className="text-xs text-stone-400 uppercase tracking-wider font-semibold">Registration ID</p>
                <p className="font-mono text-lg font-bold text-stone-900">{success.registrationId.slice(0, 8).toUpperCase()}</p>
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=REG-${success.registrationId.slice(0, 8).toUpperCase()}`}
                  alt="QR Code" className="mx-auto rounded-lg mt-2"
                />
                <p className="text-xs text-stone-400">Show this QR at the temple entrance</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(whatsappMsg)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-green-500 text-white rounded-xl py-2.5 text-sm font-semibold hover:bg-green-600 transition-colors"
                >
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </a>
                <button
                  onClick={() => navigator.share?.({ title: success.eventTitle, text: whatsappMsg }).catch(() => navigator.clipboard.writeText(whatsappMsg))}
                  className="flex items-center justify-center gap-2 bg-stone-100 text-stone-700 rounded-xl py-2.5 text-sm font-semibold hover:bg-stone-200 transition-colors"
                >
                  <Share2 className="h-4 w-4" /> Share
                </button>
              </div>
              <button onClick={onClose} className="w-full text-sm text-stone-400 hover:text-stone-600 py-2">Close</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-sm text-stone-500">Fill in your details to register. It&apos;s free!</p>
              {error && (
                <div className="flex items-center gap-2 bg-red-50 text-red-700 p-3 rounded-xl text-sm border border-red-100">
                  <AlertCircle className="h-4 w-4 shrink-0" /> {error}
                </div>
              )}
              <div className="space-y-3">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                  <Input value={name} onChange={e => setName(e.target.value)} placeholder="Full Name *" className="pl-9" required />
                </div>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                  <Input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone Number *" type="tel" className="pl-9" required />
                </div>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                  <Input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email (optional)" type="email" className="pl-9" />
                </div>
              </div>
              <Button type="submit" disabled={loading} className="w-full gradient-primary text-white font-bold py-3 rounded-xl">
                {loading ? 'Registering...' : 'Confirm Registration 🙏'}
              </Button>
              <p className="text-xs text-stone-400 text-center">Free registration — no payment required</p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
