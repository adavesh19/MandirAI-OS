'use client'

import * as React from 'react'
import { Modal } from '@/components/ui/modal'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { createSevaOrEvent } from '@/app/(platform)/actions'
import { Plus, Calendar, Clock, Landmark, Users, MapPin, Tag, Grid, List, PlusCircle } from 'lucide-react'

interface Seva {
  id: string
  name: string
  description: string
  price: number
  durationMinutes: number
  isActive: boolean
}

interface CalendarEvent {
  id: string
  title: string
  description: string
  eventType: string
  startDate: string
  endDate: string
  location: string
  maxRegistrations: number | null
  registrationCount: number
  isFree: boolean
  ticketPrice: number | null
  status: string
}

interface EventsClientProps {
  sevas: Seva[]
  events: CalendarEvent[]
}

export default function EventsClient({ sevas, events }: EventsClientProps) {
  // Tab control: 'sevas' | 'events'
  const [activeTab, setActiveTab] = React.useState<'sevas' | 'events'>('sevas')

  // Modal State
  const [isSevaModalOpen, setIsSevaModalOpen] = React.useState(false)
  const [isEventModalOpen, setIsEventModalOpen] = React.useState(false)
  const [saving, setSaving] = React.useState(false)

  // Seva Form State
  const [sevaName, setSevaName] = React.useState('')
  const [sevaDesc, setSevaDesc] = React.useState('')
  const [sevaPrice, setSevaPrice] = React.useState('')
  const [sevaDuration, setSevaDuration] = React.useState('30')

  // Event Form State
  const [eventTitle, setEventTitle] = React.useState('')
  const [eventDesc, setEventDesc] = React.useState('')
  const [eventType, setEventType] = React.useState('FESTIVAL')
  const [eventStart, setEventStart] = React.useState('')
  const [eventEnd, setEventEnd] = React.useState('')
  const [eventLoc, setEventLoc] = React.useState('')
  const [eventMaxReg, setEventMaxReg] = React.useState('')
  const [eventIsFree, setEventIsFree] = React.useState(true)
  const [eventPrice, setEventPrice] = React.useState('')

  // Submit Seva Offering
  const handleSevaSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!sevaName || Number(sevaPrice) < 0 || !sevaDuration) return

    setSaving(true)

    try {
      const res = await createSevaOrEvent({
        type: 'seva',
        sevaData: {
          name: sevaName,
          description: sevaDesc,
          price: Number(sevaPrice),
          durationMinutes: Number(sevaDuration),
        },
      })

      if (res.success) {
        setIsSevaModalOpen(false)
        setSevaName('')
        setSevaDesc('')
        setSevaPrice('')
        setSevaDuration('30')
      } else {
        alert(res.error || 'Failed to register seva offering.')
      }
    } catch (err: any) {
      console.error(err)
      alert('Error creating offering. Try again.')
    } finally {
      setSaving(false)
    }
  }

  // Submit Calendar Event
  const handleEventSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!eventTitle || !eventStart || !eventEnd) return

    setSaving(true)

    try {
      const res = await createSevaOrEvent({
        type: 'event',
        eventData: {
          title: eventTitle,
          description: eventDesc,
          eventType,
          startDate: eventStart,
          endDate: eventEnd,
          location: eventLoc || undefined,
          maxRegistrations: eventMaxReg ? Number(eventMaxReg) : undefined,
          isFree: eventIsFree,
          ticketPrice: !eventIsFree && eventPrice ? Number(eventPrice) : undefined,
        },
      })

      if (res.success) {
        setIsEventModalOpen(false)
        setEventTitle('')
        setEventDesc('')
        setEventLoc('')
        setEventMaxReg('')
        setEventStart('')
        setEventEnd('')
        setEventPrice('')
        setEventIsFree(true)
      } else {
        alert(res.error || 'Failed to schedule calendar event.')
      }
    } catch (err: any) {
      console.error(err)
      alert('Error scheduling calendar event. Try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-heading text-2xl font-black text-stone-900">Sevas & Events Planner</h1>
          <p className="text-sm text-stone-500">Configure seva price listings or schedule upcoming temple festival calendars.</p>
        </div>
        <div className="flex space-x-2">
          {activeTab === 'sevas' ? (
            <Button
              className="gradient-primary text-white"
              leftIcon={<Plus className="h-4 w-4" />}
              onClick={() => setIsSevaModalOpen(true)}
            >
              Add Seva Offering
            </Button>
          ) : (
            <Button
              className="gradient-primary text-white"
              leftIcon={<Calendar className="h-4 w-4" />}
              onClick={() => setIsEventModalOpen(true)}
            >
              Schedule Event
            </Button>
          )}
        </div>
      </div>

      {/* Tabs Selector */}
      <div className="flex border-b border-stone-200">
        <button
          onClick={() => setActiveTab('sevas')}
          className={`pb-4 px-6 font-heading text-sm font-bold border-b-2 transition-all flex items-center space-x-2 ${
            activeTab === 'sevas'
              ? 'border-saffron-500 text-saffron-800'
              : 'border-transparent text-stone-400 hover:text-stone-700'
          }`}
        >
          <Grid className="h-4 w-4" />
          <span>Active Sevas & Poojas ({sevas.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('events')}
          className={`pb-4 px-6 font-heading text-sm font-bold border-b-2 transition-all flex items-center space-x-2 ${
            activeTab === 'events'
              ? 'border-saffron-500 text-saffron-800'
              : 'border-transparent text-stone-400 hover:text-stone-700'
          }`}
        >
          <Calendar className="h-4 w-4" />
          <span>Calendar Events ({events.length})</span>
        </button>
      </div>

      {/* 1. SEVAS LIST TAB */}
      {activeTab === 'sevas' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sevas.length > 0 ? (
            sevas.map((s) => (
              <Card key={s.id} className="border-stone-200 bg-white hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="font-heading text-base font-bold text-stone-900 leading-tight">
                      {s.name}
                    </CardTitle>
                    <Badge variant={s.isActive ? 'secondary' : 'outline'} className="text-[9px] font-bold tracking-wider">
                      {s.isActive ? 'Active' : 'Suspended'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 pt-1 flex-1 flex flex-col justify-between">
                  <p className="text-xs text-stone-500 line-clamp-3">
                    {s.description || 'No description provided. Support the temple offerings.'}
                  </p>
                  
                  <div className="flex justify-between items-center border-t border-stone-100 pt-3">
                    <div className="flex items-center space-x-1.5 text-xs text-stone-450 font-semibold">
                      <Clock className="h-3.5 w-3.5 text-stone-400" />
                      <span>{s.durationMinutes} mins</span>
                    </div>
                    <div className="font-heading font-black text-saffron-700 text-lg">
                      ₹{s.price.toFixed(2)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full py-16 bg-white border border-stone-200/60 rounded-2xl text-center text-stone-400 italic">
              No seva offerings configured in your workspace library. Click Add Seva Offering to register one.
            </div>
          )}
        </div>
      )}

      {/* 2. CALENDAR EVENTS TAB */}
      {activeTab === 'events' && (
        <div className="space-y-4">
          {events.length > 0 ? (
            events.map((e) => (
              <div
                key={e.id}
                className="bg-white border border-stone-200 p-5 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:shadow-sm transition-all relative"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center space-x-2.5">
                    <h3 className="font-heading text-base font-bold text-stone-900 leading-tight">
                      {e.title}
                    </h3>
                    <Badge className="text-[9px] tracking-wide uppercase font-bold bg-saffron-500/10 text-saffron-700 hover:bg-saffron-500/10 border-0">
                      {e.eventType}
                    </Badge>
                  </div>
                  
                  {e.description && (
                    <p className="text-xs text-stone-500 line-clamp-1">{e.description}</p>
                  )}

                  <div className="flex flex-wrap gap-x-4 gap-y-1.5 pt-1.5">
                    <div className="flex items-center space-x-1.5 text-xs text-stone-400 font-medium">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>
                        {new Date(e.startDate).toLocaleString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                    {e.location && (
                      <div className="flex items-center space-x-1.5 text-xs text-stone-400 font-medium">
                        <MapPin className="h-3.5 w-3.5" />
                        <span>{e.location}</span>
                      </div>
                    )}
                    {e.maxRegistrations && (
                      <div className="flex items-center space-x-1.5 text-xs text-stone-400 font-medium">
                        <Users className="h-3.5 w-3.5" />
                        <span>
                          {e.registrationCount} / {e.maxRegistrations} Registered
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="mt-3">
                    <Button variant="outline" size="sm" className="text-xs font-semibold text-indigo-600 border-indigo-200 bg-indigo-50 hover:bg-indigo-100">
                      ✨ AI Generate Marketing
                    </Button>
                  </div>
                </div>

                <div className="text-right flex flex-col items-end shrink-0 gap-1">
                  <div className="font-heading font-black text-saffron-750 text-base">
                    {e.isFree ? 'Free Admission' : `₹${Number(e.ticketPrice || 0).toFixed(2)}`}
                  </div>
                  <Badge variant="outline" className="text-[10px] uppercase tracking-wide font-bold">
                    {e.status}
                  </Badge>
                </div>
              </div>
            ))
          ) : (
            <div className="py-16 bg-white border border-stone-200/60 rounded-2xl text-center text-stone-400 italic">
              No calendar events scheduled. Click Schedule Event to register upcoming festivals.
            </div>
          )}
        </div>
      )}

      {/* Add Seva Modal */}
      <Modal
        isOpen={isSevaModalOpen}
        onClose={() => setIsSevaModalOpen(false)}
        title="Add Seva / Pooja Offering"
        description="Configure standard temple sevas and poojas available for devotee booking."
        size="default"
      >
        <form onSubmit={handleSevaSubmit} className="space-y-6">
          <Input
            label="Seva / Pooja Name"
            placeholder="e.g. Ashtothara Archana"
            value={sevaName}
            onChange={(e) => setSevaName(e.target.value)}
            required
          />
          <div className="space-y-1">
            <label className="text-xs font-semibold text-stone-550">Description</label>
            <textarea
              placeholder="e.g. Archana performed with flowers recitation of Lord names."
              value={sevaDesc}
              onChange={(e) => setSevaDesc(e.target.value)}
              rows={3}
              className="w-full rounded-lg border border-stone-200 p-3 text-sm focus:outline-none focus:ring-1 focus:ring-saffron-500 bg-white"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              type="number"
              label="Price (INR)"
              placeholder="51"
              value={sevaPrice}
              onChange={(e) => setSevaPrice(e.target.value)}
              required
            />
            <Input
              type="number"
              label="Duration (minutes)"
              placeholder="15"
              value={sevaDuration}
              onChange={(e) => setSevaDuration(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-end space-x-3 border-t border-stone-100 pt-4">
            <Button type="button" variant="outline" onClick={() => setIsSevaModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="gradient-primary text-white" loading={saving}>
              Register Seva
            </Button>
          </div>
        </form>
      </Modal>

      {/* Add Event Modal */}
      <Modal
        isOpen={isEventModalOpen}
        onClose={() => setIsEventModalOpen(false)}
        title="Schedule Calendar Event"
        description="Schedule public festival calendars, satsangs, or charitable drives."
        size="lg"
      >
        <form onSubmit={handleEventSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Event Title"
              placeholder="e.g. Mahashivratri Celebrations"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
              required
            />
            <div className="space-y-1">
              <label className="text-xs font-semibold text-stone-550">Event Type</label>
              <select
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                className="w-full h-10 px-3.5 rounded-lg border border-stone-200 bg-white text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-saffron-500"
              >
                <option value="FESTIVAL">Festival</option>
                <option value="POOJA">Special Pooja</option>
                <option value="SATSANG">Satsang</option>
                <option value="PRAVACHAN">Pravachan</option>
                <option value="CULTURAL">Cultural Event</option>
                <option value="CHARITABLE">Charitable Drive</option>
                <option value="WORKSHOP">Workshop</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-stone-550">Description</label>
            <textarea
              placeholder="e.g. Join us for whole night bhajan and abhishek celebrations."
              value={eventDesc}
              onChange={(e) => setEventDesc(e.target.value)}
              rows={2}
              className="w-full rounded-lg border border-stone-200 p-3 text-sm focus:outline-none focus:ring-1 focus:ring-saffron-500 bg-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              type="datetime-local"
              label="Start Date & Time"
              value={eventStart}
              onChange={(e) => setEventStart(e.target.value)}
              required
            />
            <Input
              type="datetime-local"
              label="End Date & Time"
              value={eventEnd}
              onChange={(e) => setEventEnd(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Location"
              placeholder="e.g. Main Temple Hall"
              value={eventLoc}
              onChange={(e) => setEventLoc(e.target.value)}
            />
            <Input
              type="number"
              label="Max Registrations (Optional)"
              placeholder="e.g. 200"
              value={eventMaxReg}
              onChange={(e) => setEventMaxReg(e.target.value)}
            />
          </div>

          <div className="space-y-4 bg-stone-50 p-4 rounded-xl border border-stone-200/50">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="eventIsFree"
                checked={eventIsFree}
                onChange={(e) => setEventIsFree(e.target.checked)}
                className="rounded border-stone-300 text-saffron-600 focus:ring-saffron-500 h-4 w-4"
              />
              <label htmlFor="eventIsFree" className="text-xs font-semibold text-stone-700">
                This is a Free Admission Event
              </label>
            </div>

            {!eventIsFree && (
              <Input
                type="number"
                label="Ticket Price (INR)"
                placeholder="₹ 100"
                value={eventPrice}
                onChange={(e) => setEventPrice(e.target.value)}
                required={!eventIsFree}
                className="animate-fadeIn"
              />
            )}
          </div>

          {/* Footer actions */}
          <div className="flex justify-end space-x-3 border-t border-stone-100 pt-4">
            <Button type="button" variant="outline" onClick={() => setIsEventModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="gradient-primary text-white" loading={saving}>
              Schedule Event
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
