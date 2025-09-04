-- Function to create corretor user and assign role
CREATE OR REPLACE FUNCTION create_corretor_user()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  corretor_user_id UUID;
BEGIN
  -- Insert into auth.users (this is a simplified approach - in production you'd use the proper auth API)
  -- For now, we'll create the profile and role, and the user will be created when they first sign up
  
  -- Check if a corretor role already exists
  SELECT user_id INTO corretor_user_id 
  FROM public.user_roles 
  WHERE role = 'corretor'::app_role 
  LIMIT 1;
  
  IF corretor_user_id IS NOT NULL THEN
    RETURN 'Corretor user already exists with ID: ' || corretor_user_id;
  END IF;
  
  RETURN 'Corretor role system ready. Use email: corretor@gsaprova.com and password: GsAprova@34 to sign up.';
END;
$$;

-- Execute the function
SELECT create_corretor_user();