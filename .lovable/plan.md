

## Diagnosis: Code is Already Correct — Cache Issue

The code in both `Projects.tsx` and `FeaturedProjects.tsx` already uses `.order('created_at', { ascending: true })`. The database confirms the correct order:

1. **Loteamento Rotas do Sol** — Jan 20, 2026 18:11
2. **Condomínio Garden House Residence** — Jan 20, 2026 18:17
3. **Loteamento Pedras Brancas** — Mar 10, 2026 11:49

The preview is likely showing cached data from React Query. 

### Fix
Invalidate the React Query cache by adding a small force-refresh mechanism. The simplest approach: change the `queryKey` slightly to bust the cache, or simply do a hard refresh of the preview.

**Recommended action**: Try refreshing the preview page. If the order still doesn't update, I can add `staleTime: 0` and `refetchOnMount: 'always'` to both queries to ensure fresh data on every page load.

