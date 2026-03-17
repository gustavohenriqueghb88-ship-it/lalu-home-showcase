

## Plano: Ocultar a Aba Portfólio do Site

### O que será feito

Remover o link "Portfólio" de todos os menus de navegação do site, mantendo a rota funcional caso seja necessário acessá-la diretamente via URL.

### Arquivos a serem alterados

#### 1. `src/components/Header.tsx`
Remover o item "Portfólio" do array de navegação:

**Antes:**
```typescript
const navigation = [
  { name: 'Início', href: '/' },
  { name: 'Empreendimentos', href: '/empreendimentos' },
  { name: 'Portfólio', href: '/portfolio' },  // Remover
  { name: 'Sobre nós', href: '/sobre' },
  { name: 'Contato', href: '/contato' },
];
```

**Depois:**
```typescript
const navigation = [
  { name: 'Início', href: '/' },
  { name: 'Empreendimentos', href: '/empreendimentos' },
  { name: 'Sobre nós', href: '/sobre' },
  { name: 'Contato', href: '/contato' },
];
```

#### 2. `src/components/Footer.tsx`
Remover o link "Portfólio" da lista de navegação rápida:

**Antes:**
```typescript
{[
  { name: 'Início', href: '/' },
  { name: 'Empreendimentos', href: '/empreendimentos' },
  { name: 'Portfólio', href: '/portfolio' },  // Remover
  { name: 'Sobre nós', href: '/sobre' },
  { name: 'Contato', href: '/contato' }
].map((link) => ...)}
```

**Depois:**
```typescript
{[
  { name: 'Início', href: '/' },
  { name: 'Empreendimentos', href: '/empreendimentos' },
  { name: 'Sobre nós', href: '/sobre' },
  { name: 'Contato', href: '/contato' }
].map((link) => ...)}
```

### Observação
A rota `/portfolio` continuará existindo no `App.tsx`, permitindo acesso direto via URL se necessário. Se quiser remover a rota completamente, posso fazer isso também.

### Resultado
Após a implementação:
- O menu principal (header) não mostrará mais "Portfólio"
- O rodapé (footer) não mostrará mais o link "Portfólio"
- A navegação ficará com 4 itens: Início, Empreendimentos, Sobre nós, Contato

