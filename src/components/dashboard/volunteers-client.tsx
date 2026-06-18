'use client'

import * as React from 'react'
import { Modal } from '@/components/ui/modal'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import {
  Users,
  Clock,
  CalendarCheck,
  UserCheck,
  Search,
  Plus,
  ChevronDown,
  ChevronUp,
  Phone,
  Mail,
  Award,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Filter,
  X,
  Loader2,
  ClipboardList,
} from 'lucide-react'

// ─── Types ──────────────────────────────────────────────────────────────────

interface Volunteer {
  id: string
  fullName: string
  phone: string
  email?: string
  status: 'ACTIVE' | 'INACTIVE' | 'PENDING'
  skills: string[]
  totalHours: number
  certificates?: Record<string, unknown>
  availability?: Record<string, boolean>
  createdAt: string
}

interface VolunteerAssignment {
  id: string
  volunteerName: string
  task: string
  eventName?: string
  hoursLogged: number
  status: 'ASSIGNED' | 'COMPLETED' | 'NO_SHOW'
  date?: string
}

interface Stats {
  totalVolunteers: number
  activeVolunteers: number
  totalHours: number
  totalAssignments: number
}

interface VolunteersClientProps {
  volunteers: Volunteer[]
  assignments: VolunteerAssignment[]
  stats: Stats
}

// ─── Constants ───────────────────────────────────────────────────────────────

const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const

const STATUS_CONFIG = {
  ACTIVE: { label: 'Active', variant: 'success' as const, icon: CheckCircle2 },
  PENDING: { label: 'Pending', variant: 'warning' as const, icon: AlertCircle },
  INACTIVE: { label: 'Inactive', variant: 'secondary' as const, icon: XCircle },
}

const ASSIGNMENT_STATUS_CONFIG = {
  ASSIGNED: { label: 'Assigned', variant: 'default' as const },
  COMPLETED: { label: 'Completed', variant: 'success' as const },
  NO_SHOW: { label: 'No Show', variant: 'destructive' as const },
}

// ─── Sub-Components ──────────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  icon: Icon,
  desc,
  accent = false,
}: {
  label: string
  value: string | number
  icon: React.ComponentType<{ className?: string }>
  desc: string
  accent?: boolean
}) {
  return (
    <Card className="border-stone-200 bg-white shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-5">
        <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider">{label}</span>
        <div
          className={`h-9 w-9 rounded-lg flex items-center justify-center ${
            accent ? 'bg-saffron-500/15' : 'bg-stone-100'
          }`}
        >
          <Icon className={`h-5 w-5 ${accent ? 'text-saffron-600' : 'text-stone-500'}`} />
        </div>
      </CardHeader>
      <CardContent className="px-5 pb-4">
        <p className="font-heading text-2xl font-black text-stone-900">{value}</p>
        <p className="text-xs text-stone-500 mt-0.5">{desc}</p>
      </CardContent>
    </Card>
  )
}

function SkillPill({ skill }: { skill: string }) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-saffron-50 text-saffron-700 border border-saffron-200">
      {skill}
    </span>
  )
}

// ─── Expandable Volunteer Row ────────────────────────────────────────────────

