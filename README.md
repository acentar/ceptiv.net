# Ceptiv.net

A Next.js application with Supabase integration, using shadcn/ui components and deployed on Vercel.

## Setup

1. Clone the repository
2. Install dependencies: `npm install`

### Environment Variables

1. Copy the template file: `cp env-template.txt .env.local`
2. Edit `.env.local` and replace the placeholder values with your actual Supabase credentials

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Get these values from your Supabase project dashboard.

### Storage Bucket Setup

For file uploads (logos, favicons) to work, you need to create and configure the storage bucket:

**Recommended: Dashboard Setup**
1. Go to your Supabase project dashboard
2. Navigate to **Storage**
3. Click **Create bucket**
4. Name it: `cap_file_bucket`
5. ✅ Check "Public bucket"
6. Click **Create bucket**
7. **Add Required Policies:**
   - **SELECT policy:** `Public access to cap_file_bucket files` (public)
   - **UPDATE policy:** `Authenticated users can update cap_file_bucket files` (authenticated)
   - **DELETE policy:** `Authenticated users can delete cap_file_bucket files` (authenticated)

**Reference Scripts:**
- Bucket creation: `database/setup/001_create_assets_bucket.sql`
- Policy reference: `database/setup/002_storage_policies_reference.sql`
- Manual SQL commands: `database/setup/003_manual_policy_commands.sql`
1. Go to **Storage** in the dashboard
2. Click **Create bucket**
3. Name it: `cap_file_bucket`
4. ✅ **Check "Public bucket"** (important!)
5. Click **Create bucket**
6. **Important:** You'll need to manually create RLS policies (see SQL script for examples)

### Admin User Setup

To create the default admin user, run the database migration script:

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Run the script: `database/migrations/004_create_admin_user.sql`

**Admin Credentials:**
- **Email:** `admin@ceptiv.net`
- **Password:** `Star9!`

⚠️ **Security Note:** This script contains a development password. In production, users should set their own secure passwords.

### Database Schema

**Important:** All tables created in Supabase must be prefixed with `cap_`. This naming convention helps organize the database schema and prevents conflicts with future tables.

Example table names:
- `cap_users` (instead of `users`)
- `cap_posts` (instead of `posts`)
- `cap_comments` (instead of `comments`)

**Database Scripts:** All database migration scripts and SQL files must be prefixed with a 3-digit number for proper ordering and versioning.

Database scripts are located in the `database/migrations/` directory.

**Available Scripts:**
- `001_create_cap_settings_table.sql` - Application settings storage
- `002_create_cap_user_roles_table.sql` - User roles and permissions
- `003_create_cap_assets_table.sql` - Uploaded files/assets tracking
- `004_create_admin_user.sql` - Creates admin user (admin@ceptiv.net / Star9!)

**Example script names:**
- `005_create_cap_users_table.sql`
- `006_add_cap_posts_table.sql`
- `007_create_cap_comments_table.sql`

## Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Design System

### Color Tokens
This project uses a strict neutral color palette to maintain a sleek, professional appearance. **Only color tokens from the UI kit are allowed to be used.**

#### Primary Colors
- **Primary**: `neutral-900` (black) - Used for headings, primary buttons, and key UI elements
- **Secondary**: `neutral-700` - Used for secondary buttons and important text
- **Accent**: `neutral-600` - Used for icons, borders, and supporting text

#### Neutral Palette
- `neutral-50` - Very light backgrounds
- `neutral-100` - Light backgrounds and subtle borders
- `neutral-200` - Light borders and dividers
- `neutral-300` - Medium borders
- `neutral-400` - Medium text and disabled states
- `neutral-500` - Placeholder text
- `neutral-600` - Body text and icons
- `neutral-700` - Secondary buttons and headings
- `neutral-800` - Dark backgrounds
- `neutral-900` - Primary headings and dark text

#### Usage Rules
1. **Never use arbitrary colors** - Always use Tailwind's neutral scale
2. **Primary color is black** (`neutral-900`) - This represents Ceptiv's professional brand
3. **Maintain contrast ratios** - Ensure text readability with proper contrast
4. **Consistent application** - Use the same color tokens across similar UI elements
5. **Theme consistency** - All components should follow the neutral theme

#### Examples
```tsx
// ✅ Correct - Using UI kit colors
<Button className="bg-neutral-900 hover:bg-neutral-800 text-white">
  Primary Action
</Button>

// ❌ Incorrect - Using arbitrary colors
<Button className="bg-blue-600 hover:bg-blue-700 text-white">
  Wrong Color
</Button>
```

## Deployment

This project is configured for deployment on Vercel. Make sure to set the environment variables in your Vercel project settings.