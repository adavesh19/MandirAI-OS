import { NextRequest, NextResponse } from 'next/server'
import { requireRole } from '@/lib/dal'
import { GoogleGenerativeAI } from '@google/generative-ai'

export async function POST(request: NextRequest) {
  try {
    await requireRole(['temple_admin', 'staff'])
    const { context, platform, language } = await request.json()

    if (!context || !platform) return NextResponse.json({ error: 'Missing context or platform' }, { status: 400 })
    if (!process.env.GEMINI_API_KEY) return NextResponse.json({ error: 'Gemini API not configured' }, { status: 500 })

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })
    
    const prompt = `Write an engaging social media post for a Hindu Temple.
Context/Event Details: ${context}
Platform: ${platform} (tailor length, tone, and hashtags specifically for this platform)
Language: ${language || 'English'}

Instructions:
- Include culturally appropriate greetings (e.g. Jai Shree Ram, Namaste 🙏).
- Keep it engaging, warm, and inviting.
- Include relevant emojis.
- Provide ONLY the post text, no conversational filler or intro/outro text. Just the exact text ready to be copy-pasted.`

    const result = await model.generateContent(prompt)
    const post = result.response.text()

    return NextResponse.json({ success: true, post })
  } catch (error: any) {
    console.error('[ai-social-post]', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
