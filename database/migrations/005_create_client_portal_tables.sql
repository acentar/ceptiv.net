-- Client Portal Tables
-- Run this migration in Supabase SQL Editor

-- ============================================
-- CLIENTS TABLE
-- Stores client information and login credentials
-- ============================================
CREATE TABLE IF NOT EXISTS cap_clients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    pin_code TEXT NOT NULL, -- 4-digit PIN, stored hashed
    company_name TEXT,
    contact_name TEXT NOT NULL,
    phone TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_login_at TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT true
);

-- ============================================
-- PROJECTS TABLE
-- Stores client projects and their status
-- ============================================
CREATE TYPE cap_project_status AS ENUM (
    'pending',           -- Just submitted, awaiting admin review
    'proposal_sent',     -- Admin sent subscription proposal
    'proposal_accepted', -- Client accepted the proposal
    'in_progress',       -- Development in progress
    'completed',         -- Project delivered
    'on_hold',           -- Temporarily paused
    'cancelled'          -- Project cancelled
);

CREATE TYPE cap_project_type AS ENUM (
    'backend_application',
    'website',
    'mobile_app',
    'ai_integration',
    'integration'
);

CREATE TABLE IF NOT EXISTS cap_projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL REFERENCES cap_clients(id) ON DELETE CASCADE,
    
    -- Project details from Start flow
    project_name TEXT NOT NULL,
    project_type cap_project_type NOT NULL,
    description TEXT,
    is_new_build BOOLEAN DEFAULT true, -- true = from scratch, false = existing system
    
    -- Timeline and budget from Start flow
    timeline TEXT,
    budget_range TEXT,
    
    -- Admin proposal
    proposed_package TEXT, -- 'small', 'medium', 'large', 'custom'
    proposed_one_time_fee DECIMAL(10,2),
    proposed_monthly_fee DECIMAL(10,2),
    proposed_features INTEGER,
    proposed_integrations INTEGER,
    proposal_notes TEXT,
    proposal_sent_at TIMESTAMP WITH TIME ZONE,
    proposal_accepted_at TIMESTAMP WITH TIME ZONE,
    
    -- Status
    status cap_project_status DEFAULT 'pending',
    
    -- Assigned contact person (admin user)
    contact_person_id UUID REFERENCES auth.users(id),
    contact_person_name TEXT,
    contact_person_email TEXT,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- SUBSCRIPTIONS TABLE
-- Active subscriptions for clients
-- ============================================
CREATE TYPE cap_subscription_status AS ENUM (
    'active',
    'paused',
    'cancelled',
    'pending_cancellation'
);

CREATE TABLE IF NOT EXISTS cap_subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL REFERENCES cap_clients(id) ON DELETE CASCADE,
    project_id UUID NOT NULL REFERENCES cap_projects(id) ON DELETE CASCADE,
    
    package_name TEXT NOT NULL, -- 'small', 'medium', 'large', 'custom'
    package_type TEXT NOT NULL, -- 'web' or 'mobile'
    
    one_time_fee DECIMAL(10,2) NOT NULL,
    one_time_fee_paid BOOLEAN DEFAULT false,
    one_time_fee_paid_at TIMESTAMP WITH TIME ZONE,
    
    monthly_fee DECIMAL(10,2) NOT NULL,
    
    total_features INTEGER NOT NULL,
    used_features INTEGER DEFAULT 0,
    remaining_features INTEGER GENERATED ALWAYS AS (total_features - used_features) STORED,
    
    total_integrations INTEGER NOT NULL,
    used_integrations INTEGER DEFAULT 0,
    
    status cap_subscription_status DEFAULT 'active',
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    cancelled_at TIMESTAMP WITH TIME ZONE,
    cancellation_penalty_paid BOOLEAN DEFAULT false,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- FEATURES TABLE
-- Track features for each project
-- ============================================
CREATE TYPE cap_feature_status AS ENUM (
    'requested',      -- Client requested this feature
    'pending_review', -- Awaiting admin review
    'approved',       -- Approved and in backlog
    'in_progress',    -- Currently being developed
    'completed',      -- Delivered
    'rejected'        -- Not approved
);

