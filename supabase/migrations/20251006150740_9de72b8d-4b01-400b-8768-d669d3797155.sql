-- Tabela para leads do guia gratuito
CREATE TABLE public.guia_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela para compras de materiais
CREATE TABLE public.material_purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  material_type TEXT NOT NULL CHECK (material_type IN ('guia', 'questoes')),
  amount DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela para leads de serviços
CREATE TABLE public.service_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  service_type TEXT NOT NULL,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.guia_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.material_purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_leads ENABLE ROW LEVEL SECURITY;

-- Policies para admins visualizarem (usando função existente is_admin_user)
CREATE POLICY "Admins can view guia_leads"
  ON public.guia_leads FOR SELECT
  USING (is_admin_user());

CREATE POLICY "Admins can view material_purchases"
  ON public.material_purchases FOR SELECT
  USING (is_admin_user());

CREATE POLICY "Admins can view service_leads"
  ON public.service_leads FOR SELECT
  USING (is_admin_user());

-- Policies para inserção anônima
CREATE POLICY "Anyone can insert guia_leads"
  ON public.guia_leads FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can insert material_purchases"
  ON public.material_purchases FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can insert service_leads"
  ON public.service_leads FOR INSERT
  WITH CHECK (true);

-- Triggers para updated_at
CREATE TRIGGER update_guia_leads_updated_at
  BEFORE UPDATE ON public.guia_leads
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_material_purchases_updated_at
  BEFORE UPDATE ON public.material_purchases
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_service_leads_updated_at
  BEFORE UPDATE ON public.service_leads
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();