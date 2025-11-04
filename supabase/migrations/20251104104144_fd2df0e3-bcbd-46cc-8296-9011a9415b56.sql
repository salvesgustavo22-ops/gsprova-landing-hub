-- Add interest columns to guia_leads table
ALTER TABLE public.guia_leads
ADD COLUMN IF NOT EXISTS interest_vestibular boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS interest_concursos boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS interest_aulas_particulares boolean DEFAULT false;