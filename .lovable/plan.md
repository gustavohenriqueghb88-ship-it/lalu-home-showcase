

## Diagnóstico

O HTML estático no bucket `og-pages` está correto e contém todas as OG tags. Porém, ele inclui um `<meta http-equiv="refresh" content="0;url=..."/>` que faz o **crawler do LinkedIn seguir o redirect instantaneamente** para `laluadm.com/blog/{slug}`, que é uma SPA sem OG tags no HTML inicial. O LinkedIn então não consegue extrair o preview.

## Solução

Remover o `<meta http-equiv="refresh">` do template HTML gerado e manter apenas o redirect via JavaScript. Crawlers (LinkedIn, Facebook) **não executam JavaScript**, então vão ler as OG tags normalmente. Usuários reais que abrirem o link serão redirecionados pelo `window.location.replace()`.

### Alterações

1. **`supabase/functions/blog-api/index.ts`** - Na função `generateOgHtml`, remover a linha:
   ```html
   <meta http-equiv="refresh" content="0;url=..."/>
   ```
   Manter o `<script>window.location.replace(...)</script>` para redirect de usuários reais.

2. **Regenerar os HTMLs existentes** - Chamar o endpoint `POST /blog-api/regenerate-og` para recriar os 3 arquivos HTML no bucket sem o meta refresh.

3. **Deploy** da edge function `blog-api` atualizada.

