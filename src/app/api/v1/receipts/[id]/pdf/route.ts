import { NextRequest, NextResponse } from 'next/server'
import { requireRole } from '@/lib/dal'
import prisma from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { tenantId } = await requireRole(['temple_admin', 'staff'])
    const { id } = await params

    const receipt = await prisma.receipt.findUnique({
      where: { id, templeId: tenantId! },
      include: {
        donation: {
          include: {
            category: { select: { name: true } },
            devotee: { select: { fullName: true, phone: true } },
          },
        },
        temple: {
          select: {
            name: true,
            address: true,
            contactPhone: true,
            contactEmail: true,
            trust80gDetails: true,
            trustRegistrationNo: true,
          },
        },
      },
    })

    if (!receipt) {
      return NextResponse.json({ error: 'Receipt not found' }, { status: 404 })
    }

    const PDFDocument = (await import('pdfkit')).default
    const doc = new PDFDocument({ margin: 50, size: 'A4' })
    const chunks: Buffer[] = []
    doc.on('data', (chunk: Buffer) => chunks.push(chunk))
    const pdfReady = new Promise<Buffer>((resolve) => {
      doc.on('end', () => resolve(Buffer.concat(chunks)))
    })

    const temple = receipt.temple
    const donation = receipt.donation
    const amount = Number(donation.amount)
    const trust80g = temple.trust80gDetails as Record<string, string> | null
    const address = temple.address as Record<string, string> | null

    // Header bar
    doc.rect(0, 0, 595, 115).fill('#7c2d12')
    doc.fill('#ffffff').font('Helvetica-Bold').fontSize(20)
      .text(temple.name, 50, 30, { align: 'center' })
    doc.fontSize(10).font('Helvetica')
      .text([address?.city, address?.state].filter(Boolean).join(', ') || 'India', 50, 60, { align: 'center' })
    doc.fontSize(9)
      .text(`Phone: ${temple.contactPhone || 'N/A'}  |  Email: ${temple.contactEmail || 'N/A'}`, 50, 80, { align: 'center' })

    // Receipt title band
    doc.rect(50, 125, 495, 36).fill('#fff7ed').stroke('#fed7aa')
    doc.fill('#9a3412').font('Helvetica-Bold').fontSize(14)
      .text('DONATION RECEIPT — 80G TAX EXEMPTION CERTIFICATE', 50, 135, { align: 'center', width: 495 })

    // Receipt meta
    doc.fill('#1c1917').font('Helvetica-Bold').fontSize(10).text(`Receipt No: ${receipt.receiptNumber}`, 55, 175)
    doc.font('Helvetica').text(`Date: ${new Date(receipt.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}`, 360, 175)
    doc.moveTo(50, 198).lineTo(545, 198).stroke('#e5e7eb')

    // Donor section
    doc.fill('#9a3412').font('Helvetica-Bold').fontSize(11).text('DONOR DETAILS', 55, 210)
    doc.fill('#374151').font('Helvetica').fontSize(10)
    const donorName = donation.donorName || donation.devotee?.fullName || 'Anonymous'
    doc.text(`Name: ${donorName}`, 55, 230)
    doc.text(`Phone: ${donation.donorPhone || donation.devotee?.phone || 'N/A'}`, 55, 248)
    if (donation.donorPan) doc.text(`PAN No: ${donation.donorPan}`, 55, 266)
    doc.moveTo(50, 290).lineTo(545, 290).stroke('#e5e7eb')

    // Donation table
    doc.fill('#9a3412').font('Helvetica-Bold').fontSize(11).text('DONATION DETAILS', 55, 302)
    doc.rect(50, 322, 495, 24).fill('#fff7ed')
    doc.fill('#9a3412').font('Helvetica-Bold').fontSize(9)
      .text('DESCRIPTION', 60, 330)
      .text('PAYMENT METHOD', 280, 330)
      .text('AMOUNT (INR)', 430, 330)
    doc.rect(50, 346, 495, 32).fill('#ffffff').stroke('#e5e7eb')
    doc.fill('#1c1917').font('Helvetica').fontSize(10)
      .text(donation.category?.name || 'General Donation', 60, 358)
      .text(donation.paymentMethod || 'UPI', 280, 358)
    doc.font('Helvetica-Bold').text(`Rs. ${amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`, 430, 358)
    doc.rect(50, 378, 495, 28).fill('#fff7ed').stroke('#fed7aa')
    doc.fill('#9a3412').font('Helvetica-Bold').fontSize(11)
      .text('TOTAL AMOUNT', 60, 387)
      .text(`Rs. ${amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`, 430, 387)
    doc.fill('#6b7280').font('Helvetica').fontSize(9)
      .text(`(Rupees ${amountToWords(amount)} Only)`, 55, 416)

    // 80G section
    if (trust80g || receipt.temple.trustRegistrationNo) {
      doc.moveTo(50, 440).lineTo(545, 440).stroke('#e5e7eb')
      doc.rect(50, 448, 495, 16).fill('#dcfce7')
      doc.fill('#166534').font('Helvetica-Bold').fontSize(9)
        .text('80G TAX EXEMPTION DETAILS', 55, 452)
      doc.fill('#374151').font('Helvetica').fontSize(9)
      if (receipt.temple.trustRegistrationNo) doc.text(`Trust Registration No: ${receipt.temple.trustRegistrationNo}`, 55, 472)
      if (trust80g?.certificateNo) doc.text(`80G Certificate No: ${trust80g.certificateNo}`, 55, 488)
      if (trust80g?.validUpto) doc.text(`Valid Upto: ${trust80g.validUpto}`, 340, 488)
      doc.fontSize(8).text(
        'This receipt is valid for claiming tax exemption under Section 80G of the Income Tax Act, 1961.',
        55, 506, { width: 485 }
      )
    }

    // Signature line
    doc.moveTo(380, 680).lineTo(545, 680).stroke('#9ca3af')
    doc.fill('#374151').font('Helvetica').fontSize(9).text('Authorized Signatory', 390, 685)
    doc.text(temple.name, 360, 697, { width: 185, align: 'center' })

    // Footer
    doc.moveTo(50, 730).lineTo(545, 730).stroke('#e5e7eb')
    doc.fill('#9ca3af').font('Helvetica').fontSize(7.5)
      .text('This is a computer-generated receipt and does not require a physical signature.', 50, 738, { align: 'center', width: 495 })
      .text(`Generated by MandirAI OS | ${new Date().toLocaleString('en-IN')}`, 50, 750, { align: 'center', width: 495 })

    doc.end()
    const pdfBuffer = await pdfReady

    return new NextResponse(new Uint8Array(pdfBuffer), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="receipt-${receipt.receiptNumber}.pdf"`,
        'Content-Length': pdfBuffer.length.toString(),
      },
    })
  } catch (error: any) {
    console.error('[receipt-pdf]', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

function amountToWords(amount: number): string {
  const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
    'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen']
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety']
  function convert(n: number): string {
    if (n < 20) return ones[n]
    if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 ? ' ' + ones[n % 10] : '')
    if (n < 1000) return ones[Math.floor(n / 100)] + ' Hundred' + (n % 100 ? ' ' + convert(n % 100) : '')
    if (n < 100000) return convert(Math.floor(n / 1000)) + ' Thousand' + (n % 1000 ? ' ' + convert(n % 1000) : '')
    if (n < 10000000) return convert(Math.floor(n / 100000)) + ' Lakh' + (n % 100000 ? ' ' + convert(n % 100000) : '')
    return convert(Math.floor(n / 10000000)) + ' Crore' + (n % 10000000 ? ' ' + convert(n % 10000000) : '')
  }
  const intAmount = Math.floor(amount)
  const paise = Math.round((amount - intAmount) * 100)
  let result = convert(intAmount)
  if (paise > 0) result += ` and ${convert(paise)} Paise`
  return result
}
