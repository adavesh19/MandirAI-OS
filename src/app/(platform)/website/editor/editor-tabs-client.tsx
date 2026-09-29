'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Sparkles, Eye, Edit3, ExternalLink, RefreshCw, Layout, Smartphone, Monitor } from 'lucide-react'
import DragDropEditor from '@/components/builder/DragDropEditor'
import { BuilderBlock } from '@/components/builder/plugins/types'

interface EditorTabsClientProps {
  templeSlug: string
  templeName: string
  primaryDeity?: string | null
  initialBlocks: BuilderBlock[]
}

export default function EditorTabsClient({
  templeSlug,
  templeName,
  primaryDeity,
  initialBlocks
}: EditorTabsClientProps) {
  const [mode, setMode] = useState<'visual' | 'blocks'>('visual')
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop')
  const [iframeKey, setIframeKey] = useState(0)

  const liveEditorUrl = `/temple/${templeSlug}?edit=true`
  const liveSiteUrl = `/temple/${templeSlug}`

  return (
    <div className="w-full flex flex-col min-h-screen bg-stone-100 dark:bg-stone-950">
      {/* Top Universal Control Header */}
      <div className="bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 px-4 py-3.5 flex flex-wrap items-center justify-between gap-3 shadow-sm sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-saffron-600 flex items-center justify-center text-white shadow-md font-bold text-lg">
            🕉
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold text-stone-900 dark:text-white">
                {templeName}
              </h1>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 text-[11px] font-bold">
                Live
              </span>
            </div>
            <p className="text-xs text-stone-500">
              {primaryDeity ? `Abode of ${primaryDeity} • ` : ''}
              Visual Website Builder
            </p>
          </div>
        </div>

        {/* Mode Switcher */}
        <div className="flex items-center gap-1 bg-stone-100 dark:bg-stone-800 p-1 rounded-xl border border-stone-200 dark:border-stone-700">
          <button
            type="button"
            onClick={() => setMode('visual')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              mode === 'visual'
                ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-white shadow-sm'
                : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Live In-Place Builder
          </button>
          <button
            type="button"
            onClick={() => setMode('blocks')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              mode === 'blocks'
                ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-white shadow-sm'
                : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
            }`}
          >
            <Layout className="w-3.5 h-3.5 text-indigo-500" />
            Block Drag & Drop
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {mode === 'visual' && (
            <div className="hidden sm:flex items-center bg-stone-100 dark:bg-stone-800 rounded-xl p-1 border border-stone-200 dark:border-stone-700 mr-1">
              <button
                type="button"
                onClick={() => setDevice('desktop')}
                className={`p-1.5 rounded-lg transition-all ${
                  device === 'desktop' ? 'bg-white dark:bg-stone-900 shadow-sm text-stone-900 dark:text-white' : 'text-stone-400'
                }`}
                title="Desktop View"
              >
                <Monitor className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setDevice('mobile')}
                className={`p-1.5 rounded-lg transition-all ${
                  device === 'mobile' ? 'bg-white dark:bg-stone-900 shadow-sm text-stone-900 dark:text-white' : 'text-stone-400'
                }`}
                title="Mobile View"
              >
                <Smartphone className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIframeKey(k => k + 1)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
                title="Refresh Preview"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          )}

          <Link
            href={liveEditorUrl}
            target="_blank"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-600 via-saffron-600 to-amber-700 text-white font-extrabold text-xs shadow-md shadow-amber-500/20 hover:scale-105 transition-all flex items-center gap-1.5"
          >
            <Edit3 className="w-3.5 h-3.5 text-amber-200" />
            <span>Open 1-Click Visual Editor</span>
            <ExternalLink className="w-3 h-3 text-amber-200" />
          </Link>

          <Link
            href={liveSiteUrl}
            target="_blank"
            className="px-3.5 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-semibold text-xs border border-stone-200 dark:border-stone-700 hover:bg-stone-200 dark:hover:bg-stone-700 transition-all flex items-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5 text-stone-500" />
            <span>View Site</span>
          </Link>
        </div>
      </div>

      {/* Main Content Area */}
      {mode === 'visual' ? (
        <div className="flex-1 flex flex-col items-center justify-center p-2 sm:p-4 bg-stone-200/60 dark:bg-stone-950 overflow-hidden">
          <div
            className={`w-full transition-all duration-300 bg-white dark:bg-stone-900 rounded-2xl shadow-2xl border border-stone-300 dark:border-stone-800 overflow-hidden flex flex-col ${
              device === 'mobile'
                ? 'max-w-[420px] h-[820px] my-4 rounded-[40px] border-[8px] border-stone-800 shadow-2xl'
                : 'max-w-7xl h-[calc(100vh-80px)]'
            }`}
          >
            {/* Top Preview Status Strip */}
            <div className="bg-stone-900 text-stone-300 px-4 py-1.5 text-xs flex items-center justify-between border-b border-stone-800 select-none">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono text-[11px] text-stone-300">
                  {device === 'mobile' ? 'Mobile Phone Simulator (390px)' : 'Interactive In-Place Builder Mode'}
                </span>
              </div>
              <span className="text-[11px] text-stone-400">
                Click floating <b>⚡ Edit Website</b> button inside to modify any element
              </span>
            </div>

            {/* Embedded Live Interactive Temple Site with Visual Editor Active */}
            <iframe
              key={iframeKey}
              src={liveEditorUrl}
              title={`${templeName} Visual Editor`}
              className="w-full flex-1 border-0"
            />
          </div>
        </div>
      ) : (
        <div className="p-4 sm:p-6 max-w-7xl mx-auto w-full">
          <DragDropEditor initialBlocks={initialBlocks} />
        </div>
      )}
    </div>
  )
}
