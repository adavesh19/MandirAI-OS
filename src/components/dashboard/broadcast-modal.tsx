'use client'

import * as React from 'react'
import { X, Download, MessageCircle, Users, CheckSquare, Square, Search, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface BroadcastModalProps {
  devotees: { id: string; fullName: string; phone: string }[]
  templeName?: string
  onClose: () => void
}

const TEMPLATES = [
  {
    label: '🎉 Festival Announcement',
    text: 'Namaste! 🙏\n\n[Temple Name] cordially invites you to celebrate [Festival Name] on [Date].\n\n📍 Venue: Temple Premises\n🕐 Time: [Time]\n\nAll are welcome. Please bring your family and friends!\n\n🪔 Jai Sri [Deity]!',
  },
  {
    label: '🙏 Seva Reminder',
    text: '🛕 Seva Reminder\n\nDear Devotee,\n\nThis is a gentle reminder that your [Seva Name] is scheduled for [Date] at [Time].\n\n📍 Please arrive 15 minutes before the scheduled time.\n\nFor queries, contact us at [Phone].\n\n🙏 [Temple Name]',
  },
  {
    label: '💝 Thank You for Donation',
    text: '🙏 Thank you for your generous contribution to [Temple Name]!\n\nYour dana of ₹[Amount] has been received. May the Divine blessings always be with you and your family.\n\nReceipt will be shared shortly.\n\n🪔 [Temple Name] Team',
  },
  { label: '✏️ Custom Message', text: '' },
]

export default function BroadcastModal({ devotees, templeName = 'Our Temple', onClose }: BroadcastModalProps) {
  const [message, setMessage] = React.useState('')
  const [search, setSearch] = React.useState('')
  const [selected, setSelected] = React.useState<Set<string>>(new Set(devotees.map(d => d.id)))
  const [activeTemplate, setActiveTemplate] = React.useState(0)
  const [generated, setGenerated] = React.useState<{ name: string; phone: string; link: string }[]>([])

  const filtered = devotees.filter(d =>
    d.fullName.toLowerCase().includes(search.toLowerCase()) ||
    d.phone.includes(search)
  )

  const toggleAll = () => {
    if (selected.size === filtered.length) setSelected(new Set())
    else setSelected(new Set(filtered.map(d => d.id)))
  }

  const toggleOne = (id: string) => {
    const next = new Set(selected)
    next.has(id) ? next.delete(id) : next.add(id)
    setSelected(next)
  }

  const handleTemplate = (idx: number) => {
    setActiveTemplate(idx)
    setMessage(TEMPLATES[idx].text)
  }

  const generateLinks = () => {
    const recipients = devotees.filter(d => selected.has(d.id))
    const links = recipients.map(d => {
      const phone = d.phone.replace(/[^0-9]/g, '')
      const withCountry = phone.startsWith('91') ? phone : `91${phone}`
      return { name: d.fullName, phone: d.phone, link: `https://wa.me/${withCountry}?text=${encodeURIComponent(message)}` }
    })
    setGenerated(links)
  }

  const downloadCsv = () => {
    const rows = [['Name', 'Phone', 'WhatsApp Link'], ...generated.map(g => [g.name, g.phone, g.link])]
    const csv = rows.map(r => r.map(c => `"${c}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href = url; a.download = 'broadcast-links.csv'; a.click()
  }

  const openFirst5 = () => generated.slice(0, 5).forEach(g => window.open(g.link, '_blank'))

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="p-5 border-b border-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-green-100 flex items-center justify-center">
              <MessageCircle className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h2 className="font-heading font-bold text-stone-900">WhatsApp Broadcast</h2>
              <p className="text-xs text-stone-500">{selected.size} of {devotees.length} devotees selected</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-stone-100 transition-colors"><X className="h-5 w-5" /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* Templates */}
          <div>
            <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">Message Template</p>
            <div className="grid grid-cols-2 gap-2">
              {TEMPLATES.map((t, i) => (
                <button key={i} onClick={() => handleTemplate(i)}
                  className={`text-left text-xs px-3 py-2 rounded-xl border transition-all ${activeTemplate === i ? 'border-saffron-400 bg-saffron-50 text-saffron-700 font-semibold' : 'border-stone-200 hover:border-stone-300'}`}>
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Message */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Your Message</p>
              <span className="text-xs text-stone-400">{message.length} chars</span>
            </div>
            <textarea
              value={message}
              onChange={e => setMessage(e.target.value)}
              rows={5}
              placeholder="Type your message here..."
              className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-saffron-400 resize-none"
            />
          </div>

          {/* Recipient selector */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Recipients</p>
              <button onClick={toggleAll} className="text-xs text-saffron-600 font-semibold hover:underline flex items-center gap-1">
                {selected.size === filtered.length ? <CheckSquare className="h-3.5 w-3.5" /> : <Square className="h-3.5 w-3.5" />}
                {selected.size === filtered.length ? 'Deselect All' : 'Select All'}
              </button>
            </div>
            <div className="relative mb-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
              <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search devotees..." className="pl-9 h-9" />
            </div>
            <div className="max-h-40 overflow-y-auto space-y-1 border border-stone-100 rounded-xl p-2">
              {filtered.map(d => (
                <label key={d.id} className="flex items-center gap-3 px-2 py-1.5 rounded-lg hover:bg-stone-50 cursor-pointer">
                  <input type="checkbox" checked={selected.has(d.id)} onChange={() => toggleOne(d.id)} className="accent-saffron-500 h-4 w-4" />
                  <div>
                    <p className="text-sm font-semibold text-stone-800">{d.fullName}</p>
                    <p className="text-xs text-stone-400">{d.phone}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Warning */}
          <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-800">
            <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5 text-amber-600" />
            <p>WhatsApp may show a spam warning for bulk messages. Space out your sends and use approved templates for large audiences.</p>
          </div>

          {/* Generated links */}
          {generated.length > 0 && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 space-y-3">
              <p className="text-sm font-bold text-green-800">✅ {generated.length} WhatsApp links ready!</p>
              <div className="flex gap-2 flex-wrap">
                <Button onClick={downloadCsv} className="text-xs bg-green-600 text-white hover:bg-green-700 gap-1.5">
                  <Download className="h-3.5 w-3.5" /> Download CSV
                </Button>
                <Button onClick={openFirst5} variant="outline" className="text-xs border-green-400 text-green-700 gap-1.5">
                  <MessageCircle className="h-3.5 w-3.5" /> Open First 5 in WhatsApp
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-100 flex items-center gap-3">
          <Button onClick={generateLinks} disabled={!message.trim() || selected.size === 0}
            className="flex-1 gradient-primary text-white font-bold gap-2">
            <Users className="h-4 w-4" /> Generate {selected.size} WhatsApp Links
          </Button>
          <Button onClick={onClose} variant="outline" className="shrink-0">Cancel</Button>
        </div>
      </div>
    </div>
  )
}
