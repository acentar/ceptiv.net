-- Billing and Invoicing Updates
-- Run this migration in Supabase SQL Editor

-- ============================================
-- ADD BILLING CYCLE TO SUBSCRIPTIONS
-- ============================================
ALTER TABLE cap_subscriptions 
ADD COLUMN IF NOT EXISTS billing_cycle TEXT DEFAULT 'monthly' CHECK (billing_cycle IN ('monthly', 'quarterly', 'biannual', 'annual'));

ALTER TABLE cap_subscriptions 
ADD COLUMN IF NOT EXISTS next_billing_date TIMESTAMP WITH TIME ZONE;

ALTER TABLE cap_subscriptions 
ADD COLUMN IF NOT EXISTS last_billing_date TIMESTAMP WITH TIME ZONE;

-- ============================================
-- ADD BILLING CYCLE TO PROJECTS (for proposal)
-- ============================================
ALTER TABLE cap_projects 
ADD COLUMN IF NOT EXISTS proposed_billing_cycle TEXT DEFAULT 'monthly' CHECK (proposed_billing_cycle IN ('monthly', 'quarterly', 'biannual', 'annual'));

-- ============================================
-- UPDATE INVOICES TABLE
-- ============================================
ALTER TABLE cap_invoices 
ADD COLUMN IF NOT EXISTS billing_period_start TIMESTAMP WITH TIME ZONE;

ALTER TABLE cap_invoices 
ADD COLUMN IF NOT EXISTS billing_period_end TIMESTAMP WITH TIME ZONE;

ALTER TABLE cap_invoices 
ADD COLUMN IF NOT EXISTS line_items JSONB DEFAULT '[]';

ALTER TABLE cap_invoices 
ADD COLUMN IF NOT EXISTS subtotal DECIMAL(10,2);

ALTER TABLE cap_invoices 
ADD COLUMN IF NOT EXISTS tax_rate DECIMAL(5,2) DEFAULT 0;

ALTER TABLE cap_invoices 
ADD COLUMN IF NOT EXISTS tax_amount DECIMAL(10,2) DEFAULT 0;

ALTER TABLE cap_invoices 
ADD COLUMN IF NOT EXISTS notes TEXT;

-- ============================================
-- INVOICE SETTINGS (stored in cap_settings)
-- ============================================
-- Insert default invoice settings if not exists
INSERT INTO cap_settings (key, value) VALUES 
  ('invoice_company_name', 'Acenta Group ApS'),
  ('invoice_street', 'Maglebjergvej 6'),
  ('invoice_postal', '2800'),
  ('invoice_city', 'Kongens Lyngby'),
  ('invoice_country', 'Denmark'),
  ('invoice_cvr', '37576476'),
  ('invoice_policy', 'Payment is due within 14 days of invoice date. Late payments may incur additional fees.'),
  ('invoice_bank_name', ''),
  ('invoice_bank_account', ''),
  ('invoice_bank_iban', ''),
  ('invoice_next_number', '1001')
ON CONFLICT (key) DO NOTHING;

-- ============================================
-- ADD CLIENT BILLING ADDRESS
-- ============================================
ALTER TABLE cap_clients 
ADD COLUMN IF NOT EXISTS billing_street TEXT;

ALTER TABLE cap_clients 
ADD COLUMN IF NOT EXISTS billing_postal TEXT;

ALTER TABLE cap_clients 
ADD COLUMN IF NOT EXISTS billing_city TEXT;

ALTER TABLE cap_clients 
ADD COLUMN IF NOT EXISTS billing_country TEXT DEFAULT 'Denmark';

ALTER TABLE cap_clients 
ADD COLUMN IF NOT EXISTS billing_cvr TEXT;

-- ============================================
-- CREATE FUNCTION FOR INVOICE NUMBER GENERATION
-- ============================================
CREATE OR REPLACE FUNCTION generate_invoice_number()
RETURNS TEXT AS $$
DECLARE
  next_num INTEGER;
  invoice_num TEXT;
BEGIN
  -- Get and increment the invoice number
  UPDATE cap_settings 
  SET value = (value::INTEGER + 1)::TEXT 
  WHERE key = 'invoice_next_number'
  RETURNING value::INTEGER - 1 INTO next_num;
  
  -- Format as INV-YYYY-XXXX
  invoice_num := 'INV-' || EXTRACT(YEAR FROM NOW())::TEXT || '-' || LPAD(next_num::TEXT, 4, '0');
  
  RETURN invoice_num;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- CREATE FUNCTION TO CALCULATE NEXT BILLING DATE
-- ============================================
CREATE OR REPLACE FUNCTION calculate_next_billing_date(
  current_date TIMESTAMP WITH TIME ZONE,
  billing_cycle TEXT
)
RETURNS TIMESTAMP WITH TIME ZONE AS $$
BEGIN
  CASE billing_cycle
    WHEN 'monthly' THEN RETURN current_date + INTERVAL '1 month';
    WHEN 'quarterly' THEN RETURN current_date + INTERVAL '3 months';
    WHEN 'biannual' THEN RETURN current_date + INTERVAL '6 months';
    WHEN 'annual' THEN RETURN current_date + INTERVAL '1 year';
    ELSE RETURN current_date + INTERVAL '1 month';
  END CASE;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- INDEX FOR BILLING QUERIES
-- ============================================
CREATE INDEX IF NOT EXISTS idx_subscriptions_next_billing ON cap_subscriptions(next_billing_date) WHERE status = 'active';
CREATE INDEX IF NOT EXISTS idx_invoices_status ON cap_invoices(status);
CREATE INDEX IF NOT EXISTS idx_invoices_due_date ON cap_invoices(due_at) WHERE status IN ('sent', 'overdue');