CREATE TABLE IF NOT EXISTS cap_features (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES cap_projects(id) ON DELETE CASCADE,
    subscription_id UUID REFERENCES cap_subscriptions(id),
    
    title TEXT NOT NULL,
    description TEXT,
    
    -- Structured feature request fields
    user_story TEXT, -- "As a [user], I want to [action] so that [benefit]"
    acceptance_criteria TEXT,
    priority TEXT, -- 'low', 'medium', 'high', 'critical'
    
    -- Pricing (for additional features beyond package)
    is_additional BOOLEAN DEFAULT false, -- true if beyond package features
    additional_fee DECIMAL(10,2),
    fee_paid BOOLEAN DEFAULT false,
    
    status cap_feature_status DEFAULT 'requested',
    
    -- Admin notes
    admin_notes TEXT,
    estimated_hours INTEGER,
    
    requested_by UUID REFERENCES cap_clients(id),
    created_by_admin BOOLEAN DEFAULT false,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE
);

-- ============================================
-- INVOICES TABLE
-- Track invoices for clients
-- ============================================
CREATE TYPE cap_invoice_status AS ENUM (
    'draft',
    'sent',
    'paid',
    'overdue',
    'cancelled'
);

CREATE TYPE cap_invoice_type AS ENUM (
    'one_time',
    'monthly',
    'additional_feature',
    'cancellation_penalty'
);

CREATE TABLE IF NOT EXISTS cap_invoices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL REFERENCES cap_clients(id) ON DELETE CASCADE,
    project_id UUID REFERENCES cap_projects(id),
    subscription_id UUID REFERENCES cap_subscriptions(id),
    
    invoice_number TEXT UNIQUE NOT NULL,
    invoice_type cap_invoice_type NOT NULL,
    
    amount DECIMAL(10,2) NOT NULL,
    currency TEXT DEFAULT 'DKK',
    
    description TEXT,
    
    status cap_invoice_status DEFAULT 'draft',
    
    issued_at TIMESTAMP WITH TIME ZONE,
    due_at TIMESTAMP WITH TIME ZONE,
    paid_at TIMESTAMP WITH TIME ZONE,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- NOTIFICATIONS TABLE
-- Notifications for clients
-- ============================================
CREATE TABLE IF NOT EXISTS cap_notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID NOT NULL REFERENCES cap_clients(id) ON DELETE CASCADE,
    
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT NOT NULL, -- 'proposal', 'invoice', 'feature_update', 'project_update'
    
    related_project_id UUID REFERENCES cap_projects(id),
    related_feature_id UUID REFERENCES cap_features(id),
    related_invoice_id UUID REFERENCES cap_invoices(id),
    
    is_read BOOLEAN DEFAULT false,
    read_at TIMESTAMP WITH TIME ZONE,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- ROW LEVEL SECURITY POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE cap_clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE cap_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE cap_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE cap_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE cap_invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE cap_notifications ENABLE ROW LEVEL SECURITY;

-- Admin can do everything (authenticated users with admin role)
-- These policies assume you have a way to identify admin users

-- For now, allow authenticated users to read/write (you'll want to tighten this)
CREATE POLICY "Allow authenticated read access" ON cap_clients
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated insert access" ON cap_clients
    FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow authenticated update access" ON cap_clients
    FOR UPDATE TO authenticated USING (true);

-- Similar policies for other tables
CREATE POLICY "Allow authenticated read access" ON cap_projects
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated all access" ON cap_projects
    FOR ALL TO authenticated USING (true);

CREATE POLICY "Allow authenticated all access" ON cap_subscriptions
    FOR ALL TO authenticated USING (true);

CREATE POLICY "Allow authenticated all access" ON cap_features
    FOR ALL TO authenticated USING (true);

CREATE POLICY "Allow authenticated all access" ON cap_invoices
    FOR ALL TO authenticated USING (true);

CREATE POLICY "Allow authenticated all access" ON cap_notifications
    FOR ALL TO authenticated USING (true);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================
CREATE INDEX idx_projects_client_id ON cap_projects(client_id);
CREATE INDEX idx_projects_status ON cap_projects(status);
CREATE INDEX idx_subscriptions_client_id ON cap_subscriptions(client_id);
CREATE INDEX idx_features_project_id ON cap_features(project_id);
CREATE INDEX idx_invoices_client_id ON cap_invoices(client_id);
CREATE INDEX idx_notifications_client_id ON cap_notifications(client_id);
CREATE INDEX idx_notifications_unread ON cap_notifications(client_id, is_read) WHERE is_read = false;

-- ============================================
-- UPDATED_AT TRIGGERS
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_cap_clients_updated_at BEFORE UPDATE ON cap_clients
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cap_projects_updated_at BEFORE UPDATE ON cap_projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cap_subscriptions_updated_at BEFORE UPDATE ON cap_subscriptions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cap_features_updated_at BEFORE UPDATE ON cap_features
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cap_invoices_updated_at BEFORE UPDATE ON cap_invoices
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
