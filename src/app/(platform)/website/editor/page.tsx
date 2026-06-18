import { requireRole } from '@/lib/dal'
import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'
import DragDropEditor from '@/components/builder/DragDropEditor'
import { BuilderBlock } from '@/components/builder/plugins/types'

export const metadata = {
  title: 'Website Builder | MandirAI OS'
}

export default async function WebsiteEditorPage() {
  const { tenantId } = await requireRole(['temple_admin'])
  if (!tenantId) throw new Error('Unauthorized')

  // Fetch the main Home page for this temple
  let page = await prisma.templePage.findFirst({
    where: { templeId: tenantId, pageType: 'HOME' }
  })

  // Parse the saved blocks from the database
  let initialBlocks: BuilderBlock[] = []
  if (page && page.content) {
    try {
      initialBlocks = (page.content as any).blocks || []
    } catch (e) {
      console.error("Failed to parse blocks", e)
    }
  }

  return (
    <div className="w-full">
      <div className="bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-stone-900 dark:text-white">Visual Website Builder</h1>
        <div className="text-sm text-stone-500">Auto-saving enabled</div>
      </div>
      <DragDropEditor initialBlocks={initialBlocks} />
    </div>
  )
}
