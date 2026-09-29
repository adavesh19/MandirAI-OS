import { requireRole } from '@/lib/dal'
import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { BuilderBlock } from '@/components/builder/plugins/types'
import EditorTabsClient from './editor-tabs-client'

export const metadata = {
  title: 'Visual Website Builder | MandirAI OS'
}

export default async function WebsiteEditorPage() {
  const { tenantId } = await requireRole(['temple_admin'])
  if (!tenantId) throw new Error('Unauthorized')

  // Fetch the temple details
  const temple = await prisma.temple.findUnique({
    where: { id: tenantId },
    select: {
      id: true,
      name: true,
      slug: true,
      primaryDeity: true,
    }
  })

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

  const slug = temple?.slug || 'demo'
  const templeName = temple?.name || 'My Temple'

  return (
    <EditorTabsClient
      templeSlug={slug}
      templeName={templeName}
      primaryDeity={temple?.primaryDeity}
      initialBlocks={initialBlocks}
    />
  )
}

