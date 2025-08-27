-- Fix the search path security warning by updating the function
CREATE OR REPLACE FUNCTION public.is_admin_user()
RETURNS boolean 
LANGUAGE plpgsql 
SECURITY DEFINER 
SET search_path = public
AS $$
BEGIN
  -- For now, check if user is authenticated (we'll add proper role checking later)
  RETURN auth.uid() IS NOT NULL;
END;
$$;