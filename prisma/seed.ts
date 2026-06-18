import { PrismaClient, TempleType, UserRole, SubscriptionPlanType, PaymentMethod, PaymentStatus } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting Temple AI OS Seed...')

  // 1. Create a Super Admin User
  const superAdmin = await prisma.user.create({
    data: {
      fullName: 'Temple AI Admin',
      phone: '9876543210',
      role: UserRole.SUPER_ADMIN,
    }
  })

  // 2. Create the main Temple
  const temple = await prisma.temple.create({
    data: {
      name: 'Shree Siddhivinayak Temple',
      slug: 'siddhivinayak',
      templeType: TempleType.GANESH,
      primaryDeity: 'Lord Ganesha',
      contactPhone: '+91-22-24223206',
      contactEmail: 'info@siddhivinayak.org',
      websiteDomain: 'siddhivinayak-demo.com',
      upiId: 'siddhivinayak@upi',
      isPublished: true,
      isActive: true,
      onboardingCompleted: true,
      subscriptionPlan: SubscriptionPlanType.ENTERPRISE,
      timings: {
        morning_open: '05:30 AM',
        morning_close: '01:00 PM',
        evening_open: '04:00 PM',
        evening_close: '09:00 PM'
      },
      address: {
        line1: 'SK Bole Marg, Prabhadevi',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400028',
        country: 'India'
      },
      themeConfig: {
        primaryColor: '#f97316', // orange-500
        accentColor: '#f59e0b',  // amber-500
      },
      seoConfig: {
        title: 'Shree Siddhivinayak Temple - Official Portal',
        description: 'Welcome to the official digital portal of Shree Siddhivinayak Temple, Prabhadevi.',
        keywords: ['Siddhivinayak', 'Ganesha', 'Mumbai Temple', 'Online Pooja', 'Donation']
      }
    }
  })

  // 3. Create Temple Admin Member
  await prisma.templeMember.create({
    data: {
      templeId: temple.id,
      userId: superAdmin.id,
      role: 'TEMPLE_ADMIN'
    }
  })

  // 4. Create Pages
  await prisma.templePage.createMany({
    data: [
      {
        templeId: temple.id,
        pageType: 'HOME',
        isPublished: true,
        sortOrder: 1,
        content: { title: 'Welcome to Siddhivinayak', html: '<p>Experience the divine presence of Lord Ganesha.</p>' }
      },
      {
        templeId: temple.id,
        pageType: 'ABOUT',
        isPublished: true,
        sortOrder: 2,
        content: { title: 'About the Temple', html: '<p>The Shree Siddhivinayak Ganapati Mandir is a Hindu temple dedicated to Lord Shri Ganesh.</p>' }
      }
    ]
  })

  // 5. Create Sevas
  await prisma.seva.createMany({
    data: [
      { templeId: temple.id, name: { en: 'Panchamrit Abhishek' }, description: { en: 'Sacred bathing of the deity with 5 elements.' }, price: 501, durationMinutes: 30, isActive: true },
      { templeId: temple.id, name: { en: 'Modak Offering' }, description: { en: 'Offering 21 Modaks to Lord Ganesha.' }, price: 251, durationMinutes: 10, isActive: true },
      { templeId: temple.id, name: { en: 'Sahasranam Archana' }, description: { en: 'Chanting 1000 names of the Lord.' }, price: 1001, durationMinutes: 45, isActive: true },
    ]
  })

  // 6. Create Donation Categories
  const catGeneral = await prisma.donationCategory.create({
    data: { templeId: temple.id, name: 'General Donation', description: 'For temple maintenance and operations.', suggestedAmounts: [101, 501, 1001, 5001] }
  })
  const catAnna = await prisma.donationCategory.create({
    data: { templeId: temple.id, name: 'Annadanam', description: 'Feed the needy devotees visiting the temple.', suggestedAmounts: [500, 1000, 5000, 10000] }
  })

  // 7. Create an active Crowdfunding Campaign (Digital Hundi)
  await prisma.campaign.create({
    data: {
      templeId: temple.id,
      title: 'Goshala Development Fund',
      description: 'Help us build a new shelter for 500+ cows with modern medical facilities.',
      targetAmount: 5000000,
      currentAmount: 1250000,
      isActive: true,
      endDate: new Date('2026-12-31')
    }
  })

  // 8. Create Devotees
  const dev1 = await prisma.devotee.create({
    data: { templeId: temple.id, fullName: 'Rahul Sharma', phone: '9876543211', email: 'rahul@example.com', karmaPoints: 1500, badgeTier: 'GOLD' }
  })
  const dev2 = await prisma.devotee.create({
    data: { templeId: temple.id, fullName: 'Priya Patel', phone: '9876543212', email: 'priya@example.com', karmaPoints: 500, badgeTier: 'SILVER' }
  })

  // 9. Create Donations
  await prisma.donation.createMany({
    data: [
      { templeId: temple.id, devoteeId: dev1.id, categoryId: catAnna.id, amount: 5000, paymentMethod: PaymentMethod.UPI, paymentStatus: PaymentStatus.COMPLETED, donorName: 'Rahul Sharma', createdBy: superAdmin.id },
      { templeId: temple.id, devoteeId: dev2.id, categoryId: catGeneral.id, amount: 1001, paymentMethod: PaymentMethod.RAZORPAY, paymentStatus: PaymentStatus.COMPLETED, donorName: 'Priya Patel', createdBy: superAdmin.id },
      { templeId: temple.id, categoryId: catGeneral.id, amount: 501, paymentMethod: PaymentMethod.CASH, paymentStatus: PaymentStatus.COMPLETED, donorName: 'Anonymous', isAnonymous: true, createdBy: superAdmin.id },
    ]
  })

  console.log('✅ Seed completed successfully!')
  console.log('Test Temple URL: http://localhost:3000/temple/siddhivinayak')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
