'use client'

import * as React from 'react'
import { Modal } from '@/components/ui/modal'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { createManualDonation } from '@/app/(platform)/actions'
import { Plus, Search, Heart, FileText, ArrowUpRight, User, Phone, CheckCircle } from 'lucide-react'

interface Donation {
  id: string
  amount: number
  currency: string
  paymentMethod: string
  paymentStatus: string
  donorName: string | null
  donorPhone: string | null
  donorPan: string | null
  notes: string | null
  createdAt: string
  categoryName: string
  devoteeName: string | null
  receiptId: string | null
  receiptNumber: string | null
  pdfUrl: string | null
}

interface Category {
  id: string
  name: string
}

interface Devotee {
  id: string
  fullName: string
  phone: string | null
}

interface DonationsClientProps {
  donations: Donation[]
  categories: Category[]
  devotees: Devotee[]
}

export default function DonationsClient({ donations, categories, devotees }: DonationsClientProps) {
  // Filters & Search State
  const [searchQuery, setSearchQuery] = React.useState('')
  const [methodFilter, setMethodFilter] = React.useState('ALL')
  const [categoryFilter, setCategoryFilter] = React.useState('ALL')

  // Modal State
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [saving, setSaving] = React.useState(false)

  // Form State
  const [amount, setAmount] = React.useState('')
  const [selectedCategory, setSelectedCategory] = React.useState(categories[0]?.id || '')
  const [paymentMethod, setPaymentMethod] = React.useState('CASH')
  const [transactionRef, setTransactionRef] = React.useState('')
  const [notes, setNotes] = React.useState('')
  
  // Devotee link toggle: 'existing' | 'new' | 'anonymous'
  const [devoteeType, setDevoteeType] = React.useState<'existing' | 'new' | 'anonymous'>('existing')
  const [selectedDevoteeId, setSelectedDevoteeId] = React.useState(devotees[0]?.id || '')
  const [newDonorName, setNewDonorName] = React.useState('')
  const [newDonorPhone, setNewDonorPhone] = React.useState('')
  const [newDonorPan, setNewDonorPan] = React.useState('')

  // Success Notification State
  const [successReceipt, setSuccessReceipt] = React.useState<{ num: string; url: string } | null>(null)

  // Filtered Donations
  const filteredDonations = donations.filter((d) => {
    const query = searchQuery.toLowerCase()
    const matchesSearch =
      (d.donorName && d.donorName.toLowerCase().includes(query)) ||
      (d.donorPhone && d.donorPhone.includes(query)) ||
      (d.receiptNumber && d.receiptNumber.toLowerCase().includes(query)) ||
      (d.categoryName && d.categoryName.toLowerCase().includes(query))

    const matchesMethod = methodFilter === 'ALL' || d.paymentMethod === methodFilter
    const matchesCategory = categoryFilter === 'ALL' || d.categoryName === categoryFilter

    return matchesSearch && matchesMethod && matchesCategory
  })

  // Submit manual donation
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!amount || parseFloat(amount) <= 0) return

    setSaving(true)

    try {
      const isAnonymous = devoteeType === 'anonymous'
      const payload = {
        amount: parseFloat(amount),
        categoryId: selectedCategory,
        devoteeId: devoteeType === 'existing' ? selectedDevoteeId : undefined,
        donorName: devoteeType === 'new' ? newDonorName : undefined,
        donorPhone: devoteeType === 'new' ? newDonorPhone : undefined,
        donorPan: devoteeType === 'new' ? newDonorPan : undefined,
        isAnonymous,
        paymentMethod,
        transactionRef: transactionRef || undefined,
        notes: notes || undefined,
      }

      const res = await createManualDonation(payload)

      if (res.success && 'receiptNumber' in res && 'pdfUrl' in res) {
        const data = res as { receiptNumber: string; pdfUrl: string }
        setSuccessReceipt({ num: data.receiptNumber, url: data.pdfUrl })
        // Clear Form fields
        setAmount('')
        setTransactionRef('')
        setNotes('')
        setNewDonorName('')
        setNewDonorPhone('')
        setNewDonorPan('')
      } else {
        alert(res.error || 'Failed to record donation transaction.')
      }
    } catch (err: any) {
      console.error(err)
      alert('Error recording transaction. Try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-heading text-2xl font-black text-stone-900">Donations & Receipts</h1>
          <p className="text-sm text-stone-500">Record off-line direct collections or inspect devotee payment histories.</p>
        </div>
        <Button
          className="gradient-primary text-white"
          leftIcon={<Plus className="h-4 w-4" />}
          onClick={() => {
            setSuccessReceipt(null)
            setIsModalOpen(true)
          }}
        >
          Record Offline Donation
        </Button>
      </div>

      {/* Filter Options */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center bg-white border border-stone-200/60 p-4 rounded-xl shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-stone-400" />
          <Input
            placeholder="Search by devotee, phone, receipt no..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="h-10 px-3.5 rounded-lg border border-stone-200 bg-white text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-saffron-500"
          >
            <option value="ALL">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>

          {/* Payment Method Filter */}
          <select
            value={methodFilter}
            onChange={(e) => setMethodFilter(e.target.value)}
            className="h-10 px-3.5 rounded-lg border border-stone-200 bg-white text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-saffron-500"
          >
            <option value="ALL">All Payment Methods</option>
            <option value="CASH">Cash</option>
            <option value="CHEQUE">Cheque</option>
            <option value="UPI">UPI</option>
            <option value="BANK_TRANSFER">Bank Transfer</option>
            <option value="RAZORPAY">Razorpay (Online)</option>
          </select>
        </div>
      </div>

      {/* Table Card */}
      <Card className="border-stone-200 bg-white overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-stone-100 bg-stone-50/70 text-stone-400 font-semibold text-xs tracking-wider uppercase">
                  <th className="py-4 px-6">Date</th>
                  <th className="py-4 px-6">Devotee Name</th>
                  <th className="py-4 px-6">Category</th>
                  <th className="py-4 px-6">Amount</th>
                  <th className="py-4 px-6">Channel</th>
                  <th className="py-4 px-6 text-right">Receipt / Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredDonations.length > 0 ? (
                  filteredDonations.map((d) => (
                    <tr key={d.id} className="hover:bg-stone-50/30 transition-colors">
                      <td className="py-4 px-6 font-medium text-stone-600">
                        {new Date(d.createdAt).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </td>
                      <td className="py-4 px-6 font-bold text-stone-900">
                        {d.donorName === 'Anonymous' ? (
                          <span className="text-stone-450 italic font-normal">Anonymous Devotee</span>
                        ) : (
                          d.donorName || d.devoteeName || 'Devotee'
                        )}
                        {d.donorPhone && (
                          <span className="block text-[11px] font-normal text-stone-400 mt-0.5">
                            {d.donorPhone}
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-stone-700 font-semibold">{d.categoryName}</td>
                      <td className="py-4 px-6 font-heading font-black text-saffron-800 text-base">
                        ₹{d.amount.toFixed(2)}
                      </td>
                      <td className="py-4 px-6">
                        <Badge
                          variant={
                            d.paymentMethod === 'RAZORPAY'
                              ? 'default'
                              : d.paymentMethod === 'CASH'
                              ? 'outline'
                              : 'secondary'
                          }
                          className="font-semibold text-[10px] tracking-wider"
                        >
                          {d.paymentMethod}
                        </Badge>
                      </td>
                      <td className="py-4 px-6 text-right">
                        {d.pdfUrl ? (
                          <a
                            href={d.pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg border border-stone-200 text-stone-750 font-bold hover:bg-stone-50 text-xs transition-all"
                          >
                            <FileText className="h-3.5 w-3.5 text-stone-500" />
                            <span>PDF Receipt</span>
                          </a>
                        ) : (
                          <span className="text-xs text-stone-400 italic">No receipt</span>
                        )}
                        <Button variant="ghost" size="sm" className="ml-2 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50" title="Generate AI Thank You Email">
                          ✨ AI Thanks
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-stone-400 italic">
                      No matching donations recorded in your workspace registry.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Manual Donation Dialog Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Record Walk-in Contribution"
        description="Manually record payments collected at the counter or directly via the trust bank account."
        size="lg"
      >
        {successReceipt ? (
          // Success Screen inside Modal
          <div className="text-center py-6 space-y-6">
            <div className="flex justify-center">
              <div className="h-16 w-16 bg-emerald-50 rounded-full flex items-center justify-center border border-emerald-100 animate-bounce">
                <CheckCircle className="h-10 w-10 text-emerald-500" />
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="font-heading text-lg font-bold text-stone-900">Donation Recorded Successfully!</h3>
              <p className="text-xs text-stone-500">
                Receipt Number: <span className="font-mono font-bold text-stone-800">{successReceipt.num}</span>
              </p>
            </div>
            <div className="flex justify-center gap-4">
              <a href={successReceipt.url} target="_blank" rel="noopener noreferrer">
                <Button className="gradient-primary text-white" leftIcon={<FileText className="h-4 w-4" />}>
                  Print / Save Receipt
                </Button>
              </a>
              <Button
                variant="outline"
                onClick={() => {
                  setSuccessReceipt(null)
                }}
              >
                Record Another
              </Button>
            </div>
          </div>
        ) : (
          // Main Form
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Amount & Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                type="number"
                label="Donation Amount (INR)"
                placeholder="₹ 501"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-550">Donation Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full h-10 px-3.5 rounded-lg border border-stone-200 bg-white text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-saffron-500"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Devotee Type Toggles */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-stone-550">Devotee Association</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'existing', label: 'CRM Member' },
                  { id: 'new', label: 'New Member' },
                  { id: 'anonymous', label: 'Anonymous' },
                ].map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setDevoteeType(type.id as any)}
                    className={`py-2 px-3 border rounded-lg text-xs font-semibold transition-all ${
                      devoteeType === type.id
                        ? 'border-saffron-500 bg-saffron-50 text-saffron-800'
                        : 'border-stone-200 hover:border-stone-300 text-stone-600'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Selection Inputs based on Toggles */}
            {devoteeType === 'existing' && (
              <div className="space-y-1 animate-fadeIn">
                <label className="text-xs font-semibold text-stone-550">Select Devotee from CRM</label>
                <select
                  value={selectedDevoteeId}
                  onChange={(e) => setSelectedDevoteeId(e.target.value)}
                  className="w-full h-10 px-3.5 rounded-lg border border-stone-200 bg-white text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-saffron-500"
                >
                  {devotees.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.fullName} {d.phone ? `(${d.phone})` : ''}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {devoteeType === 'new' && (
              <div className="space-y-4 bg-stone-50 p-4 rounded-lg border border-stone-200/50 animate-fadeIn">
                <Input
                  label="Full Name"
                  placeholder="e.g. Adavesh Sharma"
                  value={newDonorName}
                  onChange={(e) => setNewDonorName(e.target.value)}
                  leftIcon={<User className="h-4 w-4" />}
                  required
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    type="tel"
                    label="Phone Number"
                    placeholder="e.g. 9876543210"
                    value={newDonorPhone}
                    onChange={(e) => setNewDonorPhone(e.target.value)}
                    leftIcon={<Phone className="h-4 w-4" />}
                    required
                  />
                  <Input
                    label="PAN Number (Optional)"
                    placeholder="e.g. ABCDE1234F"
                    value={newDonorPan}
                    onChange={(e) => setNewDonorPan(e.target.value.toUpperCase())}
                  />
                </div>
              </div>
            )}

            {/* Payment Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-550">Payment Method</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full h-10 px-3.5 rounded-lg border border-stone-200 bg-white text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-saffron-500"
                >
                  <option value="CASH">Cash</option>
                  <option value="CHEQUE">Cheque</option>
                  <option value="UPI">Direct UPI</option>
                  <option value="BANK_TRANSFER">Bank Transfer</option>
                </select>
              </div>
              <Input
                label="Transaction Ref / Instrument Number"
                placeholder="e.g. UPI ID or Cheque No"
                value={transactionRef}
                onChange={(e) => setTransactionRef(e.target.value)}
              />
            </div>

            {/* Notes */}
            <Input
              label="Notes"
              placeholder="e.g. Annadanam seva support for family birth anniversary"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />

            {/* Footer Buttons */}
            <div className="flex justify-end space-x-3 border-t border-stone-100 pt-4">
              <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="gradient-primary text-white" loading={saving}>
                Record Transaction
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  )
}
