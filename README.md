<div align="center">
  <h1>🛕 MandirAI OS</h1>
  <p><strong>The Ultimate AI-Powered Operating System for Hindu Temples</strong></p>

  <p>
    <img src="https://img.shields.io/badge/Next.js-14-black?logo=next.js" alt="Next.js" />
    <img src="https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Supabase-DB-3ECF8E?logo=supabase" alt="Supabase" />
    <img src="https://img.shields.io/badge/AI-Gemini_Pro-orange" alt="Gemini AI" />
  </p>
</div>

---

## 🌟 Overview

**MandirAI OS** is the world's first comprehensive, multi-tenant digital platform built specifically to modernize the management of Hindu temples, trusts, and spiritual organizations.

By combining cutting-edge WebGL 3D design with the power of Google's Gemini AI, MandirAI OS allows temple administrators to generate stunning, fully-functional websites in seconds. Beyond just a website, it is a complete backend operating system offering Devotee CRM, Digital Hundi (Donation Management), Seva Bookings, 80G Tax Receipts, and multi-lingual global outreach.

---

## 🚀 Key Features

### 1. 🤖 AI Website Generator
Generate a fully immersive, animated, and responsive website for your temple in under 60 seconds. Simply provide the temple name and images, and MandirAI constructs:
* Dynamic Bento Grid layouts
* 3D WebGL Galleries
* Spiritual Image Carousels
* Automated multilingual History & About pages

### 2. 💸 Digital Hundi & Donation Management
A centralized financial dashboard to track all donations, whether made online via UPI/Cards or offline via kiosks.
* **Razorpay Integration:** Accept UPI, Credit Cards, and Net Banking globally.
* **Automated 80G Receipts:** Instantly generate and email tax-compliant 80G receipts to donors.
* **Financial Analytics:** Track income trends, daily targets, and campaign success.

### 3. 🙏 Devotee CRM & Seva Bookings
Know your devotees like never before. 
* **Complete Database:** Track visit history, total donations, Gotra, and Nakshatra.
* **Online Seva Booking:** Allow devotees to book poojas, sevas, and homas online with automated scheduling.
* **Check-ins:** QR code based check-ins for events and festivals.

### 4. 🏢 Multi-Tenant Architecture
Built for scale, the system supports infinite temples on a single database using robust Row Level Security (RLS).
* Map custom domains (e.g., \`www.shrivishnutemple.com\`) directly to temple profiles.
* Isolated dashboards for Super Admins, Temple Admins, Staff, and Devotees.

---

## 💎 Premium Subscription Tiers

MandirAI OS is monetized through a tiered SaaS model (Billed Annually in INR):

| Tier | Price/Year | Ideal For | Features Included |
|------|------------|-----------|-------------------|
| **Starter** | ₹300 | Small rural temples | Standard Website, Seva Booking, Basic Hundi |
| **Basic** | ₹500 | Medium town temples | Custom Domain, Email Support, 80G Receipts |
| **Pro** | ₹700 | City temples | + AI Content Generation, Advanced CRM |
| **Best Seller** | ₹900 | Large trusts | + 3D WebGL Templates, Automated WhatsApp |
| **Titan** | ₹1300 | Mega spiritual hubs | Everything + Unlimited Storage, Dedicated Manager |

---

## 🛠️ Technology Stack

* **Frontend:** Next.js 14 (App Router), React, Tailwind CSS, Framer Motion
* **Backend:** Node.js, Next.js API Routes, Prisma ORM
* **Database & Auth:** Supabase (PostgreSQL), Supabase Auth
* **AI Engine:** Google Gemini Pro
* **Payments:** Razorpay API
* **Deployment:** Vercel

---

## 📦 Local Development

To run this project locally, you need Node.js and a Supabase project.

1. **Clone the repository:**
   \`\`\`bash
   git clone https://github.com/adavesh19/MandirAI-OS.git
   cd MandirAI-OS
   \`\`\`

2. **Install dependencies:**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables:**
   Create a \`.env\` file in the root directory and add your keys:
   \`\`\`env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   DATABASE_URL=your_supabase_db_url
   GEMINI_API_KEY=your_gemini_key
   \`\`\`

4. **Run the development server:**
   \`\`\`bash
   npm run dev
   \`\`\`
   Open \`http://localhost:3000\` to view the application.

---

## 🌐 Deployment (Vercel)

MandirAI OS is optimized for edge deployment on Vercel.

1. Push your code to GitHub.
2. Import the repository in your Vercel dashboard.
3. Add all Environment Variables.
4. Deploy!

*(Remember to update your Supabase Authentication URL Configuration to match your new Vercel domain).*

---

## 📄 License

**All Rights Reserved.**
This proprietary software is owned and maintained by the MandirAI OS Team. Unauthorized copying, distribution, or modification is strictly prohibited.
