import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { cache } from 'react'

export const getAuthUser = cache(async () => {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) return null
  return user
})

export async function requireAuth() {
  const user = await getAuthUser()
  if (!user) redirect('/login')
  return user
}

export async function requireRole(allowedRoles: string[]) {
  const user = await requireAuth()
  const role = user.app_metadata?.role || 'devotee'
  if (!allowedRoles.includes(role)) redirect('/unauthorized')
  return { user, role, tenantId: user.app_metadata?.tenant_id as string | undefined }
}

export async function requireSuperAdmin() {
  return requireRole(['super_admin'])
}

export async function requireTempleAdmin() {
  return requireRole(['temple_admin'])
}

export async function requireStaff() {
  return requireRole(['temple_admin', 'staff'])
}
