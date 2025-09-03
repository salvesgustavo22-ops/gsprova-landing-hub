-- Add explicit policy to deny anonymous users from viewing leads data
-- This ensures only authenticated admin users can view customer lead information
CREATE POLICY "Deny anonymous access to leads data" 
ON public.leads 
FOR SELECT 
TO anon 
USING (false);

-- Add policy for authenticated non-admin users (deny access)
CREATE POLICY "Deny non-admin authenticated users from viewing leads" 
ON public.leads 
FOR SELECT 
TO authenticated 
USING (is_admin_user());