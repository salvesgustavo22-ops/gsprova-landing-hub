-- Remove insecure public insert policy from profiles table
-- This prevents unauthenticated users from creating fake profiles
DROP POLICY IF EXISTS "profiles_insert_public" ON public.profiles;

-- The "Users can insert their own profile" policy remains active
-- and ensures only authenticated users can create their own profiles