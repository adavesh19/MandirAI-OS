'use server'

import prisma from '@/lib/prisma'
import { requireRole } from '@/lib/dal'
import { PaymentMethod, PaymentStatus, EventType, EventStatus, SubscriptionPlanType } from '@prisma/client'
import { revalidatePath } from 'next/cache'

// 1. Manually record walk-in donations (Cash, Cheque, UPI, Bank Transfer)
export async function createManualDonation(formData: {
  amount: number
  categoryId: string
  devoteeId?: string
  donorName?: string
  donorPhone?: string
  donorPan?: string
  isAnonymous: boolean
  paymentMethod: string
  transactionRef?: string
  notes?: string
}) {
  const { user, tenantId } = await requireRole(['temple_admin', 'staff'])
  if (!tenantId) {
    return { success: false, error: 'Access denied: Workspace not initialized.' }
  }

  const {
    amount,
    categoryId,
    devoteeId,
    donorName,
    donorPhone,
    donorPan,
    isAnonymous,
    paymentMethod,
    transactionRef,
    notes,
  } = formData

  if (!amount || amount <= 0 || !categoryId || !paymentMethod) {
    return { success: false, error: 'Invalid donation parameters.' }
  }

  try {
    const result = await prisma.$transaction(async (tx) => {
      let activeDevoteeId = devoteeId || null

      // If not anonymous and no devotee profile is selected, try to link by phone
      if (!isAnonymous && !activeDevoteeId && donorPhone) {
        const existingDevotee = await tx.devotee.findFirst({
          where: {
            templeId: tenantId,
            phone: donorPhone,
          },
        })

        if (existingDevotee) {
          activeDevoteeId = existingDevotee.id
          // Increment total contributions
          const newTotal = Number(existingDevotee.totalDonated) + amount
          await tx.devotee.update({
            where: { id: existingDevotee.id },
            data: {
              totalDonated: newTotal,
              visitCount: existingDevotee.visitCount + 1,
              lastVisitAt: new Date(),
            },
          })
        } else {
          // Create new Devotee profile
          const newDevotee = await tx.devotee.create({
            data: {
              templeId: tenantId,
              fullName: donorName || 'Devotee',
              phone: donorPhone,
              totalDonated: amount,
              visitCount: 1,
              lastVisitAt: new Date(),
            },
          })
          activeDevoteeId = newDevotee.id
        }
      } else if (activeDevoteeId) {
        // Devotee explicitly selected, update totals
        const existingDevotee = await tx.devotee.findUnique({
          where: { id: activeDevoteeId },
        })
        if (existingDevotee) {
          const newTotal = Number(existingDevotee.totalDonated) + amount
          await tx.devotee.update({
            where: { id: activeDevoteeId },
            data: {
              totalDonated: newTotal,
              visitCount: existingDevotee.visitCount + 1,
              lastVisitAt: new Date(),
            },
          })
        }
      }

      // Create donation entry (completed directly for offline methods)
      const donation = await tx.donation.create({
        data: {
          templeId: tenantId,
          categoryId,
          devoteeId: activeDevoteeId,
          amount,
          currency: 'INR',
          paymentMethod: paymentMethod as PaymentMethod,
          paymentStatus: PaymentStatus.COMPLETED,
          transactionRef,
          isAnonymous: !!isAnonymous,
          donorName: isAnonymous ? 'Anonymous' : (donorName || 'Devotee'),
          donorPhone: isAnonymous ? null : donorPhone,
          donorPan: isAnonymous ? null : donorPan,
          notes,
          createdBy: user.id,
        },
      })

      // Generate sequential receipt
      const year = new Date().getFullYear()
      const count = await tx.receipt.count({
        where: {
          templeId: tenantId,
          createdAt: {
            gte: new Date(`${year}-01-01T00:00:00Z`),
            lt: new Date(`${year + 1}-01-01T00:00:00Z`),
          },
        },
      })
      const seqNumber = String(count + 1).padStart(5, '0')
      const receiptNumber = `REC-${year}-${seqNumber}`

      // Create receipt entry
      const receipt = await tx.receipt.create({
        data: {
          templeId: tenantId,
          donationId: donation.id,
          receiptNumber,
        },
      })

      const pdfUrl = `/api/v1/receipts/${receipt.id}/pdf`
      await tx.receipt.update({
        where: { id: receipt.id },
        data: { pdfUrl },
      })

      return { donationId: donation.id, receiptNumber, pdfUrl }
    })

    revalidatePath('/donations')
    revalidatePath('/dashboard')
    revalidatePath('/analytics')
    return { success: true, ...result }
  } catch (error: any) {
    console.error('Failed to create manual donation:', error)
    return { success: false, error: error?.message || 'Transaction failed.' }
  }
}

