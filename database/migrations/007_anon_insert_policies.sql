-- ============================================
-- ANONYMOUS INSERT POLICIES
-- Allow anonymous users to create clients and projects
-- (for the Start Your Project flow)
-- ============================================

-- Allow anonymous users to insert new clients (self-registration)
CREATE POLICY "Allow anon insert clients" ON cap_clients
    FOR INSERT TO anon WITH CHECK (true);

-- Allow anonymous users to select their own client (for checking if exists)
CREATE POLICY "Allow anon select by email" ON cap_clients
    FOR SELECT TO anon USING (true);

-- Allow anonymous users to insert projects (when starting a project)
CREATE POLICY "Allow anon insert projects" ON cap_projects
    FOR INSERT TO anon WITH CHECK (true);

-- Allow anonymous users to insert notifications (for the welcome message)
CREATE POLICY "Allow anon insert notifications" ON cap_notifications
    FOR INSERT TO anon WITH CHECK (true);
