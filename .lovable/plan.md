

## Plan: Change Project Ordering to Oldest First

Currently, both the Projects page and FeaturedProjects component order projects by `created_at` descending (newest first). The request is to show the oldest (first added) project at the top.

### Changes

1. **`src/pages/Projects.tsx`** — Change `.order('created_at', { ascending: false })` to `ascending: true`

2. **`src/components/FeaturedProjects.tsx`** — Change both `.order('created_at', ...)` calls from `ascending: false` to `ascending: true`

