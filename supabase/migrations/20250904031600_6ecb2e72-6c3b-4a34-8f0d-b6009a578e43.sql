-- Add foreign key constraint between essays and profiles
ALTER TABLE public.essays 
ADD CONSTRAINT fk_essays_profiles 
FOREIGN KEY (user_id) REFERENCES public.profiles(user_id);