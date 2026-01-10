# Ceptiv.net

A Next.js 16 web application with Supabase backend, featuring a client portal and admin panel. Built for Ceptiv, a digital solutions agency part of Acenta Group ApS.

## Project Overview

**Ceptiv** is a Danish digital agency targeting small to mid-size businesses without in-house development teams. The platform offers:

- **Public Website**: Marketing pages for services, pricing, portfolio
- **Client Portal**: Authenticated area where clients manage projects, subscriptions, and invoices
- **Admin Panel**: Internal management for projects, clients, features, and invoicing

### Tech Stack

- **Framework**: Next.js 16.1+ with App Router and Turbopack
- **Styling**: Tailwind CSS v4 with shadcn/ui components
- **Database**: Supabase (PostgreSQL with Row Level Security)
- **Authentication**: 
  - Admin: Supabase Auth (email/password)
  - Client: Custom auth (email + 4-digit PIN stored in `cap_clients` table)
- **Animations**: Framer Motion
- **Deployment**: Vercel

---

## Multi-Language SEO Implementation

### ⚠️ Critical SEO Architecture Overview

This site implements a **comprehensive multi-language SEO system** following Google's best practices for international websites. The implementation ensures:

- **No duplicate content penalties** - Proper hreflang and canonical tags
- **Correct language serving** - Users see the right language version in search results
- **Localized Danish URLs** - SEO-friendly slugs like `/da/om-os` instead of `/da/about`
- **Complete crawlability** - All language versions discoverable by search engines

### How Google Handles This Setup

With subdirectories (`/` for English, `/da/` for Danish), hreflang tags (including self-references and x-default), HTML lang attributes, unique translated content, and an XML sitemap with all versions, Google will:

1. **Detect as Multilingual**: URL structure + hreflang + `<html lang>` signal distinct language variants
2. **Index Separately**: Each language version indexed independently (no duplicate content)
3. **Serve Correctly**: Danish users see `/da/` pages; global users see English

#### User Location/Language → Search Result
| User Profile | Search Result |
|-------------|---------------|
| User in Denmark, Danish query | `/da/om-os` |
| User in USA, English query | `/about` |
| User in Germany, English query | `/about` (x-default) |

---

### Core Files & Their Purposes

| File | Purpose |
|------|---------|
| `src/lib/languages.ts` | Language configuration, URL mappings, supported languages |
| `src/lib/translations.ts` | Complete translations for all pages (EN/DA) |
| `src/lib/seo.ts` | SEO metadata generation, hreflang helpers, Schema.org |
| `src/hooks/use-language.ts` | React hook for language detection & switching |
| `src/components/seo/hreflang-head.tsx` | Hreflang link tag component |
| `src/components/seo/structured-data.tsx` | Schema.org JSON-LD components |
| `src/app/sitemap.xml/route.ts` | Dynamic XML sitemap with hreflang |
| `src/app/robots.txt/route.ts` | Robots.txt with sitemap reference |
| `src/app/[lang]/layout.tsx` | Language-specific layout with html lang |
| `src/app/[lang]/(pages)/[...slug]/page.tsx` | Catch-all route for localized URLs |
| `src/middleware.ts` | URL routing and language detection |

---

### URL Structure (Subdirectory Approach)

**This is Google's recommended approach for multilingual sites.**

| English (Default) | Danish |
|------------------|--------|
| `ceptiv.net/` | `ceptiv.net/da` |
| `ceptiv.net/about` | `ceptiv.net/da/om-os` |
| `ceptiv.net/services` | `ceptiv.net/da/tjenester` |
| `ceptiv.net/pricing` | `ceptiv.net/da/priser` |
| `ceptiv.net/contact` | `ceptiv.net/da/kontakt` |
| `ceptiv.net/portfolio` | `ceptiv.net/da/portefolio` |
| `ceptiv.net/privacy` | `ceptiv.net/da/privatliv` |
| `ceptiv.net/terms` | `ceptiv.net/da/vilkar` |
| `ceptiv.net/start` | `ceptiv.net/da/start` |

#### Localized Danish Slugs

