-- Create profiles table for additional user information
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create enum for essay origin
CREATE TYPE essay_origin AS ENUM ('gs_aprova', 'external');

-- Create enum for essay status  
CREATE TYPE essay_status AS ENUM ('pending', 'corrected');

-- Create enum for correction banks
CREATE TYPE correction_bank AS ENUM ('enem', 'fuvest', 'vunesp', 'other');

-- Create essays table
CREATE TABLE public.essays (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  origin essay_origin NOT NULL,
  theme_title TEXT,
  bank correction_bank NOT NULL,
  bank_other TEXT,
  proposal_file_path TEXT,
  essay_file_path TEXT NOT NULL,
  status essay_status NOT NULL DEFAULT 'pending',
  correction_file_path TEXT,
  correction_id TEXT,
  downloaded_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.essays ENABLE ROW LEVEL SECURITY;

-- Create policies for essays
CREATE POLICY "Users can view their own essays" 
ON public.essays 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own essays" 
ON public.essays 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own essays" 
ON public.essays 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES ('essay-files', 'essay-files', false);

-- Create storage policies
CREATE POLICY "Users can upload their own files" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'essay-files' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view their own files" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'essay-files' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Add trigger for profiles timestamp updates
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Add trigger for essays timestamp updates
CREATE TRIGGER update_essays_updated_at
BEFORE UPDATE ON public.essays
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Function to generate correction ID
CREATE OR REPLACE FUNCTION generate_correction_id(essay_origin essay_origin)
RETURNS TEXT
LANGUAGE plpgsql
AS $$
DECLARE
  prefix TEXT;
  sequence_num INTEGER;
  correction_id TEXT;
BEGIN
  -- Set prefix based on origin
  IF essay_origin = 'gs_aprova' THEN
    prefix := 'G';
  ELSE
    prefix := 'E';
  END IF;
  
  -- Get next sequence number for this origin
  SELECT COALESCE(MAX(CAST(SUBSTRING(correction_id FROM 2) AS INTEGER)), 0) + 1
  INTO sequence_num
  FROM public.essays
  WHERE origin = essay_origin AND correction_id IS NOT NULL;
  
  -- Format correction ID
  correction_id := prefix || LPAD(sequence_num::TEXT, 5, '0');
  
  RETURN correction_id;
END;
$$;