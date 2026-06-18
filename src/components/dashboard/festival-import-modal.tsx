'use client'

import * as React from 'react'
import { X, CheckSquare, Square, Loader2, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getFestivalsForYear } from '@/lib/hindu-calendar'

interface FestivalImportModalProps {
  onClose: () => void
  onImportSuccess: (count: number) => void
}

export default function FestivalImportModal({ onClose, onImportSuccess }: FestivalImportModalProps) {
  const currentYear = new Date().getFullYear()
  const [year, setYear] = React.useState(currentYear)
  const [selected, setSelected] = React.useState<Set<string>>(new Set())
  const [loading, setLoading] = React.useState(false)
  const [result, setResult] = React.useState<{ imported: number; skipped: number } | null>(null)

  const festivals = getFestivalsForYear(year)

  React.useEffect(() => {
    setSelected(new Set(festivals.map(f => f.name)))
  }, [])

  const toggleAll = () => {
    if (selected.size === festivals.length) setSelected(new Set())
    else setSelected(new Set(festivals.map(f => f.name)))
  }

  const toggleOne = (name: string) => {
    const next = new Set(selected)
    next.has(name) ? next.delete(name) : next.add(name)
    setSelected(next)
  }

  const handleImport = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/v1/festivals/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ year, festivals: Array.from(selected) }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setResult({ imported: data.imported, skipped: data.skipped })
      onImportSuccess(data.imported)
    } catch (err: any) {
      alert(err.message)
    } finally {
      setLoading(false)
    }
  }

  const typeColors: Record<string, string> = {
    FESTIVAL: 'bg-saffron-100 text-saffron-700',
    POOJA: 'bg-blue-100 text-blue-700',
    CULTURAL: 'bg-purple-100 text-purple-700',
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="p-5 border-b border-stone-100 flex items-center justify-between">
          <div>
            <h2 className="font-heading font-bold text-stone-900">🪔 Import Hindu Festival Calendar</h2>
            <p className="text-xs text-stone-500">Auto-create events for major Hindu festivals</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-stone-100"><X className="h-5 w-5" /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {result ? (
            <div className="text-center py-8 space-y-4">
              <CheckCircle2 className="h-14 w-14 text-emerald-500 mx-auto" />
              <h3 className="font-heading text-xl font-bold">Festival Calendar Imported! 🎉</h3>
              <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto">
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center">
                  <p className="text-2xl font-black text-emerald-600">{result.imported}</p>
                  <p className="text-xs text-emerald-700 font-semibold">Events Created</p>
                </div>
                <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 text-center">
                  <p className="text-2xl font-black text-stone-500">{result.skipped}</p>
                  <p className="text-xs text-stone-500 font-semibold">Already Exists</p>
                </div>
              </div>
              <p className="text-sm text-stone-500">View them in Events → Upcoming</p>
              <Button onClick={onClose} className="gradient-primary text-white">Done</Button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <label className="text-sm font-semibold text-stone-700">Year:</label>
                  <select value={year} onChange={e => setYear(Number(e.target.value))}
                    className="border border-stone-200 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-saffron-400 focus:outline-none">
                    <option value={currentYear}>{currentYear}</option>
                    <option value={currentYear + 1}>{currentYear + 1}</option>
                  </select>
                </div>
                <button onClick={toggleAll} className="flex items-center gap-1.5 text-xs text-saffron-600 font-semibold">
                  {selected.size === festivals.length ? <CheckSquare className="h-4 w-4" /> : <Square className="h-4 w-4" />}
                  {selected.size === festivals.length ? 'Deselect All' : 'Select All'} ({selected.size}/{festivals.length})
                </button>
              </div>

              <div className="space-y-2">
                {festivals.map(f => {
                  const date = new Date(year, f.approximateMonth - 1, f.approximateDay)
                  const dateStr = date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
                  return (
                    <label key={f.name} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${selected.has(f.name) ? 'border-saffron-300 bg-saffron-50/50' : 'border-stone-100 hover:border-stone-200'}`}>
                      <input type="checkbox" checked={selected.has(f.name)} onChange={() => toggleOne(f.name)} className="accent-saffron-500 h-4 w-4 shrink-0" />
                      <span className="text-xl shrink-0">{f.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="text-sm font-semibold text-stone-900">{f.name}</p>
                          <p className="text-xs text-stone-400">{f.nameHi}</p>
                          {f.importance === 'major' && <span className="text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded font-bold">MAJOR</span>}
                        </div>
                        <p className="text-xs text-stone-500 truncate">{f.description}</p>
                      </div>
                      <div className="shrink-0 text-right">
                        <p className="text-xs font-bold text-stone-700">{dateStr}</p>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${typeColors[f.type]}`}>{f.type}</span>
                      </div>
                    </label>
                  )
                })}
              </div>
            </>
          )}
        </div>

        {!result && (
          <div className="p-4 border-t border-stone-100">
            <Button onClick={handleImport} disabled={loading || selected.size === 0} className="w-full gradient-primary text-white font-bold gap-2">
              {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Importing...</> : `🪔 Import ${selected.size} Festivals for ${year}`}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
