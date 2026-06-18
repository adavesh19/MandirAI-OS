'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, X } from 'lucide-react'
import { createSeva } from '@/app/(platform)/sevas/actions'

export default function SevaForm({ onSuccess }: { onSuccess?: () => void }) {
  const router = useRouter()
  const [isOpen, setIsOpen] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState('')

  const [formData, setFormData] = React.useState({
    name: '',
    description: '',
    price: '',
    durationMinutes: '30'
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await createSeva({
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      durationMinutes: parseInt(formData.durationMinutes, 10)
    })

    if (res.success) {
      setFormData({ name: '', description: '', price: '', durationMinutes: '30' })
      setIsOpen(false)
      if (onSuccess) onSuccess()
    } else {
      setError(res.error || 'Something went wrong')
    }
    setLoading(false)
  }

  if (!isOpen) {
    return (
      <Button onClick={() => setIsOpen(true)} className="bg-saffron-600 hover:bg-saffron-700 text-white flex items-center gap-2">
        <Plus className="h-4 w-4" /> Add New Seva
      </Button>
    )
  }

  return (
    <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-6 shadow-sm mb-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-heading font-bold text-lg text-stone-900 dark:text-white">Create New Seva</h3>
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
          <X className="h-4 w-4 text-stone-500" />
        </Button>
      </div>

      {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm font-medium">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input 
            label="Seva Name" 
            placeholder="e.g. Rudrabhishekam"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            required
          />
          <Input 
            label="Price Amount (₹)" 
            type="number"
            min="0"
            placeholder="e.g. 501"
            value={formData.price}
            onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
            required
          />
        </div>
        
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-stone-700 dark:text-stone-300">Description / Benefits</label>
          <textarea
            rows={3}
            className="flex w-full rounded-md border border-stone-200 bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-500/30 focus-visible:border-saffron-500 dark:border-stone-800"
            placeholder="Brief description of the seva and its spiritual benefits..."
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          />
        </div>

        <div className="flex justify-end pt-2 gap-3">
          <Button variant="outline" type="button" onClick={() => setIsOpen(false)}>Cancel</Button>
          <Button type="submit" className="bg-saffron-600 hover:bg-saffron-700 text-white" disabled={loading}>
            {loading ? 'Creating...' : 'Save Seva'}
          </Button>
        </div>
      </form>
    </div>
  )
}
