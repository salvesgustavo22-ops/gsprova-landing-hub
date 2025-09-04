-- Fix the generate_correction_id function to resolve ambiguous column reference
CREATE OR REPLACE FUNCTION public.generate_correction_id(essay_origin essay_origin)
 RETURNS text
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  prefix TEXT;
  sequence_num INTEGER;
  correction_id_result TEXT;
BEGIN
  -- Set prefix based on origin
  IF essay_origin = 'gs_aprova' THEN
    prefix := 'G';
  ELSE
    prefix := 'E';
  END IF;
  
  -- Get next sequence number for this origin
  SELECT COALESCE(MAX(CAST(SUBSTRING(essays.correction_id FROM 2) AS INTEGER)), 0) + 1
  INTO sequence_num
  FROM public.essays
  WHERE essays.origin = essay_origin AND essays.correction_id IS NOT NULL;
  
  -- Format correction ID
  correction_id_result := prefix || LPAD(sequence_num::TEXT, 5, '0');
  
  RETURN correction_id_result;
END;
$function$;