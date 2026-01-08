-- Create the cap_file_bucket storage bucket and set up proper RLS policies
-- This bucket will store uploaded files like logos, favicons, and other assets

-- Create the bucket (if it doesn't exist)
INSERT INTO storage.buckets (id, name, public)
VALUES ('cap_file_bucket', 'cap_file_bucket', true)
ON CONFLICT (id) DO NOTHING;

-- Enable RLS on storage.objects if not already enabled
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Allow authenticated users to upload to cap_file_bucket" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated users to update cap_file_bucket files" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated users to delete cap_file_bucket files" ON storage.objects;
DROP POLICY IF EXISTS "Allow public access to cap_file_bucket files" ON storage.objects;
DROP POLICY IF EXISTS "Allow admin users to manage cap_file_bucket files" ON storage.objects;

-- Create policies for the cap_file_bucket
CREATE POLICY "Allow authenticated users to upload to cap_file_bucket" ON storage.objects
FOR INSERT WITH CHECK (
    bucket_id = 'cap_file_bucket'
    AND auth.role() = 'authenticated'
);

CREATE POLICY "Allow authenticated users to update cap_file_bucket files" ON storage.objects
FOR UPDATE USING (
    bucket_id = 'cap_file_bucket'
    AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Allow authenticated users to delete cap_file_bucket files" ON storage.objects
FOR DELETE USING (
    bucket_id = 'cap_file_bucket'
    AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Allow public access to cap_file_bucket files" ON storage.objects
FOR SELECT USING (bucket_id = 'cap_file_bucket');

CREATE POLICY "Allow admin users to manage cap_file_bucket files" ON storage.objects
FOR ALL USING (
    bucket_id = 'cap_file_bucket'
    AND EXISTS (
        SELECT 1 FROM cap_user_roles
        WHERE user_id = auth.uid()
        AND role = 'admin'
    )
);