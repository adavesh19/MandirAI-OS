import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { GoogleGenAI } from '@google/genai'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { message, templeSlug } = body

    if (!message || !templeSlug) {
      return NextResponse.json({ reply: 'I am unable to process that right now.' }, { status: 400 })
    }

    const temple = await prisma.temple.findUnique({
      where: { slug: templeSlug },
      select: { name: true, timings: true, address: true, templeType: true }
    })

    if (!temple) {
      return NextResponse.json({ reply: 'Temple not found in our neural network.' }, { status: 404 })
    }

    // Initialize Gemini AI (Using free tier gemini-2.5-flash)
    // Needs process.env.GEMINI_API_KEY
    if (!process.env.GEMINI_API_KEY) {
      console.warn("GEMINI_API_KEY not found. Falling back to simulated AI.")
      return generateSimulatedResponse(message, temple)
    }

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })
      
      const systemPrompt = `You are a highly respectful, knowledgeable, and helpful AI assistant for a Hindu temple named ${temple.name}.
Temple Type: ${temple.templeType}
Address: ${JSON.stringify(temple.address)}
Timings: ${JSON.stringify(temple.timings)}

Rules:
1. Always be polite, spiritual, and welcoming. Use greetings like "Namaskaram" or "Hari Om".
2. Answer queries based ONLY on the provided temple details.
3. If they ask to book a seva or make a donation, direct them to '/temple/${templeSlug}/sevas' or '/temple/${templeSlug}/donate'.
4. Keep your responses concise (2-3 sentences max).`

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          { role: 'user', parts: [{ text: systemPrompt + '\n\nUser Query: ' + message }] }
        ]
      })

      const replyText = response.text || "I am currently meditating and cannot answer right now."
      return NextResponse.json({ reply: replyText })
    } catch (aiError: any) {
      console.error('Gemini API Error:', aiError)
      return generateSimulatedResponse(message, temple)
    }

  } catch (error) {
    console.error('Devotee Copilot Error:', error)
    return NextResponse.json({ reply: 'System error. Temporal disruption detected.' }, { status: 500 })
  }
}

// Fallback logic for when API key is missing
function generateSimulatedResponse(message: string, temple: any) {
  const msgLower = message.toLowerCase()

  if (msgLower.includes('book') || msgLower.includes('seva') || msgLower.includes('archana') || msgLower.includes('pooja')) {
    return NextResponse.json({ reply: `Namaskaram! I can certainly help you book a Seva at ${temple.name}. Please navigate to our [Sevas & Offerings](/temple/${temple.slug}/sevas) portal.` })
  }
  if (msgLower.includes('time') || msgLower.includes('timings') || msgLower.includes('open')) {
    return NextResponse.json({ reply: `Namaskaram. The divine portals of ${temple.name} are operating on standard timings. Morning: ${temple.timings?.morning_open || '6:00 AM'}. You can view the full schedule on our About Us page.` })
  }
  return NextResponse.json({ reply: `May the divine bless you. I am the AI assistant for ${temple.name}. How may I help you today?` })
}
