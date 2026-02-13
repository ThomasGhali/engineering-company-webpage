
# Engineering Company Webpage with Dashboard (Qualtec)
![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Tailwind](https://img.shields.io/badge/Tailwind-4.0-38B2AC?logo=tailwind-css)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)<br>
A performant, secure, and scalable **landing page** for an engineering & construction company with an **admin dashboard**, built with **Next.js 16** and **modern full-stack technologies**.

---

| Feature        | Tech Choice                  | Why?                                                  |
| -------------- | ---------------------------- | ----------------------------------------------------- |
| **Framework**  | Next.js 16 (App Router)      | For SSR, SEO, and lightning-fast Server Actions.      |
| **Security**   | Arcjet + NextAuth v5         | Shields against bots and handles secure JWT sessions. |
| **Database**   | Supabase/PostgreSQL + Prisma | Type-safe database queries and easy migrations.       |
| **Validation** | Zod                          | Ensures data integrity from the form to the DB.       |
| **Email**      | Resend                       | Reliable transactional emails for user inquiries.     |

---

<div align="center">

# [Live Demo <img src="https://www.svgrepo.com/show/450126/external-link.svg" width="20" height="20" />](https://engineering-company-webpage-nwya.vercel.app/)

**Explore the admin dashboard.**

[![Dashboard Access](https://img.shields.io/badge/Admin_Dashboard-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://engineering-company-webpage-nwya.vercel.app/admin/sign-in)
</div>

> **<div align="center">Test Credentials</div>**<br> **Route**: `https://engineering-company-webpage-nwya.vercel.app/admin/sign-in` <br> **Username**: `thomas-ghali` <br> **Pass**: `pageadminpassword123` <br>
> <small>*Note: Mutation actions like 'Delete' and 'Reply' are **disabled in the demo environment** to **preserve data for others**. You can see 'Delete' and 'Reply' actions in the visuals [for them](#5-real-time-message-management), and for the [ai-chatbot](#2-ai-powered-customer-support) are provided below, contact me for more access at `thomasmetias29@gmail.com`.*</small>

## More on Why This Tech Choice Matters
<details><summary><strong>Expand section</strong></summary>

As an engineering and construction company, digital reliability reflects physical craftsmanship. This project prioritizes:
- **SEO Optimization**: Leveraging Next.js Server Components for maximum visibility and performance.
- **Server Side Caching**: Boosts performance and SEO by serving data instantly from memory, reducing server costs and API overhead.
- **Data Integrity**: Ensures site-wide consistency while reducing server costs and API overhead.
- **Security by Design**: SQL Injection prevention via Prisma/Zod and robust bot shielding via Arcjet.
- **Scalability**: A modular architecture ready for high-traffic inquiries and enterprise-grade content management.

</details>

---

<a name="toc"></a>
## 📂 Table of Contents

  - [⚡ Core Capabilities](#core-capabilities) <details> <summary><i>View sub-sections</i></summary> <ul> <li><a href="#1-high-performance-landing-page">1. High-Performance Landing Page</a></li> <li><a href="#2-ai-powered-customer-support">2. AI-Powered Customer Support</a></li> <li><a href="#3-secure-communication-pipeline">3. Secure Communication Pipeline</a></li> <li><a href="#4-admin-command-center">4. Admin Command Center</a></li> <li><a href="#5-real-time-message-management">5. Real-time Message Management</a></li> </ul> </details>
  - [🔍 Technical Deep Dive](#technical-deep-dive) <details> <summary><i>View technical details</i></summary> <ul> <li><a href="#data-integrity--security">Data Integrity & Security</a></li> <li><a href="#server-side-excellence">Server-Side Excellence</a></li> </ul> </details>
  - [⚙️ Environment Setup](#environment-setup) <details> <summary><i>View setup steps</i></summary> <ul> <li><a href="#prerequisites">Prerequisites</a></li> <li><a href="#installation">Installation</a></li> <li><a href="#environment-variables">Environment Variables</a></li> <li><a href="#database-setup">Database Setup</a></li> <li><a href="#run-development-server">Run Development Server</a></li> <li><a href="#build-for-production">Build for Production</a></li> </ul> </details>
  - [📁 Project Structure](#project-structure)
  - [📜 License](#license)

---
## Core Capabilities

### 1. High-Performance Landing Page
Modern, animated UI built with **Motion** and **Tailwind CSS**. All data is fetched from the database on the server, ensuring peak performance and SEO.
<p>
  <img src="./public/readme-images/desktop-ui1.jpg" width="48%" />
  <img src="./public/readme-images/desktop-ui2.jpg" width="48%" />
</p>

<div align="right">
  <a href="#toc"><b>⤴ Back to Contents</b></a>
</div>


### 2. AI-Powered Customer Support
A professional, strict AI chatbot support agent matched to the latest company public data. It is protected by **Arcjet** for bot detection and rate limiting to prevent infrastructure abuse.<br>
><small>The LLM is powered by gemma-3 from google which has great limits and sticks to commands and rules for professionalism.</small>
<p align="center">
  <img src="./public/readme-images/ai-chat1.png" width="31.2%" />
  <img src="./public/readme-images/ai-chat2.png" width="32%" />
  <img src="./public/readme-images/ai-chat3.png" width="32%" />
</p>

<div align="right">
  <a href="#toc"><b>⤴ Back to Contents</b></a>
</div>


### 3. Secure Communication Pipeline
The "Contact Us" form uses **Server Actions** for submission, **Zod schema validation**, and **Arcjet rate limiting**. Successfully validated messages are persisted to PostgreSQL and forwarded to the company's verified email via `Resend`.
<p align="center">
  <img src="./public/readme-images/contact-us1.png" width="34%" />
  <img src="./public/readme-images/contact-us2.png" width="63%" />
</p>

<div align="right">
  <a href="#toc"><b>⤴ Back to Contents</b></a>
</div>


### 4. Admin Command Center
A secure dashboard that requires **authentication** first. It provides full control over webpage data, allowing admins to edit components without any coding background. Secured with **NextAuth.js v5** and **JWT token versioning** for server-side session invalidation.
<p align="center">
  <img src="./public/readme-images/admin1.png" width="25%" />
  <img src="./public/readme-images/admin2.jpg" width="73%" />
</p>

<div align="right">
  <a href="#toc"><b>⤴ Back to Contents</b></a>
</div>


### 5. Real-time Message Management
Respond to or delete user messages directly from the dashboard. This system uses **Server Actions** for operations and `revalidatePath` for perfect cache synchronization. Replies are sent via the **Resend API**.
<p align="center">
  <img src="./public/readme-images/send1.jpg" width="30%" />
  <img src="./public/readme-images/send2.jpg" width="30%" />
  <img src="./public/readme-images/send3.jpg" width="30%" />
</p>

> <small>In this example, David Miller should recieve an email with our reply on his email `dmiller@pacific-surveys.com`</small>

<div align="right">
  <a href="#toc"><b>⤴ Back to Contents</b></a>
</div>

---

## Technical Deep Dive

### Data Integrity & Security
**Zod** serves as the single source of truth for data validation, operating at both compile-time and runtime. When a form is submitted, the raw `FormData` is validated through `schema.safeParse()`, guaranteeing that only type-safe data reaches the database. This architecture provides defense-in-depth against malformed input and automated attacks.

### Server-Side Excellence
- **Server Actions**: Handles all form submissions and data mutations directly on the server, reducing client-side JavaScript.
- **Dynamic Content**: All components (including header & footer) are stored in the database, allowing admins to manipulate site data via the dashboard in real-time.
- **Optimized Caching**: Implements server-side caching with automated revalidation to deliver high performance and immediate data consistency.
- **Bot Protection**: Arcjet detects and blocks malicious bots while allowing search engine crawlers, ensuring optimal SEO and accessibility.

<div align="right">
  <a href="#toc"><b>⤴ Back to Contents</b></a>
</div>

---

## Environment Setup

### Prerequisites
- Node.js 20+
- PostgreSQL database (Supabase is recommended)
- Resend API account (for real world usage, but can be used out of the box with `Resend` default domain email)
- Arcjet account (for the api key)

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd engineering-company-webpage

# Install dependencies
npm install
```

<div align="right">
  <a href="#toc"><b>⤴ Back to Contents</b></a>
</div>


### Environment Variables
Create a `.env.local` file in the project root:
```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/qualtech"

# Auth
AUTH_SECRET="your-auth-secret-here"

# Resend Email
RESEND_API_KEY="re_your_resend_api_key"
ADMIN_EMAIL="admin@yourdomain.com"

# Arcjet
ARCJET_KEY="ajkey_your_arcjet_key"
```

### Database Setup
```bash
# Push schema to database and generate Prisma client
npm run prisma:sync

# (Optional) Seed the database with initial data
npm run prisma:seed
```

### Run Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

### Build for Production

```bash
npm run build
npm start
```

<div align="right">
  <a href="#toc"><b>⤴ Back to Contents</b></a>
</div>

---

## Project Structure
I used folder-based structure to ensure future-proof code for scalability.
```
├── app/                    # Next.js App Router (pages, layouts, and API)
├── components/             # Shared React components
│   ├── layout/             # Navigation, footer, and shell components
│   └── ui/                 # Reusable Radix UI primitives
├── features/               # Feature-based modular logic
│   ├── ai-chat/            # Support chatbot implementation
│   ├── contact-us/         # Contact form & server actions
│   ├── dashboard/          # Admin management interfaces
│   ├── messages/           # Inbox & message handling
│   └── ...                 # UI features (carousel, mission, stats)
├── hooks/                  # Custom React hooks
├── lib/                    # Shared utilities (Prisma, Arcjet, Resend)
├── prisma/                 # Database schema & client configuration
├── public/                 # Static assets & readme images
└── types/                  # Global TypeScript definitions
```

<div align="right">
  <a href="#toc"><b>⤴ Back to Contents</b></a>
</div>

---

## License
MIT
