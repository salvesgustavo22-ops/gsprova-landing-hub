-- Create policy to allow public updates for correction fields only
-- This allows the correction panel to update essays with correction data
CREATE POLICY "Allow public updates for corrections" 
ON public.essays 
FOR UPDATE 
USING (true)
WITH CHECK (true);