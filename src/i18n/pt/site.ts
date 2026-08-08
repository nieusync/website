import type { Site } from '../en/site';

const site: Site = {
  documentTitle: 'NIEUSYNC — Cinco pilares. Um parceiro.',
  nav: {
    whoWeAre: 'Quem somos',
    whatWeDo: 'O que fazemos',
    whatWeThink: 'O que pensamos',
    clientArea: 'Área de cliente',
  },
  region: {
    select: 'Escolha a sua localização',
  },
  hero: {
    eyebrow: 'O parceiro operacional B2B',
    titleTop: 'O seu negócio,',
    titleSync: 'em sincronia.',
    subtitle:
      'Jurídico, digital, estratégia, operações e fiscal — cinco disciplinas, um parceiro integrado, zero pontos cegos.',
    ctaPillars: 'Explorar os cinco pilares',
  },
  who: {
    label: '01 — Quem somos',
    title: 'Um parceiro, cinco disciplinas.',
    text: 'A NIEUSYNC existe porque as empresas não têm cinco problemas separados — têm um negócio. Juntamos competências jurídicas, digitais, estratégicas, operacionais e fiscais numa só equipa que vê o todo e responde pelo resultado.',
  },
  pillars: {
    label: '02 — O que fazemos',
    title: 'Cinco pilares. Zero silos.',
    subtitle: 'Cada decisão numa empresa toca nos cinco. Por isso tratamo-los como um só sistema.',
    items: [
      {
        slug: 'legal',
        name: 'Jurídico',
        desc: 'Contratos, estrutura societária e risco — desenhados antes de os problemas existirem.',
        intro:
          'Do primeiro contrato à negociação mais difícil — estrutura jurídica que protege o negócio sem nunca o travar.',
        services: [
          'Elaboração e revisão de contratos',
          'Estrutura societária e governance',
          'Direito do trabalho',
          'Apoio em negociações e litígios',
          'Privacidade e conformidade RGPD',
        ],
      },
      {
        slug: 'digital',
        name: 'Digital',
        desc: 'Tecnologia, dados e automação que transformam a sua operação numa vantagem.',
        intro:
          'Tecnologia que se paga a si própria: sistemas, automação e presença digital que transformam a operação diária numa vantagem competitiva.',
        services: [
          'Desenvolvimento web e de produto',
          'Integração de sistemas e automação',
          'Dados, dashboards e analytics',
          'Presença digital e marketing de performance',
          'Fundamentos de segurança e acessos',
        ],
      },
      {
        slug: 'strategy',
        name: 'Estratégia',
        desc: 'Posicionamento, prioridades e um plano que toda a empresa consegue executar.',
        intro:
          'Clareza sobre onde jogar e como ganhar — e um plano que toda a empresa consegue executar sem tradução.',
        services: [
          'Posicionamento e modelo de negócio',
          'Planeamento de crescimento e expansão',
          'Pricing e desenho de oferta',
          'Entrada em mercados e parcerias',
          'Objetivos e cadência de execução',
        ],
      },
      {
        slug: 'operations',
        name: 'Operações',
        desc: 'Processos que escalam sem caos — medidos, afinados, repetíveis.',
        intro:
          'A máquina por trás da promessa: processos que escalam sem caos e números que permitem governar.',
        services: [
          'Desenho e documentação de processos',
          'KPIs e reporting de gestão',
          'Gestão de fornecedores e compras',
          'Qualidade e melhoria contínua',
          'Seleção de ferramentas e workflows',
        ],
      },
      {
        slug: 'fiscal',
        name: 'Fiscal',
        desc: 'Arquitetura fiscal e compliance que protegem a sua margem e o seu descanso.',
        intro:
          'Uma arquitetura fiscal e de compliance que protege a margem, evita surpresas e resiste a qualquer inspeção.',
        services: [
          'Planeamento e otimização fiscal',
          'Obrigações declarativas e compliance',
          'Incentivos, subsídios e financiamento',
          'Coordenação contabilística',
          'Preparação para auditorias',
        ],
      },
    ],
  },
  approach: {
    label: '03 — O método',
    title: 'Como sincronizamos.',
    steps: [
      { title: 'Mapear', desc: 'Uma leitura 360° da sua empresa nos cinco pilares.' },
      { title: 'Sincronizar', desc: 'Um plano integrado — prioridades, responsáveis, prazos.' },
      { title: 'Escalar', desc: 'Execução contínua com a sua equipa, medida em cada passo.' },
    ],
  },
  blog: {
    label: '04 — O que pensamos',
    title: 'Ideias recentes.',
    subtitle: 'Artigos práticos sobre os cinco pilares, escritos a pensar nas empresas.',
    cta: 'Ver todos os artigos',
    readArticle: 'Ler artigo',
    minutesSuffix: 'min de leitura',
    dateLocale: 'pt-PT',
  },
  portal: {
    label: '05 — Área de cliente',
    title: 'A sua empresa, em direto.',
    desc: 'Documentos, pedidos e progresso nos cinco pilares — num só lugar seguro, sempre atualizado.',
    cta: 'Entrar na área de cliente',
    hint: 'Acesso reservado a clientes NIEUSYNC.',
  },
  pillarPage: {
    back: 'Todos os pilares',
    servicesLabel: 'O que está incluído',
    ctaTitle: 'Pronto para pôr este pilar em sincronia?',
    cta: 'Entrar na área de cliente',
  },
  footer: {
    tagline: 'Cinco pilares. Um parceiro.',
    company: 'Empresa',
    pillars: 'O que fazemos',
    contact: 'Contacto',
    blog: 'Blog',
    clientArea: 'Área de cliente',
    copyright: (year: number) => `© ${year} NIEUSYNC. Todos os direitos reservados.`,
  },
};

export default site;
