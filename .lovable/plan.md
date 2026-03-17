

## Diagnosis

The OG HTML content is correct — the Edge Function returns proper `og:title`, `og:description`, and `og:image` for each blog post. However, **Supabase's gateway forces `Content-Type: text/plain`** on all Edge Function responses, overriding the `text/html` header set in code.

This is why LinkedIn shows the generic Lalu preview (image-6.png) instead of the specific blog post preview (like image-5.png). LinkedIn's crawler sees `Content-Type: text/plain` and ignores the OG meta tags, falling back to the main site's metadata.

The `_redirects` proxy (`/og/:slug → Supabase Edge Function`) passes through the response as-is, including the wrong Content-Type.

## Solution

Create a **new Edge Function `og-html`** that acts as a proxy: it calls the existing `blog-api/og/:slug` endpoint internally (via direct DB query), but returns the response with explicit `Content-Type: text/html` using a workaround — wrapping the response as a **streaming response** or using the `Response` constructor in a way that Supabase's gateway cannot override.

**Actually, the real fix is simpler**: The Supabase gateway overrides `Content-Type` on Edge Functions. The `_redirects` proxy on Lovable/Netlify hosting **does pass through the upstream Content-Type**. So the issue is that Lovable's hosting proxy forwards `text/plain` from Supabase.

**The correct approach**: Instead of proxying to Supabase, create a **standalone Edge Function** that returns HTML and use a `_redirects` rule that forces the correct Content-Type. But `_redirects` on Netlify/Lovable doesn't support Content-Type overrides.

**Best solution**: Change the `_redirects` to point `/og/:slug` to a new Edge Function `og-html` that returns a redirect-based workaround, OR better yet — since the Supabase gateway issue is the blocker, use **Supabase Storage** to host the OG HTML as static `.html` files, which will be served with the correct Content-Type.

**Simplest effective solution**: Generate and store static OG HTML files in a **public Supabase Storage bucket** whenever a blog post is created/updated. The `_redirects` file then proxies `/og/:slug` to the Storage URL which correctly serves `text/html`.

### Implementation

**1. Create a new Edge Function `generate-og-html`**
- Triggered after blog post create/update (called from `blog-api` post creation flow)
- Generates the OG HTML for the post
- Uploads it as `{slug}.html` to a new public Storage bucket `og-pages`
- Content-Type is automatically `text/html` when served from Storage

**2. Update `blog-api/index.ts`**
- After creating a post, call a helper to generate and upload the OG HTML to Storage
- Also regenerate on post update

**3. Update `_redirects`**
```
/og/:slug  https://kktsraavvytjwrtxcexc.supabase.co/storage/v1/object/public/og-pages/:slug.html  200
```

**4. Generate OG HTML for existing posts**
- The new Edge Function will have a "regenerate all" endpoint to bootstrap existing posts

### Files changed
- `supabase/functions/blog-api/index.ts` — add OG HTML generation on post create/update
- `public/_redirects` — point to Storage bucket instead of Edge Function
- Database migration — create `og-pages` Storage bucket (public)

### Why this works
Supabase Storage serves files with correct MIME types based on file extension. A `.html` file is served as `text/html; charset=utf-8`. LinkedIn's crawler will correctly parse the OG meta tags and show the blog post title and image (like image-5.png) instead of the generic site preview (image-6.png).

