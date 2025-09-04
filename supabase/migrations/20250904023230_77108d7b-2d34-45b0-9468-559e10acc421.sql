-- Fix security warning by setting search_path for the function
CREATE OR REPLACE FUNCTION generate_correction_id(essay_origin essay_origin)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
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