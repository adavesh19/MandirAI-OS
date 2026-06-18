import { NextRequest, NextResponse } from 'next/server'
import { getAuthUser } from '@/lib/dal'

export async function POST(request: NextRequest) {
  const user = await getAuthUser()
  if (!user || !user.app_metadata?.tenant_id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { text, block, type = 'translate' } = await request.json()
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: 'Gemini API key is missing' }, { status: 500 })
    }

    let prompt = ''
    if (type === 'translate') {
      prompt = `You are a translator for Hindu temple content. Translate the following text into English ("en"), Hindi ("hi"), Kannada ("kn"), Tamil ("ta"), and Telugu ("te").
Text to translate: "${text}"

Respond with ONLY a JSON object matching this schema:
{
  "en": "...",
  "hi": "...",
  "kn": "...",
  "ta": "...",
  "te": "..."
}`
    } else if (type === 'enhance') {
      prompt = `You are an expert devotional copywriter and translator for Hindu temples.
Your task is to take the following text and rewrite it to sound extremely elegant, Sanskritized, devotional, and poetic.
Provide the rewritten version translated into English ("en"), Hindi ("hi"), Kannada ("kn"), Tamil ("ta"), and Telugu ("te").
Input text: "${text}"

Respond with ONLY a JSON object matching this schema:
{
  "en": "...",
  "hi": "...",
  "kn": "...",
  "ta": "...",
  "te": "..."
}`
    } else if (type === 'translate_block') {
      prompt = `You are an expert translator for Hindu temple layouts. Translate all multilingual string properties (which are objects with keys like 'en', 'hi', 'kn', 'ta', 'te') inside the following block JSON into English ("en"), Hindi ("hi"), Kannada ("kn"), Tamil ("ta"), and Telugu ("te").
Leave block structure, settings, image URLs, and type properties exactly as they are.
Ensure that all translated values are accurate, elegant, and culturally appropriate.

Block JSON:
${JSON.stringify(block)}

Respond with ONLY the translated block JSON matching the original schema. Do not add any explanation or markdown formatting.`
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            responseMimeType: 'application/json',
          },
        }),
      }
    )

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Gemini API returned status ${response.status}: ${errorText}`)
    }

    const data = await response.json()
    const resultText = data.candidates?.[0]?.content?.parts?.[0]?.text

    if (!resultText) {
      throw new Error('No response from Gemini API')
    }

    const parsed = JSON.parse(resultText)
    return NextResponse.json({ success: true, result: parsed })

  } catch (error: any) {
    console.error('[Translate API Error]', error)
    return NextResponse.json({ error: error.message || 'Failed to translate' }, { status: 500 })
  }
}
