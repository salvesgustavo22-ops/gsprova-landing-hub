-- Remove the automatic corretor creation trigger and function
DROP TRIGGER IF EXISTS on_auth_corretor_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_corretor();

-- Update create_corretor_user function to be more explicit about manual creation
CREATE OR REPLACE FUNCTION public.create_corretor_user()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN 'Corretor users must be created manually through database operations. Contact administrator for user creation.';
END;
$$;