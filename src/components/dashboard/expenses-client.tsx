'use client'

import * as React from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const CATEGORIES = [
  'Pujari Salary',
  'Flowers & Garlands',
  'Electricity & Utilities',
  'Prasadam Ingredients',
  'Maintenance & Repairs',
  'Event / Festival Costs',
  'Other'
]

export default function ExpensesClient({ initialExpenses }: { initialExpenses: any[] }) {
  const [expenses, setExpenses] = React.useState(initialExpenses)
  const [open, setOpen] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    
    try {
      const res = await fetch('/api/v1/expenses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: Number(formData.get('amount')),
          category: formData.get('category'),
          date: formData.get('date'),
          notes: formData.get('notes'),
          receiptUrl: ''
        })
      })
      if (!res.ok) throw new Error('Failed to create expense')
      
      const newExp = await res.json()
      // Manually add the creator name for immediate UI update
      newExp.creator = { fullName: 'You' } 
      setExpenses([newExp, ...expenses])
      setOpen(false)
    } catch (err) {
      console.error(err)
      alert('Failed to log expense')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold tracking-tight">Recent Expenses</h2>
        <div className="flex gap-2">
          <Button variant="outline" className="text-indigo-600 border-indigo-200 bg-indigo-50 hover:bg-indigo-100">
            ✨ AI Audit Anomalies
          </Button>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button><Plus className="mr-2 h-4 w-4" /> Log Expense</Button>
            </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Log New Expense</DialogTitle>
            </DialogHeader>
            <form onSubmit={onSubmit} className="space-y-4 pt-4">
              <div className="grid gap-2">
                <Label>Amount (₹)</Label>
                <Input name="amount" type="number" min="1" required />
              </div>
              <div className="grid gap-2">
                <Label>Category</Label>
                <Select name="category" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Date</Label>
                <Input name="date" type="date" required defaultValue={new Date().toISOString().split('T')[0]} />
              </div>
              <div className="grid gap-2">
                <Label>Notes (Optional)</Label>
                <Textarea name="notes" placeholder="Invoice #1234..." />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Saving...' : 'Save Expense'}
              </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Notes</TableHead>
              <TableHead>Logged By</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expenses.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  No expenses logged yet.
                </TableCell>
              </TableRow>
            )}
            {expenses.map((exp) => (
              <TableRow key={exp.id}>
                <TableCell>{new Date(exp.date).toLocaleDateString()}</TableCell>
                <TableCell className="font-medium">{exp.category}</TableCell>
                <TableCell className="text-muted-foreground">{exp.notes || '-'}</TableCell>
                <TableCell>{exp.creator?.fullName || 'Unknown'}</TableCell>
                <TableCell className="text-right text-red-600 font-medium">
                  -₹{Number(exp.amount).toLocaleString('en-IN')}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
