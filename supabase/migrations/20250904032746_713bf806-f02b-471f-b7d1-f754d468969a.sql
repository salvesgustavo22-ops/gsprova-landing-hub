-- Create function to check if user is corretor
CREATE OR REPLACE FUNCTION public.is_corretor_user()
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  -- Check if user is authenticated and has corretor role
  RETURN auth.uid() IS NOT NULL AND public.has_role(auth.uid(), 'corretor');
END;
$function$;

-- Update RLS policies to use corretor authentication instead of public access
DROP POLICY IF EXISTS "Allow public access to essays with profiles for correction" ON public.essays;
DROP POLICY IF EXISTS "Allow public updates for corrections" ON public.essays;
DROP POLICY IF EXISTS "Allow public access to profiles for correction" ON public.profiles;
DROP POLICY IF EXISTS "Allow public uploads for corrections" ON storage.objects;

-- Create new policies for authenticated corretors
CREATE POLICY "Corretors can view all essays" 
ON public.essays 
FOR SELECT 
USING (is_corretor_user());

CREATE POLICY "Corretors can update essays for corrections" 
ON public.essays 
FOR UPDATE 
USING (is_corretor_user())
WITH CHECK (is_corretor_user());

CREATE POLICY "Corretors can view all profiles" 
ON public.profiles 
FOR SELECT 
USING (is_corretor_user());

CREATE POLICY "Corretors can upload correction files" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'essay-files' AND is_corretor_user());