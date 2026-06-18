import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'
import prisma from '@/lib/prisma'

const SYSTEM_PROMPT = `You are MandirAI Assistant — an intelligent temple management co-pilot for Hindu temples in India.

You help temple administrators with:
- Answering questions about their temple data (donations, devotees, events, sevas)
- Generating devotional content in multiple languages (English, Hindi, Kannada, Tamil, Telugu)
- Creating WhatsApp messages for devotees
- Writing festival announcements
- Explaining temple management best practices
- Giving guidance on 80G receipts, GST exemptions for trusts
- Suggesting amounts for sevas and donation categories

Always respond in a warm, respectful, devotional tone. Use Sanskrit terms appropriately (e.g., Shubh, Namaste, Jai, Prasad, Darshan, Seva, Dana).
For Indian amounts, use Indian number format (₹1,00,000 not ₹100,000).
Keep responses concise and actionable. When suggesting WhatsApp messages, format them with emojis and line breaks.`

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { message, templeId, history = [] } = body

    if (!message) {
      return NextResponse.json({ error: 'message is required' }, { status: 400 })
    }

    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: 'AI not configured' }, { status: 500 })
    }

    // Fetch basic context if templeId provided
    let contextInfo = ''
    if (templeId) {
      try {
        const [temple, recentDonations, upcomingEvents, activeSevas, devoteeCount] = await Promise.all([
          prisma.temple.findUnique({
            where: { id: templeId },
            select: { name: true, primaryDeity: true, upiId: true, contactPhone: true },
          }),
          prisma.donation.aggregate({
            where: { templeId, paymentStatus: 'COMPLETED' },
            _sum: { amount: true },
            _count: true,
          }),
          prisma.event.findMany({
            where: { templeId, startDate: { gte: new Date() } },
            take: 3,
            select: { title: true, startDate: true },
          }),
          prisma.seva.findMany({
            where: { templeId, isActive: true },
            take: 5,
            select: { name: true, price: true },
          }),
          prisma.devotee.count({ where: { templeId } }),
        ])

        if (temple) {
          contextInfo = `
[TEMPLE CONTEXT]
Temple: ${temple.name}
Deity: ${temple.primaryDeity || 'Not specified'}
Total Donations: ₹${Number(recentDonations._sum.amount || 0).toLocaleString('en-IN')}
Total Transactions: ${recentDonations._count}
Devotees in CRM: ${devoteeCount}
Upcoming Events: ${upcomingEvents.map(e => (typeof e.title === 'object' ? (e.title as any).en : e.title) + ' on ' + new Date(e.startDate).toLocaleDateString('en-IN')).join(', ') || 'None'}
Active Sevas: ${activeSevas.map(s => ((s.name as any)?.en || 'Seva') + ' (₹' + Number(s.price).toLocaleString('en-IN') + ')').join(', ') || 'None'}
`
        }
      } catch (err) {
        console.warn('[copilot] Could not fetch context:', err)
      }
    }

    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

    const chat = model.startChat({
      history: [
        {
          role: 'user',
          parts: [{ text: SYSTEM_PROMPT + (contextInfo ? '\n' + contextInfo : '') }],
        },
        {
          role: 'model',
          parts: [{ text: 'Namaste! I am your MandirAI Assistant. I have access to your temple data and am ready to help. How can I serve you today? 🙏' }],
        },
        ...history.map((h: { role: string; content: string }) => ({
          role: h.role === 'user' ? 'user' : 'model',
          parts: [{ text: h.content }],
        })),
      ],
      generationConfig: { maxOutputTokens: 1024, temperature: 0.7 },
    })

    const result = await chat.sendMessage(message)
    const response = result.response.text()

    return NextResponse.json({ success: true, response })
  } catch (error: any) {
    console.error('[copilot]', error)
    return NextResponse.json({ error: error.message || 'AI error' }, { status: 500 })
  }
}
