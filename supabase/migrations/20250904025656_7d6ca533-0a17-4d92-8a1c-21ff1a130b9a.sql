-- Atualizar tabela essays com novos campos
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

-- Atualizar enum do status das redações
ALTER TYPE essay_status ADD VALUE IF NOT EXISTS 'enviada';
ALTER TYPE essay_status ADD VALUE IF NOT EXISTS 'a_corrigir';
ALTER TYPE essay_status ADD VALUE IF NOT EXISTS 'corrigida';
ALTER TYPE essay_status ADD VALUE IF NOT EXISTS 'revisar';

-- Atualizar o valor padrão do status
ALTER TABLE public.essays ALTER COLUMN status SET DEFAULT 'enviada';