// 2. Add or update Devotee CRM profile
export async function upsertDevotee(formData: {
  id?: string
  fullName: string
  phone?: string
  email?: string
  dateOfBirth?: string
  anniversary?: string
  gotra?: string
  nakshatra?: string
  notes?: string
  address?: {
    line1: string
    city: string
    state: string
    pincode: string
  }
}) {
  const { tenantId } = await requireRole(['temple_admin', 'staff'])
  if (!tenantId) {
    return { success: false, error: 'Access denied.' }
  }

  const {
    id,
    fullName,
    phone,
    email,
    dateOfBirth,
    anniversary,
    gotra,
    nakshatra,
    notes,
    address,
  } = formData

  if (!fullName) {
    return { success: false, error: 'Devotee name is required.' }
  }

  try {
    const dataPayload = {
      fullName,
      phone: phone || null,
      email: email || null,
      dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
      anniversary: anniversary ? new Date(anniversary) : null,
      gotra: gotra || null,
      nakshatra: nakshatra || null,
      notes: notes || null,
      address: address || {},
    }

    if (id) {
      // Update devotee
      await prisma.devotee.update({
        where: { id, templeId: tenantId },
        data: dataPayload,
      })
    } else {
      // Create devotee
      await prisma.devotee.create({
        data: {
          templeId: tenantId,
          ...dataPayload,
        },
      })
    }

    revalidatePath('/devotees')
    revalidatePath('/dashboard')
    return { success: true }
  } catch (error: any) {
    console.error('Failed to save devotee profile:', error)
    return { success: false, error: error?.message || 'Failed to save devotee.' }
  }
}

// 3. Create Seva offering or festival Event
export async function createSevaOrEvent(params: {
  type: 'seva' | 'event'
  sevaData?: {
    name: string
    description?: string
    price: number
    durationMinutes: number
  }
  eventData?: {
    title: string
    description?: string
    eventType: string
    startDate: string
    endDate: string
    location?: string
    maxRegistrations?: number
    isFree: boolean
    ticketPrice?: number
  }
}) {
  const { tenantId } = await requireRole(['temple_admin', 'staff'])
  if (!tenantId) {
    return { success: false, error: 'Access denied.' }
  }

  const { type, sevaData, eventData } = params

  try {
    if (type === 'seva' && sevaData) {
      const { name, description, price, durationMinutes } = sevaData
      await prisma.seva.create({
        data: {
          templeId: tenantId,
          name: { en: name },
          description: description ? { en: description } : {},
          price: Number(price),
          durationMinutes: Number(durationMinutes),
          isActive: true,
        },
      })
      revalidatePath('/events')
      return { success: true }
    } else if (type === 'event' && eventData) {
      const {
        title,
        description,
        eventType,
        startDate,
        endDate,
        location,
        maxRegistrations,
        isFree,
        ticketPrice,
      } = eventData

      await prisma.event.create({
        data: {
          templeId: tenantId,
          title: { en: title },
          description: description ? { en: description } : {},
          eventType: eventType as EventType,
          startDate: new Date(startDate),
          endDate: new Date(endDate),
          location,
          maxRegistrations: maxRegistrations ? Number(maxRegistrations) : null,
          isFree: !!isFree,
          ticketPrice: ticketPrice ? Number(ticketPrice) : null,
          status: EventStatus.PUBLISHED,
        },
      })
      revalidatePath('/events')
      return { success: true }
    } else {
      return { success: false, error: 'Invalid parameters provided.' }
    }
  } catch (error: any) {
    console.error('Failed to configure seva/event:', error)
    return { success: false, error: error?.message || 'Failed to create record.' }
  }
}

