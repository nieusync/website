import type { Site } from '../en/site';

const site: Site = {
  documentTitle: 'NieuSync | Cinco pilares. Um parceiro.',
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
    titleSync: 'em sincronia.',
    subtitle:
      'Ajudamos PME que vendem para a Europa a crescer e escalar. Cinco disciplinas na mesma casa: Legal, Digital, Estratégia, Operações e Financeira. Escolha a que precisa, ou todas.',
    ctaPillars: 'Explorar os cinco pilares',
    ctaContact: 'Falar connosco',
  },
  pillars: {
    label: '01 / O que fazemos',
    title: 'Cinco pilares. Zero silos.',
    subtitle: 'Comece pelo pilar de que precisa. Se o trabalho entrar noutro, é a mesma equipa que o pega.',
    cta: 'Ver o que fazemos',
    items: [
      {
        slug: 'legal',
        name: 'Legal',
        desc: 'Contratos, estrutura societária e risco, desenhados antes de existirem problemas.',
        intro:
          'Do primeiro contrato à negociação mais difícil: estrutura jurídica para um negócio que opera em mercados europeus.',
        services: [
          'Elaboração e revisão de contratos',
          'Estrutura societária e governance',
          'Direito do trabalho',
          'Apoio a negociações e litígios',
          'Privacidade e conformidade com o RGPD',
        ],
      },
      {
        slug: 'digital',
        name: 'Digital',
        desc: 'Tecnologia, dados e automação que transformam a operação numa vantagem.',
        intro:
          'Sistemas, automação e presença digital construídos à volta da forma como o negócio funciona no dia a dia.',
        services: [
          'Desenvolvimento web e de produto',
          'Integração de sistemas e automação',
          'Dados, dashboards e analítica',
          'Presença digital e marketing de performance',
          'Segurança e gestão de acessos',
        ],
      },
      {
        slug: 'strategy',
        name: 'Estratégia',
        desc: 'Posicionamento, prioridades e um plano que a empresa consegue mesmo executar.',
        intro:
          'Clareza sobre onde competir e como ganhar na Europa, e um plano que toda a empresa executa sem precisar de tradução.',
        services: [
          'Posicionamento e modelo de negócio',
          'Planeamento de crescimento e expansão',
          'Preços e desenho da oferta',
          'Entrada em mercados europeus e parcerias',
          'Objetivos e cadência de execução',
        ],
      },
      {
        slug: 'operations',
        name: 'Operações',
        desc: 'Processos que escalam sem caos: medidos, afinados, repetíveis.',
        intro:
          'A máquina por trás da promessa: processos que escalam sem caos e números que permitem conduzir o negócio.',
        services: [
          'Desenho e documentação de processos',
          'KPI e reporting de gestão',
          'Gestão de fornecedores e cadeia de abastecimento',
          'Qualidade e melhoria contínua',
          'Seleção de ferramentas e workflows',
        ],
      },
      {
        slug: 'financial',
        name: 'Financeira',
        desc: 'Fiscalidade, financiamento e arquitetura financeira que protegem a margem.',
        intro:
          'Arquitetura financeira e fiscal: a margem, o financiamento e a conformidade que está por baixo dos dois.',
        services: [
          'Planeamento e otimização fiscal',
          'Obrigações declarativas e conformidade',
          'Incentivos, apoios e financiamento',
          'Coordenação da contabilidade e planeamento de tesouraria',
          'Preparação para auditorias',
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
  blog: {
    label: '02 / O que pensamos e casos de uso',
    title: 'O que pensamos, e como isso fica na prática.',
    subtitle: 'Artigos e casos de uso das cinco disciplinas: o raciocínio, e o trabalho em que deu.',
    cta: 'Ler tudo',
    readArticle: 'Ler artigo',
    minutesSuffix: 'min de leitura',
    dateLocale: 'pt-PT',
  },
  portal: {
    label: '03 / Área de cliente',
    title: 'A sua empresa, em direto.',
    desc: 'Documentos, pedidos e o progresso do trabalho que estamos a fazer para si, num só lugar seguro.',
    cta: 'Entrar na área de cliente',
    hint: 'Acesso reservado a clientes NieuSync.',
    shot: {
      caption: 'Uma antevisão da área de cliente NieuSync.',
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
    documentTitle: 'Falar connosco | NieuSync',
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
    title: 'Guia de proteções jurídicas para PME’s',
    desc: 'Subscreva a newsletter e receba o guia “Guia de proteções jurídicas para PME’s”: as bases de contratos, estrutura e conformidade que uma PME que vende para a Europa deve ter.',
    emailPlaceholder: 'o.seu@email.com',
    submit: 'Enviar-me o guia',
    sending: 'A enviar…',
    success: 'Subscrição registada.',
    error: 'Algo correu mal. Escreva-nos diretamente para geral@nieusync.com.',
    consent: 'Enviamos apenas o guia e artigos ocasionais. Pode cancelar quando quiser.',
    mailSubject: 'Newsletter: Guia de proteções jurídicas para PME’s',
  },
  pillarPage: {
    back: 'Todos os pilares',
    servicesLabel: 'O que isto cobre',
    ctaTitle: 'Pronto para pôr este pilar em sincronia?',
    cta: 'Falar connosco',
  },
  whoPage: {
    documentTitle: 'Quem somos | NieuSync',
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
    documentTitle: 'O que fazemos | NieuSync',
    label: 'O que fazemos',
    title: 'Cinco pilares. Um só projeto.',
    subtitle:
      'Escolha o pilar de que precisa. Nada aqui o obriga a comprar os outros quatro.',
    ctaTitle: 'Não sabe de que pilar precisa?',
    cta: 'Falar connosco',
  },
  clientAreaPage: {
    documentTitle: 'Área de cliente | NieuSync',
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
    preview: 'A área de cliente ainda não está ativa. Fale com o seu contacto NieuSync sobre o acesso.',
    back: 'Voltar ao site',
  },
  footer: {
    description:
      'A NieuSync ajuda PME que vendem para a Europa a crescer e escalar, em Legal, Digital, Estratégia, Operações e Financeira. Uma equipa, precise de um pilar ou dos cinco.',
    company: 'Empresa',
    pillars: 'O que fazemos',
    contact: 'Contacto',
    legal: 'Legal',
    blog: 'O que pensamos',
    clientArea: 'Área de cliente',
    copyright: (year: number) => `© ${year} NieuSync. Todos os direitos reservados.`,
  },
};

export default site;
