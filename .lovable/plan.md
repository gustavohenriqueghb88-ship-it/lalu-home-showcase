## Objetivo
Adicionar os ícones de redes sociais (Instagram e LinkedIn) no rodapé principal do site, com link para os perfis oficiais da Lalu Adm.

## Links
- Instagram: https://www.instagram.com/lalu.adm/
- LinkedIn: https://www.linkedin.com/company/lalu-adm

## Alterações

### `src/components/Footer.tsx`
- Importar ícones `Instagram` e `Linkedin` do `lucide-react`.
- Adicionar uma nova linha de ícones sociais logo abaixo do parágrafo institucional na coluna "Company Info".
- Cada ícone será um `<a>` com `target="_blank"`, `rel="noopener noreferrer"`, `aria-label`, estilizado com cor dourada (`text-secondary`), hover suave e tamanho consistente (~w-5 h-5 dentro de um botão circular sutil).

### `src/components/garden-house/GardenHouseFooter.tsx` (rodapé da landing Garden House)
- Avaliar se também deve receber os ícones. Por padrão **não** será alterado, já que o pedido foi "no rodapé" (rodapé global). Posso incluir se desejar — confirmar se necessário.

## Observações
- Mantém paleta semântica (verde escuro + dourado).
- Nenhum impacto em backend, dados ou rotas.
- Sem mudanças nos rodapés das landing pages individuais (Garden House, Rotas do Sol, Pedras Brancas) salvo confirmação.
