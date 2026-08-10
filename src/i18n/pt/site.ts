import type { Site } from '../en/site';

const site: Site = {
  documentTitle: 'Nieusync | Cinco pilares. Um parceiro.',
  nav: {
    whoWeAre: 'Quem somos',
    whatWeDo: 'O que fazemos',
    whatWeThink: 'O que pensamos',
    clientArea: 'Área de cliente',
    menu: 'Menu',
  },
  hero: {
    eyebrow: 'O parceiro operacional das PME com mercado europeu',
    titleTop: 'O seu negócio,',
    titleSync: 'visto de cima.',
    subtitle:
      'Escalamos o seu negócio com o apoio que normalmente só as grandes empresas têm.',
    ctaPillars: 'Explorar os cinco pilares',
    ctaContact: 'Falar connosco',
  },
  pillars: {
    label: '01 / O que fazemos',
    title: 'Cinco pilares. Uma visão integrada.',
    statusLive: 'Atual',
    statusSoon: 'Futuro',
    more: (n: number) => `+ ${n} outros serviços`,
    items: [
      {
        slug: 'legal',
        name: 'Legal',
        desc: 'Risco e Compliance, e serviços jurídicos completos.',
        intro:
          'Compliance e serviços jurídicos completos, para uma empresa que opera em mercados europeus. Do desenho dos controlos internos à representação em litígio, é a mesma equipa que acompanha o processo do princípio ao fim, e que responde quando o regulador, a contraparte ou o tribunal aparecem.',
        services: [
          'Revisões regulatórias e auditorias de conformidade legal',
          'Desenho de controlos internos',
          'Compliance geral para PME, RGPD e RGPC',
          'Representação jurídica, litigância e resolução de litígios',
          'Redação e negociação de contratos',
          'Consultoria em direito societário e comercial',
          'Propriedade intelectual',
          'Constituição de sociedades e governação',
          'Insolvência e recuperação de empresas',
          'Direito laboral e direito fiscal',
        ],
      },
      {
        slug: 'digital',
        name: 'Digital',
        desc: 'Tecnologias de Informação, Marketing e Vendas.',
        intro:
          'Serviços nativos digitais, de ponta a ponta. Escolhemos e implementamos os sistemas que sustentam a operação, avaliamos os fornecedores antes de os contratar, e tratamos da marca, da aquisição de clientes e dos preços com que essa operação se paga.',
        services: [
          'Consultoria em infraestruturas de TI',
          'Seleção e implementação de sistemas',
          'Roteiros de transformação digital',
          'Avaliação de fornecedores de software',
          'Posicionamento de marca',
          'Aquisição de clientes: estratégia de canais e desenho de funis',
          'Otimização de preços',
          'Gestão de anúncios de emprego em plataformas digitais (LinkedIn, Glassdoor)',
        ],
      },
      {
        slug: 'strategy',
        name: 'Estratégia',
        desc: 'Posicionamento, M&A e entrada em mercados.',
        intro:
          'Onde competir e como ganhar, decidido antes de se gastar o primeiro euro. Posicionamento competitivo, operações de M&A e entrada em novos mercados, sempre com o plano, os números e o calendário que sustentam cada decisão.',
        services: [
          'Posicionamento competitivo',
          'Assessoria em M&A',
          'Estratégia de entrada em mercados',
        ],
      },
      {
        slug: 'operations',
        name: 'Operações',
        desc: 'Supply-chain, custos e processos.',
        intro:
          'A máquina por trás da promessa: processos simples e custos sob controlo. Desenhamos a cadeia de abastecimento, cortamos o que não acrescenta valor e deixamos processos escritos que a sua equipa repete sem depender de nós.',
        services: [
          'Otimização da supply-chain',
          'Redução de custos',
          'Simplificação de processos',
        ],
      },
      {
        slug: 'financial',
        name: 'Financeira',
        desc: 'Gestão financeira, do orçamento ao controlo de gestão.',
        intro:
          'Gestão financeira, do orçamento ao controlo de gestão. Orçamentar e prever com rigor, reportar de forma que a gestão consiga decidir, e preparar a empresa para captar capital e estruturar o balanço quando chegar a altura de crescer.',
        services: [
          'Orçamentação e previsão',
          'Relatório financeiro e controlo de gestão',
          'Apoio à captação de capital e estruturação financeira',
          'Planeamento e análise financeira (FP&A)',
        ],
      },
    ],
  },
  approach: {
    label: '03 / O método',
    title: 'Como sincronizamos.',
    steps: [
      { title: 'Mapear', desc: 'Lemos o problema que nos trouxe e as partes do negócio que ele toca.' },
      { title: 'Sincronizar', desc: 'Um plano com prioridades, responsáveis e prazos, seja qual for o âmbito.' },
      { title: 'Escalar', desc: 'Execução contínua com a sua equipa, medida a cada passo.' },
    ],
  },
  portal: {
    label: '02 / Área de cliente',
    title: 'A sua empresa, em direto.',
    cta: 'Marcar uma demonstração',
    shot: {
      workspace: 'Área de trabalho',
      company: 'Acme Comércio, Lda.',
      nav: ['Resumo', 'Documentos', 'Pedidos', 'Faturas', 'Equipa'],
      greeting: 'Bom dia, Marta',
      subgreeting: '4 assuntos em aberto nos seus projetos ativos',
      stats: [
        { label: 'Pedidos abertos', value: '4' },
        { label: 'Documentos', value: '128' },
      ],
      progressTitle: 'Os seus projetos',
      progress: [
        { name: 'Legal · Contratos de fornecimento', value: 82 },
        { name: 'Digital · Novo site', value: 64 },
      ],
      activityTitle: 'Atividade recente',
      activity: [
        { title: 'Contrato de fornecimento revisto', meta: 'Legal · há 2h' },
        { title: 'Site em pré-produção entregue', meta: 'Digital · ontem' },
        { title: 'Pedido de marca submetido', meta: 'Legal · há 3 dias' },
      ],
    },
  },
  contact: {
    documentTitle: 'Falar connosco | Nieusync',
    label: 'Falar connosco',
    title: 'Diga-nos onde dói.',
    subtitle:
      'Conte-nos sobre a sua empresa e o que precisa. A sua mensagem vai para os sócios, não para uma fila.',
    name: 'Nome',
    company: 'Empresa',
    email: 'Email',
    message: 'Como podemos ajudar?',
    messagePlaceholder: 'Conte-nos brevemente sobre a sua empresa e o que precisa.',
    submit: 'Enviar mensagem',
    sending: 'A enviar…',
    success: 'Obrigado, a sua mensagem está connosco.',
    error: 'Algo correu mal. Escreva-nos diretamente para geral@nieusync.com.',
    mailSubject: 'Contacto do site',
  },
  newsletter: {
    label: 'Guia gratuito',
    title: '10 Proteções Legais que toda a PME precisa',
    emailPlaceholder: 'o.seu@email.com',
    submit: 'Enviar-me o guia',
    sending: 'A enviar…',
    success: 'Subscrição registada.',
    error: 'Algo correu mal. Escreva-nos diretamente para geral@nieusync.com.',
    consent: 'Enviamos apenas o guia e artigos ocasionais. Pode cancelar quando quiser.',
    mailSubject: 'Newsletter: 10 Proteções Legais que toda a PME precisa',
  },
  pillarPage: {
    back: 'Todos os pilares',
    servicesLabel: 'O que isto cobre',
  },
  whoPage: {
    documentTitle: 'Quem somos | Nieusync',
    label: 'Quem somos',
    title: 'Um parceiro, cinco disciplinas.',
    subtitle:
      'Ajudamos PME com o mercado europeu como alvo a crescer e escalar, com pessoas que já construíram e geriram empresas pequenas.',
    golden: [
      {
        key: 'Porquê',
        title: 'Porque existimos',
        text: 'Porque boas empresas europeias estagnam por razões que nada têm a ver com o produto: um contrato que ninguém leu, uma entrada em mercado que ninguém planeou, um processo que ninguém escreveu. Acreditamos que uma PME merece o mesmo nível de pensamento jurídico, técnico e estratégico que uma empresa financiada compra peça a peça.',
      },
      {
        key: 'Como',
        title: 'Como o fazemos',
        text: 'Uma equipa a trabalhar dentro do seu negócio e não a enviar-lhe relatórios. Acordamos um plano com responsáveis e datas e ficamos durante a execução. A maioria dos projetos começa num único pilar e, quando o trabalho passa para outro, é a mesma equipa que o leva, em vez de contratar um segundo fornecedor que tem de ser posto a par do zero.',
      },
      {
        key: 'O quê',
        title: 'O que fazemos',
        text: 'Legal, Digital, Estratégia, Operações e Financeira. Um deles ou os cinco, entregues por uma só equipa: os contratos e a estrutura societária, os sistemas e os dados, o plano de mercado, os processos e os números.',
      },
    ],
    teamLabel: 'Equipa executiva',
    teamTitle: 'Operadores, não observadores.',
    teamSubtitle:
      'A nossa experiência vem de trabalhar com empresas pequenas, por dentro, com as mesmas restrições que tem.',
    team: [
      {
        name: 'Ricardo Serrão de Carvalho',
        role: 'Sócio Gerente & CEO',
        pillars: 'Legal · Financeira · Estratégia',
        bio: 'Mais de 15 anos a trabalhar com PME em Legal e Estratégia: estrutura societária, contratos, negociações, arquitetura fiscal e planos de crescimento para empresas que operam em mercados europeus. É o sócio que fica mais perto do trabalho.',
      },
      {
        name: 'João Carvalho',
        role: 'Sócio & COO',
        pillars: 'Digital · Estratégia · Operações',
        bio: 'Anteriormente CTO de duas empresas norte-americanas financiadas por capital de risco. Constrói a tecnologia, os dados e os processos que permitem a uma equipa pequena operar como uma muito maior, e mantém o plano em andamento depois de acordado.',
      },
      {
        name: 'Ricardo Carvalho',
        role: 'Sócio & CMO',
        pillars: 'Digital',
        bio: 'Vem do marketing digital e da produção de vídeo. Trata da marca, dos conteúdos e das campanhas: a parte do Digital que os seus clientes veem, feita em casa e não comprada à hora.',
      },
    ],
    ctaTitle: 'Quer esta equipa por trás da sua empresa?',
    cta: 'Falar connosco',
  },
  whatPage: {
    documentTitle: 'O que fazemos | Nieusync',
    label: 'O que fazemos',
    title: 'Cinco pilares. Um só projeto.',
    subtitle:
      'Escolha o pilar de que precisa. Nada aqui o obriga a comprar os outros quatro.',
  },
  clientAreaPage: {
    documentTitle: 'Área de cliente | Nieusync',
    label: 'Área de cliente',
    title: 'Bem-vindo de volta.',
    subtitle: 'Entre nos seus documentos, nos seus pedidos e no progresso do seu trabalho connosco.',
    email: 'Email',
    password: 'Palavra-passe',
    emailPlaceholder: 'o.seu@email.com',
    submit: 'Entrar',
    forgot: 'Esqueceu-se da palavra-passe?',
    noAccount: 'Ainda sem acesso?',
    noAccountCta: 'Falar connosco',
    preview: 'A área de cliente ainda não está ativa. Fale com o seu contacto Nieusync sobre o acesso.',
    back: 'Voltar ao site',
  },
  footer: {
    company: 'Empresa',
    pillars: 'O que fazemos',
    contact: 'Contacto',
    legal: 'Legal',
    blog: 'O que pensamos',
    clientArea: 'Área de cliente',
    copyright: (year: number) =>
      `© ${year} Nieusync, Sociedade Multidisciplinar de Advogados e Consultores SP, LDA. Registo OA 17/26 — Todos os direitos reservados.`,
  },
};

export default site;
