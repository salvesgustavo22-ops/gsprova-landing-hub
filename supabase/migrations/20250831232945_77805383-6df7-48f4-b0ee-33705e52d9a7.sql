-- Allow anonymous users to insert contact form submissions
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.contact_submissions;

CREATE POLICY "Allow anonymous form submissions" 
ON public.contact_submissions 
FOR INSERT 
WITH CHECK (true);

-- Ensure admin users can view all contact submissions (keeping existing policy)
-- This policy should already exist but let's make sure it's correct
DROP POLICY IF EXISTS "Only authenticated admins can view contact submissions" ON public.contact_submissions;

CREATE POLICY "Admins can view all contact submissions" 
ON public.contact_submissions 
FOR SELECT 
USING (is_admin_user());