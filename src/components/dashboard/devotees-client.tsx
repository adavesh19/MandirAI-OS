'use client'

import * as React from 'react'
import { Modal } from '@/components/ui/modal'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { upsertDevotee } from '@/app/(platform)/actions'
import { Plus, Search, User, Phone, Mail, Award, Calendar, FileText, X, Sparkles, Filter } from 'lucide-react'

interface DonationHistoryItem {
  id: string
  amount: number
  createdAt: string
  categoryName: string
}

interface Devotee {
  id: string
  fullName: string
  phone: string | null
  email: string | null
  dateOfBirth: string | null
  anniversary: string | null
  gotra: string | null
  nakshatra: string | null
  notes: string | null
  totalDonated: number
  visitCount: number
  lastVisitAt: string | null
  createdAt: string
  donations: DonationHistoryItem[]
}

interface DevoteesClientProps {
  devotees: Devotee[]
}

export default function DevoteesClient({ devotees }: DevoteesClientProps) {
  // Search & Filter State
  const [searchQuery, setSearchQuery] = React.useState('')
  const [crmFilter, setCrmFilter] = React.useState<'ALL' | 'TOP_DONORS' | 'BIRTHDAYS'>('ALL')

  // Modal State
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [saving, setSaving] = React.useState(false)

  // Devotee History Drawer State
  const [viewingDevotee, setViewingDevotee] = React.useState<Devotee | null>(null)

  // Edit State
  const [editingDevoteeId, setEditingDevoteeId] = React.useState<string | undefined>(undefined)

  // Form State
  const [fullName, setFullName] = React.useState('')
  const [phone, setPhone] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [dob, setDob] = React.useState('')
  const [anniversary, setAnniversary] = React.useState('')
  const [gotra, setGotra] = React.useState('')
  const [nakshatra, setNakshatra] = React.useState('')
  const [notes, setNotes] = React.useState('')

  // Filter Devotees
  const filteredDevotees = React.useMemo(() => {
    let result = [...devotees]

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (d) =>
          d.fullName.toLowerCase().includes(q) ||
          (d.phone && d.phone.includes(q)) ||
          (d.email && d.email.toLowerCase().includes(q)) ||
          (d.gotra && d.gotra.toLowerCase().includes(q)) ||
          (d.nakshatra && d.nakshatra.toLowerCase().includes(q))
      )
    }

    // Role specific filter
    if (crmFilter === 'TOP_DONORS') {
      result.sort((a, b) => b.totalDonated - a.totalDonated)
    } else if (crmFilter === 'BIRTHDAYS') {
      const currentMonth = new Date().getMonth() + 1
      result = result.filter((d) => {
        if (!d.dateOfBirth) return false
        const birthMonth = new Date(d.dateOfBirth).getMonth() + 1
        return birthMonth === currentMonth
      })
    }

    return result
  }, [devotees, searchQuery, crmFilter])

  // Open modal for adding a new devotee
  const handleOpenAdd = () => {
    setEditingDevoteeId(undefined)
    setFullName('')
    setPhone('')
    setEmail('')
    setDob('')
    setAnniversary('')
    setGotra('')
    setNakshatra('')
    setNotes('')
    setIsModalOpen(true)
  }

  // Open modal for editing existing devotee
  const handleOpenEdit = (d: Devotee) => {
    setEditingDevoteeId(d.id)
    setFullName(d.fullName)
    setPhone(d.phone || '')
    setEmail(d.email || '')
    setDob(d.dateOfBirth || '')
    setAnniversary(d.anniversary || '')
    setGotra(d.gotra || '')
    setNakshatra(d.nakshatra || '')
    setNotes(d.notes || '')
    setIsModalOpen(true)
  }

  // Handle Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!fullName) return

    setSaving(true)

    try {
      const payload = {
        id: editingDevoteeId,
        fullName,
        phone: phone || undefined,
        email: email || undefined,
        dateOfBirth: dob || undefined,
        anniversary: anniversary || undefined,
        gotra: gotra || undefined,
        nakshatra: nakshatra || undefined,
        notes: notes || undefined,
      }

      const res = await upsertDevotee(payload)

      if (res.success) {
        setIsModalOpen(false)
      } else {
        alert(res.error || 'Failed to save devotee profile.')
      }
    } catch (err: any) {
      console.error(err)
      alert('Error saving profile. Try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-heading text-2xl font-black text-stone-900">Devotee CRM</h1>
          <p className="text-sm text-stone-500">Manage devotee directory, track gotra/nakshatra, and inspect contribution levels.</p>
        </div>
        <Button
          className="gradient-primary text-white"
          leftIcon={<Plus className="h-4 w-4" />}
          onClick={handleOpenAdd}
        >
          Add Devotee Profile
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center bg-white border border-stone-200/60 p-4 rounded-xl shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-stone-400" />
          <Input
            placeholder="Search by devotee, phone, gotra, nakshatra..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Segmentation filters */}
        <div className="flex gap-2">
          {[
            { id: 'ALL', label: 'All Devotees', icon: <User className="h-3.5 w-3.5" /> },
            { id: 'TOP_DONORS', label: 'Top Contributors', icon: <Award className="h-3.5 w-3.5 text-amber-500" /> },
            { id: 'BIRTHDAYS', label: 'Birthdays This Month', icon: <Sparkles className="h-3.5 w-3.5 text-saffron-550" /> },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setCrmFilter(item.id as any)}
              className={`flex items-center space-x-1.5 h-10 px-3.5 rounded-lg border text-xs font-bold transition-all ${
                crmFilter === item.id
                  ? 'border-saffron-500 bg-saffron-50/50 text-saffron-850 shadow-sm ring-1 ring-saffron-500'
                  : 'border-stone-200 bg-white hover:border-stone-300 text-stone-600'
              }`}
            >
              {item.icon}
              <span className="hidden sm:inline">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* CRM Directory Table */}
      <Card className="border-stone-200 bg-white overflow-hidden shadow-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-stone-100 bg-stone-50/70 text-stone-400 font-semibold text-xs tracking-wider uppercase">
                  <th className="py-4 px-6">Name & Lineage</th>
                  <th className="py-4 px-6">Contact details</th>
                  <th className="py-4 px-6">Contributions</th>
                  <th className="py-4 px-6">Visits</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredDevotees.length > 0 ? (
                  filteredDevotees.map((d) => (
                    <tr key={d.id} className="hover:bg-stone-50/30 transition-colors">
                      <td className="py-4 px-6">
                        <div className="font-bold text-stone-900 text-sm">{d.fullName}</div>
                        {(d.gotra || d.nakshatra) && (
                          <div className="flex flex-wrap gap-1.5 mt-1.5">
                            {d.gotra && (
                              <Badge variant="outline" className="text-[10px] py-0.5 border-stone-250 bg-stone-50 font-semibold">
                                Gotra: {d.gotra}
                              </Badge>
                            )}
                            {d.nakshatra && (
                              <Badge variant="outline" className="text-[10px] py-0.5 border-saffron-200 bg-saffron-50/30 text-saffron-800 font-semibold">
                                Nakshatra: {d.nakshatra}
                              </Badge>
                            )}
                          </div>
                        )}
                      </td>
                      <td className="py-4 px-6 space-y-1">
                        {d.phone ? (
                          <div className="flex items-center space-x-1.5 text-xs text-stone-605 font-medium">
                            <Phone className="h-3 w-3 text-stone-400 shrink-0" />
                            <span>{d.phone}</span>
                          </div>
                        ) : (
                          <div className="text-xs text-stone-350 italic">No phone</div>
                        )}
                        {d.email && (
                          <div className="flex items-center space-x-1.5 text-xs text-stone-450 font-normal">
                            <Mail className="h-3 w-3 text-stone-400 shrink-0" />
                            <span>{d.email}</span>
                          </div>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        <div className="font-heading font-black text-saffron-900 text-sm">
                          ₹{d.totalDonated.toFixed(2)}
                        </div>
                        {d.totalDonated > 0 && (
                          <span className="text-[10px] text-stone-400">Total offline/online</span>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        <div className="font-semibold text-stone-700 text-xs">{d.visitCount} visits</div>
                        {d.lastVisitAt && (
                          <span className="text-[10px] text-stone-400 block mt-0.5">
                            Last: {new Date(d.lastVisitAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-right space-x-2">
                        <button
                          onClick={() => setViewingDevotee(d)}
                          className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg border border-stone-250 text-stone-750 font-bold hover:bg-stone-55 text-xs transition-all"
                        >
                          <FileText className="h-3.5 w-3.5 text-stone-500" />
                          <span>History ({d.donations.length})</span>
                        </button>
                        <button
                          onClick={() => handleOpenEdit(d)}
                          className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg border border-saffron-200 text-saffron-850 hover:bg-saffron-50/50 font-bold text-xs transition-all"
                        >
                          <span>Edit</span>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-stone-400 italic">
                      No matching devotee records in your CRM registry.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Add / Edit Devotee Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingDevoteeId ? 'Edit Devotee Profile' : 'Add New Devotee Profile'}
        description="Fill in devotee details to establish CRM profiles, gotra tracking, and birthdays."
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              placeholder="e.g. Ramesh Hegde"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
            <Input
              type="tel"
              label="Phone Number"
              placeholder="e.g. 9988776655"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              type="email"
              label="Email Address"
              placeholder="e.g. ramesh@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-550">Gotra</label>
                <Input
                  placeholder="Kashyapa"
                  value={gotra}
                  onChange={(e) => setGotra(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-550">Nakshatra</label>
                <Input
                  placeholder="Ashwini"
                  value={nakshatra}
                  onChange={(e) => setNakshatra(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              type="date"
              label="Date of Birth"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
            <Input
              type="date"
              label="Anniversary Date"
              value={anniversary}
              onChange={(e) => setAnniversary(e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-stone-550">Notes / Remarks</label>
            <textarea
              placeholder="e.g. Regular volunteer for Annadanam service. Prefers Kannada communications."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="w-full rounded-lg border border-stone-200 p-3 text-sm focus:outline-none focus:ring-1 focus:ring-saffron-500"
            />
          </div>

          {/* Action buttons */}
          <div className="flex justify-end space-x-3 border-t border-stone-100 pt-4">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="gradient-primary text-white" loading={saving}>
              {editingDevoteeId ? 'Update Profile' : 'Create Profile'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Devotee Donation History Drawer Modal */}
      <Modal
        isOpen={!!viewingDevotee}
        onClose={() => setViewingDevotee(null)}
        title={viewingDevotee ? `${viewingDevotee.fullName} — Donation History` : 'History'}
        description="List of all completed offline and online donations connected to this profile."
        size="lg"
      >
        {viewingDevotee && (
          <div className="space-y-6">
            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-4 bg-stone-50 p-4 rounded-xl border border-stone-200/50">
              <div>
                <span className="text-[10px] text-stone-400 block font-semibold">Total Donated</span>
                <span className="font-heading font-black text-saffron-900 text-sm sm:text-base">
                  ₹{viewingDevotee.totalDonated.toFixed(2)}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-stone-400 block font-semibold">Total Payments</span>
                <span className="font-bold text-stone-800 text-sm sm:text-base">
                  {viewingDevotee.donations.length} records
                </span>
              </div>
              <div>
                <span className="text-[10px] text-stone-400 block font-semibold">Visit Count</span>
                <span className="font-bold text-stone-850 text-sm sm:text-base">
                  {viewingDevotee.visitCount} visits
                </span>
              </div>
            </div>

            {/* Donation List */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {viewingDevotee.donations.length > 0 ? (
                viewingDevotee.donations.map((don) => (
                  <div
                    key={don.id}
                    className="flex justify-between items-center border border-stone-150 p-3 rounded-lg hover:border-stone-300 transition-all bg-white"
                  >
                    <div>
                      <div className="font-bold text-stone-850 text-xs">{don.categoryName}</div>
                      <div className="text-[10px] text-stone-400 mt-0.5">
                        {new Date(don.createdAt).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </div>
                    </div>
                    <div className="font-heading font-black text-saffron-850">
                      ₹{don.amount.toFixed(2)}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-xs text-stone-400 italic py-6">
                  No contributions recorded under this devotee profile.
                </div>
              )}
            </div>

            {/* Close */}
            <div className="flex justify-end border-t border-stone-100 pt-4">
              <Button onClick={() => setViewingDevotee(null)}>Close History</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
