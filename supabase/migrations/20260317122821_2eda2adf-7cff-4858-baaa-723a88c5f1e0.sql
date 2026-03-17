
ALTER TABLE public.blog_posts ADD COLUMN views integer NOT NULL DEFAULT 0;

CREATE OR REPLACE FUNCTION public.increment_blog_views(post_slug text)
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  UPDATE blog_posts SET views = views + 1 WHERE slug = post_slug AND published = true;
$$;
