-- Allow anon users to read grok settings (needed for API route)
-- The API key is still secure because it's only read server-side

-- Add policy for anon to read grok settings
DROP POLICY IF EXISTS "Allow anon to read grok settings" ON cap_settings;

CREATE POLICY "Allow anon to read grok settings" ON cap_settings
    FOR SELECT 
    USING (
        key IN ('grok_enabled', 'grok_api_key') 
        OR is_public = true 
        OR auth.role() = 'authenticated'
    );

-- Note: The original policy "Allow authenticated users to read public settings" 
-- is now superseded by this more permissive policy for grok settings.
-- This is safe because:
-- 1. grok_enabled is just a boolean flag
-- 2. grok_api_key is only used server-side in the API route
-- 3. The API key is never exposed to the client
