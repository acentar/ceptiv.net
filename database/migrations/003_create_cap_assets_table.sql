-- Create assets table for managing uploaded files
-- This table tracks all uploaded assets like logos, favicons, images, etc.

CREATE TABLE IF NOT EXISTS cap_assets (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    filename VARCHAR(255) NOT NULL,
    original_filename VARCHAR(255) NOT NULL,
    file_path TEXT NOT NULL,
    public_url TEXT NOT NULL,
    file_size BIGINT NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    file_type VARCHAR(50) DEFAULT 'other', -- 'logo', 'favicon', 'image', 'document', 'other'
    category VARCHAR(100) DEFAULT 'general',
    uploaded_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    metadata JSONB DEFAULT '{}',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_cap_assets_file_type ON cap_assets(file_type);
CREATE INDEX IF NOT EXISTS idx_cap_assets_category ON cap_assets(category);
CREATE INDEX IF NOT EXISTS idx_cap_assets_uploaded_by ON cap_assets(uploaded_by);
CREATE INDEX IF NOT EXISTS idx_cap_assets_created_at ON cap_assets(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_cap_assets_is_active ON cap_assets(is_active);

-- Enable Row Level Security
ALTER TABLE cap_assets ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Authenticated users can read assets" ON cap_assets
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert assets" ON cap_assets
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Users can update their own assets" ON cap_assets
    FOR UPDATE USING (auth.uid() = uploaded_by);

CREATE POLICY "Admin users can manage all assets" ON cap_assets
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM cap_user_roles
            WHERE user_id = auth.uid()
            AND role = 'admin'
        )
    );

-- Function to get assets by type
CREATE OR REPLACE FUNCTION get_assets_by_type(asset_type TEXT)
RETURNS TABLE (
    id UUID,
    filename VARCHAR,
    original_filename VARCHAR,
    public_url TEXT,
    file_size BIGINT,
    created_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        a.id,
        a.filename,
        a.original_filename,
        a.public_url,
        a.file_size,
        a.created_at
    FROM cap_assets a
    WHERE a.file_type = asset_type
    AND a.is_active = true
    ORDER BY a.created_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get latest asset of specific type and category
CREATE OR REPLACE FUNCTION get_latest_asset(asset_type TEXT, asset_category TEXT DEFAULT 'general')
RETURNS TABLE (
    id UUID,
    filename VARCHAR,
    public_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        a.id,
        a.filename,
        a.public_url,
        a.created_at
    FROM cap_assets a
    WHERE a.file_type = asset_type
    AND a.category = asset_category
    AND a.is_active = true
    ORDER BY a.created_at DESC
    LIMIT 1;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for updated_at
CREATE TRIGGER update_cap_assets_updated_at
    BEFORE UPDATE ON cap_assets
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();