-- Also need to allow public updates to storage for correction files
CREATE POLICY "Allow public uploads for corrections" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'essay-files');