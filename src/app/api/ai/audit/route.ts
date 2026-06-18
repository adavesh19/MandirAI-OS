import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getAuthUser } from '@/lib/dal'

export async function GET(request: NextRequest) {
  const user = await getAuthUser()
  if (!user || !user.app_metadata?.tenant_id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const tenantId = user.app_metadata.tenant_id

  try {
    const page = await prisma.templePage.findFirst({
      where: { templeId: tenantId, pageType: 'HOME' }
    })

    if (!page) {
      return NextResponse.json({
        score: 0,
        audits: [
          {
            id: 'page',
            title: 'Home Page Creation',
            passed: false,
            description: 'No homepage was found for your temple. Go back to onboarding or request the AI Co-Pilot to generate a fresh homepage.',
            autoFixPrompt: 'Create a fresh Homepage with a hero section, daily darshan timings table, and contact info.'
          }
        ]
      })
    }

    const content = page.content as any
    const blocks = content?.blocks || []

    const audits = []
    let score = 100

    // 1. Hero block check
    const hasHero = blocks.some((b: any) => b.type === 'hero')
    audits.push({
      id: 'hero',
      title: 'Devotional Hero Banner',
      passed: hasHero,
      description: hasHero 
        ? 'Your homepage features a welcoming devotional hero block.' 
        : 'Welcome banner is missing. Devotees won\'t see a primary welcoming presence when visiting.',
      autoFixPrompt: hasHero ? null : 'Add a welcoming Hero Section with a beautiful title and an elegant cover image.'
    })
    if (!hasHero) score -= 20

    // 2. Timings block check
    const hasTimings = blocks.some((b: any) => b.type === 'timings')
    audits.push({
      id: 'timings',
      title: 'Darshan Timings Table',
      passed: hasTimings,
      description: hasTimings 
        ? 'Darshan and Pooja timings are clearly listed.' 
        : 'Daily darshan hours are missing. Devotees need this to plan their visits.',
      autoFixPrompt: hasTimings ? null : 'Add a Darshan Timings table showing morning and evening temple hours.'
    })
    if (!hasTimings) score -= 20

    // 3. Sevas block check
    const hasSevas = blocks.some((b: any) => b.type === 'sevas')
    audits.push({
      id: 'sevas',
      title: 'Seva Offerings Grid',
      passed: hasSevas,
      description: hasSevas 
        ? 'Devotees can visually browse and book sacred sevas.' 
        : 'No sevas booking section is present. Add one to enable online bookings.',
      autoFixPrompt: hasSevas ? null : 'Add a Sevas Grid block to list and let devotees book rituals online.'
    })
    if (!hasSevas) score -= 20

    // 4. Map block check
    const hasMap = blocks.some((b: any) => b.type === 'map')
    audits.push({
      id: 'map',
      title: 'Location Map Integration',
      passed: hasMap,
      description: hasMap 
        ? 'An interactive map points to your physical location.' 
        : 'Interactive Map is missing. Devotees might find it difficult to navigate to the temple.',
      autoFixPrompt: hasMap ? null : 'Add an interactive map block displaying our temple address at the bottom.'
    })
    if (!hasMap) score -= 15

    // 5. Form block check
    const hasForm = blocks.some((b: any) => b.type === 'form')
    audits.push({
      id: 'form',
      title: 'Contact / Prayer Form',
      passed: hasForm,
      description: hasForm 
        ? 'Devotees can easily submit prayer requests or questions.' 
        : 'Devotee contact form is missing. Add one to receive prayer requests or feedback.',
      autoFixPrompt: hasForm ? null : 'Add a prayer request contact form block so devotees can write to the temple trust.'
    })
    if (!hasForm) score -= 10

    // 6. Multilingual translations check
    // We check if any block has empty or missing translation entries for hi, kn, ta, te
    let translationsIncomplete = false
    const langsToCheck = ['hi', 'kn', 'ta', 'te']
    
    for (const block of blocks) {
      if (block.data) {
        // Look at common title/subtitle/heading fields
        const checkFields = ['title', 'subtitle', 'heading', 'html', 'morning', 'evening']
        for (const field of checkFields) {
          const valObj = block.data[field]
          if (valObj && typeof valObj === 'object') {
            const enVal = valObj.en || ''
            if (enVal && langsToCheck.some(l => !valObj[l] || valObj[l].trim() === '' || valObj[l] === enVal)) {
              translationsIncomplete = true
              break
            }
          }
        }
      }
      if (translationsIncomplete) break
    }

    audits.push({
      id: 'multilingual',
      title: 'Multilingual Completeness',
      passed: !translationsIncomplete,
      description: !translationsIncomplete 
        ? 'All website sections are translated into English, Hindi, Kannada, Tamil, and Telugu.' 
        : 'Incomplete translations. Some page blocks are missing translation text for localized languages.',
      autoFixPrompt: !translationsIncomplete ? null : 'Translate all current blocks fully into Hindi, Kannada, Tamil, and Telugu.'
    })
    if (translationsIncomplete) score -= 15

    // Ensure score doesn't go below 0
    const finalScore = Math.max(0, score)

    return NextResponse.json({
      score: finalScore,
      audits
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
