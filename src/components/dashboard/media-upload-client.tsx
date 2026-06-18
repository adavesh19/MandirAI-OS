'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import {
  UploadCloud,
  X,
  Trash2,
  Copy,
  Check,
  Image as ImageIcon,
  Video,
  Loader2,
  FolderOpen,
  Sparkles,
} from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────────────

interface UploadedMedia {
  id: string
  url: string
  title: string
  type: 'IMAGE' | 'VIDEO'
  category: string
  createdAt: string
}

interface PendingFile {
  file: File
  preview: string
  title: string
  category: string
  id: string // local temp id
}

const CATEGORIES = [
  { value: 'general', label: 'General' },
  { value: 'festival', label: 'Festival' },
  { value: 'deity', label: 'Deity' },
  { value: 'architecture', label: 'Architecture' },
  { value: 'prasad', label: 'Prasad' },
  { value: 'event', label: 'Event' },
]

const CATEGORY_COLORS: Record<string, string> = {
  general: 'bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300',
  festival: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  deity: 'bg-saffron-100 text-saffron-700 dark:bg-saffron-900/40 dark:text-saffron-300',
  architecture: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  prasad: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
  event: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function MediaUploadClient() {
  const [mediaList, setMediaList] = React.useState<UploadedMedia[]>([])
  const [pendingFiles, setPendingFiles] = React.useState<PendingFile[]>([])
  const [isDragging, setIsDragging] = React.useState(false)
  const [uploading, setUploading] = React.useState(false)
  const [uploadProgress, setUploadProgress] = React.useState(0) // 0–100
  const [loading, setLoading] = React.useState(true)
  const [copiedId, setCopiedId] = React.useState<string | null>(null)
  const [deletingId, setDeletingId] = React.useState<string | null>(null)
  const [error, setError] = React.useState<string | null>(null)

  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const dropZoneRef = React.useRef<HTMLDivElement>(null)

  // ── Fetch existing media ─────────────────────────────────────────────────
  const fetchMedia = React.useCallback(async () => {
    try {
      const res = await fetch('/api/media')
      const data = await res.json()
      if (res.ok) setMediaList(data.mediaList || [])
    } catch (err) {
      console.error('Failed to fetch media', err)
    } finally {
      setLoading(false)
    }
  }, [])

  React.useEffect(() => {
    fetchMedia()
  }, [fetchMedia])

  // ── File selection helpers ───────────────────────────────────────────────
  const addFiles = (files: FileList | File[]) => {
    const arr = Array.from(files)
    const newPending: PendingFile[] = arr
      .filter((f) => f.type.startsWith('image/') || f.type === 'video/mp4')
      .map((f) => ({
        file: f,
        preview: f.type.startsWith('image/') ? URL.createObjectURL(f) : '',
        title: f.name.replace(/\.[^/.]+$/, ''),
        category: 'general',
        id: `${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      }))
    setPendingFiles((prev) => [...prev, ...newPending])
    setError(null)
  }

  const removePending = (id: string) => {
    setPendingFiles((prev) => {
      const target = prev.find((f) => f.id === id)
      if (target?.preview) URL.revokeObjectURL(target.preview)
      return prev.filter((f) => f.id !== id)
    })
  }

  const updatePending = (id: string, field: 'title' | 'category', value: string) => {
    setPendingFiles((prev) =>
      prev.map((f) => (f.id === id ? { ...f, [field]: value } : f))
    )
  }

  // ── Drag & Drop handlers ─────────────────────────────────────────────────
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    if (!dropZoneRef.current?.contains(e.relatedTarget as Node)) {
      setIsDragging(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files.length) addFiles(e.dataTransfer.files)
  }

  // ── Upload ───────────────────────────────────────────────────────────────
  const handleUpload = async () => {
    if (!pendingFiles.length || uploading) return
    setUploading(true)
    setUploadProgress(0)
    setError(null)

    const total = pendingFiles.length
    let done = 0
    const uploaded: UploadedMedia[] = []
    const errors: string[] = []

    for (const pf of pendingFiles) {
      const formData = new FormData()
      formData.append('file', pf.file)
      formData.append('title', pf.title)
      formData.append('category', pf.category)

      try {
        const res = await fetch('/api/media/upload', {
          method: 'POST',
          body: formData,
        })
        const data = await res.json()
        if (res.ok && data.media) {
          uploaded.push(data.media as UploadedMedia)
        } else {
          errors.push(`${pf.title}: ${data.error || 'Upload failed'}`)
        }
      } catch {
        errors.push(`${pf.title}: Network error`)
      }

      done++
      setUploadProgress(Math.round((done / total) * 100))
    }

    // Cleanup previews
    pendingFiles.forEach((f) => {
      if (f.preview) URL.revokeObjectURL(f.preview)
    })
    setPendingFiles([])

    if (uploaded.length) {
      setMediaList((prev) => [...uploaded.reverse(), ...prev])
    }
    if (errors.length) {
      setError(errors.join(' • '))
    }

    setUploading(false)
    setUploadProgress(0)
  }

  // ── Copy URL ─────────────────────────────────────────────────────────────
  const handleCopyUrl = (id: string, url: string) => {
    navigator.clipboard.writeText(url)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  // ── Delete ───────────────────────────────────────────────────────────────
  const handleDelete = async (id: string) => {
    if (!confirm('Delete this media file permanently?')) return
    setDeletingId(id)
    try {
      const res = await fetch('/api/media', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
      if (res.ok) {
        setMediaList((prev) => prev.filter((m) => m.id !== id))
      } else {
        const data = await res.json()
        setError(data.error || 'Delete failed')
      }
    } catch {
      setError('Delete failed – network error')
    } finally {
      setDeletingId(null)
    }
  }

  // ── Stats ─────────────────────────────────────────────────────────────────
  const imageCount = mediaList.filter((m) => m.type === 'IMAGE').length
  const videoCount = mediaList.filter((m) => m.type === 'VIDEO').length

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="space-y-6">
      {/* ── Stats Bar ──────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {[
          { label: 'Total Files', value: mediaList.length, icon: FolderOpen, color: 'text-saffron-600' },
          { label: 'Images', value: imageCount, icon: ImageIcon, color: 'text-blue-500' },
          { label: 'Videos', value: videoCount, icon: Video, color: 'text-purple-500' },
        ].map(({ label, value, icon: Icon, color }) => (
          <div
            key={label}
            className="flex items-center gap-3 bg-white dark:bg-stone-900 border border-stone-200/60 dark:border-stone-800 rounded-xl px-4 py-3 shadow-sm"
          >
            <div className={`p-2 rounded-lg bg-stone-100 dark:bg-stone-800 ${color}`}>
              <Icon className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs text-stone-500 dark:text-stone-400">{label}</p>
              <p className="font-bold text-stone-900 dark:text-stone-100 text-lg leading-tight">{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Upload Zone ────────────────────────────────────────────────────── */}
      <div
        ref={dropZoneRef}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !pendingFiles.length && fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-2xl transition-all duration-300 cursor-pointer
          ${isDragging
            ? 'border-saffron-500 bg-saffron-50/60 dark:bg-saffron-900/10 scale-[1.01]'
            : 'border-stone-300 dark:border-stone-700 bg-stone-50/50 dark:bg-stone-900/20 hover:border-saffron-400 hover:bg-saffron-50/30 dark:hover:bg-saffron-900/5'
          }
          ${pendingFiles.length ? 'cursor-default' : ''}`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/jpeg,image/png,image/webp,image/gif,video/mp4"
          className="hidden"
          onChange={(e) => e.target.files && addFiles(e.target.files)}
        />

        {pendingFiles.length === 0 ? (
          /* Empty drop zone */
          <div className="flex flex-col items-center justify-center py-14 px-6 text-center pointer-events-none">
            <div className={`p-4 rounded-2xl mb-4 transition-all duration-300 ${isDragging ? 'bg-saffron-100 dark:bg-saffron-900/30 scale-110' : 'bg-stone-100 dark:bg-stone-800'}`}>
              <UploadCloud className={`h-10 w-10 transition-colors duration-300 ${isDragging ? 'text-saffron-500' : 'text-stone-400 dark:text-stone-500'}`} />
            </div>
            <h3 className="font-bold text-stone-700 dark:text-stone-200 text-base mb-1">
              {isDragging ? 'Release to add files' : 'Drag & drop files here'}
            </h3>
            <p className="text-sm text-stone-500 dark:text-stone-400 mb-3">
              or{' '}
              <span className="text-saffron-600 font-semibold underline underline-offset-2">
                click to browse
              </span>
            </p>
            <p className="text-xs text-stone-400 dark:text-stone-600">
              JPEG, PNG, WebP, GIF, MP4 · Max 10 MB per file
            </p>
          </div>
        ) : (
          /* Pending files list */
          <div className="p-4 space-y-3" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-semibold text-stone-700 dark:text-stone-200">
                {pendingFiles.length} file{pendingFiles.length > 1 ? 's' : ''} ready to upload
              </p>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-xs text-saffron-600 hover:text-saffron-700 font-semibold flex items-center gap-1"
              >
                <UploadCloud className="h-3.5 w-3.5" />
                Add more
              </button>
            </div>

            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {pendingFiles.map((pf) => (
                <div
                  key={pf.id}
                  className="flex gap-3 bg-white dark:bg-stone-900 border border-stone-200/60 dark:border-stone-800 rounded-xl p-3"
                >
                  {/* Preview */}
                  <div className="h-16 w-16 shrink-0 rounded-lg overflow-hidden bg-stone-100 dark:bg-stone-800 flex items-center justify-center">
                    {pf.preview ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={pf.preview} alt={pf.title} className="h-full w-full object-cover" />
                    ) : (
                      <Video className="h-6 w-6 text-stone-400" />
                    )}
                  </div>

                  {/* Meta inputs */}
                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex items-center gap-1.5">
                      <input
                        type="text"
                        value={pf.title}
                        onChange={(e) => updatePending(pf.id, 'title', e.target.value)}
                        placeholder="Title"
                        className="flex-1 text-xs px-2.5 py-1.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-saffron-400 focus:border-transparent"
                      />
                      <select
                        value={pf.category}
                        onChange={(e) => updatePending(pf.id, 'category', e.target.value)}
                        className="text-xs px-2 py-1.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-saffron-400"
                      >
                        {CATEGORIES.map((c) => (
                          <option key={c.value} value={c.value}>{c.label}</option>
                        ))}
                      </select>
                    </div>
                    <p className="text-[11px] text-stone-400 dark:text-stone-600">
                      {formatBytes(pf.file.size)} · {pf.file.type.split('/')[1]?.toUpperCase()}
                    </p>
                  </div>

                  {/* Remove */}
                  <button
                    type="button"
                    onClick={() => removePending(pf.id)}
                    className="shrink-0 p-1.5 rounded-lg text-stone-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Upload progress bar */}
            {uploading && (
              <div className="space-y-1.5 mt-2">
                <div className="flex items-center justify-between text-xs text-stone-500">
                  <span className="flex items-center gap-1.5">
                    <Loader2 className="h-3.5 w-3.5 animate-spin text-saffron-500" />
                    Uploading…
                  </span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="h-2 w-full bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-saffron-400 to-saffron-600 rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex gap-2 pt-1">
              <Button
                onClick={handleUpload}
                disabled={uploading}
                className="flex-1 bg-saffron-500 hover:bg-saffron-600 text-white rounded-xl shadow-md shadow-saffron-200 dark:shadow-none font-semibold flex items-center gap-2"
              >
                {uploading ? (
                  <><Loader2 className="h-4 w-4 animate-spin" /> Uploading…</>
                ) : (
                  <><Sparkles className="h-4 w-4" /> Upload {pendingFiles.length} File{pendingFiles.length > 1 ? 's' : ''}</>
                )}
              </Button>
              <Button
                variant="outline"
                onClick={() => setPendingFiles([])}
                disabled={uploading}
                className="rounded-xl border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* ── Error Banner ────────────────────────────────────────────────────── */}
      {error && (
        <div className="flex items-start gap-2 p-3 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 text-sm text-red-700 dark:text-red-400">
          <X className="h-4 w-4 mt-0.5 shrink-0" />
          <span>{error}</span>
          <button
            type="button"
            onClick={() => setError(null)}
            className="ml-auto shrink-0 text-red-400 hover:text-red-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* ── Media Grid ──────────────────────────────────────────────────────── */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <Loader2 className="h-8 w-8 text-saffron-500 animate-spin" />
          <p className="text-sm text-stone-500 dark:text-stone-400">Loading gallery…</p>
        </div>
      ) : mediaList.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 border border-dashed border-stone-200 dark:border-stone-800 rounded-2xl bg-stone-50/50 dark:bg-stone-950/20 text-center px-6">
          <div className="p-4 rounded-2xl bg-stone-100 dark:bg-stone-800 mb-4">
            <ImageIcon className="h-10 w-10 text-stone-300 dark:text-stone-600" />
          </div>
          <h3 className="font-bold text-stone-700 dark:text-stone-300 text-base">No media uploaded yet</h3>
          <p className="text-sm text-stone-500 dark:text-stone-400 max-w-xs mt-2">
            Drag & drop photos above or click to browse. Uploaded images will appear here in your gallery.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {mediaList.map((media) => (
            <MediaCard
              key={media.id}
              media={media}
              copiedId={copiedId}
              deletingId={deletingId}
              onCopy={handleCopyUrl}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Media Card Sub-Component ─────────────────────────────────────────────────

function MediaCard({
  media,
  copiedId,
  deletingId,
  onCopy,
  onDelete,
}: {
  media: UploadedMedia
  copiedId: string | null
  deletingId: string | null
  onCopy: (id: string, url: string) => void
  onDelete: (id: string) => void
}) {
  const categoryColor = CATEGORY_COLORS[media.category] || CATEGORY_COLORS.general

  return (
    <div className="group relative flex flex-col bg-white dark:bg-stone-900 border border-stone-200/60 dark:border-stone-800 rounded-2xl overflow-hidden hover:shadow-lg hover:shadow-saffron-100/50 dark:hover:shadow-stone-900 hover:border-saffron-300 dark:hover:border-saffron-700 transition-all duration-300">
      {/* Thumbnail */}
      <div className="aspect-[4/3] relative w-full overflow-hidden bg-stone-100 dark:bg-stone-800">
        {media.type === 'VIDEO' ? (
          <div className="w-full h-full flex items-center justify-center">
            <Video className="h-10 w-10 text-stone-400" />
          </div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={media.url}
            alt={media.title || 'Media'}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        )}

        {/* Category badge */}
        <span
          className={`absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full ${categoryColor}`}
        >
          {media.category}
        </span>

        {/* Delete button - appears on hover */}
        <button
          type="button"
          onClick={() => onDelete(media.id)}
          disabled={deletingId === media.id}
          className="absolute top-2 right-2 p-1.5 rounded-lg bg-white/90 dark:bg-stone-900/90 text-red-500 hover:bg-red-500 hover:text-white shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-200 disabled:opacity-50"
        >
          {deletingId === media.id ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Trash2 className="h-3.5 w-3.5" />
          )}
        </button>
      </div>

      {/* Info */}
      <div className="p-3 flex flex-col gap-2">
        <p
          className="text-xs font-semibold text-stone-800 dark:text-stone-200 truncate leading-tight"
          title={media.title || 'Untitled'}
        >
          {media.title || 'Untitled'}
        </p>

        {/* Actions */}
        <button
          type="button"
          onClick={() => onCopy(media.id, media.url)}
          className={`w-full h-8 text-xs font-semibold rounded-lg border flex items-center justify-center gap-1.5 transition-all duration-200
            ${copiedId === media.id
              ? 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800'
              : 'border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:border-saffron-300 hover:text-saffron-600 hover:bg-saffron-50 dark:hover:bg-saffron-900/10'
            }`}
        >
          {copiedId === media.id ? (
            <><Check className="h-3.5 w-3.5" /> Copied!</>
          ) : (
            <><Copy className="h-3.5 w-3.5" /> Copy URL</>
          )}
        </button>
      </div>
    </div>
  )
}
