# Qualtech Engineering Landing Page

A performant, secure, and scalable landing page for an engineering & construction company, built with Next.js 16 and modern full-stack technologies.

---

## Tech Stack

| Layer        | Technology                                                                 |
| ------------ | -------------------------------------------------------------------------- |
| **Framework**    | Next.js 16 (App Router, React 19, Server Actions)                          |
| **Database**     | PostgreSQL with Prisma ORM                                                |
| **Auth**         | NextAuth.js v5 (Credentials Provider, JWT Sessions)                       |
| **Form Validation** | Zod (runtime + compile-time schema validation)                          |
| **Email**        | Resend API                                                                |
| **Rate Limiting & Security** | Arcjet (token bucket, bot detection, shield protection)     |
| **Styling**      | Tailwind CSS 4, Radix UI Primitives                                      |
| **Animations**   | Motion (Framer Motion successor)                                          |
| **Forms**        | React Hook Form with Zod resolver                                         |
| **TypeScript**   | Strict mode enabled                                                       |

---

## Key Features

### `/features/contact-us`
Contact form with **Server Action** submission, **Zod schema validation**, and **Arcjet rate limiting** (token bucket with bot detection). Successfully validated messages are persisted to PostgreSQL and forwarded via Resend email API.

### `/features/messages`
Admin message management system with **Server Actions** for reply and delete operations. Uses `revalidatePath` for cache invalidation and supports email replies via Resend integration.

### `/features/dashboard`
Protected admin dashboard with collapsible sidebar navigation. Session-based access control with **JWT token versioning** to enable server-side session invalidation.

### `/features/sign-in`
Secure admin authentication flow using **NextAuth.js Credentials Provider**. Passwords are hashed with bcrypt, and credentials are validated with Zod schemas before database lookup.

### `/features/image-carousel`
Auto-advancing image carousel with custom `useImageIndexLoop` hook. Supports pause/play controls and smooth CSS transitions with configurable timing intervals.

### `/features/countup-stats`
Scroll-triggered animated statistics using `react-countup` with `scrollSpy` integration. Wrapped in Motion components for staggered entrance animations.

### `/features/our-experience`
Responsive two-column layout with sticky navigation and Motion-powered scroll animations. Data-driven card rendering with dynamic column distribution.

### `/features/our-mission`
Animated mission section with viewport-triggered background color transitions, animated underlines, and embedded autoplay video.

---

## Technical Deep Dive: Server Actions & Zod Validation

This project leverages **Next.js Server Actions** to handle all form submissions and data mutations directly on the server, eliminating the need for separate API routes. This approach reduces client-side JavaScript, improves performance through automatic request deduplication, and provides a more secure execution environment since sensitive logic never reaches the browser.

**Zod** serves as the single source of truth for data validation, operating at both compile-time (TypeScript inference) and runtime (schema parsing). When a form is submitted, the raw `FormData` is converted to a plain object and passed through `schema.safeParse()`. This guarantees that only validated, type-safe data reaches the database layer. Combined with Arcjet's rate limiting and bot detection, this architecture provides defense-in-depth against malformed input, automated attacks, and abuse—without sacrificing developer experience.

---

## Environment Setup

### Prerequisites
- Node.js 20+
- PostgreSQL database
- Resend API account
- Arcjet account

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd engineering-company-landpage

# Install dependencies
npm install
```

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

---

## Project Structure

```
├── app/                    # Next.js App Router pages
├── components/ui/          # Reusable UI primitives
├── features/               # Feature-based modules
│   ├── contact-us/         # Contact form + actions
│   ├── dashboard/          # Admin dashboard
│   ├── messages/           # Message management
│   ├── sign-in/            # Authentication
│   └── ...                 # Other features
├── lib/                    # Shared utilities (Prisma, Arcjet, Resend)
├── prisma/                 # Database schema
└── public/                 # Static assets
```

---

## License

MIT
