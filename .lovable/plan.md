

## Plan: LinkedIn Share System for Blog Posts

### Problem
The current `_redirects` file proxies **all** `/blog/:slug` requests to the OG Edge Function, which breaks the SPA for normal users — they get raw OG HTML instead of the React app. Meanwhile, share buttons use inconsistent URLs.

### Solution

**1. Fix `_redirects` — proxy `/og/:slug` instead of `/blog/:slug`**

Change the rewrite rule so only `/og/:slug` is proxied to the Edge Function. This keeps the SPA working normally at `/blog/:slug` while providing a dedicated OG-friendly URL for crawlers.

```
/og/:slug  https://kktsraavvytjwrtxcexc.supabase.co/functions/v1/blog-api/og/:slug  200
```

**2. Create `LinkedInShareButton` component**

New file: `src/components/LinkedInShareButton.tsx`
- Reusable button with LinkedIn brand color (`#0077B5`)
- LinkedIn icon from lucide-react
- Opens LinkedIn share popup via `window.open`
- Shares the OG proxy URL: `https://laluadm.com/og/{slug}` (so LinkedIn crawler gets the OG HTML)
- Hover effect, responsive sizing
- Props: `slug: string`, optional `className`

**3. Update `BlogPost.tsx`**

- Import and place `LinkedInShareButton` in two locations:
  - **Top**: below the banner image, alongside existing share area
  - **Bottom**: in the existing social share section
- Update Facebook share link to also use `/og/:slug` URL
- Remove hardcoded Supabase function URLs from share links — use `https://laluadm.com/og/${slug}` consistently
- Keep existing OG meta tags via react-helmet-async (for direct URL sharing)

### How it works end-to-end

1. User clicks LinkedIn share button → LinkedIn receives URL `https://laluadm.com/og/slug`
2. Hosting proxies `/og/slug` → Edge Function returns HTML with correct `og:title`, `og:description`, `og:image`, `og:url`
3. LinkedIn renders the preview with blog-specific image and title
4. The OG HTML's canonical link points to `https://laluadm.com/blog/slug` for SEO
5. Normal users visiting `/blog/slug` get the React SPA as expected

### Files changed
- `public/_redirects` — change path from `/blog/:slug` to `/og/:slug`
- `src/components/LinkedInShareButton.tsx` — new component
- `src/pages/BlogPost.tsx` — integrate new button, fix share URLs

