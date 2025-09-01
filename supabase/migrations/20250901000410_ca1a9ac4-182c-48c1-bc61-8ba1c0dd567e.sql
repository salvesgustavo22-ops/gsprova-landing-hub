-- Migrate any existing data from contact_submissions to leads if table exists
DO $$
BEGIN
  -- Check if contact_submissions table exists and has data
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'contact_submissions') THEN
    -- Insert any data from contact_submissions into leads
    INSERT INTO public.leads (name, email, phone, lead_type, service_selected, message, source, created_at, updated_at)
    SELECT 
      name,
      CASE 
        WHEN message LIKE 'E-mail:%' THEN TRIM(SUBSTRING(message FROM 'E-mail: (.*)'))
        ELSE 'contato@exemplo.com' -- fallback for missing email
      END as email,
      phone,
      COALESCE(form_type, 'contact_form') as lead_type,
      service_interest as service_selected,
      CASE 
        WHEN message LIKE 'E-mail:%' THEN NULL
        ELSE message
      END as message,
      COALESCE(form_type, 'legacy_migration') as source,
      created_at,
      updated_at
    FROM public.contact_submissions
    WHERE NOT EXISTS (
      SELECT 1 FROM public.leads l 
      WHERE l.name = contact_submissions.name 
      AND l.phone = contact_submissions.phone 
      AND l.created_at = contact_submissions.created_at
    );
    
    -- Drop the old table after migration
    DROP TABLE IF EXISTS public.contact_submissions;
  END IF;
END $$;