import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// Webhook verification for Meta WhatsApp API
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const mode = searchParams.get('hub.mode')
  const token = searchParams.get('hub.verify_token')
  const challenge = searchParams.get('hub.challenge')

  if (mode && token) {
    if (mode === 'subscribe' && token === process.env.WHATSAPP_VERIFY_TOKEN) {
      console.log('WEBHOOK_VERIFIED')
      return new NextResponse(challenge, { status: 200 })
    } else {
      return NextResponse.json({ error: 'Verification failed' }, { status: 403 })
    }
  }

  return NextResponse.json({ error: 'Missing parameters' }, { status: 400 })
}

// Receive incoming messages
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Check if it's a WhatsApp message event
    if (body.object === 'whatsapp_business_account') {
      for (const entry of body.entry) {
        for (const change of entry.changes) {
          if (change.value.messages && change.value.messages[0]) {
            const message = change.value.messages[0]
            const contact = change.value.contacts[0]
            
            const fromPhone = message.from
            const messageText = message.text?.body

            if (fromPhone && messageText) {
              // Extract phone number without country code for CRM lookup (assuming +91)
              const cleanPhone = fromPhone.startsWith('91') ? fromPhone.substring(2) : fromPhone

              // Find the devotee in our system to associate the message
              const devotee = await prisma.devotee.findFirst({
                where: { phone: { contains: cleanPhone } }
              })

              // In a real production app, we would save this to a `communications` table 
              // or route it to the Autonomous AI CRM for an automated reply.
              console.log(`[WhatsApp Webhook] Received message from ${contact?.profile?.name || fromPhone}: ${messageText}`)
              
              if (devotee) {
                console.log(`[WhatsApp Webhook] Matched to Devotee: ${devotee.fullName} (Temple ID: ${devotee.templeId})`)
                // Trigger AI copilot response here if needed
              }
            }
          }
        }
      }
      return NextResponse.json({ success: true }, { status: 200 })
    }

    return NextResponse.json({ error: 'Unknown event' }, { status: 404 })
  } catch (error: any) {
    console.error('[WhatsApp Webhook Error]', error)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}