Danish URLs use SEO-friendly localized slugs defined in `src/lib/languages.ts`:

```typescript
export const DANISH_URL_MAPPINGS: Record<string, string> = {
  'about': 'om-os',
  'services': 'tjenester',
  'pricing': 'priser',
  'contact': 'kontakt',
  'portfolio': 'portefolio',
  'privacy': 'privatliv',
  'terms': 'vilkar',
  // ... etc
}
```

---

### Hreflang Implementation

**Hreflang tags tell search engines about alternate language versions, preventing duplicate content issues.**

#### Every Page Includes These Tags

```html
<!-- Self-reference + alternate + x-default -->
<link rel="alternate" hreflang="en" href="https://ceptiv.net/about" />
<link rel="alternate" hreflang="da" href="https://ceptiv.net/da/om-os" />
<link rel="alternate" hreflang="x-default" href="https://ceptiv.net/about" />
```

#### Implementation Requirements (CRITICAL)

1. **Self-referencing**: Each page MUST reference itself
2. **Bi-directional**: EN→DA AND DA→EN links required
3. **x-default**: Fallback for unmatched regions (points to English)
4. **Consistency**: Same hreflang in both sitemap AND page metadata

#### Hreflang Helper Usage

```tsx
import { generateHreflangLinks } from '@/lib/seo'

// In generateMetadata function:
const hreflangLinks = generateHreflangLinks('about')
// Returns array of { rel, hreflang, href } objects
```

---

### XML Sitemap with Hreflang

**Route**: `/sitemap.xml`

**The sitemap includes ALL language versions with complete hreflang annotations:**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>https://ceptiv.net/about</loc>
    <lastmod>2026-01-10T...</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
    <xhtml:link rel="alternate" hreflang="en" href="https://ceptiv.net/about" />
    <xhtml:link rel="alternate" hreflang="da" href="https://ceptiv.net/da/om-os" />
    <xhtml:link rel="alternate" hreflang="x-default" href="https://ceptiv.net/about" />
  </url>
  <url>
    <loc>https://ceptiv.net/da/om-os</loc>
    <lastmod>2026-01-10T...</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
    <xhtml:link rel="alternate" hreflang="en" href="https://ceptiv.net/about" />
    <xhtml:link rel="alternate" hreflang="da" href="https://ceptiv.net/da/om-os" />
    <xhtml:link rel="alternate" hreflang="x-default" href="https://ceptiv.net/about" />
  </url>
</urlset>
```

#### Priority Configuration

```typescript
const PAGE_PRIORITIES: Record<string, number> = {
  '': 1.0,           // Home - highest
  'services': 0.9,
  'pricing': 0.9,
  'contact': 0.8,
  'about': 0.7,
  'privacy': 0.3,    // Legal - lowest
  'terms': 0.3,
}
```

---

### HTML Language Attributes

**Set dynamically in `src/app/[lang]/layout.tsx`:**

```tsx
export default async function LangLayout({ children, params }) {
  const lang = (await params).lang
  
  return (
    <html lang={lang} dir="ltr">
      <body>{children}</body>
    </html>
  )
}
```

- **English pages**: `<html lang="en">`
- **Danish pages**: `<html lang="da">`

---

### Metadata System

**File**: `src/lib/seo.ts`

#### Research-Backed Meta Lengths

| Element | Max Length | Reason |
|---------|-----------|--------|
| Meta Title | 50-60 chars | Avoids truncation in SERPs |
| Meta Description | 140-160 chars | Full visibility on desktop |

#### Page Metadata Structure

```typescript
export const PAGE_METADATA = {
  home: {
    en: {
      title: 'Ceptiv - Your Dev Team Without the Overhead',
      description: 'Custom web apps, mobile solutions & AI integrations...',
      keywords: ['web development', 'mobile apps', ...],
    },
    da: {
      title: 'Ceptiv - Dit Udviklerteam Uden Overhead',
      description: 'Skræddersyede webapps, mobilløsninger & AI-integrationer...',
      keywords: ['webudvikling', 'mobilapps', ...],
    },
  },
  // ... all pages
}
```

#### Usage in Pages

```tsx
import { generatePageMetadata } from '@/lib/seo'

