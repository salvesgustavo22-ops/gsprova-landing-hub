-- Clean up conflicting RLS policies on leads table
-- This ensures only admins can view sensitive customer contact information

-- Drop all existing SELECT policies (conflicting and redundant)
DROP POLICY IF EXISTS "Allow anonymous lead submissions" ON public.leads;
DROP POLICY IF EXISTS "Deny anonymous access to leads data" ON public.leads;
DROP POLICY IF EXISTS "Deny non-admin authenticated users from viewing leads" ON public.leads;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.leads;
DROP POLICY IF EXISTS "leads_select_admin_only" ON public.leads;

-- Drop duplicate INSERT policy
DROP POLICY IF EXISTS "leads_insert_public" ON public.leads;

-- Drop old admin policies that use inconsistent JWT checks
DROP POLICY IF EXISTS "leads_delete_admin_only" ON public.leads;
DROP POLICY IF EXISTS "leads_update_admin_only" ON public.leads;

-- Create consolidated, secure policies
-- Allow anonymous users to submit leads (required for contact forms)
CREATE POLICY "Public can submit leads"
ON public.leads
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Only admins can view lead data (uses secure is_admin_user function)
CREATE POLICY "Only admins can view leads"
ON public.leads
FOR SELECT
TO authenticated
USING (public.is_admin_user());

-- Only admins can update leads
CREATE POLICY "Only admins can update leads"
ON public.leads
FOR UPDATE
TO authenticated
USING (public.is_admin_user())
WITH CHECK (public.is_admin_user());

-- Only admins can delete leads
CREATE POLICY "Only admins can delete leads"
ON public.leads
FOR DELETE
TO authenticated
USING (public.is_admin_user());