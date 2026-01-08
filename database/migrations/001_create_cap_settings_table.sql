-- Create application settings table
-- This table stores global application settings like branding, configuration, etc.

CREATE TABLE IF NOT EXISTS cap_settings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    key VARCHAR(255) NOT NULL UNIQUE,
    value TEXT,
    value_type VARCHAR(50) DEFAULT 'string', -- 'string', 'number', 'boolean', 'json'
    category VARCHAR(100) DEFAULT 'general',
    description TEXT,
    is_public BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default settings for the admin panel
INSERT INTO cap_settings (key, value, value_type, category, description, is_public) VALUES
('site_title', 'Ceptiv.net', 'string', 'branding', 'The main title of the website', true),
('site_description', 'A modern web application', 'string', 'branding', 'Brief description of the website', true),
('logo_url', NULL, 'string', 'branding', 'URL to the site logo (SVG)', true),
('light_logo_url', NULL, 'string', 'branding', 'URL to the light site logo (SVG)', true),
('favicon_url', NULL, 'string', 'branding', 'URL to the site favicon (SVG)', true),
('admin_email', 'admin@ceptiv.net', 'string', 'system', 'Primary admin contact email', false),
('maintenance_mode', 'false', 'boolean', 'system', 'Whether the site is in maintenance mode', true),
('cache_ttl', '3600', 'number', 'performance', 'Default cache time-to-live in seconds', false)
ON CONFLICT (key) DO NOTHING;

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_cap_settings_key ON cap_settings(key);
CREATE INDEX IF NOT EXISTS idx_cap_settings_category ON cap_settings(category);

-- Enable Row Level Security
ALTER TABLE cap_settings ENABLE ROW LEVEL SECURITY;

-- Create policies for admin access (drop existing first to avoid conflicts)
DROP POLICY IF EXISTS "Allow authenticated users to read public settings" ON cap_settings;
DROP POLICY IF EXISTS "Allow authenticated users to update settings" ON cap_settings;
DROP POLICY IF EXISTS "Allow authenticated users to insert settings" ON cap_settings;

CREATE POLICY "Allow authenticated users to read public settings" ON cap_settings
    FOR SELECT USING (is_public = true OR auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update settings" ON cap_settings
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to insert settings" ON cap_settings
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at (drop existing first)
DROP TRIGGER IF EXISTS update_cap_settings_updated_at ON cap_settings;

CREATE TRIGGER update_cap_settings_updated_at
    BEFORE UPDATE ON cap_settings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();