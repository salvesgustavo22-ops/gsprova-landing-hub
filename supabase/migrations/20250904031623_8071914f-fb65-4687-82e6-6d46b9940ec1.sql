-- Insert missing profiles for users who have essays but no profile
INSERT INTO public.profiles (user_id, first_name, last_name, phone, created_at, updated_at)
SELECT DISTINCT 
  e.user_id,
  'Usuário' as first_name,
  'Sem Perfil' as last_name,
  'Não informado' as phone,
  now() as created_at,
  now() as updated_at
FROM public.essays e
LEFT JOIN public.profiles p ON e.user_id = p.user_id
WHERE p.user_id IS NULL;