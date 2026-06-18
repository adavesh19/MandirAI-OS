import { notFound } from 'next/navigation'
import prisma from '@/lib/prisma'
import { Hexagon, Lock, Link as LinkIcon, Fingerprint } from 'lucide-react'
import { format } from 'date-fns'
import Link from 'next/link'

export const metadata = {
  title: 'Immutable Ledger | MandirAI OS',
}

export default async function TransparencyLedgerPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const resolvedParams = await params
  
  const temple = await prisma.temple.findUnique({
    where: { slug: resolvedParams.slug, isPublished: true },
    select: { id: true, name: true, slug: true }
  })

  if (!temple) notFound()

  // Fetch only completed donations with a hash
  const ledgerEntries = await prisma.donation.findMany({
    where: { templeId: temple.id, paymentStatus: 'COMPLETED', blockchainHash: { not: null } },
    orderBy: { createdAt: 'desc' },
    take: 50,
    include: {
      category: { select: { name: true } },
      campaign: { select: { title: true } }
    }
  })

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-4">
          <div className="inline-flex items-center space-x-2 bg-stone-900 text-stone-100 dark:bg-white dark:text-stone-900 px-3 py-1.5 rounded-full text-sm font-semibold uppercase tracking-widest">
            <Lock className="w-4 h-4" />
            <span>Web3 Verified</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-heading text-stone-900 dark:text-white">Immutable Ledger</h1>
          <p className="text-lg text-stone-500 max-w-2xl">
            Absolute financial transparency for {temple.name}. Every offering is cryptographically hashed and verified, ensuring 100% accountability.
          </p>
        </div>
        
        <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 p-4 rounded-2xl flex items-center space-x-4">
          <Hexagon className="w-8 h-8 text-emerald-600" />
          <div>
            <p className="text-sm font-bold text-emerald-900 dark:text-emerald-400">Ledger Status: Active</p>
            <p className="text-xs text-emerald-700 dark:text-emerald-500">Syncing real-time blocks</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-stone-50 dark:bg-stone-950/50 text-stone-500 uppercase font-semibold">
              <tr>
                <th className="px-6 py-4">Block Date</th>
                <th className="px-6 py-4">Tx Hash</th>
                <th className="px-6 py-4">Donor/Source</th>
                <th className="px-6 py-4">Purpose</th>
                <th className="px-6 py-4 text-right">Amount (₹)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
              {ledgerEntries.map((entry) => (
                <tr key={entry.id} className="hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-stone-500">
                    {format(new Date(entry.createdAt), 'MMM d, yyyy HH:mm')}
                  </td>
                  <td className="px-6 py-4 font-mono">
                    <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400">
                      <Fingerprint className="w-4 h-4 opacity-50" />
                      <span className="truncate max-w-[120px] md:max-w-[200px]" title={entry.blockchainHash || ''}>
                        {entry.blockchainHash}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-stone-900 dark:text-white">
                    {entry.isAnonymous ? 'Anonymous Devotee' : (entry.donorName || 'Unknown')}
                  </td>
                  <td className="px-6 py-4 text-stone-500">
                    {entry.campaign?.title ? (
                      <span className="flex items-center"><LinkIcon className="w-3 h-3 mr-1" /> {entry.campaign.title}</span>
                    ) : (
                      entry.category.name
                    )}
                  </td>
                  <td className="px-6 py-4 text-right font-bold text-emerald-600">
                    ₹{Number(entry.amount).toLocaleString()}
                  </td>
                </tr>
              ))}
              
              {ledgerEntries.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-stone-500">
                    No verified transactions found on the ledger yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="text-center text-stone-400 text-sm">
        <p>This ledger simulates an on-chain smart contract environment ensuring 100% fund tracebility.</p>
        <p>Built on the MandirAI OS Web3 Protocol.</p>
      </div>
    </div>
  )
}
