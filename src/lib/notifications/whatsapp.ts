// WhatsApp notification helpers
// Supports: direct wa.me links (always works), Interakt API (if configured)

export function getWhatsAppLink(phone: string, message: string): string {
  const cleanPhone = phone.replace(/[^0-9]/g, '')
  const phoneWithCountry = cleanPhone.startsWith('91') ? cleanPhone : `91${cleanPhone}`
  return `https://wa.me/${phoneWithCountry}?text=${encodeURIComponent(message)}`
}

export function getDonationWhatsAppMessage(params: {
  templeName: string
  amount: number
  donorName: string
  receiptNumber?: string
}): string {
  return `🙏 *Donation Confirmation*\n\nNamaste ${params.donorName},\n\nThank you for your generous contribution of *₹${params.amount.toLocaleString('en-IN')}* to *${params.templeName}*.${params.receiptNumber ? `\n\nYour receipt number: *${params.receiptNumber}*` : ''}\n\nMay the Divine blessings be with you always. 🕉️\n\n_- ${params.templeName} Team_`
}

export function getSevaBookingWhatsAppMessage(params: {
  templeName: string
  sevaName: string
  bookingDate: string
  donorName: string
  amount: number
}): string {
  return `🙏 *Seva Booking Confirmed*\n\nNamaste ${params.donorName},\n\nYour booking for *${params.sevaName}* at *${params.templeName}* is confirmed.\n\n📅 Date: ${params.bookingDate}\n💰 Amount: ₹${params.amount.toLocaleString('en-IN')}\n\nPlease arrive 30 minutes before the scheduled time. 🕉️`
}

export async function sendWhatsAppViaMeta(params: {
  phone: string
  templateName: string
  values: string[]
}): Promise<{ success: boolean; error?: string }> {
  if (!process.env.WHATSAPP_ACCESS_TOKEN || !process.env.WHATSAPP_PHONE_ID) {
    return { success: false, error: 'Meta WhatsApp Cloud API not configured - use wa.me links instead' }
  }

  try {
    const cleanPhone = params.phone.replace(/[^0-9]/g, '')
    const phoneWithCountry = cleanPhone.startsWith('91') ? cleanPhone : `91${cleanPhone}`

    const response = await fetch(`https://graph.facebook.com/v19.0/${process.env.WHATSAPP_PHONE_ID}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: phoneWithCountry,
        type: 'template',
        template: {
          name: params.templateName,
          language: { code: 'en' },
          components: [
            {
              type: 'body',
              parameters: params.values.map(val => ({
                type: 'text',
                text: val
              }))
            }
          ]
        },
      }),
    })

    const data = await response.json()
    if (!response.ok) throw new Error(data.error?.message || 'Meta API error')
    return { success: true }
  } catch (err: any) {
    console.error('[WhatsApp Meta API]', err)
    return { success: false, error: err.message }
  }
}
