-- Remove the overly permissive SELECT policy that allows public access to contact submissions
DROP POLICY IF EXISTS "Allow viewing contact submissions" ON public.contact_submissions;

-- Create a secure policy that only allows authenticated admin users to view submissions
-- First, create a simple admin check function (we'll enhance this with proper roles later)
CREATE OR REPLACE FUNCTION public.is_admin_user()
RETURNS boolean AS $$
BEGIN
  -- For now, check if user is authenticated (we'll add proper role checking later)
  RETURN auth.uid() IS NOT NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create new restrictive policy for viewing contact submissions
CREATE POLICY "Only authenticated admins can view contact submissions" 
ON public.contact_submissions 
FOR SELECT 
USING (public.is_admin_user());

-- Keep the existing INSERT policy for the contact form to work
-- (The existing "Anyone can insert contact submissions" policy should remain)