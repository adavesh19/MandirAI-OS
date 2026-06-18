'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Filter, 
  Terminal, 
  Cpu, 
  Sparkles, 
  Folder, 
  Activity, 
  Compass,
  FileCode2,
  Calendar,
  Image as ImageIcon
} from 'lucide-react'

interface MediaItem {
  id: string
  url: string
  thumbnailUrl: string | null
  title: string | null
  category: string | null
  createdAt?: string | Date
}

interface GalleryClientProps {
  temple: {
    name: string
    slug: string
  }
  mediaItems: MediaItem[]
  templateId: string
}

const CATEGORIES = ['All', 'Deity', 'Pooja', 'Festival', 'Architecture', 'Cultural', 'Prasad']

export default function GalleryClient({ temple, mediaItems, templateId }: GalleryClientProps) {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [activeImageIdx, setActiveImageIdx] = useState<number | null>(null)
  const [decryptingIdx, setDecryptingIdx] = useState<number | null>(null)
  const [terminalLogs, setTerminalLogs] = useState<string[]>([])
  
  // Filter items
  const filteredItems = mediaItems.filter(item => {
    if (selectedCategory === 'All') return true
    return item.category?.toLowerCase() === selectedCategory.toLowerCase()
  })

  // Simulated terminal logs for tech sanctuary
  useEffect(() => {
    if (templateId === 'tech-sanctuary') {
      const logs = [
        `SYSTEM: Initializing Media Server Database Connection...`,
        `DB_QUERY: SELECT * FROM temple_media WHERE temple_slug = '${temple.slug}' AND type = 'IMAGE'`,
        `SUCCESS: Loaded ${mediaItems.length} elements from storage bucket.`,
        `HUD: Grid compilation finished. Scanlines active.`
      ]
      setTerminalLogs(logs)
    }
  }, [templateId, temple.slug, mediaItems.length])

  // Custom filter helper with console outputs for tech theme
  const selectFilter = (category: string) => {
    setSelectedCategory(category)
    if (templateId === 'tech-sanctuary') {
      const timestamp = new Date().toLocaleTimeString()
      setTerminalLogs(prev => [
        ...prev.slice(-6),
        `[${timestamp}] DB_QUERY: SELECT * FROM media WHERE category = '${category === 'All' ? '*' : category.toUpperCase()}'`,
        `[${timestamp}] BUFFER: Rendering ${filteredItems.length} assets...`
      ])
    }
  }

  // Lightbox navigation
  const openLightbox = (index: number) => {
    if (templateId === 'tech-sanctuary') {
      setDecryptingIdx(index)
      const timestamp = new Date().toLocaleTimeString()
      setTerminalLogs(prev => [
        ...prev.slice(-6),
        `[${timestamp}] PROTOCOL: Decrypting image packets [ID: ${filteredItems[index].id}]`,
        `[${timestamp}] DECRYPT: Running SHA-256 signature verification...`
      ])
      
      setTimeout(() => {
        setDecryptingIdx(null)
        setActiveImageIdx(index)
        setTerminalLogs(prev => [
          ...prev.slice(-6),
          `[${timestamp}] SUCCESS: Image buffer loaded in screen buffer.`
        ])
      }, 700)
    } else {
      setActiveImageIdx(index)
    }
  }

  const closeLightbox = () => {
    setActiveImageIdx(null)
  }

  const navigateLightbox = (direction: 'next' | 'prev') => {
    if (activeImageIdx === null) return
    let newIdx = direction === 'next' ? activeImageIdx + 1 : activeImageIdx - 1
    if (newIdx >= filteredItems.length) newIdx = 0
    if (newIdx < 0) newIdx = filteredItems.length - 1
    setActiveImageIdx(newIdx)
  }

  // Generate mock metadata for tech themes
  const getMockMetadata = (item: MediaItem) => {
    const hash = item.id.substring(0, 8).toUpperCase()
    const sizeKb = Math.floor(100 + (item.title?.length || 10) * 12.3)
    const dateStr = item.createdAt 
      ? new Date(item.createdAt).toLocaleDateString()
      : '12/03/2026'
    return { hash, sizeKb, dateStr }
  }

  // Render Theme Styles
  const isHighTech = templateId === 'tech-sanctuary' || templateId === 'ai-omniscient'

  return (
    <div className={`min-h-[80vh] ${
      templateId === 'tech-sanctuary' 
        ? 'bg-slate-950 text-slate-300 font-mono p-4 sm:p-6 rounded-2xl border border-cyan-900/50 shadow-2xl relative'
        : templateId === 'ai-omniscient'
        ? 'bg-black text-white font-sans p-4 sm:p-6 rounded-3xl border border-white/10 shadow-2xl relative'
        : templateId === 'divine-glow'
        ? 'bg-gradient-to-b from-amber-50/50 via-orange-50/30 to-amber-50/50 text-stone-900 font-sans'
        : templateId === 'heritage'
        ? 'bg-stone-100 text-stone-900 font-serif'
        : 'bg-white text-stone-900 font-sans'
    }`}>
      
      {/* Background patterns for high tech */}
      {templateId === 'tech-sanctuary' && (
        <div className="absolute inset-0 pointer-events-none opacity-5 rounded-2xl overflow-hidden bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:16px_16px]"></div>
      )}
      {templateId === 'ai-omniscient' && (
        <div className="absolute inset-0 pointer-events-none opacity-10 rounded-3xl overflow-hidden">
          <div className="absolute -top-[30%] -left-[20%] w-[60%] h-[60%] bg-purple-500/20 blur-[120px] rounded-full"></div>
          <div className="absolute -bottom-[30%] -right-[20%] w-[60%] h-[60%] bg-cyan-500/10 blur-[120px] rounded-full"></div>
        </div>
      )}

      {/* ── Page Header ── */}
      {templateId === 'tech-sanctuary' ? (
        <div className="relative border-b border-cyan-950 pb-6 mb-8 z-10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-cyan-400 text-xs tracking-widest uppercase mb-1 font-bold">
                <Terminal className="h-3.5 w-3.5 animate-pulse" />
                PROTOCOL // SHUTTER_LOGS_NEXUS
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tighter drop-shadow-[0_0_10px_rgba(6,182,212,0.4)]">
                SACRED DEPOSIT MATRIX
              </h1>
              <p className="text-xs text-slate-500 mt-1 uppercase">
                Visual index feed for {temple.name} | Resolution: 1080p telemetry
              </p>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded px-3 py-1.5 text-[10px] text-slate-400">
              Active Files: <span className="text-cyan-400 font-bold">{mediaItems.length}</span>
            </div>
          </div>
        </div>
      ) : templateId === 'ai-omniscient' ? (
        <div className="relative pb-6 mb-8 z-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-fuchsia-950/40 to-cyan-950/40 border border-fuchsia-800/30 px-3 py-1 rounded-full text-xs text-fuchsia-400 mb-4 backdrop-blur-md">
            <Cpu className="h-3.5 w-3.5 animate-spin" />
            AI Image Recognition & Classification Active
          </div>
          <h1 className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent tracking-tight">
            Divine Visual Nexus
          </h1>
          <p className="text-sm text-slate-400 mt-2 max-w-xl">
            Real-time visual capture of {temple.name} processed and indexed by the temple's AI core.
          </p>
        </div>
      ) : templateId === 'divine-glow' ? (
        <div className="relative text-center py-10 px-6 mb-8 rounded-2xl bg-gradient-to-r from-amber-500/10 via-orange-500/15 to-amber-500/10 border border-orange-500/20">
          <span className="text-amber-600 text-3xl">🪔</span>
          <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-amber-950 mt-2">
            Sacred Photo Gallery
          </h1>
          <p className="text-stone-700 max-w-xl mx-auto mt-2 text-sm sm:text-base">
            Glimpse the divine beauty and holy festivities of <span className="font-bold text-amber-700">{temple.name}</span>.
          </p>
          <div className="mt-4 inline-flex items-center gap-1 bg-amber-500/20 text-amber-800 font-bold text-xs rounded-full px-4 py-1.5 border border-amber-500/30">
            ☀️ {mediaItems.length} Divine Captures
          </div>
        </div>
      ) : templateId === 'heritage' ? (
        <div className="relative text-center border-y-4 border-double border-red-800/40 py-10 mb-8 bg-[#fcf8f2] text-stone-900 font-serif">
          <p className="text-xs uppercase tracking-widest text-red-800 font-bold mb-1">Dharshan Darpan</p>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-red-950">
            Temple Archives & Gallery
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-red-800 to-transparent mx-auto my-3"></div>
          <p className="text-stone-800 max-w-lg mx-auto text-sm italic">
            A visual chronicle of the holy rituals, historic architecture, and festive assemblies of {temple.name}.
          </p>
        </div>
      ) : (
        <div className="relative mb-10 overflow-hidden rounded-2xl bg-gradient-to-br from-stone-900 via-amber-950 to-stone-900 px-6 py-10 sm:px-10 text-white shadow-lg">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-amber-400">Sacred Moments</p>
          <h1 className="font-heading text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
            Temple Photo Gallery
          </h1>
          <p className="mt-2 text-sm text-stone-300">
            Explore the spiritual vibrance of <span className="font-semibold text-amber-400">{temple.name}</span> through devotions.
          </p>
        </div>
      )}

      {/* ── Category Filters ── */}
      <div className="relative z-10 mb-8">
        {templateId === 'tech-sanctuary' ? (
          <div className="space-y-3">
            <span className="text-[10px] text-slate-500 tracking-wider font-bold block">// CHOOSE BUFFER SECTOR:</span>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(category => (
                <button
                  key={category}
                  onClick={() => selectFilter(category)}
                  className={`px-3 py-1.5 border rounded text-[11px] font-bold uppercase transition-all tracking-wider ${
                    selectedCategory.toLowerCase() === category.toLowerCase()
                      ? 'bg-cyan-950 border-cyan-400 text-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.2)]'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  {category === 'All' ? 'sector_all' : `sec_${category.toLowerCase()}`}
                </button>
              ))}
            </div>
          </div>
        ) : templateId === 'ai-omniscient' ? (
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-xs text-fuchsia-400 font-bold uppercase">
              <Filter className="h-3.5 w-3.5" /> Filter Channels
            </div>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(category => (
                <button
                  key={category}
                  onClick={() => selectFilter(category)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all backdrop-blur-md ${
                    selectedCategory.toLowerCase() === category.toLowerCase()
                      ? 'bg-gradient-to-r from-fuchsia-600 to-cyan-600 text-white shadow-lg shadow-fuchsia-500/20'
                      : 'bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        ) : templateId === 'divine-glow' ? (
          <div className="flex flex-wrap justify-center gap-2">
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  selectedCategory.toLowerCase() === category.toLowerCase()
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'bg-amber-100/50 hover:bg-amber-200/50 text-amber-950 border border-amber-200/50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        ) : templateId === 'heritage' ? (
          <div className="flex flex-wrap justify-center gap-4 border-b border-red-800/10 pb-4">
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`font-heading text-sm font-semibold relative py-1 px-2 transition-all ${
                  selectedCategory.toLowerCase() === category.toLowerCase()
                    ? 'text-red-800 border-b-2 border-red-800'
                    : 'text-stone-600 hover:text-red-950'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory.toLowerCase() === category.toLowerCase()
                    ? 'bg-stone-900 text-white'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── Decrypting Progress Bar (Tech Sanctuary only) ── */}
      {decryptingIdx !== null && (
        <div className="fixed inset-0 bg-black/90 z-50 flex flex-col items-center justify-center font-mono text-cyan-400 p-4">
          <div className="max-w-md w-full border border-cyan-800 bg-slate-950 p-6 rounded-lg text-center space-y-4">
            <Terminal className="h-10 w-10 text-cyan-400 mx-auto animate-pulse" />
            <h3 className="text-sm font-bold uppercase tracking-widest">DECRYPTING PICTURE MODULE</h3>
            <p className="text-xs text-slate-500">File: {filteredItems[decryptingIdx].title || 'temple_capture.bin'}</p>
            <div className="h-4 w-full bg-slate-900 rounded overflow-hidden border border-cyan-900 relative">
              <div className="h-full bg-cyan-400 animate-[pulse_1s_infinite]" style={{ width: '70%' }}></div>
            </div>
            <div className="text-[10px] text-slate-400 text-left bg-black p-3 rounded border border-slate-900 font-mono h-24 overflow-hidden space-y-1">
              <p>&gt; Connection established with secure repository...</p>
              <p>&gt; Requesting sector allocation map...</p>
              <p>&gt; SHA-256 Checksum: SUCCESS (0xAE89B37E)</p>
              <p className="animate-pulse">&gt; Rendering image stream...</p>
            </div>
          </div>
        </div>
      )}

      {/* ── Gallery Grid ── */}
      {filteredItems.length === 0 ? (
        <div className={`p-12 text-center rounded-2xl border border-dashed ${
          templateId === 'tech-sanctuary'
            ? 'border-cyan-900/60 bg-slate-950 text-slate-500 font-mono'
            : templateId === 'ai-omniscient'
            ? 'border-white/10 bg-white/5 text-slate-400'
            : 'border-stone-200 bg-stone-50 text-stone-500'
        }`}>
          <ImageIcon className="h-12 w-12 mx-auto mb-4 opacity-55 text-cyan-500" />
          <h3 className="text-lg font-bold">No captures found in sector</h3>
          <p className="text-sm mt-1 max-w-sm mx-auto">There are no files registered under the category '{selectedCategory}' for {temple.name} yet.</p>
        </div>
      ) : (
        <div className="relative z-10 space-y-8">
          {/* Tech Sanctuary Terminal Log Ticker */}
          {templateId === 'tech-sanctuary' && (
            <div className="bg-black/80 border border-slate-900 p-4 rounded-lg font-mono text-[10px] text-cyan-500 space-y-1 max-h-36 overflow-y-auto">
              <div className="flex justify-between text-slate-500 border-b border-slate-900 pb-1 mb-2 font-bold">
                <span>CONSOLE STREAM PROTOCOL</span>
                <span>SYSTEM LOGS: ACTIVE</span>
              </div>
              {terminalLogs.map((log, i) => (
                <div key={i} className="flex gap-2">
                  <span className="text-slate-600">[{i+1}]</span>
                  <span>{log}</span>
                </div>
              ))}
            </div>
          )}

          {/* Masonry Columns Layout */}
          <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4 space-y-4">
            {filteredItems.map((item, idx) => {
              // Alternate aspect ratios for masonry feel
              const aspectClasses = [
                'aspect-square',
                'aspect-[4/3]',
                'aspect-[3/4]',
                'aspect-[16/9]',
                'aspect-square',
                'aspect-[4/5]',
              ]
              const aspectClass = aspectClasses[idx % aspectClasses.length]
              const { hash, sizeKb, dateStr } = getMockMetadata(item)

              return (
                <div 
                  key={item.id}
                  onClick={() => openLightbox(idx)}
                  className={`group relative break-inside-avoid overflow-hidden cursor-pointer transition-all duration-300 ${aspectClass} ${
                    templateId === 'tech-sanctuary'
                      ? 'bg-slate-900 border border-slate-800 rounded-lg hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                      : templateId === 'ai-omniscient'
                      ? 'bg-white/5 border border-white/10 rounded-2xl hover:border-fuchsia-500 hover:shadow-[0_0_20px_rgba(192,38,211,0.25)]'
                      : templateId === 'divine-glow'
                      ? 'bg-white border-2 border-amber-100 hover:border-amber-400 rounded-2xl hover:shadow-lg shadow-amber-900/5'
                      : templateId === 'heritage'
                      ? 'bg-stone-50 border border-stone-300 p-2.5 rounded hover:shadow-xl hover:border-red-850'
                      : 'bg-white border border-stone-200 rounded-xl hover:shadow-md hover:border-amber-300'
                  }`}
                >
                  <Image
                    src={item.url}
                    alt={item.title ?? 'Temple photo'}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className={`object-cover transition-transform duration-500 group-hover:scale-105 ${
                      templateId === 'heritage' ? 'filter sepia-[10%] group-hover:sepia-0' : ''
                    }`}
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
                  />

                  {/* Gradient overlays */}
                  {templateId === 'tech-sanctuary' ? (
                    <div className="absolute inset-0 bg-cyan-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3 border-2 border-cyan-400/0 group-hover:border-cyan-400/80 rounded-lg">
                      <div className="flex justify-between items-start">
                        <span className="bg-cyan-950 text-cyan-400 border border-cyan-400/40 text-[8px] font-bold px-1.5 py-0.5 rounded uppercase">
                          {item.category || 'General'}
                        </span>
                        <span className="text-[8px] text-cyan-400 font-bold bg-black/80 px-1 rounded">
                          {hash}
                        </span>
                      </div>
                      <div className="bg-black/90 p-2.5 rounded border border-cyan-950 space-y-1 backdrop-blur-sm">
                        <p className="text-[10px] text-white font-bold leading-snug line-clamp-1">{item.title || 'UNNAMED_ASSET'}</p>
                        <p className="text-[8px] text-slate-500 flex justify-between">
                          <span>SIZE: {sizeKb}KB</span>
                          <span>DATE: {dateStr}</span>
                        </p>
                      </div>
                    </div>
                  ) : templateId === 'ai-omniscient' ? (
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4">
                      <div className="space-y-2 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        {item.category && (
                          <span className="inline-flex rounded-full bg-gradient-to-r from-fuchsia-600 to-cyan-600 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
                            {item.category}
                          </span>
                        )}
                        <h4 className="text-white font-bold text-sm leading-snug">{item.title || 'Capture Node'}</h4>
                        <div className="flex items-center gap-1.5 text-[10px] text-fuchsia-400 font-mono">
                          <Cpu className="h-3 w-3" />
                          <span>AI Recognition Confidence: 99.8%</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* Standard Overlays */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute inset-0 flex flex-col justify-between p-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <div className="flex justify-end">
                          <span className="rounded-full bg-black/55 backdrop-blur-sm px-2 py-0.5 text-[9px] font-bold uppercase text-white">
                            {item.category || 'General'}
                          </span>
                        </div>
                        <div className="translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                          {item.title && (
                            <p className="text-white font-semibold text-xs leading-snug line-clamp-2">{item.title}</p>
                          )}
                        </div>
                      </div>
                    </>
                  )}

                  {/* Category Stamp on Bottom Right for Heritage */}
                  {templateId === 'heritage' && (
                    <span className="absolute bottom-2 right-2 bg-stone-100/90 text-red-900 border border-red-900/20 text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 font-serif rounded-sm opacity-80">
                      {item.category || 'Visual'}
                    </span>
                  )}
                  {/* Subtle Scanlines for Tech */}
                  {templateId === 'tech-sanctuary' && (
                    <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[size:100%_4px]"></div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* ── Lightbox Overlay Modal ── */}
      {activeImageIdx !== null && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-md animate-in fade-in duration-300">
          
          {/* Close button */}
          <button 
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-[60] bg-white/10 hover:bg-white/20 border border-white/20 p-2.5 rounded-full text-white transition-all shadow-lg"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Left Navigate */}
          <button 
            onClick={() => navigateLightbox('prev')}
            className="absolute left-4 z-[60] bg-white/5 hover:bg-white/15 border border-white/10 p-3 rounded-full text-white transition-all shadow-lg"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {/* Right Navigate */}
          <button 
            onClick={() => navigateLightbox('next')}
            className="absolute right-4 z-[60] bg-white/5 hover:bg-white/15 border border-white/10 p-3 rounded-full text-white transition-all shadow-lg"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Lightbox Content Area */}
          <div className="max-w-4xl w-full flex flex-col items-center justify-center gap-4 relative z-10 px-8">
            <div className="relative w-full aspect-[4/3] max-h-[70vh] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-stone-900">
              <Image
                src={filteredItems[activeImageIdx].url}
                alt={filteredItems[activeImageIdx].title ?? 'Temple photo'}
                fill
                className="object-contain"
                sizes="(max-width: 1200px) 100vw, 1200px"
                priority
              />
            </div>

            {/* Photo Metadata Footer Panel */}
            <div className={`w-full max-w-2xl p-5 rounded-2xl ${
              templateId === 'tech-sanctuary'
                ? 'bg-slate-900 border border-cyan-800 text-cyan-400 font-mono'
                : templateId === 'ai-omniscient'
                ? 'bg-white/5 border border-white/10 text-white backdrop-blur-md'
                : 'bg-stone-900 text-stone-100'
            }`}>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                  templateId === 'tech-sanctuary'
                    ? 'bg-cyan-950 border border-cyan-800/40 text-cyan-400'
                    : templateId === 'ai-omniscient'
                    ? 'bg-gradient-to-r from-fuchsia-600 to-cyan-600 text-white'
                    : 'bg-amber-600 text-white'
                }`}>
                  {filteredItems[activeImageIdx].category || 'General'}
                </span>
                
                {templateId === 'tech-sanctuary' ? (
                  <span className="text-[10px] text-slate-500">
                    ADDR: 0x{filteredItems[activeImageIdx].id.substring(0, 8).toUpperCase()} // FILE_SIZE: {Math.floor(100 + (filteredItems[activeImageIdx].title?.length || 10) * 12.3)}KB
                  </span>
                ) : templateId === 'ai-omniscient' ? (
                  <span className="text-xs text-fuchsia-400 flex items-center gap-1 font-mono">
                    <Sparkles className="h-3 w-3" /> Core Confidence: 99.8%
                  </span>
                ) : null}
              </div>

              <h3 className="text-base sm:text-lg font-bold">
                {filteredItems[activeImageIdx].title || (templateId === 'tech-sanctuary' ? 'DECRYPTED_ASSET_LOG' : 'Sacred Visual Darshan')}
              </h3>

              {templateId === 'tech-sanctuary' && (
                <div className="mt-3 pt-3 border-t border-slate-800 text-[10px] text-slate-400 leading-relaxed font-mono">
                  &gt; SHA-256 Checksum Verification Signature: Match<br />
                  &gt; Rendering Node: {temple.slug.toUpperCase()}_COPROCESSOR_04<br />
                  &gt; Photo capture timestamp verified via decentralised ledger.
                </div>
              )}
              {templateId === 'ai-omniscient' && (
                <p className="mt-2 text-xs text-slate-450 leading-relaxed">
                  Planetary alignment during capture: Moon in Rohini Nakshatra. Image analysis: 
                  contains high concentrations of organic light, temple arch vectors, and devotional energy indices.
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Traditional /Serene Footer Note ── */}
      {!isHighTech && (
        <div className={`mt-12 rounded-2xl py-6 px-4 text-center border ${
          templateId === 'divine-glow'
            ? 'bg-amber-500/10 border-amber-500/20 text-amber-900'
            : templateId === 'heritage'
            ? 'bg-[#fcf8f2] border-red-800/20 text-red-950 font-serif'
            : 'bg-amber-50 border-amber-100 text-stone-600'
        }`}>
          <p className="text-sm">
            🙏 All photographs represent the sacred heritage and daily ceremonies within the premises of{' '}
            <span className="font-semibold">{temple.name}</span>.
          </p>
        </div>
      )}

    </div>
  )
}
