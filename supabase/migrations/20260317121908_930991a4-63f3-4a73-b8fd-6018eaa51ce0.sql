
-- Create og-pages storage bucket for static OG HTML files
INSERT INTO storage.buckets (id, name, public)
VALUES ('og-pages', 'og-pages', true);

-- Allow public read access
CREATE POLICY "OG pages are publicly accessible"
ON storage.objects
FOR SELECT
USING (bucket_id = 'og-pages');