export async function generateMetadata({ params }) {
  const lang = (await params).lang
  return generatePageMetadata('about', lang)
}
```

---

### Translations System

**File**: `src/lib/translations.ts`

**Complete translations for all UI content:**

```typescript
export const translations = {
  en: {
    nav: {
      home: 'Home',
      services: 'Services',
      // ...
    },
    home: {
      hero: {
        title: 'Your dev team.',
        titleAccent: 'Without the overhead.',
        // ...
      },
    },
    // ... all pages
  },
  da: {
    nav: {
      home: 'Hjem',
      services: 'Tjenester',
      // ...
    },
    // ... all translations
  },
}
```

#### Usage in Components

```tsx
import { useTranslations } from '@/hooks/use-language'

export function MyComponent() {
  const { t, translations } = useTranslations()
  
  return (
    <h1>{t('home.hero.title')}</h1>
    // or
    <h1>{translations.home.hero.title}</h1>
  )
}
```

---

### Structured Data (Schema.org)

**File**: `src/components/seo/structured-data.tsx`

**JSON-LD schemas for rich snippets:**

```tsx
import { OrganizationSchema, WebPageSchema, LocalBusinessSchema } from '@/components/seo/structured-data'

// In your layout/page:
<>
  <OrganizationSchema />
  <WebPageSchema page="about" lang="en" url="https://ceptiv.net/about" />
</>
```

#### Available Schemas

| Schema | Purpose |
|--------|---------|
| `OrganizationSchema` | Company information |
| `LocalBusinessSchema` | Local SEO (Denmark) |
| `WebPageSchema` | Individual page info |
| `ServiceSchema` | Service offerings |
| `BreadcrumbSchema` | Navigation breadcrumbs |
| `FAQSchema` | FAQ rich snippets |

---

### Language Switcher

**File**: `src/components/language-switcher.tsx`

```tsx
<LanguageSwitcher variant="dark" /> // For dark backgrounds
<LanguageSwitcher variant="light" /> // For light backgrounds (default)
```

**Features**:
- Dropdown with flag + native language name
- Automatically redirects to localized URL (e.g., `/about` → `/da/om-os`)
- Works on mobile and desktop

---

### ⚠️ SEO Implementation Gotchas

#### 1. Hreflang Consistency
**Hreflang must be identical in BOTH the sitemap AND page metadata alternates.**

#### 2. No Auto-Redirects Based on Location
**NEVER** use IP-based redirects to force language. This confuses crawlers and harms UX.

#### 3. Crawl All Versions
Googlebot primarily crawls from US locations. Use Google Search Console to:
- Submit sitemap: `https://ceptiv.net/sitemap.xml`
- Request indexing for `/da/` URLs specifically

#### 4. Translate Everything
All content must be translated—not just body text:
- Meta titles & descriptions ✅
- Alt text for images
- Navigation labels ✅
- Button text ✅
- Error messages

