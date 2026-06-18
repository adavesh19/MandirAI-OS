import { requireRole } from '@/lib/dal'
import prisma from '@/lib/prisma'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Images } from 'lucide-react'
import MediaUploadClient from '@/components/dashboard/media-upload-client'

export const dynamic = 'force-dynamic'

export default async function MediaManagerPage() {
  const { tenantId } = await requireRole(['temple_admin', 'staff'])

  // Server-side stats fetch
  const [imageCount, videoCount] = await Promise.all([
    prisma.media.count({ where: { templeId: tenantId, type: 'IMAGE' } }),
    prisma.media.count({ where: { templeId: tenantId, type: 'VIDEO' } }),
  ])

  const totalCount = imageCount + videoCount

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* ── Page Header ─────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-stone-900 border border-stone-200/50 dark:border-stone-800 p-6 rounded-2xl shadow-sm">
        <div className="flex items-center gap-4">
          <Link href="/website">
            <Button
              variant="outline"
              size="icon"
              className="rounded-xl h-10 w-10 border-stone-200 dark:border-stone-700 shrink-0"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-saffron-100 dark:bg-saffron-900/30 rounded-xl">
                <Images className="h-5 w-5 text-saffron-600 dark:text-saffron-400" />
              </div>
              <h1 className="font-heading text-2xl font-bold text-stone-900 dark:text-stone-100">
                Media Gallery
              </h1>
            </div>
            <p className="text-sm text-stone-500 dark:text-stone-400 mt-1 ml-0.5">
              Upload &amp; manage photos for your temple website and announcements.
              {totalCount > 0 && (
                <span className="ml-2 font-medium text-saffron-600 dark:text-saffron-400">
                  {totalCount} file{totalCount !== 1 ? 's' : ''} stored
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Quick‑tip badge */}
        <div className="hidden sm:flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400 bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700 rounded-xl px-3 py-2 max-w-xs">
          <span className="text-saffron-500">💡</span>
          Copy image URLs and paste them into the AI Builder to use in your website.
        </div>
      </div>

      {/* ── Media Upload Client (interactive) ───────────────────────────── */}
      <MediaUploadClient />
    </div>
  )
}
