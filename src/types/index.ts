export type UserRole = 'super_admin' | 'temple_admin' | 'staff' | 'devotee'

export interface AppUser {
  id: string
  email: string
  full_name: string
  phone?: string
  avatar_url?: string
  role: UserRole
  temple_id?: string
}

export interface Temple {
  id: string
  slug: string
  name: string
  temple_type?: string
  primary_deity?: string
  history?: Record<string, string>
  address?: TempleAddress
  timings?: TempleTimings
  contact_phone?: string
  contact_email?: string
  website_domain?: string
  upi_id?: string
  bank_details?: BankDetails
  trust_registration_no?: string
  trust_80g_details?: Record<string, string>
  trust_12a_details?: Record<string, string>
  social_links?: SocialLinks
  peethadhipati?: Peethadhipati
  trustees?: Trustee[]
  services_offered?: string[]
  logo_url?: string
  cover_image_url?: string
  theme_config?: ThemeConfig
  seo_config?: SeoConfig
  is_published: boolean
  is_active: boolean
  subscription_plan: string
  onboarding_completed: boolean
  created_at: string
  updated_at: string
}

export interface TempleAddress {
  line1: string
  line2?: string
  city: string
  state: string
  country: string
  pincode: string
  lat?: number
  lng?: number
}

export interface TempleTimings {
  morning_open: string
  morning_close: string
  evening_open: string
  evening_close: string
  special_days?: Record<string, string>
}

export interface BankDetails {
  account_name: string
  account_number: string
  ifsc: string
  bank_name: string
  branch: string
}

export interface SocialLinks {
  facebook?: string
  instagram?: string
  youtube?: string
  twitter?: string
}

export interface Peethadhipati {
  name: string
  title: string
  photo_url?: string
  bio?: string
}

export interface Trustee {
  name: string
  designation: string
  phone?: string
  photo_url?: string
}

export interface ThemeConfig {
  primary_color: string
  accent_color: string
  font_family: string
  hero_style: 'gradient' | 'image' | 'video'
}

export interface SeoConfig {
  title: string
  description: string
  keywords: string[]
  og_image?: string
}

export interface Donation {
  id: string
  temple_id: string
  devotee_id?: string
  category_id?: string
  amount: number
  currency: string
  payment_method: PaymentMethod
  payment_status: PaymentStatus
  razorpay_order_id?: string
  razorpay_payment_id?: string
  is_anonymous: boolean
  is_recurring: boolean
  donor_name?: string
  donor_phone?: string
  donor_pan?: string
  notes?: string
  created_at: string
}

export type PaymentMethod = 'upi' | 'card' | 'netbanking' | 'cash' | 'cheque'
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded'
export type EventType = 'festival' | 'pooja' | 'seva' | 'workshop' | 'other'
export type EventStatus = 'draft' | 'published' | 'ongoing' | 'completed' | 'cancelled'
export type SubscriptionStatus = 'active' | 'cancelled' | 'expired' | 'trial'

export interface DashboardStats {
  todayDonations: number
  monthlyDonations: number
  yearlyDonations: number
  totalDevotees: number
  upcomingEvents: number
  volunteerCount: number
  recentActivities: Activity[]
}

export interface Activity {
  id: string
  type: 'donation' | 'event' | 'devotee' | 'volunteer'
  description: string
  amount?: number
  created_at: string
}

export interface SubscriptionPlan {
  id: string
  name: string
  display_name: string
  price_monthly: number
  price_yearly: number
  features: Record<string, boolean>
  limits: PlanLimits
}

export interface PlanLimits {
  max_devotees: number
  max_events: number
  max_storage_gb: number
}
