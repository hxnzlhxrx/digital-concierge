export type Language = 'en' | 'pt';

export type ModuleId =
  | 'experience'
  | 'rhythm'
  | 'explore'
  | 'safety'
  | 'auth'
  | 'management'
  | 'modals';

export type ModalType = 'amenities' | 'dining' | 'valet' | null;

export interface TranslationSchema {
  nav: {
    brandSubtitle: string;
    modules: Record<ModuleId, string>;
    conciergeCta: string;
    digitalKey: string;
    skeletonMode: string;
    suiteLabel: string;
    breadcrumbHome: string;
  };
  welcome: {
    greeting: string;
    subGreeting: string;
    heroBadge: string;
    heroTitle: string;
    heroDesc: string;
    exploreCta: string;
    diningCta: string;
    quickBarTitle: string;
    quickBarSubtitle: string;
    quickActions: {
      turndown: { title: string; subtitle: string };
      towels: { title: string; subtitle: string };
      sommelier: { title: string; subtitle: string };
      valet: { title: string; subtitle: string };
    };
    burleMarxTag: string;
    burleMarxTitle: string;
    burleMarxBody: string;
    burleMarxQuote: string;
    culinaryTag: string;
    culinaryTitle: string;
    ciprianiTitle: string;
    ciprianiBadge: string;
    ciprianiDesc: string;
    ciprianiAction: string;
    barettoTitle: string;
    barettoBadge: string;
    barettoDesc: string;
    barettoAction: string;
  };
  rhythm: {
    tag: string;
    title: string;
    subtitle: string;
    streamingTitle: string;
    streamingSubtitle: string;
    playCollection: string;
    nowPlaying: string;
    castSuite: string;
    castingActive: string;
    inSitePlayer: string;
    openInSite: string;
    closeInSite: string;
    streamingServices: string;
    suiteAmbiance: string;
    externalLink: string;
  };
  explore: {
    tag: string;
    title: string;
    subtitle: string;
    mapStandardBadge: string;
    viewModeVector: string;
    viewModeSatellite: string;
    landmarksTitle: string;
    chauffeurTitle: string;
    chauffeurSubtitle: string;
    chauffeurCta: string;
    distanceLabel: string;
    bestTimeLabel: string;
    securityNoteLabel: string;
  };
  safety: {
    tag: string;
    title: string;
    subtitle: string;
    hotlineTitle: string;
    hotlineSubtitle: string;
    bentoTitle: string;
    speedDialTitle: string;
    speedDialSubtitle: string;
    callNow: string;
    dispatchInstant: string;
  };
  auth: {
    tag: string;
    title: string;
    subtitle: string;
    passActiveBadge: string;
    verifyTitle: string;
    verifySubtitle: string;
    confirmationLabel: string;
    suiteNumberLabel: string;
    regeneratePassCta: string;
    nfcReady: string;
    ephemeralNotice: string;
    addToAppleWallet: string;
    addToGoogleWallet: string;
  };
  management: {
    tag: string;
    title: string;
    subtitle: string;
    occupancyLabel: string;
    vipArrivalsLabel: string;
    activeRequestsLabel: string;
    avgResponseLabel: string;
    viewKanban: string;
    viewList: string;
    statusPending: string;
    statusInProgress: string;
    statusCompleted: string;
    broadcastTitle: string;
    broadcastSubtitle: string;
    broadcastPlaceholder: string;
    broadcastSend: string;
    advanceStatus: string;
    adminTag: string;
    adminTitle: string;
    adminSubtitle: string;
    tabAll: string;
    tabOps: string;
    tabKeys: string;
    loginBadge: string;
    loginTitle: string;
    loginSubtitle: string;
    emailLabel: string;
    passwordLabel: string;
    passwordPlaceholder: string;
    signInBtn: string;
    demoLoginBtn: string;
    signOutBtn: string;
    roleBadge: string;
    invalidCredentialsMsg: string;
    securityNotice: string;
    opsSectionTitle: string;
    keysSectionTitle: string;
  };
  modals: {
    tag: string;
    title: string;
    subtitle: string;
    launchModal: string;
    skeletonTitle: string;
    skeletonSubtitle: string;
    toggleSkeletonBtn: string;
    amenitiesModalTitle: string;
    amenitiesModalSub: string;
    diningModalTitle: string;
    diningModalSub: string;
    valetModalTitle: string;
    valetModalSub: string;
    submitRequest: string;
    cancel: string;
  };
  footer: {
    tagline: string;
    colExperience: string;
    colServices: string;
    colProperty: string;
    copyright: string;
    privacy: string;
    terms: string;
    safetyLink: string;
    bonvoy: string;
  };
}