function VolunteerRow({ volunteer }: { volunteer: Volunteer }) {
  const [expanded, setExpanded] = React.useState(false)
  const cfg = STATUS_CONFIG[volunteer.status]
  const StatusIcon = cfg.icon

  const availableDays = DAYS_OF_WEEK.filter((d) => volunteer.availability?.[d])

  return (
    <>
      {/* Main row */}
      <tr
        className="border-b border-stone-100 hover:bg-stone-50/70 cursor-pointer transition-colors"
        onClick={() => setExpanded((p) => !p)}
      >
        {/* Name + expand toggle */}
        <td className="py-3.5 pl-4 pr-3">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-saffron-400 to-saffron-600 flex items-center justify-center shrink-0">
              <span className="text-white text-xs font-bold">
                {volunteer.fullName
                  .split(' ')
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join('')
                  .toUpperCase()}
              </span>
            </div>
            <div>
              <p className="font-semibold text-stone-800 text-sm">{volunteer.fullName}</p>
              <p className="text-xs text-stone-400">{volunteer.phone}</p>
            </div>
          </div>
        </td>

        {/* Skills */}
        <td className="py-3.5 px-3">
          <div className="flex flex-wrap gap-1 max-w-[220px]">
            {volunteer.skills.length === 0 ? (
              <span className="text-stone-400 text-xs">—</span>
            ) : (
              volunteer.skills.slice(0, 3).map((s) => <SkillPill key={s} skill={s} />)
            )}
            {volunteer.skills.length > 3 && (
              <span className="text-[11px] text-stone-400 font-medium self-center">
                +{volunteer.skills.length - 3}
              </span>
            )}
          </div>
        </td>

        {/* Status */}
        <td className="py-3.5 px-3">
          <Badge variant={cfg.variant} showDot>
            <StatusIcon className="h-3 w-3 mr-1" />
            {cfg.label}
          </Badge>
        </td>

        {/* Hours */}
        <td className="py-3.5 px-3 text-stone-700 text-sm font-semibold">
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5 text-stone-400" />
            {volunteer.totalHours} hrs
          </span>
        </td>

        {/* Expand chevron */}
        <td className="py-3.5 pr-4 pl-3 text-right">
          <button
            className="p-1 rounded hover:bg-stone-200 transition-colors text-stone-400"
            aria-label={expanded ? 'Collapse' : 'Expand'}
          >
            {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
        </td>
      </tr>

      {/* Expanded details row */}
      {expanded && (
        <tr className="bg-saffron-50/40 border-b border-saffron-100">
          <td colSpan={5} className="px-5 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              {/* Contact */}
              <div className="space-y-2">
                <p className="text-xs font-bold text-stone-500 uppercase tracking-wider">Contact</p>
                <div className="flex items-center gap-2 text-stone-700">
                  <Phone className="h-3.5 w-3.5 text-saffron-500" />
                  <span>{volunteer.phone}</span>
                </div>
                {volunteer.email && (
                  <div className="flex items-center gap-2 text-stone-700">
                    <Mail className="h-3.5 w-3.5 text-saffron-500" />
                    <span>{volunteer.email}</span>
                  </div>
                )}
              </div>

              {/* Availability */}
              <div className="space-y-2">
                <p className="text-xs font-bold text-stone-500 uppercase tracking-wider">Availability</p>
                {availableDays.length === 0 ? (
                  <p className="text-stone-400 text-xs">Not specified</p>
                ) : (
                  <div className="flex flex-wrap gap-1">
                    {availableDays.map((d) => (
                      <span
                        key={d}
                        className="text-[11px] px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-semibold border border-green-200"
                      >
                        {d.slice(0, 3)}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Skills full list */}
              <div className="space-y-2">
                <p className="text-xs font-bold text-stone-500 uppercase tracking-wider">All Skills</p>
                {volunteer.skills.length === 0 ? (
                  <p className="text-stone-400 text-xs">No skills listed</p>
                ) : (
                  <div className="flex flex-wrap gap-1">
                    {volunteer.skills.map((s) => (
                      <SkillPill key={s} skill={s} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  )
}

// ─── Assignments Tab ─────────────────────────────────────────────────────────

function AssignmentsTab({ assignments }: { assignments: VolunteerAssignment[] }) {
  const [statusFilter, setStatusFilter] = React.useState<'ALL' | 'ASSIGNED' | 'COMPLETED' | 'NO_SHOW'>('ALL')

  const filtered =
    statusFilter === 'ALL' ? assignments : assignments.filter((a) => a.status === statusFilter)

  return (
    <div className="space-y-4">
      {/* Filter pills */}
      <div className="flex flex-wrap gap-2">
        {(['ALL', 'ASSIGNED', 'COMPLETED', 'NO_SHOW'] as const).map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`px-3.5 py-1.5 rounded-lg border text-xs font-bold transition-all ${
              statusFilter === s
                ? 'bg-saffron-550 text-white border-saffron-600 shadow-sm'
                : 'bg-white text-stone-600 border-stone-200 hover:border-saffron-300 hover:text-saffron-700'
            }`}
          >
            {s === 'ALL' ? 'All' : s === 'NO_SHOW' ? 'No Show' : s.charAt(0) + s.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={ClipboardList}
          title="No assignments found"
          desc="Volunteer assignments for sevas and events will appear here."
        />
      ) : (
        <div className="overflow-x-auto rounded-xl border border-stone-200 bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-stone-100 bg-stone-50/60">
                <th className="text-left text-xs font-semibold text-stone-400 uppercase tracking-wider py-3 pl-5 pr-3">
                  Volunteer
                </th>
                <th className="text-left text-xs font-semibold text-stone-400 uppercase tracking-wider py-3 px-3">
                  Task
                </th>
                <th className="text-left text-xs font-semibold text-stone-400 uppercase tracking-wider py-3 px-3">
                  Event
                </th>
                <th className="text-left text-xs font-semibold text-stone-400 uppercase tracking-wider py-3 px-3">
                  Hours
                </th>
                <th className="text-left text-xs font-semibold text-stone-400 uppercase tracking-wider py-3 pl-3 pr-5">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((a) => {
                const cfg = ASSIGNMENT_STATUS_CONFIG[a.status]
                return (
                  <tr key={a.id} className="border-b border-stone-50 hover:bg-stone-50/60 transition-colors">
                    <td className="py-3.5 pl-5 pr-3 font-medium text-stone-800">{a.volunteerName}</td>
                    <td className="py-3.5 px-3 text-stone-600">{a.task}</td>
                    <td className="py-3.5 px-3 text-stone-500">{a.eventName || '—'}</td>
                    <td className="py-3.5 px-3 text-stone-700 font-semibold">
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3 w-3 text-stone-400" />
                        {a.hoursLogged} hrs
                      </span>
                    </td>
                    <td className="py-3.5 pl-3 pr-5">
                      <Badge variant={cfg.variant} size="sm">
                        {cfg.label}
                      </Badge>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

// ─── Add Volunteer Form ───────────────────────────────────────────────────────

function AddVolunteerTab({ onSuccess }: { onSuccess: (v: Volunteer) => void }) {
  const [fullName, setFullName] = React.useState('')
  const [phone, setPhone] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [skillInput, setSkillInput] = React.useState('')
  const [skills, setSkills] = React.useState<string[]>([])
  const [availability, setAvailability] = React.useState<Record<string, boolean>>(
    Object.fromEntries(DAYS_OF_WEEK.map((d) => [d, false]))
  )
  const [saving, setSaving] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [successMsg, setSuccessMsg] = React.useState<string | null>(null)

  const addSkill = () => {
    const trimmed = skillInput.trim()
    if (!trimmed) return
    const parts = trimmed.split(',').map((s) => s.trim()).filter(Boolean)
    setSkills((prev) => Array.from(new Set([...prev, ...parts])))
    setSkillInput('')
  }

  const removeSkill = (s: string) => setSkills((prev) => prev.filter((x) => x !== s))

  const toggleDay = (day: string) =>
    setAvailability((prev) => ({ ...prev, [day]: !prev[day] }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccessMsg(null)

    if (!fullName.trim() || !phone.trim()) {
      setError('Full name and phone number are required.')
      return
    }

    setSaving(true)
    try {
      const res = await fetch('/api/v1/volunteers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: fullName.trim(),
          phone: phone.trim(),
          email: email.trim() || undefined,
          skills,
          availability,
        }),
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Failed to add volunteer.')
      } else {
        setSuccessMsg('Volunteer added successfully!')
        setFullName('')
        setPhone('')
        setEmail('')
        setSkills([])
        setAvailability(Object.fromEntries(DAYS_OF_WEEK.map((d) => [d, false])))
        onSuccess({
          id: data.volunteerId,
          fullName: fullName.trim(),
          phone: phone.trim(),
          email: email.trim() || undefined,
          status: 'ACTIVE',
          skills,
          totalHours: 0,
          availability,
          createdAt: new Date().toISOString(),
        })
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Unexpected error. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="border-stone-200 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="font-heading text-lg font-bold text-stone-900 flex items-center gap-2">
            <Plus className="h-5 w-5 text-saffron-600" />
            Register New Volunteer
          </CardTitle>
          <CardDescription>
            Add a new seva volunteer to your temple roster. They will be linked to a devotee profile.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="flex items-start gap-2 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}
            {successMsg && (
              <div className="flex items-start gap-2 p-3 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm">
                <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            {/* Personal Info */}
            <div>
              <p className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-3">Personal Information</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-stone-700">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    placeholder="e.g. Ramesh Kumar"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-stone-700">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <Input
                    placeholder="e.g. +91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    type="tel"
                  />
                </div>
              </div>
              <div className="space-y-1.5 mt-4">
                <label className="text-sm font-semibold text-stone-700">Email (Optional)</label>
                <Input
                  placeholder="volunteer@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                />
              </div>
            </div>

            {/* Skills */}
            <div>
              <p className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-3">Skills &amp; Expertise</p>
              <div className="flex gap-2">
                <Input
                  placeholder="e.g. Cooking, Logistics, IT — press Enter or comma to add"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') { e.preventDefault(); addSkill() }
                    if (e.key === ',') { e.preventDefault(); addSkill() }
                  }}
                  className="flex-1"
                />
                <Button type="button" variant="outline" onClick={addSkill} className="shrink-0">
                  Add
                </Button>
              </div>
              {skills.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {skills.map((s) => (
                    <span
                      key={s}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-saffron-50 text-saffron-700 border border-saffron-200 text-xs font-semibold"
                    >
                      {s}
                      <button
                        type="button"
                        onClick={() => removeSkill(s)}
                        className="hover:text-red-500 transition-colors ml-0.5"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Availability */}
            <div>
              <p className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-3">Weekly Availability</p>
              <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                {DAYS_OF_WEEK.map((day) => (
                  <button
                    key={day}
                    type="button"
                    onClick={() => toggleDay(day)}
                    className={`py-2 rounded-xl border text-xs font-bold text-center transition-all ${
                      availability[day]
                        ? 'bg-saffron-500 text-white border-saffron-600 shadow-sm shadow-saffron-400/30'
                        : 'bg-white text-stone-500 border-stone-200 hover:border-saffron-300 hover:text-saffron-600'
                    }`}
                  >
                    {day.slice(0, 3)}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit */}
            <div className="pt-2">
              <Button
                type="submit"
                loading={saving}
                className="w-full sm:w-auto"
                leftIcon={<UserCheck className="h-4 w-4" />}
              >
                {saving ? 'Registering…' : 'Register Volunteer'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

// ─── Empty State ─────────────────────────────────────────────────────────────

function EmptyState({
  icon: Icon,
  title,
  desc,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  desc: string
}) {
  return (
    <div className="text-center py-20 space-y-3">
      <div className="h-16 w-16 rounded-2xl bg-stone-100 flex items-center justify-center mx-auto">
        <Icon className="h-8 w-8 text-stone-400" />
      </div>
      <p className="font-heading text-base font-bold text-stone-700">{title}</p>
      <p className="text-sm text-stone-400 max-w-sm mx-auto">{desc}</p>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

type Tab = 'volunteers' | 'assignments' | 'add'

export default function VolunteersClient({
  volunteers: initialVolunteers,
  assignments,
  stats: initialStats,
}: VolunteersClientProps) {
  const [activeTab, setActiveTab] = React.useState<Tab>('volunteers')
  const [volunteers, setVolunteers] = React.useState<Volunteer[]>(initialVolunteers)
  const [stats, setStats] = React.useState<Stats>(initialStats)

  const [searchQuery, setSearchQuery] = React.useState('')
  const [statusFilter, setStatusFilter] = React.useState<'ALL' | 'ACTIVE' | 'INACTIVE' | 'PENDING'>('ALL')

  const filteredVolunteers = React.useMemo(() => {
    let result = [...volunteers]

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (v) =>
          v.fullName.toLowerCase().includes(q) ||
          v.phone.includes(q) ||
          (v.email && v.email.toLowerCase().includes(q)) ||
          v.skills.some((s) => s.toLowerCase().includes(q))
      )
    }

    if (statusFilter !== 'ALL') {
      result = result.filter((v) => v.status === statusFilter)
    }

    return result
  }, [volunteers, searchQuery, statusFilter])

  const handleVolunteerAdded = (v: Volunteer) => {
    setVolunteers((prev) => [v, ...prev])
    setStats((prev) => ({
      ...prev,
      totalVolunteers: prev.totalVolunteers + 1,
      activeVolunteers: prev.activeVolunteers + 1,
    }))
    setActiveTab('volunteers')
  }

  const tabs: { id: Tab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'volunteers', label: 'All Volunteers', icon: Users },
    { id: 'assignments', label: 'Assignments', icon: ClipboardList },
    { id: 'add', label: 'Add Volunteer', icon: Plus },
  ]

  return (
    <div className="space-y-6">
      {/* Stats Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Volunteers"
          value={stats.totalVolunteers}
          icon={Users}
          desc="Enrolled seva volunteers"
          accent
        />
        <StatCard
          label="Active"
          value={stats.activeVolunteers}
          icon={UserCheck}
          desc="Currently active volunteers"
          accent
        />
        <StatCard
          label="Hours Logged"
          value={stats.totalHours}
          icon={Clock}
          desc="Total seva hours contributed"
        />
        <StatCard
          label="Assignments"
          value={stats.totalAssignments}
          icon={CalendarCheck}
          desc="Total task assignments"
        />
      </div>

      {/* Tab Navigation + Content */}
      <div className="bg-white border border-stone-200 rounded-xl shadow-sm overflow-hidden">
        {/* Tab bar */}
        <div className="flex border-b border-stone-100">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-3.5 text-sm font-semibold transition-all border-b-2 ${
                  activeTab === tab.id
                    ? 'border-saffron-500 text-saffron-700 bg-saffron-50/40'
                    : 'border-transparent text-stone-500 hover:text-stone-800 hover:bg-stone-50'
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
                {tab.id === 'volunteers' && (
                  <span
                    className={`ml-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                      activeTab === 'volunteers'
                        ? 'bg-saffron-100 text-saffron-700'
                        : 'bg-stone-100 text-stone-500'
                    }`}
                  >
                    {volunteers.length}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* Tab content */}
        <div className="p-5">
          {/* ── All Volunteers Tab ─────────────────────────── */}
          {activeTab === 'volunteers' && (
            <div className="space-y-4">
              {/* Search + filter bar */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-3 h-4 w-4 text-stone-400" />
                  <Input
                    placeholder="Search by name, phone, or skill…"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <Filter className="h-4 w-4 text-stone-400 shrink-0" />
                  {(['ALL', 'ACTIVE', 'PENDING', 'INACTIVE'] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => setStatusFilter(s)}
                      className={`px-3 py-2 rounded-lg border text-xs font-bold transition-all ${
                        statusFilter === s
                          ? 'bg-saffron-550 text-white border-saffron-600'
                          : 'bg-white text-stone-600 border-stone-200 hover:border-saffron-300'
                      }`}
                    >
                      {s === 'ALL' ? 'All' : s.charAt(0) + s.slice(1).toLowerCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Table or empty */}
              {filteredVolunteers.length === 0 ? (
                searchQuery || statusFilter !== 'ALL' ? (
                  <div className="text-center py-14 text-stone-400 text-sm">
                    No volunteers match your search or filter.
                  </div>
                ) : (
                  <EmptyState
                    icon={UserCheck}
                    title="No Volunteers Enrolled Yet"
                    desc="Add seva volunteers from the 'Add Volunteer' tab or let devotees sign up online."
                  />
                )
              ) : (
                <div className="overflow-x-auto rounded-xl border border-stone-200">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-stone-100 bg-stone-50/60">
                        <th className="text-left text-xs font-semibold text-stone-400 uppercase tracking-wider py-3 pl-4 pr-3">
                          Volunteer
                        </th>
                        <th className="text-left text-xs font-semibold text-stone-400 uppercase tracking-wider py-3 px-3">
                          Skills
                        </th>
                        <th className="text-left text-xs font-semibold text-stone-400 uppercase tracking-wider py-3 px-3">
                          Status
                        </th>
                        <th className="text-left text-xs font-semibold text-stone-400 uppercase tracking-wider py-3 px-3">
                          Hours
                        </th>
                        <th className="py-3 pr-4" />
                      </tr>
                    </thead>
                    <tbody>
                      {filteredVolunteers.map((v) => (
                        <VolunteerRow key={v.id} volunteer={v} />
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ── Assignments Tab ────────────────────────────── */}
          {activeTab === 'assignments' && <AssignmentsTab assignments={assignments} />}

          {/* ── Add Volunteer Tab ──────────────────────────── */}
          {activeTab === 'add' && <AddVolunteerTab onSuccess={handleVolunteerAdded} />}
        </div>
      </div>
    </div>
  )
}
