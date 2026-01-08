-- Manual Storage Policy Commands for cap_file_bucket
-- Run these individually in Supabase SQL Editor if you have admin permissions
-- Otherwise, use the Dashboard UI method (recommended)

-- 1. Public read access policy
CREATE POLICY "Public access to cap_file_bucket files" ON storage.objects
FOR SELECT TO public
USING (bucket_id = 'cap_file_bucket');

-- 2. Authenticated users can update files
CREATE POLICY "Authenticated users can update cap_file_bucket files" ON storage.objects
FOR UPDATE TO authenticated
USING (bucket_id = 'cap_file_bucket');

-- 3. Authenticated users can delete files
CREATE POLICY "Authenticated users can delete cap_file_bucket files" ON storage.objects
FOR DELETE TO authenticated
USING (bucket_id = 'cap_file_bucket');

-- Note: The INSERT policy (upload) should already exist from bucket creation