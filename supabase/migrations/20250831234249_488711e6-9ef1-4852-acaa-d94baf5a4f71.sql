-- Create leads table for capturing lead form submissions
CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  lead_type TEXT NOT NULL, -- 'checklist', 'service_interest', etc
  service_selected TEXT, -- for service interest leads
  message TEXT,
  source TEXT, -- page source where lead was captured
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to insert lead data (for public forms)
CREATE POLICY "Allow anonymous lead submissions" 
ON public.leads 
FOR INSERT 
WITH CHECK (true);

-- Only admins can view lead data
CREATE POLICY "Admins can view all leads" 
ON public.leads 
FOR SELECT 
USING (is_admin_user());

-- Add trigger for automatic timestamp updates
CREATE TRIGGER update_leads_updated_at
BEFORE UPDATE ON public.leads
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Add index for better performance on common queries
CREATE INDEX idx_leads_lead_type ON public.leads(lead_type);
CREATE INDEX idx_leads_created_at ON public.leads(created_at DESC);
CREATE INDEX idx_leads_email ON public.leads(email);