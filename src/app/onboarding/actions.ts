'use server'

import prisma from '@/lib/prisma'
import { getAuthUser } from '@/lib/dal'
import { createAdminClient } from '@/lib/supabase/admin'
import { generateTempleWebsite } from '@/lib/ai/gemini'
import { TempleType, PageType } from '@prisma/client'

// Server Action to handle onboarding
export async function onboardTemple(formData: {
  name: string
  slug: string
  templeType: string
  primaryDeity: string
  phone: string
  email: string
  historyText: string
  address: {
    line1: string
    line2?: string
    city: string
    state: string
    country: string
    pincode: string
  }
  timings: {
    morning_open: string
    morning_close: string
    evening_open: string
    evening_close: string
  }
  upiId: string
  bankDetails: {
    account_name: string
    account_number: string
    ifsc: string
    bank_name: string
    branch: string
  }
  trustRegistrationNo: string
  templateId?: string
  images: {
    temple: string
    deity: string
    swamiji?: string
  }
}) {
  const user = await getAuthUser()
  if (!user) {
    return { success: false, error: 'Not authenticated. Please log in.' }
  }

  const userId = user.id

  const {
    name,
    slug,
    templeType,
    primaryDeity,
    phone,
    email,
    historyText,
    address,
    timings,
    upiId,
    bankDetails,
    trustRegistrationNo,
    templateId = 'classic',
    images,
  } = formData

  // Verify slug is unique and format it
  const formattedSlug = slug.toLowerCase().replace(/[^a-z0-9-_]/g, '')
  const existingTemple = await prisma.temple.findUnique({
    where: { slug: formattedSlug },
  })

  if (existingTemple) {
    return { success: false, error: 'A temple with this URL slug already exists.' }
  }

  try {
    // 1. Create temple and assign membership inside a transaction
    const result = await prisma.$transaction(async (tx) => {

      // ── STEP 0: Ensure user exists in our custom users table ──────────────
      // New Supabase signups only create auth.users records. We must upsert
      // into our custom `users` table before we can create any FK references.
      await tx.user.upsert({
        where: { id: userId },
        update: {
          fullName: user.user_metadata?.full_name || user.email?.split('@')[0] || 'Temple Admin',
          role: 'TEMPLE_ADMIN',
          isActive: true,
        },
        create: {
          id: userId,
          fullName: user.user_metadata?.full_name || user.email?.split('@')[0] || 'Temple Admin',
          role: 'TEMPLE_ADMIN',
          isActive: true,
        },
      })

      // ── STEP 1: Create temple profile ─────────────────────────────────────
      const temple = await tx.temple.create({
        data: {
          name,
          slug: formattedSlug,
          templeType: templeType as TempleType,
          primaryDeity,
          contactPhone: phone,
          contactEmail: email,
          address: address || {},
          timings: timings || {},
          upiId: upiId || null,
          bankDetails: bankDetails || {},
          trustRegistrationNo: trustRegistrationNo || null,
          onboardingCompleted: true,
          isPublished: false,
          themeConfig: {
            templateId: templateId,
            primary_color: '#F97316',
            accent_color: '#D97706',
            font_family: 'Outfit',
            hero_style: 'gradient',
          },
          seoConfig: {
            title: `${name} — Official Temple Portal`,
            description: `Welcome to the official website of ${name}. Find daily timings, pooja slots, and donate online.`,
            keywords: [name, primaryDeity, 'temple timings', 'online donation'],
          },
        },
      })

      // ── STEP 2: Assign user as TEMPLE_ADMIN member ────────────────────────
      await tx.templeMember.create({
        data: {
          templeId: temple.id,
          userId: userId,
          role: 'TEMPLE_ADMIN',
          permissions: { all: true },
        },
      })

      return temple
    })

    // 2. Call Gemini API to generate pages (run outside transaction to avoid holding DB lock)
    let generatedContent
    try {
      generatedContent = await generateTempleWebsite(name, primaryDeity, templeType, historyText)
    } catch (err) {
      console.error('Error generating website with AI:', err)
    }

    // 3. Write pages to database
    if (generatedContent) {
      const pageTypes: PageType[] = ['HOME', 'ABOUT', 'HISTORY', 'CONTACT']
      const pagesToInsert = pageTypes.map((type, idx) => {
        const pageData = generatedContent[type as keyof typeof generatedContent]
        
        let initialBlocks: any[] = [];
        const ts = Date.now() + idx;
        
        if (type === 'HOME') {
            initialBlocks = [
              { id: `hero3d-${ts}-1`, type: 'Hero3D', props: { title: name, subtitle: `Welcome to the divine presence of ${primaryDeity}`, modelType: 'diya' } },
              { id: `text-${ts}-2`, type: 'Text', props: { content: pageData.content } },
              { 
                id: `bento-${ts}-3`, 
                type: 'BentoGrid', 
                props: { 
                  title: 'Temple Highlights', 
                  description: 'Explore our sacred spaces, spiritual leaders, and daily programs.',
                  items: [
                    { id: '1', title: 'Daily Darshan & Aarti', description: 'Experience divine morning and evening prayers.', image: images.temple || 'https://images.unsplash.com/photo-1596700057039-383791054006?auto=format&fit=crop&q=80', colSpan: 2, rowSpan: 2 },
                    { id: '2', title: 'Main Deity Darshan', description: `Invocations of Lord ${primaryDeity}.`, image: images.deity || 'https://images.unsplash.com/photo-1601058269550-93ed9cd5c54e?auto=format&fit=crop&q=80', colSpan: 1, rowSpan: 1 },
                    { id: '3', title: 'Sacred Seva Bookings', description: 'Participate in personalized rituals.', colSpan: 1, rowSpan: 1 },
                    { id: '4', title: 'Spiritual Leadership', description: 'Guided by our Peethadhipati and Swamijis.', image: images.swamiji || 'https://images.unsplash.com/photo-1614713568397-b6483569502d?auto=format&fit=crop&q=80', colSpan: 2, rowSpan: 1 }
                  ]
                } 
              },
              { id: `carousel-${ts}-4`, type: 'Carousel', props: { title: 'Spiritual Initiatives', subtitle: 'Swipe to discover more.' } },
              { id: `events-${ts}-5`, type: 'Events', props: { title: 'Upcoming Festivals' } },
              { id: `donation-${ts}-6`, type: 'Donation', props: { title: 'Support the Temple', description: 'Your contributions help us maintain the premises and feed the poor.' } },
              { id: `gallery3d-${ts}-7`, type: 'Gallery3D', props: { title: 'Sacred Moments Gallery', images: [{ url: images.temple || 'https://images.unsplash.com/photo-1596700057039-383791054006?auto=format&fit=crop&q=80', caption: 'Temple Exterior' }, { url: images.deity || 'https://images.unsplash.com/photo-1601058269550-93ed9cd5c54e?auto=format&fit=crop&q=80', caption: 'Main Deity' }, { url: images.swamiji || 'https://images.unsplash.com/photo-1614713568397-b6483569502d?auto=format&fit=crop&q=80', caption: 'Blessed Moments' }] } }
            ];
        } else if (type === 'ABOUT') {
            initialBlocks = [
              { id: `hero-${ts}-1`, type: 'Hero', props: { title: `About ${name}`, subtitle: 'Our Mission & Vision', backgroundImageUrl: images.temple } },
              { id: `text-${ts}-2`, type: 'Text', props: { content: pageData.content } },
              { 
                id: `bento-${ts}-3`, 
                type: 'BentoGrid', 
                props: { 
                  title: 'Our Heritage & Philosophy', 
                  description: 'Understand our spiritual mission and core Vedic principles.',
                  items: [
                    { id: '1', title: 'Sanatana Dharma Philosophy', description: 'Preserving eternal cosmic principles and practices.', image: images.deity || 'https://images.unsplash.com/photo-1601058269550-93ed9cd5c54e?auto=format&fit=crop&q=80', colSpan: 2, rowSpan: 2 },
                    { id: '2', title: 'Charitable Annadanam', description: 'Providing sacred meals to visitors daily.', colSpan: 1, rowSpan: 1 },
                    { id: '3', title: 'Community Service', description: 'Initiatives in education and environmental preservation.', colSpan: 1, rowSpan: 1 },
                    { id: '4', title: 'Vedic Shastras Preservation', description: 'Teaching ancient texts and rituals to students.', image: images.temple || 'https://images.unsplash.com/photo-1596700057039-383791054006?auto=format&fit=crop&q=80', colSpan: 2, rowSpan: 1 }
                  ]
                } 
              },
              { id: `gallery3d-${ts}-4`, type: 'Gallery3D', props: { title: 'Sacred Moments Gallery', images: [{ url: images.deity || 'https://images.unsplash.com/photo-1596700057039-383791054006?auto=format&fit=crop&q=80', caption: 'Darshan' }, { url: images.temple || 'https://images.unsplash.com/photo-1601058269550-93ed9cd5c54e?auto=format&fit=crop&q=80', caption: 'Architecture' }] } }
            ];
        } else if (type === 'HISTORY') {
            initialBlocks = [
              { id: `hero3d-${ts}-1`, type: 'Hero3D', props: { title: `History of ${name}`, subtitle: 'Centuries of devotion', modelType: 'diya' } },
              { id: `text-${ts}-2`, type: 'Text', props: { content: pageData.content } },
              { 
                id: `bento-${ts}-3`, 
                type: 'BentoGrid', 
                props: { 
                  title: 'Chronicles & Historical Milestones', 
                  description: 'Walk through the historical timeline and structural evolution of the temple.',
                  items: [
                    { id: '1', title: 'Ancient Origins & Foundation', description: 'Dating back to traditional spiritual consecration.', image: images.temple || 'https://images.unsplash.com/photo-1596700057039-383791054006?auto=format&fit=crop&q=80', colSpan: 2, rowSpan: 2 },
                    { id: '2', title: 'Deity Installation (Prana Pratishtha)', description: 'The historic day the main deity was installed.', image: images.deity || 'https://images.unsplash.com/photo-1601058269550-93ed9cd5c54e?auto=format&fit=crop&q=80', colSpan: 1, rowSpan: 1 },
                    { id: '3', title: 'Architecture & Artistry', description: 'Stone carvings and Gopuram construction history.', colSpan: 1, rowSpan: 1 },
                    { id: '4', title: 'Centuries of Patrons', description: 'Supported by noble spiritual leaders and historic rulers.', image: images.swamiji || 'https://images.unsplash.com/photo-1614713568397-b6483569502d?auto=format&fit=crop&q=80', colSpan: 2, rowSpan: 1 }
                  ]
                } 
              },
              { id: `gallery3d-${ts}-4`, type: 'Gallery3D', props: { title: 'Historical Archives' } }
            ];
        } else if (type === 'CONTACT') {
            initialBlocks = [
              { id: `hero-${ts}-1`, type: 'Hero', props: { title: 'Contact Us', subtitle: 'Reach out for blessings and queries.' } },
              { 
                id: `bento-${ts}-2`, 
                type: 'BentoGrid', 
                props: { 
                  title: 'Reach Out For Blessings', 
                  description: 'Multiple ways to connect with our administrative and spiritual office.',
                  items: [
                    { id: '1', title: 'Administrative Office', description: 'For trust board meetings, registrations, and official work.', image: images.temple || 'https://images.unsplash.com/photo-1596700057039-383791054006?auto=format&fit=crop&q=80', colSpan: 2, rowSpan: 2 },
                    { id: '2', title: 'Priest Consultation Desk', description: 'Consult head priests for personalized poojas.', colSpan: 1, rowSpan: 1 },
                    { id: '3', title: 'Pilgrim Accommodation Office', description: 'Inquire about stay and dharamshala rooms.', colSpan: 1, rowSpan: 1 },
                    { id: '4', title: 'Find Us on Map', description: 'Located at the heart of the sacred town center.', image: images.deity || 'https://images.unsplash.com/photo-1601058269550-93ed9cd5c54e?auto=format&fit=crop&q=80', colSpan: 2, rowSpan: 1 }
                  ]
                } 
              },
              { id: `donation-${ts}-3`, type: 'Donation', props: { title: 'Support the Temple', description: 'Your contributions help us maintain the premises and feed the poor.' } }
            ];
        }

        return {
          templeId: result.id,
          pageType: type,
          content: {
            title: pageData.title,
            description: pageData.description,
            html: pageData.content,
            blocks: initialBlocks
          } as any,
          seoMeta: pageData.seoMeta as any,
          isPublished: false,
          sortOrder: idx,
        }
      })

      await prisma.templePage.createMany({
        data: pagesToInsert,
      })
    }

    // 4. Update Supabase Auth app_metadata via Admin client so JWT contains tenant_id and role
    try {
      const supabaseAdmin = createAdminClient()
      await supabaseAdmin.auth.admin.updateUserById(userId, {
        app_metadata: { role: 'temple_admin', tenant_id: result.id },
      })
    } catch (authErr) {
      console.error('Failed to update Supabase Auth app_metadata (ignoring for development):', authErr)
    }

    return { success: true, templeId: result.id, slug: result.slug }
  } catch (error: any) {
    console.error('Onboarding transaction failed:', error)
    return { success: false, error: error?.message || 'Failed to complete onboarding.' }
  }
}