export const translations: Record<Language, TranslationSchema> = {
  en: {
    nav: {
      brandSubtitle: 'COPACABANA · RIO DE JANEIRO',
      modules: {
        experience: 'Experience',
        rhythm: 'Carioca Rhythm',
        explore: 'Explore & Map',
        safety: 'Safety & 24/7',
        auth: 'Suite Key QR',
        management: 'Admin & Ops Console',
        modals: 'Modals & Skeletons',
      },
      conciergeCta: 'Concierge',
      digitalKey: 'Suite 802 Key',
      skeletonMode: 'Skeleton Preview',
      suiteLabel: 'Welcome John Doe · Suite 802',
      breadcrumbHome: 'JW Marriott Copacabana',
    },
    welcome: {
      greeting: 'Welcome John Doe · Suite 802',
      subGreeting: 'Bem-vindo ao Rio · Oceanfront Presidential Wing · Marriott Bonvoy® Titanium Elite',
      heroBadge: 'PRESIDENTIAL WING · SUITE 802 · AV. ATLÂNTICA 2600',
      heroTitle: 'Copacabana Oceanfront Splendor',
      heroDesc:
        'Awaken to golden Atlantic tides gently cresting over Copacabana’s iconic sands. Savor signature coastal gastronomy crafted by Chef Amaral at The Carioca, unwind to bespoke vinyl bossa nova soundscapes, explore curated landmarks via daytime vector cartography, and summon dedicated 24/7 butler service with a single touch.',
      exploreCta: 'Explore Zona Sul Map',
      diningCta: 'Reserve at The Carioca',
      quickBarTitle: 'Suite 802 Express Hospitality Bar',
      quickBarSubtitle: 'INSTANT ONE-TOUCH SUITE DISPATCH · DIRECTLY ROUTED TO BUTLER & HOUSEKEEPING TEAMS',
      quickActions: {
        turndown: { title: 'Evening Turn-Down', subtitle: '300-thread Egyptian linen, pillow mist & chamomile infusion' },
        towels: { title: 'Fresh Plush Towels', subtitle: 'Warm oversized Brazilian cotton bath & beach set' },
        sommelier: { title: 'Private Sommelier', subtitle: 'Grand Cru champagne & cellar pairing delivered to suite' },
        valet: { title: 'Luxury Valet & Chauffeur', subtitle: 'Executive Mercedes-Benz ramp staging with private chauffeur' },
      },
      burleMarxTag: 'CULTURAL HERITAGE SPOTLIGHT',
      burleMarxTitle: 'Roberto Burle Marx & The Iconic Wave Promenade',
      burleMarxBody:
        'Directly beneath your suite balcony stretches Roberto Burle Marx’s 1970 modernist masterpiece—a monumental four-kilometer mosaic in black basalt and white calcite paying tribute to the rhythmic meeting of the Atlantic tides.',
      burleMarxQuote: '“A garden is a complex of aesthetic and plastic intentions; the landscape is living architecture.”',
      culinaryTag: 'SIGNATURE HOTEL GASTRONOMY & JAZZ',
      culinaryTitle: 'Epicurean Mastery & Intimate Jazz',
      ciprianiTitle: 'The Carioca by Chef Amaral',
      ciprianiBadge: 'HOTEL SIGNATURE RESTAURANT · CONTEMPORARY BRAZILIAN FINE DINING',
      ciprianiDesc:
        'Helmed by acclaimed Chef Amaral, The Carioca reinterprets authentic Rio coastal gastronomy with fresh Atlantic deep-sea catch, native forest herbs, and artisanal fire-roasting paired with rare Grand Cru vintages.',
      ciprianiAction: "Reserve Chef Amaral's Table",
      barettoTitle: 'Baretto-Londra Jazz Lounge',
      barettoBadge: 'AMBIENT COCKTAIL & VINYL SANCTUARY',
      barettoDesc:
        'An intimate late-night sanctuary blending bespoke botanical mixology, rare Brazilian cachaça reserves, and live acoustic Bossa Nova & jazz trios.',
      barettoAction: 'Book VIP Lounge Table',
    },
    rhythm: {
      tag: 'MODULE 2 · ACOUSTIC WELLNESS & SOUNDSCAPE',
      title: 'Carioca Rhythm & Vinyl',
      subtitle:
        'Four bespoke acoustic journeys crafted for oceanfront decompression. Listen online with our interactive player or open directly in your favorite streaming service.',
      streamingTitle: 'Thematic Glassmorphic Streaming Integration',
      streamingSubtitle: 'STREAM DIRECTLY OR OPEN IN YOUR FAVORITE SERVICE',
      playCollection: 'Listen Online',
      nowPlaying: 'Playing Now',
      castSuite: 'Listen Online',
      castingActive: 'Live Streaming Active',
      inSitePlayer: 'In-Site Streaming Player',
      openInSite: 'Play In-Site',
      closeInSite: 'Hide Player',
      streamingServices: 'Streaming Platforms',
      suiteAmbiance: 'Acoustic Suite Ambiance',
      externalLink: 'Open in App',
    },
    explore: {
      tag: 'MODULE 3 · DAYTIME VECTOR CARTOGRAPHY & REGIONAL GUIDE',
      title: 'Explore Copacabana & Beyond',
      subtitle:
        'Standardized Google Maps Light Mode daytime vector cartography featuring soft sand terrain, pastel arterial avenues, verified cultural landmarks, and executive luxury chauffeur scheduling.',
      mapStandardBadge: 'GOOGLE MAPS LIGHT MODE VECTOR STANDARD · v1.3.0',
      viewModeVector: 'Light Vector Map',
      viewModeSatellite: 'Vector Hybrid View',
      landmarksTitle: 'Curated Cultural & Coastal Landmarks',
      chauffeurTitle: 'Executive Chauffeur Planner',
      chauffeurSubtitle: 'PRIVATE MERCEDES-BENZ V-CLASS & S-CLASS LUXURY CHAUFFEUR SERVICE',
      chauffeurCta: 'Schedule Luxury Chauffeur',
      distanceLabel: 'Distance from Hotel',
      bestTimeLabel: 'Recommended Window',
      securityNoteLabel: 'Concierge Protocol',
    },
    safety: {
      tag: 'MODULE 4 · VERIFIED SAFETY & 24/7 CONCIERGE',
      title: 'Guest Services & Zona Sul Safety Protocols',
      subtitle:
        'Verified emergency hotlines, Posto 5 beachfront etiquette, diplomatic security protocols, and direct one-tap speed dial to hotel executive departments.',
      hotlineTitle: 'Verified Emergency Hotline Grid',
      hotlineSubtitle: '24/7 DIRECT RESPONSE · BILINGUAL OPERATORS AVAILABLE',
      bentoTitle: 'Zona Sul Safety & Cultural Protocols',
      speedDialTitle: 'Direct Department Speed Dial',
      speedDialSubtitle: 'INSTANT SUITE-TO-DESK PRIORITY ROUTING',
      callNow: 'Dial Direct',
      dispatchInstant: 'Request Assistance',
    },
    auth: {
      tag: 'MODULE 5 · SUITE AUTHENTICATION & DIGITAL KEYCARD',
      title: 'Guest QR & Optical Suite Pass',
      subtitle:
        'Frictionless NFC and optical QR digital keycard synced with Marriott Bonvoy®. Transient cryptographic session keys expire automatically upon checkout with zero PII caching.',
      passActiveBadge: 'TRANSIENT SESSION KEY VERIFIED · ZERO PII CACHE',
      verifyTitle: 'Passwordless Suite Verification',
      verifySubtitle: 'Confirm your reservation reference and suite assignment to refresh your optical key.',
      confirmationLabel: 'Marriott Bonvoy® Confirmation #',
      suiteNumberLabel: 'Assigned Oceanfront Suite',
      regeneratePassCta: 'Refresh Ephemeral QR Key',
      nfcReady: 'NFC Tap & Optical Scanner Ready',
      ephemeralNotice: 'Expires automatically at Checkout (Nov 18 · 12:00 BRT)',
      addToAppleWallet: 'Add to Apple Wallet',
      addToGoogleWallet: 'Add to Google Wallet',
    },
    management: {
      tag: 'MODULE 6 · OPERATIONS & HOSPITALITY CONSOLE',
      title: 'Executive Concierge & Operations Dashboard',
      subtitle:
        'Real-time suite occupancy telemetry, live guest amenity & dining request dispatch (synchronized with Guest Portal), and priority suite broadcast console.',
      occupancyLabel: 'Suite Occupancy',
      vipArrivalsLabel: 'VIP Titanium Arrivals',
      activeRequestsLabel: 'Active Dispatch Queue',
      avgResponseLabel: 'Avg Butler SLA',
      viewKanban: 'Kanban Board',
      viewList: 'Dispatch List',
      statusPending: 'Pending',
      statusInProgress: 'In Progress',
      statusCompleted: 'Completed',
      broadcastTitle: 'Priority Guest Broadcast System',
      broadcastSubtitle: 'PUSH INSTANT NOTIFICATION TO ACTIVE SUITES',
      broadcastPlaceholder: 'Enter guest advisory or sunset champagne invitation...',
      broadcastSend: 'Broadcast to Suites',
      advanceStatus: 'Advance Stage',
      adminTag: 'EXECUTIVE ADMINISTRATION CONSOLE · RESTRICTED ACCESS',
      adminTitle: 'Administration & Hospitality Operations Dashboard',
      adminSubtitle:
        'Unified command center integrating live suite telemetry, real-time guest request dispatch, priority guest broadcast messaging, and cryptographic Suite Key QR card generation.',
      tabAll: 'All-in-One Dashboard',
      tabOps: 'Operations & Dispatch',
      tabKeys: 'Suite Key QR Generator',
      loginBadge: 'SECURITY CLEARANCE LEVEL 4 · STAFF AUTHENTICATION',
      loginTitle: 'Executive Administration Portal',
      loginSubtitle:
        'Enter authorized Marriott Bonvoy® credentials to access live occupancy telemetry, dispatch systems, and digital suite keycard generation.',
      emailLabel: 'Executive Staff Email',
      passwordLabel: 'Security Passcode',
      passwordPlaceholder: 'Enter passcode (Default demo: jw2026)',
      signInBtn: 'Sign In to Dashboard',
      demoLoginBtn: 'Instant Demo Access',
      signOutBtn: 'Sign Out',
      roleBadge: 'Front Desk & Chief Concierge · Copacabana Ops',
      invalidCredentialsMsg: 'Invalid credentials. Please enter a valid passcode (e.g. jw2026) or use Instant Demo Access.',
      securityNotice: 'Authorized Marriott Bonvoy® Personnel Only · 256-Bit Cryptographic TLS 1.3 Session',
      opsSectionTitle: 'Live Operations & Request Dispatch',
      keysSectionTitle: 'Suite Key QR & Optical Digital Pass',
    },
    modals: {
      tag: 'MODULE 7 · MODALS SUITE & RESILIENT LOADING STATES',
      title: 'Interactive Modals & Multi-Breakpoint Skeletons',
      subtitle:
        'Launch and inspect the three bespoke hospitality modals and toggle the zero-CLS multi-breakpoint skeleton loading framework.',
      launchModal: 'Open Interactive Modal',
      skeletonTitle: 'Multi-Breakpoint Skeleton Screen Framework',
      skeletonSubtitle: 'PREVENTS CUMULATIVE LAYOUT SHIFT (CLS = 0) DURING ASYNC FETCHES',
      toggleSkeletonBtn: 'Simulate Async Skeleton State',
      amenitiesModalTitle: 'In-Room Amenities & Linen Request',
      amenitiesModalSub: 'SUITE 802 · BESPOKE HOUSEKEEPING & PILLOW MENU',
      diningModalTitle: 'Fine Dining Table Reservation',
      diningModalSub: 'THE CARIOCA BY CHEF AMARAL & BARETTO-LONDRA SOMMELIER CURATION',
      valetModalTitle: 'Executive Valet & Luxury Chauffeur',
      valetModalSub: 'MERCEDES-BENZ S-CLASS / V-CLASS & RAMP RETRIEVAL',
      submitRequest: 'Confirm & Dispatch to Concierge',
      cancel: 'Cancel',
    },
    footer: {
      tagline: 'Av. Atlântica, 2600 — Copacabana, Rio de Janeiro — RJ, 22041-001, Brazil',
      colExperience: 'Curated Experiences',
      colServices: 'Guest Services',
      colProperty: 'The Property',
      copyright: '© 2026 JW Marriott Copacabana, Rio de Janeiro. All Rights Reserved.',
      privacy: 'Privacy Policy',
      terms: 'Terms of Stay',
      safetyLink: 'Safety & Concierge',
      bonvoy: 'Marriott Bonvoy®',
    },
  },
  pt: {
    nav: {
      brandSubtitle: 'COPACABANA · RIO DE JANEIRO',
      modules: {
        experience: 'Experiência',
        rhythm: 'Ritmo Carioca',
        explore: 'Explorar',
        safety: 'Segurança 24/7',
        auth: 'Chave Suíte',
        management: 'Admin & Operações',
        modals: 'Modais & Skeletons',
      },
      conciergeCta: 'Concierge',
      digitalKey: 'Chave Suíte 802',
      skeletonMode: 'Modo Skeleton',
      suiteLabel: 'Bem-vindo ao Rio, John Doe · Suíte 802',
      breadcrumbHome: 'JW Marriott Copacabana',
    },
    welcome: {
      greeting: 'Bem-vindo ao Rio · John Doe · Suíte 802',
      subGreeting: 'Suíte Presidencial Frente Mar · Marriott Bonvoy® Titanium Elite',
      heroBadge: 'ALA PRESIDENCIAL · SUÍTE 802 · AV. ATLÂNTICA 2600',
      heroTitle: 'Esplendor à Beira-Mar de Copacabana',
      heroDesc:
        'Desperte com o dourado do sol da manhã sobre o mar de Copacabana. Desfrute da alta gastronomia costeira do Chef Amaral no restaurante The Carioca, relaxe com vinis raros de Bossa Nova, explore a Zona Sul em mapas vetoriais exclusivos e acione a mordomia 24/7 com apenas um toque.',
      exploreCta: 'Explorar Mapa da Zona Sul',
      diningCta: 'Reservar no The Carioca',
      quickBarTitle: 'Barra Rápida de Hospitalidade da Suíte 802',
      quickBarSubtitle: 'ATENDIMENTO INSTANTÂNEO COM UM TOQUE · ROTEADO DIRETO À MORDOMIA E GOVERNANÇA',
      quickActions: {
        turndown: { title: 'Abertura de Cama', subtitle: 'Enxoval egípcio 300 fios, névoa relaxante e infusão de camomila' },
        towels: { title: 'Toalhas Felpudas Aquecidas', subtitle: 'Algodão nobre pré-aquecido para banho e espreguiçadeira' },
        sommelier: { title: 'Sommelier na Suíte', subtitle: 'Seleção de champanhe Grand Cru e harmonização privativa' },
        valet: { title: 'Valet Executivo & Chofer', subtitle: 'Mercedes-Benz preparado na rampa com motorista particular bilíngue' },
      },
      burleMarxTag: 'PATRIMÔNIO CULTURAL E PAISAGISMO',
      burleMarxTitle: 'Roberto Burle Marx & O Calçadão de Ondas',
      burleMarxBody:
        'Diretamente sob a varanda da sua suíte estende-se a obra-prima modernista de Roberto Burle Marx de 1970 — um mosaico monumental de quatro quilômetros em pedras portuguesas pretas e brancas celebrando o ritmo das marés do Atlântico.',
      burleMarxQuote: '“O jardim é um complexo de intenções estéticas e plásticas; a paisagem é arquitetura viva.”',
      culinaryTag: 'RESTAURANTE ASSINATURA DO HOTEL & JAZZ',
      culinaryTitle: 'Maestria Gastronômica & Jazz Íntimo',
      ciprianiTitle: 'The Carioca por Chef Amaral',
      ciprianiBadge: 'RESTAURANTE ASSINATURA DO HOTEL · ALTA GASTRONOMIA COSTEIRA',
      ciprianiDesc:
        'Sob o talento autoral do renomado Chef Amaral, o restaurante The Carioca recria a essência litorânea do Rio com pescados nobres da costa fluminense, ervas nativas da Mata Atlântica e preparos autorais no fogo, harmonizados com safras Grand Cru raras.',
      ciprianiAction: 'Reservar Mesa do Chef Amaral',
      barettoTitle: 'Baretto-Londra Jazz Lounge',
      barettoBadge: 'SANTUÁRIO DE COQUETELARIA & VINIL',
      barettoDesc:
        'Um refúgio noturno intimista combinando mixologia botânica autoral, cachaças raras e trios acústicos de Bossa Nova e jazz ao vivo.',
      barettoAction: 'Reservar Mesa no Lounge',
    },
    rhythm: {
      tag: 'MÓDULO 2 · BEM-ESTAR ACÚSTICO & PAISAGEM SONORA',
      title: 'Ritmo Carioca & Vinil',
      subtitle:
        'Quatro jornadas acústicas criadas para o relaxamento à beira-mar. Ouça online com nosso player interativo ou abra diretamente em seu serviço de streaming favorito.',
      streamingTitle: 'Integração Glassmorphic de Streaming',
      streamingSubtitle: 'OUÇA ONLINE OU ABRA NO SEU SERVIÇO FAVORITO',
      playCollection: 'Ouvir Online',
      nowPlaying: 'Tocando Agora',
      castSuite: 'Ouvir Online',
      castingActive: 'Streaming Oficial Ativo',
      inSitePlayer: 'Player de Streaming no Site',
      openInSite: 'Reproduzir no Site',
      closeInSite: 'Ocultar Player',
      streamingServices: 'Plataformas de Streaming',
      suiteAmbiance: 'Ambiência Acústica da Suíte',
      externalLink: 'Abrir no App',
    },
    explore: {
      tag: 'MÓDULO 3 · CARTOGRAFIA VETORIAL DIURNA & GUIA REGIONAL',
      title: 'Explore Copacabana & Além',
      subtitle:
        'Cartografia vetorial diurna padronizada em Google Maps Light Mode com relevo suave de areia, avenidas em tons pastéis, marcos culturais verificados e agendamento de chofer particular em carros de luxo.',
      mapStandardBadge: 'PADRÃO VETORIAL DIURNO GOOGLE MAPS LIGHT MODE · v1.3.0',
      viewModeVector: 'Mapa Vetorial Claro',
      viewModeSatellite: 'Vista Híbrida Vetorial',
      landmarksTitle: 'Marcos Culturais e Costeiros Curados',
      chauffeurTitle: 'Planejador de Chofer Executivo',
      chauffeurSubtitle: 'SERVIÇO PRIVADO DE CHOFER EM MERCEDES-BENZ V-CLASS & S-CLASS DE LUXO',
      chauffeurCta: 'Agendar Chofer de Luxo',
      distanceLabel: 'Distância do Hotel',
      bestTimeLabel: 'Horário Recomendado',
      securityNoteLabel: 'Protocolo Concierge',
    },
    safety: {
      tag: 'MÓDULO 4 · SEGURANÇA VERIFICADA & CONCIERGE 24/7',
      title: 'Serviços ao Hóspede & Protocolos da Zona Sul',
      subtitle:
        'Linhas diretas de emergência verificadas, etiqueta de praia no Posto 5, protocolos diplomáticos de segurança e discagem rápida com um toque para os departamentos executivos.',
      hotlineTitle: 'Grade de Emergência Verificada',
      hotlineSubtitle: 'RESPOSTA DIRETA 24/7 · ATENDIMENTO BILÍNGUE',
      bentoTitle: 'Protocolos de Segurança e Cultura na Zona Sul',
      speedDialTitle: 'Discagem Rápida Departamental',
      speedDialSubtitle: 'ROTEAMENTO PRIORITÁRIO DA SUÍTE PARA A RECEPÇÃO EXECUTIVA',
      callNow: 'Ligar Agora',
      dispatchInstant: 'Solicitar Assistência',
    },
    auth: {
      tag: 'MÓDULO 5 · AUTENTICAÇÃO DA SUÍTE & CHAVE DIGITAL',
      title: 'QR Code do Hóspede & Passe Óptico da Suíte',
      subtitle:
        'Chave digital NFC e QR óptico sincronizada com o Marriott Bonvoy®. Chaves criptográficas efêmeras expiram automaticamente no check-out sem armazenamento de dados sensíveis (PII).',
      passActiveBadge: 'CHAVE DE SESSÃO EFÊMERA VERIFICADA · ZERO CACHE PII',
      verifyTitle: 'Verificação de Suíte Sem Senha',
      verifySubtitle: 'Confirme o código da reserva e o número da suíte para renovar sua chave óptica.',
      confirmationLabel: 'Nº de Confirmação Marriott Bonvoy®',
      suiteNumberLabel: 'Suíte Frente Mar Designada',
      regeneratePassCta: 'Renovar Chave QR Efêmera',
      nfcReady: 'Aproximação NFC & Leitor Óptico Prontos',
      ephemeralNotice: 'Expira automaticamente no Check-out (18 Nov · 12:00 BRT)',
      addToAppleWallet: 'Adicionar à Apple Wallet',
      addToGoogleWallet: 'Adicionar à Google Wallet',
    },
    management: {
      tag: 'MÓDULO 6 · CONSOLE DE OPERAÇÕES E HOSPITALIDADE',
      title: 'Painel Executivo de Concierge & Operações',
      subtitle:
        'Telemetria de ocupação em tempo real, despacho ao vivo de solicitações de amenidades e gastronomia (sincronizado com o Portal do Hóspede) e console de comunicados prioritários.',
      occupancyLabel: 'Ocupação de Suítes',
      vipArrivalsLabel: 'Chegadas VIP Titanium',
      activeRequestsLabel: 'Fila de Despacho Ativa',
      avgResponseLabel: 'SLA Médio Mordomia',
      viewKanban: 'Quadro Kanban',
      viewList: 'Lista de Despacho',
      statusPending: 'Pendente',
      statusInProgress: 'Em Atendimento',
      statusCompleted: 'Concluído',
      broadcastTitle: 'Sistema de Comunicados Prioritários',
      broadcastSubtitle: 'ENVIAR NOTIFICAÇÃO INSTANTÂNEA PARA AS SUÍTES ATIVAS',
      broadcastPlaceholder: 'Digite o aviso aos hóspedes ou convite para champanhe ao pôr do sol...',
      broadcastSend: 'Transmitir às Suítes',
      advanceStatus: 'Avançar Status',
      adminTag: 'CONSOLE DE ADMINISTRAÇÃO EXECUTIVA · ACESSO RESTRITO',
      adminTitle: 'Painel de Administração e Operações Hoteleiras',
      adminSubtitle:
        'Centro de comando unificado integrando telemetria de suítes em tempo real, despacho ao vivo de solicitações, comunicados prioritários e gerador de chaves digitais QR de suíte.',
      tabAll: 'Visão Geral Completa',
      tabOps: 'Operações & Despacho',
      tabKeys: 'Gerador de Chave QR',
      loginBadge: 'NÍVEL DE AUTORIZAÇÃO 4 · AUTENTICAÇÃO DA EQUIPE',
      loginTitle: 'Portal de Administração Executiva',
      loginSubtitle:
        'Informe suas credenciais autorizadas do Marriott Bonvoy® para acessar telemetria de ocupação, sistemas de despacho e geração de chaves digitais de suítes.',
      emailLabel: 'E-mail Corporativo da Equipe Executiva',
      passwordLabel: 'Código de Segurança / Senha',
      passwordPlaceholder: 'Digite a senha (Demo padrão: jw2026)',
      signInBtn: 'Entrar no Painel',
      demoLoginBtn: 'Acesso Rápido Demo',
      signOutBtn: 'Encerrar Sessão',
      roleBadge: 'Recepção Executiva & Chefia de Concierge · Rio Ops',
      invalidCredentialsMsg: 'Credenciais inválidas. Digite uma senha válida (ex: jw2026) ou use o Acesso Rápido Demo.',
      securityNotice: 'Uso Exclusivo de Colaboradores Autorizados Marriott Bonvoy® · Sessão Criptografada TLS 1.3',
      opsSectionTitle: 'Operações ao Vivo & Fila de Despacho',
      keysSectionTitle: 'Chave Digital QR & Passe Óptico da Suíte',
    },
    modals: {
      tag: 'MÓDULO 7 · SUÍTE DE MODAIS & ESTADOS SKELETON',
      title: 'Modais Interativos & Skeletons Multi-Breakpoint',
      subtitle:
        'Inicie e inspecione os três modais de hospitalidade sob medida e ative o framework de carregamento skeleton com zero deslocamento de layout (CLS = 0).',
      launchModal: 'Abrir Modal Interativo',
      skeletonTitle: 'Framework de Skeleton Screen Multi-Breakpoint',
      skeletonSubtitle: 'PREVINE MUDANÇAS DE LAYOUT (CLS = 0) DURANTE CARREGAMENTOS ASSÍNCRONOS',
      toggleSkeletonBtn: 'Simular Estado Skeleton Assíncrono',
      amenitiesModalTitle: 'Solicitação de Amenidades e Enxoval',
      amenitiesModalSub: 'SUÍTE 802 · GOVERNANÇA PERSONALIZADA & MENU DE TRAVESSEIROS',
      diningModalTitle: 'Reserva de Mesa de Alta Gastronomia',
      diningModalSub: 'THE CARIOCA POR CHEF AMARAL & CURADORIA DE SOMMELIER BARETTO-LONDRA',
      valetModalTitle: 'Valet Executivo & Chofer de Luxo',
      valetModalSub: 'MERCEDES-BENZ S-CLASS / V-CLASS & RETIRADA NA RAMPA',
      submitRequest: 'Confirmar & Enviar ao Concierge',
      cancel: 'Cancelar',
    },
    footer: {
      tagline: 'Av. Atlântica, 2600 — Copacabana, Rio de Janeiro — RJ, 22041-001, Brasil',
      colExperience: 'Experiências Curadas',
      colServices: 'Serviços ao Hóspede',
      colProperty: 'A Propriedade',
      copyright: '© 2026 JW Marriott Copacabana, Rio de Janeiro. Todos os direitos reservados.',
      privacy: 'Política de Privacidade',
      terms: 'Termos de Hospedagem',
      safetyLink: 'Segurança & Concierge',
      bonvoy: 'Marriott Bonvoy®',
    },
  },
};
