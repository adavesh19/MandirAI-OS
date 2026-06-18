'use client'

import * as React from 'react'
import { X, Upload, Download, AlertCircle, CheckCircle2, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Papa from 'papaparse'

interface CsvImportModalProps {
  onClose: () => void
  onImportSuccess: (count: number) => void
}

const SAMPLE_CSV = `Full Name,Phone,Email,Address,Gotra,Tags
Rama Sharma,9876543210,rama@email.com,Bengaluru,Kashyap,"devotee,donor"
Sita Devi,9123456789,,Chennai,Bharadwaj,devotee
Krishna Kumar,9988776655,krishna@gmail.com,Mumbai,,donor`

export default function CsvImportModal({ onClose, onImportSuccess }: CsvImportModalProps) {
  const [parsed, setParsed] = React.useState<Record<string, string>[]>([])
  const [errors, setErrors] = React.useState<string[]>([])
  const [importing, setImporting] = React.useState(false)
  const [result, setResult] = React.useState<{ imported: number; skipped: number } | null>(null)
  const [isDragging, setIsDragging] = React.useState(false)
  const fileRef = React.useRef<HTMLInputElement>(null)

  const processFile = (file: File) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const rows = results.data as Record<string, string>[]
        setParsed(rows)
        const errs = rows.map((r, i) => (!r['Full Name'] || !r['Phone']) ? `Row ${i + 2}: Name and Phone required` : '').filter(Boolean)
        setErrors(errs)
      },
      error: (err) => setErrors([err.message]),
    })
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) processFile(file)
  }

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) processFile(file)
  }

  const downloadSample = () => {
    const blob = new Blob([SAMPLE_CSV], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href = url; a.download = 'devotees-sample.csv'; a.click()
  }

  const handleImport = async () => {
    const valid = parsed.filter(r => r['Full Name'] && r['Phone'])
    if (!valid.length) return
    setImporting(true)
    try {
      const res = await fetch('/api/v1/devotees/bulk-import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          devotees: valid.map(r => ({
            fullName: r['Full Name'],
            phone: r['Phone'],
            email: r['Email'] || null,
            address: r['Address'] || null,
            gotra: r['Gotra'] || null,
            tags: r['Tags'] || null,
          })),
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setResult({ imported: data.imported, skipped: data.skipped })
      onImportSuccess(data.imported)
    } catch (err: any) {
      setErrors([err.message])
    } finally {
      setImporting(false)
    }
  }

  const validRows = parsed.filter(r => r['Full Name'] && r['Phone'])

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="p-5 border-b border-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-blue-100 flex items-center justify-center">
              <Upload className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h2 className="font-heading font-bold text-stone-900">Import Devotees from CSV</h2>
              <p className="text-xs text-stone-500">Upload up to 500 devotees at once</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-stone-100"><X className="h-5 w-5" /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {result ? (
            <div className="text-center py-8 space-y-4">
              <CheckCircle2 className="h-14 w-14 text-emerald-500 mx-auto" />
              <h3 className="font-heading text-xl font-bold text-stone-900">Import Complete! 🎉</h3>
              <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto">
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center">
                  <p className="text-2xl font-black text-emerald-600">{result.imported}</p>
                  <p className="text-xs text-emerald-700 font-semibold">Imported</p>
                </div>
                <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 text-center">
                  <p className="text-2xl font-black text-stone-500">{result.skipped}</p>
                  <p className="text-xs text-stone-500 font-semibold">Skipped</p>
                </div>
              </div>
              <Button onClick={onClose} className="gradient-primary text-white">Done</Button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-stone-700">Expected Format</p>
                <button onClick={downloadSample} className="flex items-center gap-1.5 text-xs text-saffron-600 font-semibold hover:underline">
                  <Download className="h-3.5 w-3.5" /> Download Sample CSV
                </button>
              </div>
              <div className="bg-stone-900 rounded-xl p-3 font-mono text-xs text-green-400 overflow-x-auto">
                <pre>{SAMPLE_CSV}</pre>
              </div>

              {/* Drop zone */}
              <div
                onDragOver={e => { e.preventDefault(); setIsDragging(true) }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${isDragging ? 'border-saffron-400 bg-saffron-50' : 'border-stone-300 hover:border-saffron-300 hover:bg-stone-50'}`}
              >
                <FileText className="h-8 w-8 text-stone-400 mx-auto mb-2" />
                <p className="text-sm font-semibold text-stone-700">Drop your CSV file here</p>
                <p className="text-xs text-stone-400 mt-1">or click to browse</p>
                <input ref={fileRef} type="file" accept=".csv" onChange={handleFile} className="hidden" />
              </div>

              {errors.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-3 space-y-1">
                  <div className="flex items-center gap-2 text-red-700 font-semibold text-sm"><AlertCircle className="h-4 w-4" /> {errors.length} validation errors</div>
                  {errors.slice(0, 5).map((e, i) => <p key={i} className="text-xs text-red-600 pl-6">{e}</p>)}
                </div>
              )}

              {parsed.length > 0 && (
                <div>
                  <p className="text-sm font-semibold text-stone-700 mb-2">Preview ({parsed.length} rows — {validRows.length} valid)</p>
                  <div className="overflow-x-auto border border-stone-100 rounded-xl">
                    <table className="w-full text-xs">
                      <thead className="bg-stone-50"><tr>
                        <th className="text-left px-3 py-2 font-semibold text-stone-500">Name</th>
                        <th className="text-left px-3 py-2 font-semibold text-stone-500">Phone</th>
                        <th className="text-left px-3 py-2 font-semibold text-stone-500">Email</th>
                        <th className="text-left px-3 py-2 font-semibold text-stone-500">Status</th>
                      </tr></thead>
                      <tbody>{parsed.slice(0, 10).map((r, i) => {
                        const valid = !!(r['Full Name'] && r['Phone'])
                        return (
                          <tr key={i} className={`border-t border-stone-50 ${!valid ? 'bg-red-50' : ''}`}>
                            <td className="px-3 py-2 font-medium">{r['Full Name'] || <span className="text-red-500">Missing</span>}</td>
                            <td className="px-3 py-2">{r['Phone'] || <span className="text-red-500">Missing</span>}</td>
                            <td className="px-3 py-2 text-stone-400">{r['Email'] || '—'}</td>
                            <td className="px-3 py-2">{valid ? <span className="text-emerald-600 font-semibold">✓</span> : <span className="text-red-500 font-semibold">✗</span>}</td>
                          </tr>
                        )
                      })}</tbody>
                    </table>
                    {parsed.length > 10 && <p className="text-xs text-stone-400 text-center py-2">+{parsed.length - 10} more rows</p>}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {!result && parsed.length > 0 && (
          <div className="p-4 border-t border-stone-100">
            <Button onClick={handleImport} disabled={importing || validRows.length === 0} className="w-full gradient-primary text-white font-bold">
              {importing ? 'Importing...' : `Import ${validRows.length} Devotees`}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
