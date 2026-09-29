'use client'

import React, { useState, useEffect, useRef } from 'react'
import {
  Sparkles,
  Video,
  Image as ImageIcon,
  Clock,
  Heart,
  Phone,
  Palette,
  Save,
  X,
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  ExternalLink,
  ChevronRight,
  Eye,
  Edit3,
  Loader2
} from 'lucide-react'

// Helper to extract 11-char YouTube Video ID
export function extractYoutubeId(url: string | null | undefined): string | null {
  if (!url) return null
  const clean = url.trim()
  if (clean.length === 11 && !clean.includes('/') && !clean.includes('?')) {
    return clean
  }
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|live\/)([^#&?]*).*/
  const match = clean.match(regExp)
  return match && match[2].length === 11 ? match[2] : null
}

interface SevaItem {
  id?: string
  name: string
  price: number
  description?: string
  isActive?: boolean
}

interface VisualWebsiteEditorProps {
  initialTemple: any
  initialSevas?: any[]
  slug: string
  onUpdate?: (updated: any) => void
}

export default function VisualWebsiteEditor({
  initialTemple,
  initialSevas = [],
  slug,
  onUpdate
}: VisualWebsiteEditorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'stream' | 'photos' | 'info' | 'timings' | 'sevas' | 'contact' | 'theme'>('stream')
  
  // Form State
  const [name, setName] = useState(initialTemple?.name || '')
  const [primaryDeity, setPrimaryDeity] = useState(initialTemple?.primaryDeity || '')
  const [description, setDescription] = useState(
    initialTemple?.description || initialTemple?.themeConfig?.description || ''
  )
  const [historyText, setHistoryText] = useState(
    typeof initialTemple?.history === 'string'
      ? initialTemple.history
      : initialTemple?.history?.text || initialTemple?.themeConfig?.history || ''
  )
  const [coverImageUrl, setCoverImageUrl] = useState(
    initialTemple?.coverImageUrl || initialTemple?.themeConfig?.heroImageUrl || ''
  )
  const [logoUrl, setLogoUrl] = useState(
    initialTemple?.logoUrl || initialTemple?.themeConfig?.logoUrl || ''
  )
  const [liveStreamUrl, setLiveStreamUrl] = useState(
    initialTemple?.liveStreamUrl || initialTemple?.themeConfig?.liveStreamUrl || ''
  )
  const [templateId, setTemplateId] = useState(
    initialTemple?.themeConfig?.templateId || 'classic'
  )
  const [timings, setTimings] = useState({
    morning_open: initialTemple?.timings?.morning_open || '06:00',
    morning_close: initialTemple?.timings?.morning_close || '12:00',
    evening_open: initialTemple?.timings?.evening_open || '16:00',
    evening_close: initialTemple?.timings?.evening_close || '21:00',
  })
  const [contactPhone, setContactPhone] = useState(initialTemple?.contactPhone || '')
  const [contactEmail, setContactEmail] = useState(initialTemple?.contactEmail || '')
  const [upiId, setUpiId] = useState(initialTemple?.upiId || '')
  const [address, setAddress] = useState({
    street: initialTemple?.address?.street || initialTemple?.address?.line1 || '',
    city: initialTemple?.address?.city || '',
    state: initialTemple?.address?.state || 'Karnataka',
    zip: initialTemple?.address?.zip || initialTemple?.address?.pincode || '',
  })
  const [sevas, setSevas] = useState<SevaItem[]>(
    initialSevas.length > 0
      ? initialSevas.map(s => ({
          id: s.id,
          name: s.name,
          price: Number(s.price || s.amount) || 101,
          description: s.description || ''
        }))
      : [
          { id: '1', name: 'Nitya Archana & Sankalpam', price: 101, description: 'Personalized holy archana performed before the sanctum.' },
          { id: '2', name: 'Maha Panchamrita Abhishekam', price: 501, description: 'Traditional sacred milk and honey abhishekam.' },
          { id: '3', name: 'Nitya Annadanam (50 Meals)', price: 1001, description: 'Provide satvik prasadam meals to visiting pilgrims.' }
        ]
  )

  const [saving, setSaving] = useState(false)
  const [uploadingImage, setUploadingImage] = useState<'cover' | 'logo' | null>(null)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const coverFileInputRef = useRef<HTMLInputElement>(null)
  const logoFileInputRef = useRef<HTMLInputElement>(null)

  // Extracted YouTube video ID for preview
  const extractedVideoId = extractYoutubeId(liveStreamUrl)

  // Auto open drawer when edit=true is passed in query or hash
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      if (params.get('edit') === 'true' || window.location.hash === '#edit') {
        setIsOpen(true)
      }
    }
  }, [])

  // Handle direct file upload
  const handleFileUpload = async (file: File, type: 'cover' | 'logo') => {
    try {
      setUploadingImage(type)
      const formData = new FormData()
      formData.append('file', file)
      formData.append('title', `${name} ${type}`)

      // Try media upload endpoint first
      let res = await fetch('/api/media/upload', {
        method: 'POST',
        body: formData
      })

      if (!res.ok) {
        // Fallback to onboarding-upload if not authenticated via platform session
        res = await fetch('/api/media/onboarding-upload', {
          method: 'POST',
          body: formData
        })
      }

      const data = await res.json()
      if (res.ok && data.url) {
        if (type === 'cover') {
          setCoverImageUrl(data.url)
        } else {
          setLogoUrl(data.url)
        }
      } else {
        alert(data.error || 'Failed to upload photo. You can also paste an image URL directly.')
      }
    } catch (err: any) {
      console.error('Upload error:', err)
      alert('Error uploading file. Please try pasting the image URL directly.')
    } finally {
      setUploadingImage(null)
    }
  }

  // Handle Save
  const handleSave = async () => {
    setSaving(true)
    setSaveStatus('idle')
    setErrorMessage('')

    try {
      const payload = {
        slug,
        templeId: initialTemple?.id,
        name,
        primaryDeity,
        description,
        historyText,
        coverImageUrl,
        logoUrl,
        liveStreamUrl,
        templateId,
        timings,
        contactPhone,
        contactEmail,
        upiId,
        address,
        sevas,
        themeConfig: {
          templateId,
          heroImageUrl: coverImageUrl,
          logoUrl,
          liveStreamUrl,
          description,
          history: historyText,
        }
      }

      const res = await fetch('/api/website/live-edit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      const data = await res.json()

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to save website changes')
      }

      setSaveStatus('success')
      if (onUpdate) {
        onUpdate({
          ...initialTemple,
          ...payload
        })
      }

      // Close drawer after 1.2s and refresh page
      setTimeout(() => {
        window.location.reload()
      }, 1200)
    } catch (err: any) {
      console.error('Save error:', err)
      setSaveStatus('error')
      setErrorMessage(err.message || 'Something went wrong while saving.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      {/* ─────────────────────────────────────────────────────────────
          FLOATING VISUAL BUILDER LAUNCHER BUTTON
      ───────────────────────────────────────────────────────────── */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-2.5 px-5 py-3 rounded-full bg-gradient-to-r from-amber-600 via-saffron-600 to-amber-700 text-white font-extrabold text-sm shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 border-2 border-amber-300/40 ring-4 ring-amber-500/20"
        >
          <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" />
          <Edit3 className="w-4 h-4 text-amber-200" />
          <span>Edit Website (Visual Builder)</span>
        </button>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          VISUAL WEBSITE BUILDER DRAWER OVERLAY
      ───────────────────────────────────────────────────────────── */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm transition-opacity duration-300">
          <div className="w-full max-w-xl sm:max-w-2xl bg-white dark:bg-stone-950 h-full shadow-2xl flex flex-col border-l border-stone-200 dark:border-stone-800 animate-in slide-in-from-right duration-300 text-stone-900 dark:text-stone-100">
            
            {/* Drawer Top Header */}
            <div className="p-4 sm:p-5 border-b border-stone-200 dark:border-stone-850 flex items-center justify-between bg-stone-50/80 dark:bg-stone-900/60 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-gradient-to-tr from-amber-500 to-saffron-600 text-white shadow-md">
                  <Sparkles className="w-5 h-5 text-amber-100" />
                </div>
                <div>
                  <h2 className="font-heading font-black text-base sm:text-lg text-stone-900 dark:text-white leading-tight">
                    Visual Website Builder
                  </h2>
                  <p className="text-xs text-stone-500 dark:text-stone-400">
                    Modify any section, YouTube live streaming, photos, timings and sevas live
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-850 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Tabs Bar */}
            <div className="flex border-b border-stone-200 dark:border-stone-850 bg-stone-100/50 dark:bg-stone-900/40 px-3 overflow-x-auto custom-scrollbar shrink-0 gap-1 py-1.5">
              {[
                { id: 'stream', label: 'YouTube Live', icon: Video },
                { id: 'photos', label: 'Photos & Logo', icon: ImageIcon },
                { id: 'info', label: 'Sanctum Info', icon: Sparkles },
                { id: 'timings', label: 'Timings', icon: Clock },
                { id: 'sevas', label: 'Sevas & Poojas', icon: Heart },
                { id: 'contact', label: 'Contact & UPI', icon: Phone },
                { id: 'theme', label: 'Theme', icon: Palette }
              ].map(tab => {
                const Icon = tab.icon
                const isActive = activeTab === tab.id
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                      isActive
                        ? 'bg-white dark:bg-stone-800 text-saffron-650 dark:text-amber-400 shadow-sm border border-stone-200/80 dark:border-stone-700'
                        : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 hover:bg-white/50'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                )
              })}
            </div>

            {/* Drawer Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">

              {/* ───────────────────────────────────────────────────
                  TAB 1: YOUTUBE LIVE STREAMING
              ─────────────────────────────────────────────────── */}
              {activeTab === 'stream' && (
                <div className="space-y-5">
                  <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs">
                    <p className="font-bold text-amber-900 dark:text-amber-300 flex items-center gap-1.5 mb-1">
                      <Video className="w-4 h-4 text-amber-600" />
                      Embed 24/7 Garbhagriha & Aarti YouTube Live Stream
                    </p>
                    <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
                      Paste your YouTube Live URL, channel live link, or normal video link below. It will automatically embed directly on the homepage and dedicated live darshan portal.
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-700 dark:text-stone-300">
                      YouTube Stream URL or Video ID
                    </label>
                    <input
                      type="text"
                      value={liveStreamUrl}
                      onChange={e => setLiveStreamUrl(e.target.value)}
                      placeholder="e.g. https://www.youtube.com/watch?v=sV0f0N24rQo or https://youtu.be/..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono text-xs"
                    />
                    <p className="text-[11px] text-stone-500">
                      Supports formats: <code className="text-amber-600">youtube.com/watch?v=...</code>, <code className="text-amber-600">youtu.be/...</code>, or 11-char ID.
                    </p>
                  </div>

                  {/* YouTube Live Embed Preview */}
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-stone-700 dark:text-stone-300">
                        Live Stream Player Preview
                      </span>
                      {extractedVideoId ? (
                        <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Valid Stream ID: {extractedVideoId}
                        </span>
                      ) : (
                        <span className="text-[10px] text-stone-400">No active stream ID</span>
                      )}
                    </div>

                    <div className="aspect-video w-full rounded-2xl bg-stone-900 overflow-hidden border border-stone-800 shadow-md relative flex items-center justify-center">
                      {extractedVideoId ? (
                        <iframe
                          src={`https://www.youtube.com/embed/${extractedVideoId}?autoplay=0&mute=0`}
                          title="YouTube Live Stream Preview"
                          className="w-full h-full border-0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      ) : (
                        <div className="text-center p-6 text-stone-400 flex flex-col items-center">
                          <Video className="w-10 h-10 mb-2 opacity-40 text-stone-500" />
                          <p className="text-xs font-semibold">Live stream player will appear here</p>
                          <p className="text-[10px] text-stone-500 mt-1">Paste a YouTube link above to preview</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* ───────────────────────────────────────────────────
                  TAB 2: PHOTOS & LOGO
              ─────────────────────────────────────────────────── */}
              {activeTab === 'photos' && (
                <div className="space-y-6">
                  {/* Temple Cover / Hero Image */}
                  <div className="p-4 rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/30 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-stone-900 dark:text-white">Temple Hero / Cover Image</h4>
                        <p className="text-[11px] text-stone-500">Displayed as the main hero banner across all temple pages.</p>
                      </div>
                      <input
                        type="file"
                        ref={coverFileInputRef}
                        accept="image/*"
                        className="hidden"
                        onChange={e => {
                          const file = e.target.files?.[0]
                          if (file) handleFileUpload(file, 'cover')
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => coverFileInputRef.current?.click()}
                        disabled={uploadingImage === 'cover'}
                        className="px-3 py-1.5 rounded-lg bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-bold flex items-center gap-1.5 shadow-sm hover:scale-105 transition-all"
                      >
                        {uploadingImage === 'cover' ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" /> Uploading...
                          </>
                        ) : (
                          <>
                            <UploadCloud className="w-3.5 h-3.5" /> Upload File
                          </>
                        )}
                      </button>
                    </div>

                    <input
                      type="text"
                      value={coverImageUrl}
                      onChange={e => setCoverImageUrl(e.target.value)}
                      placeholder="Or paste image URL (https://...)"
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-xs"
                    />

                    {coverImageUrl && (
                      <div className="aspect-[21/9] w-full rounded-xl overflow-hidden bg-stone-200 border border-stone-300 dark:border-stone-800 relative">
                        <img src={coverImageUrl} alt="Temple Cover Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>

                  {/* Temple Logo / Deity Emblem */}
                  <div className="p-4 rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/30 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-stone-900 dark:text-white">Temple Logo / Deity Emblem</h4>
                        <p className="text-[11px] text-stone-500">Circular crest in the header, navigation, and mobile cards.</p>
                      </div>
                      <input
                        type="file"
                        ref={logoFileInputRef}
                        accept="image/*"
                        className="hidden"
                        onChange={e => {
                          const file = e.target.files?.[0]
                          if (file) handleFileUpload(file, 'logo')
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => logoFileInputRef.current?.click()}
                        disabled={uploadingImage === 'logo'}
                        className="px-3 py-1.5 rounded-lg bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-bold flex items-center gap-1.5 shadow-sm hover:scale-105 transition-all"
                      >
                        {uploadingImage === 'logo' ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" /> Uploading...
                          </>
                        ) : (
                          <>
                            <UploadCloud className="w-3.5 h-3.5" /> Upload File
                          </>
                        )}
                      </button>
                    </div>

                    <input
                      type="text"
                      value={logoUrl}
                      onChange={e => setLogoUrl(e.target.value)}
                      placeholder="Or paste logo URL (https://...)"
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-xs"
                    />

                    {logoUrl && (
                      <div className="flex items-center gap-3 pt-1">
                        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-amber-500 shadow-md bg-white">
                          <img src={logoUrl} alt="Logo Preview" className="w-full h-full object-cover" />
                        </div>
                        <span className="text-xs text-stone-500 font-semibold">Emblem Preview</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ───────────────────────────────────────────────────
                  TAB 3: SANCTUM INFO & ABOUT
              ─────────────────────────────────────────────────── */}
              {activeTab === 'info' && (
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-700 dark:text-stone-300">Temple Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="e.g. Sri Venkateswara Swamy Temple"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-sm font-semibold"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-700 dark:text-stone-300">Primary Deity</label>
                    <input
                      type="text"
                      value={primaryDeity}
                      onChange={e => setPrimaryDeity(e.target.value)}
                      placeholder="e.g. Lord Shiva, Sri Krishna, Goddess Lakshmi"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-700 dark:text-stone-300">Sanctum Tagline / Short Intro</label>
                    <textarea
                      value={description}
                      onChange={e => setDescription(e.target.value)}
                      rows={2}
                      placeholder="Short tagline shown under hero header..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-xs leading-relaxed"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-700 dark:text-stone-300">Temple History & Sacred Origins</label>
                    <textarea
                      value={historyText}
                      onChange={e => setHistoryText(e.target.value)}
                      rows={5}
                      placeholder="Describe the temple's history, sthalam mahatyam, architecture, and miracles..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-xs leading-relaxed"
                    />
                  </div>
                </div>
              )}

              {/* ───────────────────────────────────────────────────
                  TAB 4: TIMINGS & AARTIS
              ─────────────────────────────────────────────────── */}
              {activeTab === 'timings' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-stone-700 dark:text-stone-300">Morning Open</label>
                      <input
                        type="time"
                        value={timings.morning_open}
                        onChange={e => setTimings(prev => ({ ...prev, morning_open: e.target.value }))}
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-xs font-mono"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-stone-700 dark:text-stone-300">Morning Close</label>
                      <input
                        type="time"
                        value={timings.morning_close}
                        onChange={e => setTimings(prev => ({ ...prev, morning_close: e.target.value }))}
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-xs font-mono"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-stone-700 dark:text-stone-300">Evening Open</label>
                      <input
                        type="time"
                        value={timings.evening_open}
                        onChange={e => setTimings(prev => ({ ...prev, evening_open: e.target.value }))}
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-xs font-mono"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-stone-700 dark:text-stone-300">Evening Close</label>
                      <input
                        type="time"
                        value={timings.evening_close}
                        onChange={e => setTimings(prev => ({ ...prev, evening_close: e.target.value }))}
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-xs font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* ───────────────────────────────────────────────────
                  TAB 5: SEVAS & POOJAS
              ─────────────────────────────────────────────────── */}
              {activeTab === 'sevas' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-stone-900 dark:text-white">Temple Sevas List</h4>
                      <p className="text-[11px] text-stone-500">Devotees can book these sevas with UPI instant payment.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setSevas(prev => [
                          ...prev,
                          { id: `temp-${Date.now()}`, name: 'New Sacred Seva', price: 101, description: 'Details about this ritual.' }
                        ])
                      }}
                      className="px-3 py-1.5 rounded-lg bg-saffron-600 text-white text-xs font-bold flex items-center gap-1 hover:bg-saffron-700 shadow-sm"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Seva
                    </button>
                  </div>

                  <div className="space-y-3">
                    {sevas.map((seva, idx) => (
                      <div
                        key={seva.id || idx}
                        className="p-3.5 rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/30 space-y-2 relative group"
                      >
                        <button
                          type="button"
                          onClick={() => setSevas(prev => prev.filter((_, i) => i !== idx))}
                          className="absolute top-3 right-3 text-stone-400 hover:text-rose-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                        <div className="grid grid-cols-3 gap-2 pr-6">
                          <div className="col-span-2 space-y-1">
                            <label className="text-[10px] font-bold text-stone-500">Seva Name</label>
                            <input
                              type="text"
                              value={seva.name}
                              onChange={e => {
                                const copy = [...sevas]
                                copy[idx].name = e.target.value
                                setSevas(copy)
                              }}
                              className="w-full px-2.5 py-1.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-xs font-bold"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-stone-500">Price (₹)</label>
                            <input
                              type="number"
                              value={seva.price}
                              onChange={e => {
                                const copy = [...sevas]
                                copy[idx].price = Number(e.target.value)
                                setSevas(copy)
                              }}
                              className="w-full px-2.5 py-1.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-xs font-bold text-amber-600"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-stone-500">Description</label>
                          <input
                            type="text"
                            value={seva.description || ''}
                            onChange={e => {
                              const copy = [...sevas]
                              copy[idx].description = e.target.value
                              setSevas(copy)
                            }}
                            placeholder="Brief description of the blessings and prasad..."
                            className="w-full px-2.5 py-1.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-xs"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ───────────────────────────────────────────────────
                  TAB 6: CONTACT & UPI
              ─────────────────────────────────────────────────── */}
              {activeTab === 'contact' && (
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-700 dark:text-stone-300">Temple UPI ID (for E-Hundi Donations)</label>
                    <input
                      type="text"
                      value={upiId}
                      onChange={e => setUpiId(e.target.value)}
                      placeholder="e.g. sritempletrust@sbi"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-sm font-mono text-emerald-600 dark:text-emerald-400 font-bold"
                    />
                    <p className="text-[11px] text-stone-500">Devotees will scan dynamic QR codes mapped directly to this UPI ID.</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-stone-700 dark:text-stone-300">Phone Number</label>
                      <input
                        type="text"
                        value={contactPhone}
                        onChange={e => setContactPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-stone-700 dark:text-stone-300">Email Address</label>
                      <input
                        type="email"
                        value={contactEmail}
                        onChange={e => setContactEmail(e.target.value)}
                        placeholder="contact@temple.org"
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-xs"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-700 dark:text-stone-300">Street / Area Address</label>
                    <input
                      type="text"
                      value={address.street}
                      onChange={e => setAddress(prev => ({ ...prev, street: e.target.value }))}
                      placeholder="e.g. 108 Sacred Hill Road, Near Rajagopuram"
                      className="w-full px-3.5 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-stone-700 dark:text-stone-300">City</label>
                      <input
                        type="text"
                        value={address.city}
                        onChange={e => setAddress(prev => ({ ...prev, city: e.target.value }))}
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-stone-700 dark:text-stone-300">State</label>
                      <input
                        type="text"
                        value={address.state}
                        onChange={e => setAddress(prev => ({ ...prev, state: e.target.value }))}
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-stone-700 dark:text-stone-300">Pincode</label>
                      <input
                        type="text"
                        value={address.zip}
                        onChange={e => setAddress(prev => ({ ...prev, zip: e.target.value }))}
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* ───────────────────────────────────────────────────
                  TAB 7: THEMES & TEMPLATES
              ─────────────────────────────────────────────────── */}
              {activeTab === 'theme' && (
                <div className="space-y-4">
                  <p className="text-xs text-stone-500">
                    Switch the design layout of your temple portal in one click:
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { id: 'classic', name: 'Classic Serene', desc: 'Sandalwood, warm gold, traditional calm.' },
                      { id: 'heritage', name: 'Heritage Grand', desc: 'Deep crimson, majestic stone carvings.' },
                      { id: 'modern', name: 'Modern Elegant', desc: 'Minimalist white & charcoal marble.' },
                      { id: 'divine-glow', name: 'Divine Glow', desc: 'Luminous brass diya & gold radiance.' },
                      { id: 'tech-sanctuary', name: 'Tech Sanctuary', desc: 'Dark neon, 4K livestream cyber sanctum.' },
                      { id: 'ai-omniscient', name: 'AI Omniscient', desc: 'Glassmorphism, futuristic spirituality.' }
                    ].map(tmpl => (
                      <div
                        key={tmpl.id}
                        onClick={() => setTemplateId(tmpl.id)}
                        className={`cursor-pointer p-3.5 rounded-xl border-2 transition-all flex flex-col justify-between ${
                          templateId === tmpl.id
                            ? 'border-saffron-500 bg-saffron-50 dark:bg-saffron-950/20 ring-2 ring-saffron-500/20 shadow-md'
                            : 'border-stone-200 dark:border-stone-800 hover:border-amber-300'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-bold text-xs text-stone-900 dark:text-white">{tmpl.name}</span>
                            {templateId === tmpl.id && <CheckCircle2 className="w-4 h-4 text-saffron-600" />}
                          </div>
                          <p className="text-[10px] text-stone-500 leading-tight">{tmpl.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Drawer Bottom Action Bar */}
            <div className="p-4 sm:p-5 border-t border-stone-200 dark:border-stone-850 bg-stone-50 dark:bg-stone-900 flex items-center justify-between shrink-0">
              <div>
                {saveStatus === 'success' && (
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 animate-bounce">
                    <CheckCircle2 className="w-4 h-4" /> Published live! Refreshing...
                  </span>
                )}
                {saveStatus === 'error' && (
                  <span className="text-xs font-bold text-rose-600 flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4" /> {errorMessage}
                  </span>
                )}
                {saveStatus === 'idle' && (
                  <span className="text-[11px] text-stone-400">
                    Changes will instantly publish to your live temple website.
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 text-xs font-bold hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saving}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-saffron-600 via-amber-600 to-amber-700 text-white text-xs font-black shadow-lg shadow-amber-500/25 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-amber-200" />
                      Saving & Publishing...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 text-amber-200" />
                      Save & Publish Live
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  )
}
