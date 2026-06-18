import * as React from 'react'
import { requireRole } from '@/lib/dal'
import prisma from '@/lib/prisma'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { FileText, Download, Send, CheckCircle2, Clock, XCircle, Search } from 'lucide-react'

export default async function ReceiptsPage() {
  const { tenantId } = await requireRole(['temple_admin', 'staff'])

  const receipts = await prisma.receipt.findMany({
    where: { templeId: tenantId! },
    orderBy: { createdAt: 'desc' },
    take: 50,
    include: {
      donation: {
        select: { amount: true, donorName: true, paymentMethod: true, createdAt: true },
      },
    },
  })

  const totalReceipts = receipts.length
  const sentEmail = receipts.filter((r) => r.sentEmail).length
  const sentWhatsapp = receipts.filter((r) => r.sentWhatsapp).length

  const stats = [
    {
      label: 'Total Receipts',
      value: totalReceipts.toString(),
      icon: <FileText className="h-5 w-5 text-saffron-550" />,
    },
    {
      label: 'Sent via Email',
      value: sentEmail.toString(),
      icon: <Send className="h-5 w-5 text-saffron-550" />,
    },
    {
      label: 'Sent via WhatsApp',
      value: sentWhatsapp.toString(),
      icon: <CheckCircle2 className="h-5 w-5 text-saffron-550" />,
    },
    {
      label: 'Pending Send',
      value: (totalReceipts - sentEmail).toString(),
      icon: <Clock className="h-5 w-5 text-saffron-550" />,
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white border border-stone-200/50 p-6 rounded-2xl shadow-sm">
        <h1 className="font-heading text-2xl font-bold text-stone-900">Donation Receipts</h1>
        <p className="text-sm text-stone-500 mt-1">
          View, download, and re-send 80G-compliant donation receipts to devotees.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <Card key={i} className="border-stone-200 bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider">{s.label}</span>
              <div className="h-9 w-9 rounded-lg bg-saffron-550/10 flex items-center justify-center">{s.icon}</div>
            </CardHeader>
            <CardContent>
              <p className="font-heading text-2xl font-black text-stone-900">{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Receipts Table */}
      <Card className="border-stone-200 bg-white">
        <CardHeader>
          <CardTitle className="font-heading text-lg font-bold text-stone-900">All Receipts</CardTitle>
          <CardDescription>
            Receipts are auto-generated for every completed donation. You can download or resend them below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {receipts.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="h-16 w-16 rounded-2xl bg-stone-100 flex items-center justify-center mx-auto">
                <Search className="h-8 w-8 text-stone-400" />
              </div>
              <p className="font-heading text-base font-bold text-stone-700">No Receipts Generated Yet</p>
              <p className="text-sm text-stone-400 max-w-sm mx-auto">
                When a devotee completes a donation payment, a receipt will be automatically generated and will
                appear here.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-stone-100">
                    <th className="text-left text-xs font-semibold text-stone-400 uppercase tracking-wider pb-3 pr-4">
                      Receipt No.
                    </th>
                    <th className="text-left text-xs font-semibold text-stone-400 uppercase tracking-wider pb-3 pr-4">
                      Donor
                    </th>
                    <th className="text-left text-xs font-semibold text-stone-400 uppercase tracking-wider pb-3 pr-4">
                      Amount
                    </th>
                    <th className="text-left text-xs font-semibold text-stone-400 uppercase tracking-wider pb-3 pr-4">
                      Method
                    </th>
                    <th className="text-left text-xs font-semibold text-stone-400 uppercase tracking-wider pb-3 pr-4">
                      Email Sent
                    </th>
                    <th className="text-left text-xs font-semibold text-stone-400 uppercase tracking-wider pb-3">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {receipts.map((r) => (
                    <tr key={r.id} className="border-b border-stone-50 hover:bg-stone-50/50">
                      <td className="py-3 pr-4 font-mono text-xs text-stone-600">{r.receiptNumber}</td>
                      <td className="py-3 pr-4 font-medium text-stone-800">
                        {r.donation.donorName || 'Anonymous'}
                      </td>
                      <td className="py-3 pr-4 font-semibold text-stone-900">
                        ₹{Number(r.donation.amount).toLocaleString('en-IN')}
                      </td>
                      <td className="py-3 pr-4 text-stone-500 capitalize">{r.donation.paymentMethod?.toLowerCase()}</td>
                      <td className="py-3 pr-4">
                        {r.sentEmail ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                        ) : (
                          <XCircle className="h-4 w-4 text-stone-300" />
                        )}
                      </td>
                      <td className="py-3">
                        {r.pdfUrl ? (
                          <a
                            href={r.pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-saffron-600 hover:text-saffron-700"
                          >
                            <Download className="h-3.5 w-3.5" />
                            Download
                          </a>
                        ) : (
                          <span className="text-xs text-stone-300">Generating...</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
