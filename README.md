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

**Example script names:**
- `004_create_cap_users_table.sql`
- `005_add_cap_posts_table.sql`
- `006_create_cap_comments_table.sql`

## Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

This project is configured for deployment on Vercel. Make sure to set the environment variables in your Vercel project settings.