// 4. AI Chat Assistant for Temple Operations
export async function askGeminiAssistant(prompt: string) {
  const { tenantId } = await requireRole(['temple_admin', 'staff', 'super_admin'])
  if (!tenantId) {
    return { success: false, error: 'Access denied: No active temple workspace found.' }
  }

  try {
    // Fetch temple profile with related items to form context
    const temple = await prisma.temple.findUnique({
      where: { id: tenantId },
      include: {
        sevas: {
          where: { isActive: true },
          take: 10,
        },
        events: {
          where: { status: 'PUBLISHED' },
          take: 5,
        },
      },
    })

    if (!temple) {
      return { success: false, error: 'Temple profile details not found.' }
    }

    // Fetch aggregate statistics
    const devoteesCount = await prisma.devotee.count({
      where: { templeId: tenantId },
    })

    const donationsAggregate = await prisma.donation.aggregate({
      where: { templeId: tenantId, paymentStatus: 'COMPLETED' },
      _sum: { amount: true },
    })

    const totalCollected = Number(donationsAggregate._sum.amount || 0)

    // Build the AI System context
    const context = `You are a helpful and spiritual AI Assistant for the temple administration dashboard of "${temple.name}".
Primary deity worshipped: ${temple.primaryDeity || 'N/A'}.
Temple tradition/type: ${temple.templeType || 'N/A'}.
Timings: Morning: ${JSON.stringify(temple.timings || {})}.
Address: ${JSON.stringify(temple.address || {})}.
Contact Info: Phone: ${temple.contactPhone || 'N/A'}, Email: ${temple.contactEmail || 'N/A'}.

Platform Statistics for this Temple:
- Total Devotees in Directory: ${devoteesCount}
- Total Completed Donations: ₹${totalCollected.toLocaleString('en-IN')}
- Active Sevas/Pujas: ${temple.sevas.map(s => `${(s.name as any)?.en || ''} (₹${s.price})`).join(', ') || 'None'}
- Upcoming Festivals/Events: ${temple.events.map(e => `${(e.title as any)?.en || ''} (${new Date(e.startDate).toLocaleDateString()})`).join(', ') || 'None'}

Instructions:
1. Provide professional, respectful, and helpful answers for temple admins and staff.
2. Answer queries regarding managing sevas, devotees, donation metrics, or settings based on the stats above.
3. Suggest helpful administrative ideas (e.g. how to improve donor engagement, manage rush during festivals, schedule poojas).
4. Keep the tone warm, welcoming, and culturally respectful. Keep answers concise.`

    const apiKey = process.env.GEMINI_API_KEY

    if (!apiKey || apiKey === 'your_gemini_api_key') {
      return {
        success: true,
        response: `[Development mode - Mock Response] Namaste! I am the AI Assistant for ${temple.name}. The temple has ${devoteesCount} registered devotees and has collected ₹${totalCollected.toLocaleString('en-IN')} in donations. Available sevas: ${temple.sevas.map(s => (s.name as any)?.en || '').join(', ') || 'None'}. (To enable full AI, please set GEMINI_API_KEY in your env settings).`,
      }
    }

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: `${context}\n\nUser Question: ${prompt}` }],
            },
          ],
        }),
      }
    )

    if (!res.ok) {
      throw new Error(`Gemini API returned status ${res.status}`)
    }

    const data = await res.json()
    const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response generated.'

    return { success: true, response: responseText }
  } catch (error: any) {
    console.error('Gemini Assistant Server Action failed:', error)
    return { success: false, error: error?.message || 'Failed to process AI assistant query.' }
  }
}

// 5. Super Admin - Toggle Temple Account Activation
export async function updateTempleStatus(templeId: string, isActive: boolean) {
  const { role } = await requireRole(['super_admin'])
  if (role !== 'super_admin') {
    return { success: false, error: 'Unauthorized: Super Admin access required.' }
  }

  if (!templeId) {
    return { success: false, error: 'Missing temple identity.' }
  }

  try {
    await prisma.temple.update({
      where: { id: templeId },
      data: { isActive },
    })

    revalidatePath('/super-admin/overview')
    revalidatePath('/super-admin/temples')
    return { success: true }
  } catch (error: any) {
    console.error('Super Admin failed to update temple status:', error)
    return { success: false, error: error?.message || 'Database update failed.' }
  }
}

// 6. Super Admin - Modify Temple Subscription Plan
export async function updateTemplePlan(
  templeId: string,
  plan: SubscriptionPlanType
) {
  const { role } = await requireRole(['super_admin'])
  if (role !== 'super_admin') {
    return { success: false, error: 'Unauthorized: Super Admin access required.' }
  }

  if (!templeId || !plan) {
    return { success: false, error: 'Missing temple identity or target plan.' }
  }

  try {
    await prisma.temple.update({
      where: { id: templeId },
      data: { subscriptionPlan: plan },
    })

    revalidatePath('/super-admin/overview')
    return { success: true }
  } catch (error: any) {
    console.error('Super Admin failed to update temple plan:', error)
    return { success: false, error: error?.message || 'Database update failed.' }
  }
}


