-- Create and configure the assets storage bucket for logo and favicon uploads
-- This bucket will store uploaded files like logos, favicons, and other assets

-- Create the assets bucket (if it doesn't exist)
INSERT INTO storage.buckets (id, name, public)
VALUES ('assets', 'assets', true)
ON CONFLICT (id) DO NOTHING;

-- Enable RLS on the bucket
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Create policy to allow authenticated users to upload files to assets bucket
CREATE POLICY "Allow authenticated users to upload assets" ON storage.objects
FOR INSERT WITH CHECK (
    bucket_id = 'assets'
    AND auth.role() = 'authenticated'
);

-- Create policy to allow authenticated users to update their own files
CREATE POLICY "Allow authenticated users to update assets" ON storage.objects
FOR UPDATE USING (
    bucket_id = 'assets'
    AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Create policy to allow authenticated users to delete their own files
CREATE POLICY "Allow authenticated users to delete assets" ON storage.objects
FOR DELETE USING (
    bucket_id = 'assets'
    AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Create policy to allow public access to view assets (since bucket is public)
CREATE POLICY "Allow public access to assets" ON storage.objects
FOR SELECT USING (bucket_id = 'assets');

-- Optional: Create policy for admin users to manage all assets
CREATE POLICY "Allow admin users to manage all assets" ON storage.objects
FOR ALL USING (
    bucket_id = 'assets'
    AND EXISTS (
        SELECT 1 FROM cap_user_roles
        WHERE user_id = auth.uid()
        AND role = 'admin'
    )
);