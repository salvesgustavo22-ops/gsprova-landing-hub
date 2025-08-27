-- Create a table to store contact form submissions
CREATE TABLE public.contact_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  service_interest TEXT NOT NULL,
  message TEXT,
  accepts_whatsapp BOOLEAN DEFAULT false,
  form_type TEXT NOT NULL CHECK (form_type IN ('contact_form', 'contact_page')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security (since this is a public form, we'll allow inserts from everyone)
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert (public form)
CREATE POLICY "Anyone can insert contact submissions" 
ON public.contact_submissions 
FOR INSERT 
WITH CHECK (true);

-- Create policy for admins/authenticated users to view all submissions
-- (Later you can create admin authentication and restrict this)
CREATE POLICY "Allow viewing contact submissions" 
ON public.contact_submissions 
FOR SELECT 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_contact_submissions_updated_at
BEFORE UPDATE ON public.contact_submissions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for better performance on form_type and created_at
CREATE INDEX idx_contact_submissions_form_type ON public.contact_submissions(form_type);
CREATE INDEX idx_contact_submissions_created_at ON public.contact_submissions(created_at DESC);