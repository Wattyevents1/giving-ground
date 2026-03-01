

# 🌍 Charity & Non-Profit Platform

A comprehensive, warm-toned charity website built with React, Tailwind CSS, and Supabase for backend services. Admin-only login with guest donations.

---

## 🎨 Design & Theme
- **Warm & compassionate palette**: Earthy greens, soft oranges, warm whites, and gentle gradients
- **Typography**: Clean, readable serif headings with sans-serif body text
- **Fully responsive** across desktop, tablet, and mobile
- **WCAG-accessible** with proper contrast, focus states, and alt text
- **Floating "Donate Now" button** visible on all pages

---

## 📄 Pages

### Public Pages
1. **Home** — Hero with CTA, featured projects with animated progress bars, impact stats counter, urgent appeals banner, testimonials
2. **About Us** — Mission, vision, team members, history timeline
3. **Projects / Campaigns** — Filterable grid of project cards with images, funding progress, and donate buttons
4. **Project Details** — Full project info, gallery, impact stats, funding goal progress, inline donation form
5. **Donate Funds** — One-time and recurring donation form with amount presets, Stripe checkout integration
6. **Donate Items/Food** — Form to submit in-kind donation offers (name, item description, location, photos)
7. **Membership & Subscriptions** — Tiered membership plans (e.g., Supporter, Partner, Champion) with Stripe recurring billing
8. **Volunteer Registration** — Form to sign up as a volunteer (skills, availability, area of interest)
9. **Blog / News** — List of published articles with categories, search, and individual article pages
10. **Urgent Appeals** — Highlighted time-sensitive campaigns with prominent CTAs
11. **Contact Us** — Contact form, map embed, social links, office details
12. **Careers** — Job listings with apply forms
13. **Privacy Policy** — Static legal page
14. **Terms of Use** — Static legal page

---

## 💳 Payments
- **Stripe** — Primary payment processor for card payments, Apple Pay, Google Pay
- **PayPal** — Embedded PayPal button as alternative checkout option
- **Pesapal (Mobile Money)** — Integration via edge function for Africa-friendly mobile payments
- Support for **one-time** and **recurring** donations
- Donation receipts generated and emailed

---

## 🔐 Authentication & Admin
- **Admin-only login** using Supabase Auth (email/password)
- **Role-based access** (Super Admin, Content Manager) stored in a separate `user_roles` table
- Guest donors do NOT need accounts

---

## 🛠️ Admin Dashboard
- **Projects Management** — Create, edit, delete projects and campaigns; set funding goals
- **Donations Overview** — View all donations, filter by date/project/amount, export data
- **Volunteer Management** — Review and approve volunteer applications
- **Blog CMS** — Create, edit, publish/unpublish blog posts with rich text
- **Careers Management** — Post and manage job listings
- **Urgent Appeals** — Create and manage time-sensitive campaigns
- **Analytics** — Dashboard with donation totals, donor counts, project progress charts (using Recharts)
- **In-Kind Donations** — Review submitted item/food donation offers
- **Membership Management** — View active members and subscription status

---

## 🗄️ Database (Supabase)
- **Projects** — title, description, images, funding goal, amount raised, status, category
- **Donations** — amount, donor name/email, project, payment method, recurring flag, transaction ID
- **Volunteers** — name, email, phone, skills, availability, status (pending/approved)
- **Blog Posts** — title, content, author, published date, category, status
- **Memberships** — tier, donor email, Stripe subscription ID, status
- **Item Donations** — donor info, item description, photos (stored in Supabase Storage), status
- **Careers** — title, description, requirements, status
- **User Roles** — user_id, role (admin, content_manager)
- **Contact Submissions** — name, email, message, date

---

## 📧 Notifications
- Email confirmations for donations (via Resend + edge function)
- Volunteer application confirmation emails
- Admin notifications for new donations and volunteer signups

---

## 🌐 Social & Sharing
- Social media links in footer and contact page
- Share buttons on project and blog pages
- Open Graph meta tags for rich social previews

---

## 📱 Key UX Features
- Animated fundraising progress bars on project cards
- Impact statistics counters (donors, funds raised, lives impacted)
- Smooth scroll animations and page transitions
- Mobile-first navigation with hamburger menu
- Search and filter on projects and blog pages

