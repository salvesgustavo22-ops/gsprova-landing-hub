-- Allow only users with the 'editor' role to upload correction files
CREATE POLICY "Editor uploads for corrections"
ON storage.objects
FOR INSERT
TO editor
WITH CHECK (bucket_id = 'essay-files');
