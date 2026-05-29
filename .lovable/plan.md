## Objetivo

Permitir que o visitante clique em qualquer imagem das páginas de detalhe de **Portfólio** (`/portfolio/:slug`) e **Empreendimentos** (`/empreendimentos/:slug`) e visualize-a em um lightbox com **zoom** real (aproximar/afastar), navegação entre fotos e fechamento.

## O que será feito

### 1. Novo componente `src/components/ImageLightbox.tsx`
Modal reutilizável baseado no `Dialog` (shadcn) já existente, com:
- Imagem central em alta resolução, fundo escuro translúcido
- Controles (ícones Lucide, paleta dourada/verde):
  - **Zoom +** / **Zoom −** (1x → 4x)
  - **Reset** (volta a 1x)
  - **Anterior / Próxima** (setas para navegar entre as imagens)
  - **Fechar** (X)
- Suporte a:
  - Roda do mouse para zoom
  - Arrastar (pan) quando ampliada
  - Pinch-to-zoom no mobile (touch)
  - Teclado: ←/→ navega, +/− zoom, Esc fecha
- Contador “3 / 12” no rodapé
- Sem dependências externas — implementado com state + transform CSS.

### 2. Integração em `src/pages/PropertyDetail.tsx` (Portfólio)
- Substituir o `Dialog` de galeria atual pelo novo `ImageLightbox`
- Cada clique em imagem (principal, miniaturas e botão “Ver todas”) abre o lightbox no índice correto
- Adicionar ícone de lupa (`ZoomIn` Lucide) em overlay sutil nas imagens para indicar a interação

### 3. Integração em `src/pages/ProjectDetail.tsx` (Empreendimentos)
- Tornar as três imagens da seção clicáveis
- Abrir o `ImageLightbox` com a lista completa de `project.images`, posicionando no índice da imagem clicada
- Mesmo overlay sutil de lupa

## Fora do escopo (não será alterado)
- Landing pages (Rotas do Sol, Garden House, Pedras Brancas) e Blog
- Backend, dados ou rotas
- Estilo geral das páginas, formulários, mapa, sidebar

## Detalhes técnicos
- Stack: React + Tailwind + shadcn `Dialog` + Lucide
- Sem novas libs; transforms (`scale`, `translate`) controlados via state
- Acessibilidade: `aria-label` em todos os controles, foco trap herdado do `Dialog`
- Responsivo: controles ficam em barra inferior no mobile, laterais no desktop
- Imagens carregam via `getImageUrl` já existente em cada página
