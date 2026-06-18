import { NextRequest, NextResponse } from 'next/server'
import { sendReceiptEmail, sendSevaConfirmationEmail } from '@/lib/notifications/email'
import { getDonationWhatsAppMessage, getSevaBookingWhatsAppMessage, sendWhatsAppViaMeta } from '@/lib/notifications/whatsapp'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, ...params } = body

    const results: Record<string, unknown> = {}

    if (type === 'receipt') {
      // Send receipt email if email provided
      if (params.email) {
        results.email = await sendReceiptEmail({
          to: params.email,
          donorName: params.donorName,
          templeName: params.templeName,
          amount: params.amount,
          receiptNumber: params.receiptNumber,
          paymentMethod: params.paymentMethod,
          pdfUrl: params.pdfUrl,
        })
      }

      // Send WhatsApp if phone configured
      if (params.phone) {
        results.whatsapp = await sendWhatsAppViaMeta({
          phone: params.phone,
          templateName: 'donation_receipt',
          values: [params.donorName, params.templeName, String(params.amount), params.receiptNumber],
        })
        // Also provide the wa.me link as fallback
        results.whatsappLink = `https://wa.me/91${params.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(getDonationWhatsAppMessage({ templeName: params.templeName, amount: params.amount, donorName: params.donorName, receiptNumber: params.receiptNumber }))}`
      }
    } else if (type === 'seva_booking') {
      if (params.email) {
        results.email = await sendSevaConfirmationEmail({
          to: params.email,
          donorName: params.donorName,
          templeName: params.templeName,
          sevaName: params.sevaName,
          bookingDate: params.bookingDate,
          amount: params.amount,
          bookingId: params.bookingId,
        })
      }
      if (params.phone) {
        results.whatsappLink = `https://wa.me/91${params.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(getSevaBookingWhatsAppMessage({ templeName: params.templeName, sevaName: params.sevaName, bookingDate: params.bookingDate, donorName: params.donorName, amount: params.amount }))}`
      }
    }

    return NextResponse.json({ success: true, results })
  } catch (error: any) {
    console.error('[notifications/send]', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
