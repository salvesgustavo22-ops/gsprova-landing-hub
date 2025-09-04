-- Create policy to allow public access to essays with profiles for correction panel
-- This is needed because the correction panel doesn't use Supabase auth
CREATE POLICY "Allow public access to essays with profiles for correction" 
ON public.essays 
FOR SELECT 
USING (true);

-- Allow public access to profiles for correction panel
CREATE POLICY "Allow public access to profiles for correction" 
ON public.profiles 
FOR SELECT 
USING (true);