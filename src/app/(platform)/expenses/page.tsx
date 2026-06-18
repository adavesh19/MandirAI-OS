import { requireStaff } from '@/lib/dal'
import ExpensesClient from '@/components/dashboard/expenses-client'
import prisma from '@/lib/prisma'

export const metadata = {
  title: 'Expenses & Accounting | MandirAI OS',
}

export default async function ExpensesPage() {
  const { tenantId } = await requireStaff()
  if (!tenantId) return <div>Tenant Required</div>

  const initialExpenses = await prisma.expense.findMany({
    where: { templeId: tenantId },
    orderBy: { date: 'desc' },
    include: {
      creator: { select: { fullName: true } }
    }
  })

  // Calculate totals
  const totalExpenses = initialExpenses.reduce((sum, exp) => sum + Number(exp.amount), 0)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Accounting & Expenses</h1>
          <p className="text-muted-foreground mt-1">
            Track outgoing funds, salaries, and temple maintenance costs.
          </p>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <p className="text-sm font-medium text-muted-foreground">Total Expenses (All Time)</p>
          <h3 className="text-2xl font-bold mt-2">₹{totalExpenses.toLocaleString('en-IN')}</h3>
        </div>
      </div>

      <ExpensesClient initialExpenses={initialExpenses} />
    </div>
  )
}
