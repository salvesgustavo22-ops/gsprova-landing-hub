-- Primeiro, atualizar os campos da tabela essays sem mexer no enum
ALTER TABLE public.essays 
ADD COLUMN ip_address inet,
ADD COLUMN geolocation text,
ADD COLUMN data_protection_accepted boolean NOT NULL DEFAULT false,
ADD COLUMN data_protection_ip inet,
ADD COLUMN data_protection_location text,
ADD COLUMN data_protection_timestamp timestamp with time zone,
ADD COLUMN corrector_comments text,
ADD COLUMN revision_essay_file_path text,
ADD COLUMN revision_submitted_at timestamp with time zone,
ADD COLUMN revision_corrected_at timestamp with time zone,
ADD COLUMN is_revision boolean NOT NULL DEFAULT false;

-- Atualizar tabela profiles com campos de proteção de dados
ALTER TABLE public.profiles 
ADD COLUMN data_protection_accepted boolean NOT NULL DEFAULT false,
ADD COLUMN data_protection_ip inet,
ADD COLUMN data_protection_location text,
ADD COLUMN data_protection_timestamp timestamp with time zone;