
Objetivo: corrigir o compartilhamento para que o LinkedIn receba uma URL válida, gere preview com título/imagem do post certo e, ao clicar, leve o usuário ao artigo correto.

Diagnóstico
- O botão atual envia `https://laluadm.com/og/{slug}`.
- Verifiquei que essa URL `/og/...` está retornando 404 no domínio publicado e também no domínio principal.
- Ou seja: o problema agora não é só o preview; a própria URL compartilhada está quebrada.
- O HTML estático no bucket `og-pages` existe e contém os dados corretos do post. O ponto fraco é o proxy `/og/:slug`, que não está funcionando no deploy.

Plano de correção

1. Parar de depender de `/og/:slug`
- Remover a dependência prática do `public/_redirects` para esse fluxo de compartilhamento.
- Considerar o proxy atual como não confiável para produção, já que está gerando 404.

2. Compartilhar a URL real do arquivo HTML estático
- Atualizar `LinkedInShareButton` para compartilhar diretamente:
  `https://kktsraavvytjwrtxcexc.supabase.co/storage/v1/object/public/og-pages/{slug}.html`
- Fazer o mesmo para o botão do Facebook, para manter consistência.
- Centralizar essa URL em uma constante/helper para evitar divergência entre os botões.

3. Fazer o link compartilhado abrir o artigo correto
- Ajustar o HTML gerado em `supabase/functions/blog-api/index.ts` para incluir:
  - `meta refresh` para `/blog/{slug}`
  - redirecionamento via JavaScript como reforço
  - link visível de fallback “Leia o post completo”
  - `canonical` e `og:url` apontando para `https://laluadm.com/blog/{slug}`
- Resultado:
  - crawler lê o HTML estático e monta preview correto
  - usuário que clicar no compartilhamento é enviado para o post real

4. Regenerar os HTMLs dos posts existentes
- Executar novamente a geração dos arquivos OG para os posts já publicados, para aplicar o novo template com redirecionamento.

5. Revisar a página do post
- Em `BlogPost.tsx`, usar uma única variável `shareUrl` para LinkedIn/Facebook.
- Garantir que o slug usado no share seja sempre o do artigo aberto.
- Manter as meta tags da página do artigo, mas tratar o HTML estático como fonte principal do preview social.

Arquivos envolvidos
- `src/components/LinkedInShareButton.tsx`
- `src/pages/BlogPost.tsx`
- `supabase/functions/blog-api/index.ts`
- opcionalmente `public/_redirects` para limpeza, já que hoje não resolve o caso

Resultado esperado
- O LinkedIn passa a receber uma URL válida.
- O preview mostra título, descrição e imagem do artigo específico.
- Ao clicar no compartilhamento, a pessoa cai no post correto em `/blog/:slug`.
- O sistema deixa de depender de uma rota `/og/...` que hoje está quebrada no deploy.

Detalhe técnico importante
Hoje existem duas necessidades diferentes:
1. preview social: precisa de HTML estático com OG tags reais
2. navegação do usuário: precisa abrir o artigo React em `/blog/:slug`

Como o LinkedIn usa a mesma URL para preview e clique, a solução mais robusta aqui é compartilhar o HTML estático e fazer esse HTML redirecionar imediatamente para o post real.
