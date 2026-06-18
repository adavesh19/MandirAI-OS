import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import prisma from '@/lib/prisma'
import { getAuthUser } from '@/lib/dal'

// Walk the JSON string and escape any raw unescaped newlines/tabs inside string values
function cleanJsonString(str: string): string {
  let inString = false;
  let escaped = false;
  let result = '';

  for (let i = 0; i < str.length; i++) {
    const char = str[i];

    if (escaped) {
      result += char;
      escaped = false;
      continue;
    }

    if (char === '\\') {
      result += char;
      escaped = true;
      continue;
    }

    if (char === '"') {
      inString = !inString;
      result += char;
      continue;
    }

    if (inString) {
      if (char === '\n') {
        result += '\\n';
      } else if (char === '\r') {
        result += '\\r';
      } else if (char === '\t') {
        result += '\\t';
      } else {
        result += char;
      }
    } else {
      result += char;
    }
  }

  return result;
}

// Find and extract the first complete JSON object {...} in a string
function extractJson(text: string): string {
  const start = text.indexOf('{')
  if (start === -1) return text

  let braceCount = 0
  let inString = false
  let escaped = false

  for (let i = start; i < text.length; i++) {
    const char = text[i]

    if (escaped) {
      escaped = false
      continue
    }

    if (char === '\\') {
      escaped = true
      continue
    }

    if (char === '"') {
      inString = !inString
      continue
    }

    if (!inString) {
      if (char === '{') {
        braceCount++
      } else if (char === '}') {
        braceCount--
        if (braceCount === 0) {
          return text.substring(start, i + 1)
        }
      }
    }
  }

  return text.substring(start)
}

export async function POST(request: NextRequest) {
  const user = await getAuthUser()
  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const role = user.app_metadata?.role
  const tenantId = user.app_metadata?.tenant_id

  if (!['temple_admin', 'super_admin'].includes(role) || !tenantId) {
    return NextResponse.json({ error: 'Not authorized' }, { status: 403 })
  }

  try {
    const { prompt, provider = 'gemini', targetedBlockId = null } = await request.json()
    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 })
    }

    // 1. Fetch current temple data and home page content
    const temple = await prisma.temple.findUnique({
      where: { id: tenantId },
      include: {
        pages: {
          where: { pageType: 'HOME' }
        }
      }
    })

    if (!temple || !temple.pages || temple.pages.length === 0) {
      return NextResponse.json({ error: 'Temple or Home page not found' }, { status: 404 })
    }

    const homePage = temple.pages[0]
    const currentContent = homePage.content as any
    const currentJSON = JSON.stringify(currentContent || {}, null, 2)

    const targetBlockInstruction = targetedBlockId 
      ? `\nTARGETED EDIT: The user has explicitly selected and is targeting the block with ID "${targetedBlockId}". Focus your modifications, content changes, or updates primarily on this specific block, while leaving the rest of the layout blocks intact unless they need to be moved/deleted.\n`
      : ''

    // 2. Define the system instructions
    const systemInstruction = `You are an expert web developer and content writer for Hindu temples.
Your task is to update the temple's website based on the user's request.
The website layout is fully modular and structured as an array of Drag-and-Drop Plugins.

Current Multilingual Website JSON:
${currentJSON}

User's Request: "${prompt}"
${targetBlockInstruction}
Your instructions:
1. Carefully analyze the user's request.
2. Edit, add, remove, or reorder blocks to fulfill the request.
3. Use only the following supported Plugin Types: 'Hero', 'Hero3D', 'Text', 'Donation', 'Events', 'Image', 'Spacer', 'Store', 'Gallery3D', 'Carousel', 'BentoGrid'.

Respond ONLY with a valid JSON object matching this schema:
{
  "title": { "en": "string" },
  "description": { "en": "string" },
  "blocks": [
    {
      "id": "string (unique identifier, e.g. block-1)",
      "type": "string (one of: 'Hero', 'Hero3D', 'Text', 'Donation', 'Events', 'Image', 'Spacer', 'Store', 'Gallery3D', 'Carousel', 'BentoGrid')",
      "props": {
        "title": "string (for Hero, Hero3D, Donation, Events, Store, Gallery3D, Carousel, BentoGrid)",
        "subtitle": "string (for Hero, Hero3D, Carousel)",
        "modelType": "string (one of: 'diya', 'om', 'temple') (for Hero3D)",
        "content": "html string (for Text block)",
        "description": "string (for Donation, Store, BentoGrid)",
        "backgroundImageUrl": "string (image url for Hero)",
        "buttonText": "string (for Hero)",
        "products": [
          { "id": "1", "name": "Item", "price": 100, "image": "url", "description": "text" }
        ],
        "images": [
          { "url": "string", "caption": "string" }
        ],
        "items": [
          { "id": "1", "title": "string", "description": "string", "image": "url", "colSpan": 1, "rowSpan": 1 }
        ]
      }
    }
  ],
  "changesSummary": ["string array explaining what you changed"]
}
Make sure all text content is elegant, devotional, and properly formatted.`

    let resultText = ''

    if (provider === 'groq') {
      const groqKey = process.env.GROQ_API_KEY
      if (!groqKey) {
        return NextResponse.json({ 
          error: 'Groq API key is missing. Add GROQ_API_KEY to your .env file or choose Google Gemini instead.' 
        }, { status: 400 })
      }

      // Call Groq API
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${groqKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            { role: 'system', content: systemInstruction }
          ],
          temperature: 0.2,
          response_format: { type: 'json_object' }
        })
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Groq API returned status ${response.status}: ${errorText}`)
      }

      const data = await response.json()
      resultText = data.choices?.[0]?.message?.content
    } else {
      // Default: Call Google Gemini API
      const apiKey = process.env.GEMINI_API_KEY
      if (!apiKey) {
        return NextResponse.json({ error: 'Gemini API key is missing' }, { status: 500 })
      }

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: systemInstruction }] }],
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
      resultText = data.candidates?.[0]?.content?.parts?.[0]?.text
    }

    if (!resultText) {
      throw new Error('No response text returned from the AI model')
    }

    // Extract the JSON object from model's response (handles trailing conversational text)
    const jsonText = extractJson(resultText)

    // Robustly clean raw control characters inside the JSON strings before parsing
    const sanitizedText = cleanJsonString(jsonText)
    
    let aiData: any
    try {
      aiData = JSON.parse(sanitizedText)
    } catch (e: any) {
      console.error('[AI Builder Parsing Fail] Sanitized text was:', sanitizedText)
      throw new Error(`JSON Parsing Error: ${e.message}. The model output was not fully compliant JSON. Please try again.`)
    }

    // Return the updated blocks and page content directly as a draft instead of writing to database
    return NextResponse.json({
      success: true,
      message: 'Draft layout generated successfully. Review the changes in preview.',
      blocks: aiData.blocks || [],
      title: aiData.title || {},
      description: aiData.description || {},
      changes: aiData.changesSummary || ['Refined layout blocks via AI']
    })

  } catch (error: any) {
    console.error('[AI Builder Error]', error)
    return NextResponse.json({ error: error.message || 'Failed to generate content' }, { status: 500 })
  }
}
