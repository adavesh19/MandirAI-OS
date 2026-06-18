import * as React from 'react'
import { notFound } from 'next/navigation'
import prisma from '@/lib/prisma'
import DonateClient from '@/components/temple/donate-client'

interface PageProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ campaignId?: string }>
}

export default async function DonatePage(props: PageProps) {
  const { slug } = await props.params
  const searchParams = await props.searchParams

  const temple = await prisma.temple.findUnique({
    where: { slug, isPublished: true },
    select: {
      id: true,
      name: true,
      slug: true,
      upiId: true,
      contactPhone: true,
      bankDetails: true,
      logoUrl: true,
      themeConfig: true,
    },
  })

  if (!temple) notFound()

  let activeCampaign = null
  if (searchParams.campaignId) {
    activeCampaign = await prisma.campaign.findUnique({
      where: { id: searchParams.campaignId, templeId: temple.id },
    })
  } else {
    activeCampaign = await prisma.campaign.findFirst({
      where: { templeId: temple.id, isActive: true },
      orderBy: { createdAt: 'desc' },
    })
  }

  const categories = await prisma.donationCategory.findMany({
    where: { templeId: temple.id, isActive: true },
    orderBy: { sortOrder: 'asc' },
    select: { id: true, name: true, description: true, suggestedAmounts: true },
  })

  const isRazorpayEnabled = !!(
    process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET
  )

  const serializedTemple = {
    id: temple.id,
    name: temple.name,
    slug: temple.slug,
    upiId: temple.upiId ?? null,
    contactPhone: temple.contactPhone ?? null,
    bankDetails: temple.bankDetails as Record<string, string> | null,
    logoUrl: temple.logoUrl ?? null,
  }

  const serializedCategories = categories.map((c) => ({
    id: c.id,
    name: c.name,
    description: c.description ?? '',
    suggestedAmounts: (c.suggestedAmounts as number[]) ?? [],
  }))

  const serializedCampaign = activeCampaign
    ? {
        id: activeCampaign.id,
        title: activeCampaign.title,
        description: activeCampaign.description,
        targetAmount: Number(activeCampaign.targetAmount),
        currentAmount: Number(activeCampaign.currentAmount),
        endDate: activeCampaign.endDate?.toISOString() ?? null,
        isActive: activeCampaign.isActive,
      }
    : null

  const themeConfig = (temple.themeConfig as any) || {}
  const templateId = themeConfig.templateId || 'classic'

  return (
    <DonateClient
      temple={serializedTemple}
      categories={serializedCategories}
      campaign={serializedCampaign}
      isRazorpayEnabled={isRazorpayEnabled}
      templateId={templateId}
    />
  )
}
