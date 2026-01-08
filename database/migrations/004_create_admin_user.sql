-- Create admin user: admin@ceptiv.net with password Star9!
-- SECURITY NOTE: This script contains a plaintext password for development purposes only.
-- In production, users should set their own passwords through the Supabase auth flow.
-- Never commit scripts with real user passwords to version control.

-- First, check if the user already exists
DO $$
DECLARE
    user_exists BOOLEAN;
BEGIN
    -- Check if user already exists
    SELECT EXISTS(
        SELECT 1 FROM auth.users
        WHERE email = 'admin@ceptiv.net'
    ) INTO user_exists;

    -- Only create user if they don't exist
    IF NOT user_exists THEN
        -- Insert admin user into auth.users
        INSERT INTO auth.users (
            instance_id,
            id,
            aud,
            role,
            email,
            encrypted_password,
            email_confirmed_at,
            invited_at,
            confirmation_token,
            confirmation_sent_at,
            recovery_token,
            recovery_sent_at,
            email_change_token_new,
            email_change,
            email_change_sent_at,
            last_sign_in_at,
            raw_app_meta_data,
            raw_user_meta_data,
            is_super_admin,
            created_at,
            updated_at,
            phone,
            phone_confirmed_at,
            phone_change,
            phone_change_token,
            phone_change_sent_at,
            email_change_token_current,
            email_change_confirm_status,
            banned_until,
            reauthentication_token,
            reauthentication_sent_at
        ) VALUES (
            '00000000-0000-0000-0000-000000000000'::uuid, -- default instance_id
            gen_random_uuid(), -- random UUID for user
            'authenticated',
            'authenticated',
            'admin@ceptiv.net',
            crypt('Star9!', gen_salt('bf')), -- encrypted password
            NOW(), -- email_confirmed_at
            NULL, -- invited_at
            '', -- confirmation_token
            NULL, -- confirmation_sent_at
            '', -- recovery_token
            NULL, -- recovery_sent_at
            '', -- email_change_token_new
            '', -- email_change
            NULL, -- email_change_sent_at
            NULL, -- last_sign_in_at
            '{"provider": "email", "providers": ["email"]}', -- raw_app_meta_data
            '{}', -- raw_user_meta_data
            FALSE, -- is_super_admin
            NOW(), -- created_at
            NOW(), -- updated_at
            NULL, -- phone
            NULL, -- phone_confirmed_at
            '', -- phone_change
            '', -- phone_change_token
            NULL, -- phone_change_sent_at
            '', -- email_change_token_current
            0, -- email_change_confirm_status
            NULL, -- banned_until
            '', -- reauthentication_token
            NULL -- reauthentication_sent_at
        );

        -- Create admin role entry
        INSERT INTO cap_user_roles (user_id, role, permissions)
        SELECT
            id,
            'admin',
            '["all"]'::jsonb
        FROM auth.users
        WHERE email = 'admin@ceptiv.net';

        RAISE NOTICE 'Admin user admin@ceptiv.net created successfully';
    ELSE
        RAISE NOTICE 'Admin user admin@ceptiv.net already exists';
    END IF;
END $$;