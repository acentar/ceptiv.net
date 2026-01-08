-- Storage Policies Reference Script
-- NOTE: These policies should be created through the Supabase Dashboard UI
-- Running this SQL directly requires admin permissions most users don't have
--
-- Instead, use: Supabase Dashboard → Storage → cap_file_bucket → New Policy

-- Policy 1: Allow public access to view cap_file_bucket files
-- Command: SELECT
-- Applied to: public
-- SQL equivalent:
-- CREATE POLICY "Public access to cap_file_bucket files" ON storage.objects
-- FOR SELECT USING (bucket_id = 'cap_file_bucket');

-- Policy 2: Allow authenticated users to update cap_file_bucket files
-- Command: UPDATE
-- Applied to: authenticated
-- SQL equivalent:
-- CREATE POLICY "Authenticated users can update cap_file_bucket files" ON storage.objects
-- FOR UPDATE USING (bucket_id = 'cap_file_bucket' AND auth.role() = 'authenticated');

-- Policy 3: Allow authenticated users to delete cap_file_bucket files
-- Command: DELETE
-- Applied to: authenticated
-- SQL equivalent:
-- CREATE POLICY "Authenticated users can delete cap_file_bucket files" ON storage.objects
-- FOR DELETE USING (bucket_id = 'cap_file_bucket' AND auth.role() = 'authenticated');

-- Policy 4: Allow authenticated users to upload to cap_file_bucket (already exists)
-- This one should already be created when you set up the bucket

-- IMPORTANT: Use the Dashboard UI method, not this SQL script!
-- Dashboard: Supabase → Storage → cap_file_bucket → New Policy