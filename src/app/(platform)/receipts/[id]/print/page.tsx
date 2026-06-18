import prisma from '@/lib/prisma'
import { requireStaff } from '@/lib/dal'
import { notFound } from 'next/navigation'
import PrintClient from './print-client'

export default async function PrintReceiptPage({ params }: { params: { id: string } }) {
  const { tenantId } = await requireStaff()
  if (!tenantId) return <div>Tenant Required</div>

  const receipt = await prisma.receipt.findUnique({
    where: { id: params.id, templeId: tenantId },
    include: {
      donation: {
        include: {
          devotee: true,
          category: true,
          creator: true
        }
      },
      temple: true
    }
  })

  if (!receipt) notFound()

  return (
    <div className="flex flex-col items-center p-8 bg-muted min-h-screen no-print">
      <div className="max-w-md w-full bg-card rounded-xl border p-8 shadow-sm text-center">
        <h2 className="text-2xl font-bold mb-2">POS Thermal Printer</h2>
        <p className="text-muted-foreground mb-6">
          Connect your 80mm or 58mm thermal printer to print this receipt instantly.
        </p>
        <PrintClient />
      </div>

      {/* This element is hidden on screen but visible during print */}
      <div id="printable-receipt" className="font-mono text-xs bg-white text-black p-4 w-[80mm] mx-auto absolute top-0 left-0 -z-50 invisible">
        <div className="text-center mb-4">
          <h1 className="font-bold text-lg mb-1">{receipt.temple.name}</h1>
          <p className="text-[10px]">Date: {new Date(receipt.createdAt).toLocaleString()}</p>
          <p className="text-[10px]">Receipt No: {receipt.receiptNumber}</p>
        </div>

        <div className="border-t border-dashed border-black py-2 mb-2">
          <p><strong>Donor:</strong> {receipt.donation.donorName}</p>
          {receipt.donation.donorPhone && <p><strong>Phone:</strong> {receipt.donation.donorPhone}</p>}
          <p><strong>Category:</strong> {receipt.donation.category.name}</p>
          <p><strong>Method:</strong> {receipt.donation.paymentMethod}</p>
        </div>

        <div className="border-y border-dashed border-black py-2 my-2 flex justify-between text-base font-bold">
          <span>AMOUNT</span>
          <span>INR {Number(receipt.donation.amount).toFixed(2)}</span>
        </div>

        <div className="text-center mt-4 pt-4 border-t border-dashed border-black text-[10px]">
          <p>Thank you for your donation.</p>
          <p>May the divine blessings be with you.</p>
          <p className="mt-2">Issued by: {receipt.donation.creator.fullName || 'Admin'}</p>
        </div>
      </div>
    </div>
  )
}
