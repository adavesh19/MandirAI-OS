import { Resend } from 'resend'

let resendClient: Resend | null = null

function getResendClient() {
  if (!resendClient) {
    if (!process.env.RESEND_API_KEY) {
      console.warn('[Resend] RESEND_API_KEY not configured - email notifications disabled')
      return null
    }
    resendClient = new Resend(process.env.RESEND_API_KEY)
  }
  return resendClient
}

export async function sendReceiptEmail(params: {
  to: string
  donorName: string
  templeName: string
  amount: number
  receiptNumber: string
  paymentMethod: string
  pdfUrl?: string
}) {
  const resend = getResendClient()
  if (!resend) return { success: false, error: 'Email not configured' }

  try {
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'noreply@templeai.in',
      to: params.to,
      subject: `Donation Receipt #${params.receiptNumber} — ${params.templeName}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #fffbf5; padding: 40px; border-radius: 12px; border: 1px solid #f5e6d0;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #c2410c; font-size: 28px; margin: 0;">🕉️ ${params.templeName}</h1>
            <p style="color: #9a3412; font-size: 14px; margin: 8px 0 0;">Official Donation Receipt</p>
          </div>
          <div style="background: white; border-radius: 8px; padding: 24px; border: 1px solid #fed7aa;">
            <p style="color: #1c1917; margin: 0 0 16px;">Respected <strong>${params.donorName}</strong>,</p>
            <p style="color: #44403c; line-height: 1.6;">We acknowledge your generous contribution with heartfelt gratitude. May the blessings of the Divine always be with you.</p>
            <table style="width: 100%; border-collapse: collapse; margin: 24px 0;">
              <tr style="background: #fff7ed;">
                <td style="padding: 12px; border: 1px solid #fed7aa; font-weight: bold; color: #9a3412;">Receipt Number</td>
                <td style="padding: 12px; border: 1px solid #fed7aa; font-family: monospace;">${params.receiptNumber}</td>
              </tr>
              <tr>
                <td style="padding: 12px; border: 1px solid #fed7aa; font-weight: bold; color: #9a3412;">Amount Donated</td>
                <td style="padding: 12px; border: 1px solid #fed7aa; font-size: 20px; font-weight: bold; color: #c2410c;">₹${params.amount.toLocaleString('en-IN')}</td>
              </tr>
              <tr style="background: #fff7ed;">
                <td style="padding: 12px; border: 1px solid #fed7aa; font-weight: bold; color: #9a3412;">Payment Method</td>
                <td style="padding: 12px; border: 1px solid #fed7aa;">${params.paymentMethod}</td>
              </tr>
              <tr>
                <td style="padding: 12px; border: 1px solid #fed7aa; font-weight: bold; color: #9a3412;">Date</td>
                <td style="padding: 12px; border: 1px solid #fed7aa;">${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</td>
              </tr>
            </table>
            ${params.pdfUrl ? `<p style="text-align: center;"><a href="${params.pdfUrl}" style="background: #ea580c; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">Download 80G Receipt PDF</a></p>` : ''}
          </div>
          <p style="text-align: center; color: #78716c; font-size: 12px; margin-top: 24px;">This is an official receipt from ${params.templeName}. Please retain for 80G tax exemption claims.</p>
        </div>
      `,
    })
    if (error) return { success: false, error: error.message }
    return { success: true, emailId: data?.id }
  } catch (err: any) {
    console.error('[sendReceiptEmail]', err)
    return { success: false, error: err.message }
  }
}

export async function sendSevaConfirmationEmail(params: {
  to: string
  donorName: string
  templeName: string
  sevaName: string
  bookingDate: string
  amount: number
  bookingId: string
}) {
  const resend = getResendClient()
  if (!resend) return { success: false, error: 'Email not configured' }

  try {
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'noreply@templeai.in',
      to: params.to,
      subject: `Seva Booking Confirmed — ${params.sevaName} at ${params.templeName}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #fffbf5; padding: 40px; border-radius: 12px; border: 1px solid #f5e6d0;">
          <h1 style="color: #c2410c; text-align: center;">🙏 Seva Booking Confirmed</h1>
          <div style="background: white; border-radius: 8px; padding: 24px; border: 1px solid #fed7aa;">
            <p>Dear <strong>${params.donorName}</strong>,</p>
            <p>Your seva booking has been confirmed. Details below:</p>
            <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
              <tr style="background: #fff7ed;"><td style="padding: 10px; border: 1px solid #fed7aa; font-weight: bold;">Seva</td><td style="padding: 10px; border: 1px solid #fed7aa;">${params.sevaName}</td></tr>
              <tr><td style="padding: 10px; border: 1px solid #fed7aa; font-weight: bold;">Temple</td><td style="padding: 10px; border: 1px solid #fed7aa;">${params.templeName}</td></tr>
              <tr style="background: #fff7ed;"><td style="padding: 10px; border: 1px solid #fed7aa; font-weight: bold;">Date</td><td style="padding: 10px; border: 1px solid #fed7aa;">${params.bookingDate}</td></tr>
              <tr><td style="padding: 10px; border: 1px solid #fed7aa; font-weight: bold;">Amount</td><td style="padding: 10px; border: 1px solid #fed7aa; font-weight: bold; color: #c2410c;">₹${params.amount.toLocaleString('en-IN')}</td></tr>
              <tr style="background: #fff7ed;"><td style="padding: 10px; border: 1px solid #fed7aa; font-weight: bold;">Booking ID</td><td style="padding: 10px; border: 1px solid #fed7aa; font-family: monospace; font-size: 12px;">${params.bookingId}</td></tr>
            </table>
          </div>
        </div>
      `,
    })
    if (error) return { success: false, error: error.message }
    return { success: true, emailId: data?.id }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}
