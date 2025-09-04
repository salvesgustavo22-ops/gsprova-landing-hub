-- Create corretor role in the app_role enum if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'app_role' AND 'corretor' = ANY(enum_range(NULL::app_role)::text[])) THEN
        ALTER TYPE app_role ADD VALUE 'corretor';
    END IF;
END $$;

-- Insert corretor user role (this will be set after we create the auth user)
-- We'll use a placeholder UUID for now and update it after user creation