-- Create surveys table for anonymous survey data
CREATE TABLE public.surveys (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  age integer NOT NULL CHECK (age >= 14 AND age <= 30),
  state text NOT NULL CHECK (length(state) = 2),
  has_difficulties boolean NOT NULL DEFAULT false,
  difficulties text[] DEFAULT '{}',
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  ip_address inet,
  utm_source text,
  utm_medium text,
  utm_campaign text
);

-- Enable Row Level Security
ALTER TABLE public.surveys ENABLE ROW LEVEL SECURITY;

-- Create policies for surveys table
CREATE POLICY "Allow anonymous survey submissions" 
ON public.surveys 
FOR INSERT 
WITH CHECK (true);

-- Only admins can view survey data
CREATE POLICY "Admins can view all surveys" 
ON public.surveys 
FOR SELECT 
USING (is_admin_user());

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_surveys_updated_at
BEFORE UPDATE ON public.surveys
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for better performance on common queries
CREATE INDEX idx_surveys_created_at ON public.surveys(created_at DESC);
CREATE INDEX idx_surveys_state ON public.surveys(state);
CREATE INDEX idx_surveys_age ON public.surveys(age);