-- ============================================
-- ANONYMOUS ACCESS POLICIES
-- The client portal uses custom auth (email + PIN),
-- not Supabase Auth. So clients appear as 'anon' users.
-- These policies allow anonymous access, with the 
-- application handling client_id filtering.
-- ============================================

-- ============================================
-- CAP_CLIENTS
-- ============================================
CREATE POLICY "Allow anon insert clients" ON cap_clients
    FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow anon select clients" ON cap_clients
    FOR SELECT TO anon USING (true);

CREATE POLICY "Allow anon update clients" ON cap_clients
    FOR UPDATE TO anon USING (true);

-- ============================================
-- CAP_PROJECTS
-- ============================================
CREATE POLICY "Allow anon insert projects" ON cap_projects
    FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow anon select projects" ON cap_projects
    FOR SELECT TO anon USING (true);

CREATE POLICY "Allow anon update projects" ON cap_projects
    FOR UPDATE TO anon USING (true);

-- ============================================
-- CAP_SUBSCRIPTIONS
-- ============================================
CREATE POLICY "Allow anon insert subscriptions" ON cap_subscriptions
    FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow anon select subscriptions" ON cap_subscriptions
    FOR SELECT TO anon USING (true);

-- ============================================
-- CAP_FEATURES
-- ============================================
CREATE POLICY "Allow anon insert features" ON cap_features
    FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow anon select features" ON cap_features
    FOR SELECT TO anon USING (true);

CREATE POLICY "Allow anon update features" ON cap_features
    FOR UPDATE TO anon USING (true);

-- ============================================
-- CAP_INVOICES
-- ============================================
CREATE POLICY "Allow anon select invoices" ON cap_invoices
    FOR SELECT TO anon USING (true);

-- ============================================
-- CAP_NOTIFICATIONS
-- ============================================
CREATE POLICY "Allow anon insert notifications" ON cap_notifications
    FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow anon select notifications" ON cap_notifications
    FOR SELECT TO anon USING (true);

CREATE POLICY "Allow anon update notifications" ON cap_notifications
    FOR UPDATE TO anon USING (true);