#### 5. Validation Tools
Validate hreflang with:
- [Google's Rich Results Test](https://search.google.com/test/rich-results)
- [Hreflang Tags Testing Tool](https://technicalseo.com/tools/hreflang/)
- [Aleyda Solis Hreflang Generator](https://www.aleydasolis.com/english/international-seo-tools/hreflang-tags-generator/)

---

### Adding a New Language

To add a new language (e.g., German):

1. **Update `src/lib/languages.ts`**:
   ```typescript
   export const LANGUAGES = {
     en: { ... },
     da: { ... },
     de: {
       code: 'de',
       name: 'German',
       nativeName: 'Deutsch',
       flag: '🇩🇪',
       hreflang: 'de',
       default: false,
     },
   }
   
   export const GERMAN_URL_MAPPINGS = {
     'about': 'uber-uns',
     'services': 'dienstleistungen',
     // ...
   }
   ```

2. **Add translations in `src/lib/translations.ts`**

3. **Update SEO metadata in `src/lib/seo.ts`**

4. **Update sitemap to include new language**

5. **Submit new URLs to Google Search Console**

---

### Google Search Console Setup

For proper monitoring, add BOTH URL prefixes:

1. `https://ceptiv.net/` (covers English)
2. `https://ceptiv.net/da/` (covers Danish)

Then:
- Submit sitemap: `https://ceptiv.net/sitemap.xml`
- Monitor indexing separately for each language
- Check for crawl errors in non-English versions

## Integrations

### Grok AI Integration

**x.ai Grok AI** is integrated throughout the platform for AI-powered features.

#### Configuration
- **Admin Panel**: `/admin/integrations/grok`
- **API Endpoint**: `https://api.x.ai/v1/chat/completions`
- **Settings Storage**: `cap_settings` table with keys `grok_enabled` and `grok_api_key`

#### Features
- **Start Project AI Review**: During project submission, Grok analyzes the project description, suggests features, estimates costs, and helps users refine their requirements through real-time chat
- **AI-powered content generation**
- **Smart project analysis and recommendations**

#### Start Project Flow with AI
The `/start` page includes a 7-step wizard:
1. **Situation**: New build or existing system integration
2. **Project Types**: Backend, Website, Mobile, AI, Integration
3. **Project Details**: Description, integrations, AI capabilities, team size
4. **Timeline & Package**: Timeline selection and package size (Small/Medium/Large)
5. **AI Project Review**: Grok analyzes the project and chats with user to refine
6. **Contact Info**: Name, company, email, phone
7. **Review & Submit**: Final review and submission

#### AI System Prompt
The Grok system prompt is defined in `src/lib/grok-system-prompt.ts` and includes:
- Company information and pricing model
- Feature definitions and examples
- Integration pricing guide
- Response format guidelines

#### API Route
- **Endpoint**: `POST /api/grok/chat`
- **Request Body**: `{ messages: ChatMessage[], projectContext: ProjectContext }`
- **Response**: `{ message: string, usage: object }`

#### Setup Steps
1. Visit [x.ai/api](https://x.ai/api) to obtain an API key
2. Go to Admin Panel → Integrations → Configure (Grok card)
3. Toggle "Enable Grok Integration" on
4. Enter your x.ai API key
5. Click "Connect" to validate the API key
6. Save configuration

#### Database Requirements
- Uses existing `cap_settings` table (no additional migrations needed)
- Columns: `key` (VARCHAR), `value` (TEXT)
- Stores rows with keys: `grok_enabled` ('true'/'false'), `grok_api_key` (API key string)

#### Connection Status
- 🟢 **Connected**: Green dot with "Connected" text when API key is valid
- 🔄 **Connecting**: Loading spinner during validation
- ❌ **Error**: Red indicator when connection fails

### Google Analytics Integration

**Google Analytics 4** integration for comprehensive website tracking and analytics.

#### Configuration
- **Admin Panel**: `/admin/integrations/google-analytics`
- **Supported Versions**: Google Analytics 4 (GA4) and Universal Analytics (UA)
- **Settings Storage**: `cap_settings` table with keys `ga_enabled` and `ga_tracking_id`

#### Features
- **Real-time user tracking** and behavior analysis
- **Event and conversion tracking** for user interactions
- **Audience segmentation** and user flow analysis
- **E-commerce tracking** for sales and revenue metrics
- **Custom dimensions and metrics** for advanced reporting

#### Setup Steps
1. Create a Google Analytics 4 property at [analytics.google.com](https://analytics.google.com)
2. Copy your Measurement ID (format: G-XXXXXXXXXX)
3. Go to Admin Panel → Integrations → Configure (Google Analytics card)
4. Toggle "Enable Google Analytics" on
5. Enter your Measurement ID and click "Validate" to check format
6. Save configuration

#### Tracking ID Formats
- **GA4**: `G-XXXXXXXXXX` (recommended)
- **Universal Analytics**: `UA-XXXXXXXXX-X` (legacy support)

#### Database Requirements
- Uses existing `cap_settings` table (no additional migrations needed)
- Stores: `ga_enabled` ('true'/'false'), `ga_tracking_id` (tracking ID string)

#### Implementation Notes
- Tracking code is automatically injected when enabled
- Supports both client-side and server-side tracking
- Respects user privacy and consent requirements

## Agreement Templates

**Custom agreement template management** for generating professional project proposals and contracts.

#### Configuration
- **Admin Panel**: `/admin/agreement`
- **Template Storage**: `cap_settings` table with key `agreement_template`
- **Rich Text Editor**: Full template customization with variable replacement

#### Available Variables

**Client Information:**
- `{{client_name}}` - Client full name
- `{{client_email}}` - Client email address
- `{{client_company}}` - Company name
- `{{client_phone}}` - Phone number
- `{{client_title}}` - Job title

**Project Details:**
- `{{project_description}}` - Full project description
- `{{project_types}}` - Selected project types (Backend, Website, Mobile, AI, etc.)
- `{{selected_integrations}}` - Required third-party integrations
- `{{ai_capabilities}}` - AI/ML requirements
- `{{team_size}}` - Team size estimate

**Package & Pricing:**
- `{{package_name}}` - Package name (Small/Medium/Large/Custom)
- `{{package_features}}` - Number of features included
- `{{package_integrations}}` - Number of integrations included
- `{{package_onetime}}` - One-time development fee (DKK)
- `{{package_monthly}}` - Monthly subscription fee (DKK)
- `{{additional_features}}` - List of extra features
- `{{additional_features_cost}}` - Cost of additional features
- `{{early_cancellation_fee}}` - Early cancellation fee

**Timeline & Dates:**
- `{{timeline}}` - Selected timeline preference
- `{{timeline_description}}` - Detailed timeline information
- `{{current_date}}` - Today's date
- `{{project_start_date}}` - Estimated project start date

**Support & Services:**
- `{{monthly_support_hours}}` - Monthly support hours included

**Company Information:**
- `{{company_name}}` - Ceptiv ApS
- `{{company_cvr}}` - CVR number (37576476)
- `{{company_address}}` - Company address
- `{{company_email}}` - Company email (dv@ceptiv.net)
- `{{company_phone}}` - Company phone (+45 81 98 32 71)

#### Features
- **Rich Text Editor**: Full template customization
- **Variable Replacement**: Automatic population of client and project data
- **Default Template**: Comprehensive agreement template included
- **Real-time Preview**: Test templates with sample data
- **Export Options**: Save and export customized agreements

#### Default Template Includes
- Project overview and scope
- Services and deliverables
- Pricing and payment terms
- Timeline and milestones
- Intellectual property rights
- Confidentiality agreements
- Data protection compliance
- Warranties and limitations
- Termination conditions
- Support and maintenance
- Dispute resolution
- Signature sections

---

## Critical Information for AI Assistants

### ⚠️ Authentication Architecture

This project uses **two separate authentication systems**:

1. **Admin Authentication** (`/admin/*`):
   - Uses Supabase Auth
   - Context: `src/lib/auth-context.tsx` with `useAuth()` hook
   - Users are `authenticated` role in RLS policies

2. **Client Authentication** (`/client/*`):
   - Uses **custom authentication** (NOT Supabase Auth)
   - Context: `src/lib/client-auth.tsx` with `useClientAuth()` hook
   - Clients login with email + 4-digit PIN
   - PIN is stored hashed in `cap_clients.pin_code`
   - Clients are `anon` users to Supabase (critical for RLS policies!)

### ⚠️ RLS Policy Requirements

Because client portal users are `anon` to Supabase:

- All client-facing tables need RLS policies for `anon` role
- See `database/migrations/007_anon_insert_policies.sql` for required policies
- Tables requiring anon access: `cap_clients`, `cap_projects`, `cap_subscriptions`, `cap_features`, `cap_invoices`, `cap_notifications`

### ⚠️ Database Naming Convention

**ALL tables must be prefixed with `cap_`** (Ceptiv Admin Panel):

```sql
-- ✅ Correct
CREATE TABLE cap_clients (...);
CREATE TABLE cap_projects (...);

-- ❌ Wrong
CREATE TABLE clients (...);
CREATE TABLE projects (...);
```

### ⚠️ Migration File Naming

Database scripts use 3-digit numbering:

```
database/migrations/
├── 001_create_cap_settings_table.sql
├── 002_create_cap_user_roles_table.sql
├── 003_create_cap_assets_table.sql
├── 004_create_admin_user.sql
├── 005_create_client_portal_tables.sql
├── 006_billing_and_invoicing.sql
└── 007_anon_insert_policies.sql
```

### ⚠️ Hydration Issues

To avoid React hydration mismatches in Client Components:

```tsx
// ❌ WRONG - causes hydration mismatch
if (typeof window !== 'undefined') {
  // client-only code
}

// ✅ CORRECT - use hooks
const pathname = usePathname()
const [mounted, setMounted] = useState(false)

useEffect(() => {
  setMounted(true)
}, [])
```

### ⚠️ Logo Component Caching

The `Logo` component (`src/components/ui/logo.tsx`) uses an in-memory cache to prevent flickering on navigation. When updating logos in admin:

```tsx
import { clearLogoCache } from '@/components/ui/logo'
// Call after successful logo upload
clearLogoCache()
```

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx                    # Homepage
│   ├── layout.tsx                  # Root layout (server component)
│   ├── root-layout-client.tsx      # Client-side providers wrapper
│   ├── admin/                      # Admin panel (requires Supabase auth)
│   │   ├── layout.tsx              # Admin shell with sidebar
│   │   ├── login/                  # Admin login page
│   │   ├── dashboard/              # Admin dashboard
│   │   ├── projects/               # Manage client projects
│   │   ├── subscriptions/          # Manage subscriptions
│   │   ├── invoices/               # View all invoices
│   │   ├── features/               # Manage feature requests
│   │   └── settings/               # Company settings, branding
│   ├── client/                     # Client portal (custom auth)
│   │   ├── layout.tsx              # Minimal layout (no nav/footer)
│   │   ├── login/                  # Client login (email + PIN)
│   │   └── dashboard/              # Client dashboard
│   │       ├── page.tsx            # Overview with projects
│   │       ├── projects/           # Project details
│   │       ├── subscription/       # View subscription
│   │       ├── invoices/           # View invoices
│   │       └── settings/           # Client settings
│   ├── services/                   # Service detail pages
│   ├── pricing/                    # Pricing page with packages
│   ├── start/                      # Project request form
│   └── ...                         # Other marketing pages
├── components/
│   ├── ui/                         # shadcn/ui components
│   ├── layout/                     # Navigation, Footer
│   └── admin/                      # Admin-specific components
└── lib/
    ├── supabase.ts                 # Supabase client
    ├── auth-context.tsx            # Admin auth (Supabase)
    ├── client-auth.tsx             # Client auth (custom PIN)
    ├── storage.ts                  # File upload utilities
    └── utils.ts                    # Utility functions
```

---

## Database Schema

### Core Tables

| Table | Purpose |
|-------|---------|
| `cap_settings` | Key-value store for app settings (logo URLs, company info) |
| `cap_clients` | Client accounts with email, PIN, company info |
| `cap_projects` | Client projects with status, proposals |
| `cap_subscriptions` | Active subscriptions with billing cycles |
| `cap_features` | Feature requests linked to projects |
| `cap_invoices` | Generated invoices with line items |
| `cap_notifications` | Client notifications |
| `cap_user_roles` | Admin user roles |
| `cap_assets` | Uploaded file tracking |

### Key Relationships

```
cap_clients (1) ──── (N) cap_projects
cap_projects (1) ──── (1) cap_subscriptions
cap_projects (1) ──── (N) cap_features
cap_subscriptions (1) ──── (N) cap_invoices
```

---

## Business Logic

### Subscription Model

- **One-time fee**: Initial project setup
- **Monthly fee**: Ongoing subscription
- **Per-feature pricing**: Additional features cost extra
- **Billing cycles**: Monthly, quarterly, semi-annual, annual
- **Cancellation**: 24-month minimum commitment with early cancellation penalty

### Project Flow

1. Client submits project via `/start` form
2. Client account created with generated 4-digit PIN
3. Client auto-redirected to portal with PIN displayed
4. Admin reviews project in admin panel
5. Admin sends proposal with package selection and pricing
6. Client accepts proposal in portal
7. Subscription and first invoice created automatically

### Packages

- **Small**: Up to 5 features, 1 integration
- **Medium**: Up to 12 features, 3 integrations
- **Large**: Up to 25 features, 6 integrations
- **Custom**: For larger projects

---

## Setup Instructions

### 1. Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 2. Database Setup

Run migrations in order in Supabase SQL Editor:

```bash
database/migrations/001_create_cap_settings_table.sql
database/migrations/002_create_cap_user_roles_table.sql
database/migrations/003_create_cap_assets_table.sql
database/migrations/004_create_admin_user.sql
database/migrations/005_create_client_portal_tables.sql
database/migrations/006_billing_and_invoicing.sql
database/migrations/007_anon_insert_policies.sql
```

### 3. Storage Bucket

In Supabase Dashboard > Storage:

1. Create bucket: `cap_file_bucket`
2. Enable public access
3. Add RLS policies (see `database/setup/`)

### 4. Admin User

Default credentials (created by migration 004):
- **Email**: `admin@ceptiv.net`
- **Password**: `Star9!`

### 5. Run Development Server

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Design System

### Color Palette

This project uses a **strict neutral color palette**. No arbitrary colors allowed.

```css
/* Primary */
neutral-900  /* Black - headings, primary buttons */
neutral-700  /* Secondary buttons, important text */

/* Scale */
neutral-50   /* Very light backgrounds */
neutral-100  /* Light backgrounds, subtle borders */
neutral-200  /* Light borders, dividers */
neutral-300  /* Medium borders */
neutral-400  /* Disabled states */
neutral-500  /* Placeholder text */
neutral-600  /* Body text, icons */
neutral-800  /* Dark backgrounds */
```

### Button Variants

```tsx
// On light backgrounds
<Button variant="default">Primary</Button>
<Button variant="outline">Secondary</Button>

// On dark backgrounds
<Button variant="outline-light">Outlined on Dark</Button>
<Button className="bg-white text-neutral-900">Solid on Dark</Button>
```

### Typography

- **Font**: Geist Sans & Geist Mono (Google Fonts)
- Headings: `font-bold tracking-tight`
- Body: Default weight

---

## Common Patterns

### Client-Side Data Fetching

```tsx
'use client'

import { supabase } from '@/lib/supabase'
import { useClientAuth } from '@/lib/client-auth'

export default function ClientPage() {
  const { client } = useClientAuth()
  const [data, setData] = useState([])

  useEffect(() => {
    if (client?.id) {
      supabase
        .from('cap_projects')
        .select('*')
        .eq('client_id', client.id)
        .then(({ data }) => setData(data || []))
    }
  }, [client])
}
```

### Protected Admin Routes

Admin layout (`src/app/admin/layout.tsx`) handles auth check:
- Redirects to `/admin/login` if not authenticated
- Shows loading state while checking auth
- Renders admin shell (sidebar + header) for authenticated users

### Protected Client Routes

Client dashboard layout handles auth check:
- Redirects to `/client/login` if not authenticated
- Uses custom `useClientAuth()` hook

---

## Troubleshooting

### "Projects not appearing for clients"

RLS policies missing for `anon` role. Run:
```sql
-- database/migrations/007_anon_insert_policies.sql
```

### "Hydration mismatch errors"

Check for `typeof window !== 'undefined'` patterns and replace with proper React hooks.

### "Logo flickering on navigation"

The logo uses in-memory caching. If issues persist after logo update, ensure `clearLogoCache()` is called.

### "Database operations failing silently"

Check Supabase logs. Common issues:
- RLS policies blocking access
- Missing `anon` policies for client portal
- Table/column name mismatches

---

## Company Information

**Ceptiv** (Part of Acenta Group ApS)

- **CVR**: 37576476
- **Address**: Maglebjergvej 6, 2800 Kongens Lyngby, Denmark
- **Email**: dv@ceptiv.net
- **Phone**: +45 81 98 32 71

---

## Deployment

Configured for Vercel. Set environment variables in Vercel project settings.

```bash
npm run build  # Production build
npm run start  # Start production server
```
