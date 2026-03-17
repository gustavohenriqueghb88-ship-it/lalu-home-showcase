

## Problema

1. **Views não incrementam**: O `useEffect` chama `supabase.rpc('increment_blog_views', ...)` mas o resultado é ignorado (fire-and-forget sem `await`). O problema real é que a chamada RPC usa `as any` para contornar tipagem, mas provavelmente falha silenciosamente porque o tipo não está registrado no schema do client. Preciso verificar se a chamada realmente funciona ou se há um erro silencioso.

2. **Ícone de visualizações**: Na listagem (`Blog.tsx`), o ícone de views aparece apenas no rodapé do card junto ao "Leia mais". O usuário quer que o ícone apareça **ao lado do título** do card.

## Alterações

### 1. `src/pages/BlogPost.tsx` — Corrigir incremento de views

Remover a dependência em `isDbPost` do useEffect. O slug é suficiente — se o post não existir no banco, o UPDATE simplesmente não afeta nenhuma linha. Isso garante que o RPC é chamado imediatamente quando o componente monta com o slug:

```typescript
useEffect(() => {
  if (!slug) return;
  supabase.rpc('increment_blog_views', { post_slug: slug } as any);
}, [slug]);
```

### 2. `src/pages/Blog.tsx` — Mover ícone de views para ao lado do título

Mover o badge de visualizações do rodapé do card para ao lado do `<h2>` do título, sempre visível (removendo a condição `views > 0`):

```tsx
<div className="flex items-start justify-between gap-2 mb-2">
  <h2 className="text-lg sm:text-xl font-bold text-foreground line-clamp-2">
    {post.title}
  </h2>
  {post.isDb && (
    <span className="flex items-center gap-1 text-muted-foreground text-xs shrink-0 mt-1">
      <Eye size={14} />
      {post.views.toLocaleString('pt-BR')}
    </span>
  )}
</div>
```

### 3. Verificação

Após implementar, testar o RPC chamando diretamente e consultando o banco para confirmar que o campo `views` incrementa.

