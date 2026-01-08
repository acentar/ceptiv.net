-- Create user roles and permissions table
-- This table manages user roles and their associated permissions

CREATE TABLE IF NOT EXISTS cap_user_roles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    role VARCHAR(50) NOT NULL DEFAULT 'user',
    permissions JSONB DEFAULT '[]',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    UNIQUE(user_id)
);

-- Insert default admin role for the first user
-- Note: Replace 'admin-user-id' with the actual admin user ID from auth.users
-- This would typically be done after creating the admin user

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_cap_user_roles_user_id ON cap_user_roles(user_id);
CREATE INDEX IF NOT EXISTS idx_cap_user_roles_role ON cap_user_roles(role);

-- Enable Row Level Security
ALTER TABLE cap_user_roles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read their own roles" ON cap_user_roles
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admin users can manage all roles" ON cap_user_roles
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM cap_user_roles
            WHERE user_id = auth.uid()
            AND role = 'admin'
        )
    );

-- Function to check if user has admin role
CREATE OR REPLACE FUNCTION is_admin(user_uuid UUID DEFAULT auth.uid())
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM cap_user_roles
        WHERE user_id = user_uuid
        AND role = 'admin'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check user permissions
CREATE OR REPLACE FUNCTION has_permission(permission_name TEXT, user_uuid UUID DEFAULT auth.uid())
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM cap_user_roles
        WHERE user_id = user_uuid
        AND (role = 'admin' OR permissions ? permission_name)
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for updated_at
CREATE TRIGGER update_cap_user_roles_updated_at
    BEFORE UPDATE ON cap_user_roles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();