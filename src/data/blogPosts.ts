import rotasDoSol1 from '@/assets/rotas-do-sol-1.jpg';
import gardenHouse1 from '@/assets/garden-house-1.jpg';
import gardenHouse2 from '@/assets/garden-house-2.jpg';
import rotasDoSol2 from '@/assets/rotas-do-sol-2.jpg';
import rotasDoSolHero from '@/assets/rotas-do-sol-hero.jpg';
import commercialBuilding from '@/assets/commercial-building.jpg';

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  highlightWord: string;
  description: string;
  image: string;
  date: Date;
  category: string;
  content: {
    type: 'h2' | 'h3' | 'p' | 'list';
    text?: string;
    items?: string[];
  }[];
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: 'como-escolher-o-lote-ideal',
    title: 'Como escolher o lote ideal para construir sua casa',
    highlightWord: 'ideal',
    description: 'Descubra os principais fatores que devem ser considerados na hora de escolher o terreno perfeito para o seu projeto residencial.',
    image: rotasDoSol1,
    date: new Date('2025-01-15'),
    category: 'Dicas',
    content: [
      { type: 'h2', text: 'A importância de escolher bem' },
      { type: 'p', text: 'A escolha do lote é uma das decisões mais importantes na jornada de quem deseja construir. Um terreno bem localizado, com infraestrutura adequada e dentro do orçamento, é o alicerce de um projeto residencial de sucesso.' },
      { type: 'p', text: 'Antes de fechar negócio, é fundamental analisar diversos fatores que impactam diretamente na valorização do imóvel, na qualidade de vida da família e nos custos da obra.' },
      { type: 'h2', text: 'Fatores essenciais na escolha' },
      { type: 'h3', text: 'Localização e acessibilidade' },
      { type: 'p', text: 'Verifique a proximidade com vias principais, comércio, escolas e hospitais. Um lote bem localizado tende a valorizar mais ao longo do tempo e oferece maior conveniência no dia a dia.' },
      { type: 'h3', text: 'Infraestrutura do loteamento' },
      { type: 'list', items: ['Ruas asfaltadas e iluminação pública', 'Rede de água e esgoto', 'Galeria de águas pluviais', 'Energia elétrica disponível', 'Acesso à internet e telecomunicações'] },
      { type: 'h3', text: 'Topografia e orientação solar' },
      { type: 'p', text: 'Terrenos planos facilitam a construção e reduzem custos com terraplanagem. A orientação solar influencia na iluminação natural e no conforto térmico da futura residência.' },
      { type: 'h2', text: 'Documentação e regularização' },
      { type: 'p', text: 'Certifique-se de que o loteamento possui todas as aprovações necessárias junto aos órgãos municipais e ambientais. Verifique a matrícula do imóvel e a idoneidade da incorporadora.' },
      { type: 'p', text: 'Na Lalu, todos os nossos empreendimentos contam com documentação completa e regularizada, garantindo total segurança jurídica para nossos clientes.' },
    ],
  },
  {
    id: 2,
    slug: 'vantagens-loteamentos-planejados',
    title: 'Vantagens de investir em loteamentos planejados',
    highlightWord: 'planejados',
    description: 'Loteamentos com infraestrutura completa oferecem segurança, valorização e qualidade de vida. Entenda por que são a melhor opção.',
    image: gardenHouse1,
    date: new Date('2025-01-08'),
    category: 'Investimento',
    content: [
      { type: 'h2', text: 'O que são loteamentos planejados?' },
      { type: 'p', text: 'Loteamentos planejados são empreendimentos imobiliários desenvolvidos com um projeto urbanístico completo, que contempla infraestrutura, áreas verdes, lazer e segurança desde a concepção.' },
      { type: 'h2', text: 'Principais vantagens' },
      { type: 'list', items: ['Infraestrutura completa desde o início', 'Valorização constante do investimento', 'Planejamento urbanístico de qualidade', 'Áreas de lazer e convivência', 'Segurança para toda a família'] },
      { type: 'h3', text: 'Valorização patrimonial' },
      { type: 'p', text: 'Loteamentos planejados tendem a apresentar valorização superior à média do mercado, pois oferecem diferenciais que atraem cada vez mais compradores.' },
      { type: 'h2', text: 'Por que escolher a Lalu?' },
      { type: 'p', text: 'Com quase 20 anos de experiência, a Lalu desenvolve loteamentos com padrão de excelência, sempre priorizando a qualidade de vida dos moradores e a valorização do investimento.' },
    ],
  },
  {
    id: 3,
    slug: 'mercado-imobiliario-litoral-catarinense-2025',
    title: 'O mercado imobiliário no litoral catarinense em 2025',
    highlightWord: 'catarinense',
    description: 'Análise das tendências e oportunidades de investimento no litoral de Santa Catarina para o próximo ano.',
    image: rotasDoSolHero,
    date: new Date('2024-12-20'),
    category: 'Mercado',
    content: [
      { type: 'h2', text: 'Panorama do mercado em 2025' },
      { type: 'p', text: 'O litoral de Santa Catarina continua sendo um dos destinos mais procurados para investimento imobiliário no Brasil. Com praias paradisíacas, infraestrutura em crescimento e qualidade de vida excepcional, a região atrai investidores de todo o país.' },
      { type: 'h2', text: 'Tendências para o próximo ano' },
      { type: 'list', items: ['Crescimento da demanda por lotes em condomínios fechados', 'Valorização de regiões próximas a centros urbanos', 'Busca por empreendimentos sustentáveis', 'Aumento do interesse de investidores de outros estados'] },
      { type: 'h3', text: 'Regiões em destaque' },
      { type: 'p', text: 'Cidades como Barra Velha, Araquari e Balneário Camboriú continuam apresentando índices de valorização acima da média nacional, consolidando-se como polos de desenvolvimento imobiliário.' },
      { type: 'h2', text: 'Oportunidades na Lalu' },
      { type: 'p', text: 'Nossos empreendimentos no litoral catarinense, como o Garden House Residence e o Rotas do Sol, oferecem condições especiais de financiamento e localização privilegiada.' },
    ],
  },
  {
    id: 4,
    slug: 'financiamento-proprio-vantagens',
    title: 'Financiamento próprio: como funciona e quais as vantagens',
    highlightWord: 'vantagens',
    description: 'Saiba como o financiamento direto com a incorporadora pode facilitar a aquisição do seu imóvel.',
    image: commercialBuilding,
    date: new Date('2024-12-10'),
    category: 'Financiamento',
    content: [
      { type: 'h2', text: 'O que é financiamento próprio?' },
      { type: 'p', text: 'O financiamento próprio é uma modalidade onde a incorporadora financia diretamente o imóvel ao comprador, sem a intermediação de bancos. Isso simplifica o processo e oferece condições diferenciadas.' },
      { type: 'h2', text: 'Vantagens do financiamento direto' },
      { type: 'list', items: ['Menos burocracia na aprovação', 'Entrada facilitada e flexível', 'Parcelas que cabem no bolso', 'Prazos de até 180 meses', 'Sem necessidade de aprovação bancária'] },
      { type: 'h3', text: 'Como funciona na Lalu' },
      { type: 'p', text: 'Na Lalu, oferecemos financiamento próprio com condições especiais: entrada facilitada e parcelamento em até 180 meses, sem a burocracia dos financiamentos bancários tradicionais.' },
      { type: 'h2', text: 'Quem pode aproveitar?' },
      { type: 'p', text: 'O financiamento próprio é ideal para quem busca agilidade na aquisição e não deseja passar pelo processo tradicional de aprovação bancária. Consulte nosso time comercial para conhecer as condições disponíveis.' },
    ],
  },
  {
    id: 5,
    slug: 'condominio-fechado-seguranca-qualidade',
    title: 'Condomínio fechado: segurança e qualidade de vida',
    highlightWord: 'segurança',
    description: 'Conheça os benefícios de morar em um condomínio fechado com infraestrutura de alto padrão.',
    image: gardenHouse2,
    date: new Date('2024-11-28'),
    category: 'Lifestyle',
    content: [
      { type: 'h2', text: 'Por que escolher um condomínio fechado?' },
      { type: 'p', text: 'Morar em um condomínio fechado vai muito além da segurança. É uma escolha de estilo de vida que oferece tranquilidade, convivência e acesso a infraestrutura de lazer de alto padrão.' },
      { type: 'h2', text: 'Benefícios principais' },
      { type: 'list', items: ['Segurança 24 horas com controle de acesso', 'Áreas de lazer completas', 'Convivência com vizinhos e comunidade', 'Valorização constante do imóvel', 'Ambiente ideal para famílias com crianças'] },
      { type: 'h3', text: 'Garden House Residence' },
      { type: 'p', text: 'O Garden House Residence, em Barra Velha-SC, é um exemplo de condomínio fechado de alto padrão. Com 113 lotes prontos para construir, o empreendimento oferece localização privilegiada próxima à praia e lagoa.' },
      { type: 'h2', text: 'Investimento inteligente' },
      { type: 'p', text: 'Condomínios fechados bem localizados apresentam valorização superior à média do mercado, tornando-se não apenas um lar, mas também um excelente investimento patrimonial.' },
    ],
  },
  {
    id: 6,
    slug: 'valorizacao-patrimonial-imoveis',
    title: 'Valorização patrimonial: por que imóveis são investimentos seguros',
    highlightWord: 'seguros',
    description: 'Entenda como o mercado imobiliário continua sendo uma das formas mais seguras de proteger e multiplicar seu patrimônio.',
    image: rotasDoSol2,
    date: new Date('2024-11-15'),
    category: 'Investimento',
    content: [
      { type: 'h2', text: 'Imóveis como proteção patrimonial' },
      { type: 'p', text: 'Historicamente, o mercado imobiliário é considerado um dos investimentos mais seguros e estáveis. Diferente de aplicações financeiras voláteis, imóveis oferecem proteção contra a inflação e valorização consistente.' },
      { type: 'h2', text: 'Por que investir em imóveis?' },
      { type: 'list', items: ['Proteção contra inflação', 'Valorização real ao longo do tempo', 'Geração de renda passiva com locação', 'Patrimônio tangível e seguro', 'Herança para as próximas gerações'] },
      { type: 'h3', text: 'Dados do mercado' },
      { type: 'p', text: 'Nos últimos 10 anos, imóveis bem localizados no sul do Brasil apresentaram valorização média de 8% a 12% ao ano, superando muitas aplicações financeiras tradicionais.' },
      { type: 'h2', text: 'Como maximizar seu investimento' },
      { type: 'p', text: 'Escolher empreendimentos de incorporadoras sólidas, em regiões com potencial de crescimento, é a chave para maximizar a valorização do seu patrimônio. A Lalu oferece opções que combinam localização estratégica e infraestrutura completa.' },
    ],
  },
];

export const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
