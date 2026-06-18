import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('x-razorpay-signature') || ''
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || ''

    if (webhookSecret) {
      const expectedSignature = crypto
        .createHmac('sha256', webhookSecret)
        .update(body)
        .digest('hex')

      if (expectedSignature !== signature) {
        return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
      }
    }

    const event = JSON.parse(body)
    console.log('[webhook] event:', event.event)

    // Handle events
    switch (event.event) {
      case 'payment.captured':
        console.log('[webhook] Payment captured:', event.payload.payment.entity.id)
        break
      case 'payment.failed':
        console.log('[webhook] Payment failed:', event.payload.payment.entity.id)
        break
      default:
        console.log('[webhook] Unhandled event:', event.event)
    }

    return NextResponse.json({ received: true })
  } catch (error: any) {
    console.error('[webhook]', error)
    return NextResponse.json({ error: 'Webhook error' }, { status: 500 })
  }
}
