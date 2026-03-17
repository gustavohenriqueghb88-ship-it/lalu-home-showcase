

## Plan: Add View Counter to Blog Posts

### 1. Database Migration
Add `views` column to `blog_posts` table and create an RPC function for atomic increment (avoids race conditions and works with anon role without needing UPDATE RLS):

```sql
ALTER TABLE blog_posts ADD COLUMN views integer NOT NULL DEFAULT 0;

CREATE OR REPLACE FUNCTION increment_blog_views(post_slug text)
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  UPDATE blog_posts SET views = views + 1 WHERE slug = post_slug AND published = true;
$$;
```

### 2. Update `BlogPost.tsx`
- Add `views` to the `DbBlogPost` interface
- Add `useEffect` that calls `supabase.rpc('increment_blog_views', { post_slug: slug })` once on mount (only for DB posts)
- Display Eye icon + view count next to the date in the hero section

### 3. Update `Blog.tsx`
- Add `views` to the DB query select
- Add `views` field to the merged post type
- Display Eye icon + view count in each card's `CardContent`, next to "Leia mais"

### Files changed
- New migration — add column + RPC function
- `src/pages/BlogPost.tsx` — increment on mount + display views
- `src/pages/Blog.tsx` — fetch and display views

