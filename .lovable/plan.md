

## Plano: Mover rota do artigo para `/artigo/:slug` e usar `/blog/:slug` como proxy OG

### Problema raiz
Quando alguém cola `https://laluadm.com/blog/slug` no LinkedIn, o servidor entrega `index.html` (SPA) com as OG tags genéricas da homepage. LinkedIn não executa JavaScript, então nunca vê as tags específicas do post.

### Estratégia
- `/blog/:slug` passa a ser interceptado pelo hosting via `_redirects`, servindo HTML estático com OG tags corretas
- A página React do artigo muda para `/artigo/:slug`
- Humanos que acessam `/blog/:slug` são redirecionados pelo JS no HTML estático para `/artigo/:slug`
- Crawlers leem as OG tags e geram preview correto

### Alterações

**1. `public/_redirects`** — Adicionar proxy para `/blog/:slug`:
```
/blog/:slug  https://kktsraavvytjwrtxcexc.supabase.co/functions/v1/og-proxy/:slug  200
```
A regra existente `/og/:slug` pode ser removida.

**2. `src/App.tsx`** — Mudar rota:
- `/blog/:slug` → `/artigo/:slug`

**3. `supabase/functions/og-proxy/index.ts`** — Atualizar redirect:
- `postUrl` passa a ser `${siteUrl}/artigo/${slug}` (para onde o JS redireciona humanos)
- Manter `og:url` e `canonical` como `${siteUrl}/blog/${slug}` (URL pública de compartilhamento)

**4. `supabase/functions/blog-api/index.ts`** — Mesma mudança no `generateOgHtml`:
- JS redirect → `/artigo/:slug`
- `og:url` e `canonical` → `/blog/:slug`

**5. `src/pages/Blog.tsx`** — Links dos cards:
- `to={/blog/${post.slug}}` → `to={/artigo/${post.slug}}`

**6. `src/pages/BlogPost.tsx`**:
- Atualizar `canonical` para `/blog/${slug}` (URL pública)
- Atualizar links de navegação e share para refletir a nova estrutura

**7. Regenerar OG HTMLs** — Chamar `POST /blog-api/regenerate-og` para atualizar os arquivos no bucket com o novo template.

**8. Links internos** — Buscar e atualizar qualquer referência a `/blog/` que aponte para posts individuais (CTA, footer, etc).

### Resultado
- LinkedIn/Facebook: crawlam `/blog/:slug` → recebem HTML com OG tags corretas → preview funciona
- Usuário humano: acessa `/blog/:slug` → recebe HTML → JS redireciona para `/artigo/:slug` → SPA carrega o artigo
- Botões de share: continuam compartilhando `/blog/:slug` (ou a URL do storage como fallback)

