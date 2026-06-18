'use client'

import * as React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useLanguage } from '@/components/shared/language-context'
import { Phone, Mail, MapPin, Send, Compass, Cpu, Terminal, RadioTower, Database, Shield } from 'lucide-react'

interface ContactClientProps {
  temple: {
    name: string
    contactPhone: string | null
    contactEmail: string | null
    address: {
      line1: string
      line2?: string
      city: string
      state: string
      country: string
      pincode: string
    }
    slug: string
  }
  page: {
    title: any
    description: any
    content: any
  } | null
  templateId?: string
}

export default function ContactClient({ temple, page, templateId = 'classic' }: ContactClientProps) {
  const { t } = useLanguage()
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [message, setMessage] = React.useState('')
  const [submitted, setSubmitted] = React.useState(false)
  const [transmittingLogs, setTransmittingLogs] = React.useState<string[]>([])

  const defaultTitle = {
    en: `Get in Touch`,
    hi: `सम्पर्क करें`,
    kn: `ಸಂಪರ್ಕಿಸಿ`,
    ta: `தொடர்புக்கு`,
    te: `సంప్రదించండి`,
  }

  const defaultDescription = {
    en: `Reach out to ${temple.name} for inquiries, pooja bookings, or general information.`,
    hi: `पूछताछ, पूजा बुकिंग या सामान्य जानकारी के लिए संपर्क करें।`,
    kn: `ಪೂಜಾ ವಿವರಗಳು ಅಥವಾ ವಿಚಾರಣೆಗಳಿಗಾಗಿ ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ.`,
    ta: `வழிபாடுகள் மற்றும் பொதுவான விவரங்களுக்கு எங்களைத் தொடர்பு கொள்ளவும்.`,
    te: `పూజల బుకింగ్స్ లేదా ఇతర సమాచారం కోసం మమ్మల్ని సంప్రదించండి.`,
  }

  const titleText = page ? t(page.title) : t(defaultTitle)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)

    if (templateId === 'tech-sanctuary' || templateId === 'ai-omniscient') {
      // High Tech terminal logging effect
      setTransmittingLogs(['[UPLINK] Initiating secure transmission protocol...'])
      setTimeout(() => {
        setTransmittingLogs(prev => [...prev, '[CRYPTO] Generating SHA-256 payload digest...'])
      }, 300)
      setTimeout(() => {
        setTransmittingLogs(prev => [...prev, '[ROUTING] Querying temple-ai.os network relays...'])
      }, 600)
      setTimeout(() => {
        setTransmittingLogs(prev => [...prev, '[GATEWAY] Node committed successfully. Packet sent.'])
      }, 1000)
      setTimeout(() => {
        setName('')
        setEmail('')
        setMessage('')
        setSubmitted(false)
        setTransmittingLogs([])
        alert(t({
          en: 'Uplink transmission confirmed. Message received.',
          hi: 'अपलिंक ट्रांसमिशन की पुष्टि हो गई। संदेश प्राप्त हुआ।',
          kn: 'ಅಪ್ಲಿಂಕ್ ಪ್ರಸರಣ ದೃಢೀಕರಿಸಲ್ಪಟ್ಟಿದೆ. ಸಂದೇಶ ಸ್ವೀಕರಿಸಲಾಗಿದೆ.',
          ta: 'அப்லிங்க் அனுப்பப்பட்டது உறுதிசெய்யப்பட்டது. செய்தி பெறப்பட்டது.',
          te: 'అప్లింక్ ప్రసారం ధృవీకరించబడింది. సందేశం అందింది.',
        }))
      }, 1400)
    } else {
      setTimeout(() => {
        setName('')
        setEmail('')
        setMessage('')
        setSubmitted(false)
        alert(t({
          en: 'Thank you! Your message has been received.',
          hi: 'धन्यवाद! आपका संदेश प्राप्त हो गया है।',
          kn: 'ಧನ್ಯವಾದಗಳು! ನಿಮ್ಮ ಸಂದೇಶ ತಲುಪಿದೆ.',
          ta: 'நன்றி! உங்கள் செய்தி பெறப்பட்டது.',
          te: 'ధన్యవాదాలు! మీ సందేశం అందింది.',
        }))
      }, 800)
    }
  }

  // ─── 1. HIGH-TECH & AI OS THEMES (tech-sanctuary & ai-omniscient) ───
  if (templateId === 'tech-sanctuary' || templateId === 'ai-omniscient') {
    return (
      <div className="space-y-12 animate-in fade-in duration-700 pb-20 font-mono text-slate-300">
        
        {/* HUD Header Banner */}
        <div className="relative border border-cyan-850 bg-slate-950/80 p-8 sm:p-12 rounded-3xl overflow-hidden shadow-[0_0_30px_rgba(6,182,212,0.15)] backdrop-blur-md text-center max-w-4xl mx-auto">
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-500"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-500"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-500"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-500"></div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-wider uppercase">
            SECURE COMMUNICATIONS // GATEWAY
          </h1>
          <p className="text-slate-450 max-w-2xl mx-auto text-sm mt-3 border-t border-slate-800 pt-4 leading-relaxed">
            {page ? t(page.description) : t(defaultDescription)}
          </p>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* Left Column: Core Nodes Telemetry & Geolocation Map */}
          <div className="space-y-8">
            
            {/* Gateways Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="border border-slate-800 bg-slate-900/40 p-6 rounded-2xl relative overflow-hidden group hover:border-cyan-500/30 transition-colors">
                <div className="absolute right-3 top-3 text-[8px] bg-emerald-950 text-emerald-400 border border-emerald-900/30 px-1.5 py-0.5 rounded font-bold">
                  ONLINE
                </div>
                <h4 className="text-[10px] text-slate-500 uppercase tracking-wider mb-2 font-bold">COMM_NODE: PHONE_GATEWAY</h4>
                <div className="flex items-center gap-3 mt-4">
                  <Phone className="h-5 w-5 text-cyan-400 animate-pulse" />
                  <a href={`tel:${temple.contactPhone}`} className="text-white hover:text-cyan-400 text-sm font-bold transition-colors">
                    {temple.contactPhone || 'N/A'}
                  </a>
                </div>
              </div>

              <div className="border border-slate-800 bg-slate-900/40 p-6 rounded-2xl relative overflow-hidden group hover:border-cyan-500/30 transition-colors">
                <div className="absolute right-3 top-3 text-[8px] bg-emerald-950 text-emerald-400 border border-emerald-900/30 px-1.5 py-0.5 rounded font-bold">
                  ONLINE
                </div>
                <h4 className="text-[10px] text-slate-500 uppercase tracking-wider mb-2 font-bold">COMM_NODE: MAIL_GATEWAY</h4>
                <div className="flex items-center gap-3 mt-4">
                  <Mail className="h-5 w-5 text-cyan-400 animate-pulse" />
                  <a href={`mailto:${temple.contactEmail}`} className="text-white hover:text-cyan-400 text-sm font-bold transition-colors break-all">
                    {temple.contactEmail || 'N/A'}
                  </a>
                </div>
              </div>
            </div>

            {/* Geolocation Scanner Card */}
            <div className="border border-slate-800 bg-slate-950 p-2 rounded-3xl overflow-hidden relative">
              <div className="h-64 bg-slate-900/30 relative overflow-hidden flex items-center justify-center border border-slate-800/80 rounded-2xl">
                {/* Cyber Geolocation Grid overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:16px_16px]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.08)_0,transparent_60%)] animate-pulse" />
                <div className="absolute top-3 left-4 text-[9px] text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                  GEOLOCATION DEVIATION SCANNER
                </div>

                <div className="relative z-10 bg-slate-950 border border-cyan-500/50 p-4 rounded-2xl shadow-[0_0_20px_rgba(6,182,212,0.2)] flex items-center gap-3">
                  <MapPin className="text-cyan-400 w-5 h-5 animate-pulse" />
                  <span className="font-bold text-white text-xs">{temple.name} // LOCATED</span>
                </div>
              </div>
              <div className="p-6 flex items-start gap-4">
                <Compass className="w-6 h-6 text-slate-500 shrink-0 mt-1 animate-spin" style={{ animationDuration: '40s' }} />
                <div className="space-y-1">
                  <h4 className="font-bold text-white text-xs uppercase tracking-wider">Coordinates / Location</h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-mono">
                    {temple.address.line1}<br />
                    {temple.address.line2 && <>{temple.address.line2}<br /></>}
                    {temple.address.city}, {temple.address.state} - {temple.address.pincode}<br />
                    {temple.address.country}
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Secure Transmission Form */}
          <div className="border border-slate-800 bg-slate-950 p-6 sm:p-8 rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 px-3 py-1 bg-cyan-950 text-cyan-400 border-l border-b border-slate-800 text-[9px] font-bold uppercase tracking-wider">
              PROTOCOL // TRANSMISSION_UPLINK
            </div>
            
            <div className="mb-8 pt-2">
              <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                <RadioTower className="w-5 h-5 text-cyan-400" />
                Establish Connection
              </h3>
              <p className="text-xs text-slate-500">All submissions are digitally routed to the temple administrative pool.</p>
            </div>

            {submitted && transmittingLogs.length > 0 ? (
              <div className="bg-black border border-slate-800 rounded-2xl p-6 h-72 flex flex-col justify-center font-mono text-xs text-cyan-400 space-y-3">
                <div className="flex items-center gap-2 text-slate-500 text-[10px] uppercase mb-4">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                  Transmitting packets...
                </div>
                <div className="space-y-1">
                  {transmittingLogs.map((log, idx) => (
                    <div key={idx} className="whitespace-pre">{log}</div>
                  ))}
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Devotee Signature</label>
                    <input
                      required
                      placeholder="e.g. Adavesh Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 placeholder-slate-700"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Routing Node (Email)</label>
                    <input
                      required
                      type="email"
                      placeholder="adavesh@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 placeholder-slate-700"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Inquiry Data Stream</label>
                    <textarea
                      required
                      placeholder="Type query to submit..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={5}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4 text-xs text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 placeholder-slate-700 resize-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitted}
                  className="w-full py-4 bg-cyan-950 border border-cyan-800 hover:border-cyan-500 text-cyan-400 font-bold text-xs uppercase tracking-wider rounded-xl transition-all hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] flex items-center justify-center gap-2"
                >
                  <span>Transmit Message</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    )
  }

  // ─── 2. DIVINE GLOW THEME (Warm saffron/gold with diya decorations) ───
  if (templateId === 'divine-glow') {
    return (
      <div className="space-y-16 animate-in fade-in duration-700 pb-20 relative">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-amber-100/40 to-transparent blur-3xl rounded-full -z-10" />

        <div className="text-center space-y-4 max-w-2xl mx-auto pt-8">
          <h1 className="font-heading text-4xl font-black text-stone-900 sm:text-5xl">
            {titleText}
          </h1>
          <p className="text-lg text-stone-600 font-medium leading-relaxed">
            {page ? t(page.description) : t(defaultDescription)}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-8">
            <div className="grid sm:grid-cols-2 gap-4">
              <Card className="border border-amber-100 shadow-md bg-white hover:-translate-y-1 transition-transform">
                <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
                  <div className="h-14 w-14 rounded-full bg-amber-50 flex items-center justify-center text-amber-500 shadow-inner border border-amber-100">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-stone-900 mb-1">Call Us</h3>
                    <a href={`tel:${temple.contactPhone}`} className="text-stone-600 hover:text-amber-700 font-bold transition-colors">
                      {temple.contactPhone || '+91 00000 00000'}
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-amber-100 shadow-md bg-white hover:-translate-y-1 transition-transform">
                <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
                  <div className="h-14 w-14 rounded-full bg-orange-50 flex items-center justify-center text-orange-500 shadow-inner border border-orange-100">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-stone-900 mb-1">Email Us</h3>
                    <a href={`mailto:${temple.contactEmail}`} className="text-stone-600 hover:text-orange-700 font-bold transition-colors break-all">
                      {temple.contactEmail || 'contact@temple.com'}
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border border-amber-100 shadow-lg bg-white overflow-hidden rounded-3xl">
              <div className="h-64 bg-stone-100 relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-[url('https://api.maptiler.com/maps/streets-v2/256/0/0/0.png')] bg-cover bg-center opacity-30 mix-blend-luminosity" />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />
                <div className="relative z-10 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-amber-100">
                  <MapPin className="text-amber-600 w-6 h-6 animate-pulse" />
                  <span className="font-bold text-stone-850 text-sm">{temple.name}</span>
                </div>
              </div>
              <CardContent className="p-8 flex items-start gap-4">
                <Compass className="w-6 h-6 text-stone-400 shrink-0 mt-1" />
                <div className="space-y-1">
                  <h3 className="font-bold text-stone-900">Temple Location</h3>
                  <p className="text-stone-600 leading-relaxed text-sm">
                    {temple.address.line1}<br />
                    {temple.address.line2 && <>{temple.address.line2}<br /></>}
                    {temple.address.city}, {temple.address.state} - {temple.address.pincode}<br />
                    {temple.address.country}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="border border-amber-100 shadow-xl bg-white/80 backdrop-blur-xl p-2 sm:p-4 rounded-[2rem]">
              <CardContent className="p-6 sm:p-8">
                <div className="mb-6">
                  <h3 className="font-heading text-2xl font-bold text-stone-900 mb-2">Send a Message</h3>
                  <p className="text-stone-500 text-sm">Submit your questions directly to the temple board.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-stone-500 uppercase tracking-widest">Your Name</label>
                      <Input
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-stone-50/50 border-stone-200 focus:bg-white h-12 rounded-xl focus-visible:ring-amber-500"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-stone-500 uppercase tracking-widest">Email Address</label>
                      <Input
                        required
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-stone-50/50 border-stone-200 focus:bg-white h-12 rounded-xl focus-visible:ring-amber-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-stone-500 uppercase tracking-widest">Your Message</label>
                      <textarea
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={5}
                        className="w-full bg-stone-50/50 border border-stone-200 focus:bg-white rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all resize-none"
                      />
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    disabled={submitted}
                    className="w-full h-12 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-base transition-all flex items-center justify-center gap-2 group"
                  >
                    {submitted ? 'Sending...' : 'Send Message'}
                    {!submitted && <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

      </div>
    )
  }

  // ─── 3. HERITAGE GRAND THEME (Ancient scroll, brick red styling, arches) ───
  if (templateId === 'heritage') {
    return (
      <div className="space-y-16 animate-in fade-in duration-700 pb-20 font-serif">
        
        {/* Banner */}
        <div className="relative overflow-hidden rounded-t-[3.5rem] bg-stone-900 border-b-4 border-amber-500 p-8 sm:p-12 text-white shadow-2xl text-center">
          <div className="relative z-10 max-w-3xl mx-auto space-y-4">
            <span className="text-4xl text-amber-500">⚜️</span>
            <h1 className="text-3xl sm:text-5xl font-black text-amber-400 tracking-wide font-serif">
              {titleText}
            </h1>
            <div className="h-px w-24 bg-amber-500/50 mx-auto my-3" />
            <p className="text-stone-300 text-base italic leading-relaxed">
              {page ? t(page.description) : t(defaultDescription)}
            </p>
          </div>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-8">
            <Card className="border border-stone-250 bg-stone-50/60 rounded-[2.5rem] p-8 shadow-xl">
              <h3 className="text-xl font-bold text-stone-950 mb-6 text-center text-amber-800">🏛️ Location Ledger</h3>
              <p className="text-stone-700 leading-relaxed text-sm">
                {temple.address.line1}<br />
                {temple.address.line2 && <>{temple.address.line2}<br /></>}
                {temple.address.city}, {temple.address.state} - {temple.address.pincode}<br />
                {temple.address.country}
              </p>
              <div className="mt-6 border-t border-stone-200 pt-6 space-y-4">
                <p className="text-sm">
                  📞 Phone: <span className="font-bold text-stone-900">{temple.contactPhone || 'N/A'}</span>
                </p>
                <p className="text-sm">
                  ✉️ Email: <span className="font-bold text-stone-900">{temple.contactEmail || 'N/A'}</span>
                </p>
              </div>
            </Card>
          </div>

          <div>
            <Card className="border border-stone-250 bg-white rounded-[2.5rem] p-6 sm:p-8 shadow-xl">
              <h3 className="text-xl font-bold text-stone-900 mb-6 font-serif">Establish Contact</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  required
                  placeholder="Devotee Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-250 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-600 focus:bg-white"
                />
                <input
                  required
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-250 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-600 focus:bg-white"
                />
                <textarea
                  required
                  placeholder="Message to the Trust..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  className="w-full bg-stone-50 border border-stone-250 rounded-xl p-4 text-sm focus:outline-none focus:border-amber-600 focus:bg-white resize-none"
                />
                <button
                  type="submit"
                  disabled={submitted}
                  className="w-full py-4 bg-stone-900 hover:bg-stone-800 text-amber-400 font-bold uppercase rounded-xl transition-all"
                >
                  Send Inquiry
                </button>
              </form>
            </Card>
          </div>
        </div>

      </div>
    )
  }

  // ─── 4. MODERN ELEGANT THEME (Minimalist glassmorphism with emerald accents) ───
  if (templateId === 'modern') {
    return (
      <div className="space-y-12 animate-in fade-in duration-700 pb-16">
        
        {/* Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="h-1.5 w-16 bg-emerald-500 rounded-full" />
          <h1 className="font-heading text-4xl sm:text-5xl font-black text-stone-900 tracking-tight leading-none">
            {titleText}
          </h1>
          <p className="text-xl text-stone-500 leading-relaxed font-light">
            {page ? t(page.description) : t(defaultDescription)}
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* Left: Contact Info */}
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <Card className="border-0 shadow-lg bg-white ring-1 ring-stone-100 rounded-3xl p-6">
                <Phone className="h-5 w-5 text-emerald-600 mb-3" />
                <h4 className="font-bold text-stone-900 text-sm mb-1">Telephone</h4>
                <a href={`tel:${temple.contactPhone}`} className="text-stone-500 hover:text-emerald-600 text-xs font-semibold break-all transition-colors">
                  {temple.contactPhone || 'N/A'}
                </a>
              </Card>
              <Card className="border-0 shadow-lg bg-white ring-1 ring-stone-100 rounded-3xl p-6">
                <Mail className="h-5 w-5 text-emerald-600 mb-3" />
                <h4 className="font-bold text-stone-900 text-sm mb-1">Email Node</h4>
                <a href={`mailto:${temple.contactEmail}`} className="text-stone-500 hover:text-emerald-600 text-xs font-semibold break-all transition-colors">
                  {temple.contactEmail || 'N/A'}
                </a>
              </Card>
            </div>

            <Card className="border-0 shadow-lg bg-white ring-1 ring-stone-100 rounded-3xl p-6">
              <h4 className="font-bold text-stone-900 text-sm uppercase tracking-wider mb-3">Office Location</h4>
              <p className="text-xs text-stone-500 leading-relaxed font-mono">
                {temple.address.line1}<br />
                {temple.address.line2 && <>{temple.address.line2}<br /></>}
                {temple.address.city}, {temple.address.state} - {temple.address.pincode}<br />
                {temple.address.country}
              </p>
            </Card>
          </div>

          {/* Right: Contact Form */}
          <Card className="border-0 shadow-lg bg-white ring-1 ring-stone-100 rounded-3xl p-8">
            <h3 className="font-heading font-bold text-stone-900 text-lg mb-6">Send Message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                required
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-stone-50/50 border border-stone-200 focus:bg-white rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
              <input
                required
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-stone-50/50 border border-stone-200 focus:bg-white rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
              <textarea
                required
                placeholder="Message details..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                className="w-full bg-stone-50/50 border border-stone-200 focus:bg-white rounded-xl p-4 text-xs focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 resize-none"
              />
              <button
                type="submit"
                disabled={submitted}
                className="w-full py-3 bg-stone-900 hover:bg-stone-850 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all"
              >
                Send Message
              </button>
            </form>
          </Card>
        </div>

      </div>
    )
  }

  // ─── 5. CLASSIC THEME (Fallback / Original Layout) ───
  return (
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-20 relative">
      
      {/* Decorative Blob */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-rose-100 to-transparent blur-3xl rounded-full -z-10 opacity-60" />

      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto pt-8">
        <h1 className="font-heading text-4xl font-black tracking-tight text-stone-900 sm:text-5xl">
          {titleText}
        </h1>
        <p className="text-xl text-stone-600">
          {page ? t(page.description) : t(defaultDescription)}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* Left: Contact Info & Map Mockup */}
        <div className="space-y-8">
          
          <div className="grid sm:grid-cols-2 gap-6">
            <Card className="border-0 shadow-lg bg-white ring-1 ring-stone-200/50 hover:-translate-y-1 transition-transform duration-300">
              <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
                <div className="h-14 w-14 rounded-full bg-rose-50 flex items-center justify-center text-rose-500 shadow-inner">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 mb-1">Call Us</h3>
                  <a href={`tel:${temple.contactPhone}`} className="text-stone-600 hover:text-rose-600 font-medium transition-colors">
                    {temple.contactPhone || '+91 00000 00000'}
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white ring-1 ring-stone-200/50 hover:-translate-y-1 transition-transform duration-300">
              <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
                <div className="h-14 w-14 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 shadow-inner">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 mb-1">Email Us</h3>
                  <a href={`mailto:${temple.contactEmail}`} className="text-stone-600 hover:text-blue-600 font-medium transition-colors break-all">
                    {temple.contactEmail || 'contact@temple.com'}
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-0 shadow-xl bg-white ring-1 ring-stone-200/50 overflow-hidden group">
            <div className="h-64 bg-stone-100 relative overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-[url('https://api.maptiler.com/maps/streets-v2/256/0/0/0.png')] bg-cover bg-center opacity-40 mix-blend-luminosity group-hover:scale-105 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent" />
              
              <div className="relative z-10 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-white/50 animate-bounce">
                <MapPin className="text-rose-500 w-6 h-6" />
                <span className="font-bold text-stone-850 text-sm">{temple.name}</span>
              </div>
            </div>
            
            <CardContent className="p-8 flex items-start gap-4">
              <Compass className="w-6 h-6 text-stone-400 shrink-0 mt-1" />
              <div className="space-y-1">
                <h3 className="font-bold text-stone-900">Visit the Sanctuary</h3>
                <p className="text-stone-600 leading-relaxed text-sm">
                  {temple.address.line1}<br />
                  {temple.address.line2 && <>{temple.address.line2}<br /></>}
                  {temple.address.city}, {temple.address.state} - {temple.address.pincode}<br />
                  {temple.address.country}
                </p>
              </div>
            </CardContent>
          </Card>

        </div>

        {/* Right: Contact Form */}
        <div>
          <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-xl ring-1 ring-stone-200/50 p-2 sm:p-4">
            <CardContent className="p-6 sm:p-8">
              <div className="mb-8">
                <h3 className="font-heading text-2xl font-bold text-stone-900 mb-2">Send a Message</h3>
                <p className="text-stone-500 text-sm">We'll get back to you as soon as possible.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-stone-500 uppercase tracking-widest">Your Name</label>
                    <Input
                      required
                      placeholder="e.g. Adavesh Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-stone-50/50 border-stone-200 focus:bg-white h-12 rounded-xl"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-stone-500 uppercase tracking-widest">Email Address</label>
                    <Input
                      required
                      type="email"
                      placeholder="adavesh@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-stone-50/50 border-stone-200 focus:bg-white h-12 rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-stone-500 uppercase tracking-widest">Your Message</label>
                    <textarea
                      required
                      placeholder="How can we help you?"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={5}
                      className="w-full bg-stone-50/50 border border-stone-200 focus:bg-white rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all resize-none"
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  disabled={submitted}
                  className="w-full h-12 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-base transition-all flex items-center justify-center gap-2 group"
                >
                  {submitted ? 'Sending...' : 'Send Message'}
                  {!submitted && <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  )
}

