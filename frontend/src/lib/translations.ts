export type Lang = 'pt' | 'br' | 'en';

export interface Translations {
  navServices: string;
  navQuote: string;
  heroLead: string;
  heroT1: string;
  heroTFreedom: string;
  heroTAnd: string;
  heroTTime: string;
  heroTFor: string;
  heroYou: string;
  heroDesc: string;
  heroAcc: string;
  heroBtn: string;
  servicesTitle: string;
  b2bTitle: string;
  b2bDesc: string;
  b2bBtn: string;
  ctaDesc: string;
  ctaBtn: string;
  ctaHeadline1: string;
  ctaHeadline2: string;
  footerDesc: string;
  sysOp: string;
  fRoutes: string;
  fAgenda: string;
  fContact: string;
  fLocation: string;
  mTitle1: string;
  mSub1: string;
  mBtn1: string;
  mTitle2: string;
  mSub2: string;
  mUpload: string;
  mLength: string;
  mWidth: string;
  mCep: string;
  mDetails: string;
  mDetailsPlaceholder: string;
  mBack: string;
  mNext: string;
  mTitle3: string;
  mSub3: string;
  mName: string;
  mLast: string;
  mEmail: string;
  mWpp: string;
  mSubmit: string;
}

export const translations: Record<Lang, Translations> = {
  pt: {
    navServices: 'Serviços',
    navQuote: 'Orçamento',
    heroLead: 'A maioria da indústria foca apenas em lavar e entregar roupas...',
    heroT1: 'Nós focamos em ',
    heroTFreedom: 'liberdade',
    heroTAnd: ' e ',
    heroTTime: 'tempo',
    heroTFor: ' para ',
    heroYou: 'si',
    heroDesc: 'Da lavanderia tradicional e limpeza de tapetes à impermeabilização e tinturaria de alto nível. Um atendimento impecável para a sua empresa ou ',
    heroAcc: 'alojamento local',
    heroBtn: 'Fazer Orçamento',
    servicesTitle: 'Tudo o que precisas, num só lugar.',
    b2bTitle: 'Soluções à medida para Empresas',
    b2bDesc: 'Restaurantes, alojamentos locais, clínicas, ginásios e salões. Recolha, lavagem premium e entrega com planos recorrentes.',
    b2bBtn: 'Fale Connosco',
    ctaDesc: 'Nós não limpamos apenas as suas peças. Nós restauramos o seu valor através de procedimentos premium B2B, B2C e self-service de vanguarda 7h-23h.',
    ctaBtn: 'Orçamento via Whatsapp',
    ctaHeadline1: 'De Portugal para o Mundo',
    ctaHeadline2: 'a precisão encontra a comodidade.',
    footerDesc: 'Sua lavanderia de Portugal para o mundo, focada em conforto, restauro têxtil avançado e extrema comodidade empresarial e residencial.',
    sysOp: 'Sistema Operacional 24/7',
    fRoutes: 'Rotas',
    fAgenda: 'Agendamento',
    fContact: 'Contactos',
    fLocation: 'Portugal',
    mTitle1: 'O que precisa lavar?',
    mSub1: 'Selecione o serviço ideal para um orçamento focado.',
    mBtn1: 'Continuar pedindo',
    mTitle2: 'Detalhes do Pedido',
    mSub2: 'Ajuda-nos a avaliar especificidades para um orçamento 100% preciso.',
    mUpload: 'Opcional: Faça o upload da foto do tapete',
    mLength: 'Comprimento (m)',
    mWidth: 'Largura (m)',
    mCep: 'Código Postal / CEP',
    mDetails: 'Detalhes da Peça (Qtd, Tecido)',
    mDetailsPlaceholder: 'Descreva brevemente o que precisa...',
    mBack: 'Voltar',
    mNext: 'Continuar',
    mTitle3: 'Quase finalizado',
    mSub3: 'Precisamos dos seus dados para enviar o orçamento personalizado de forma profissional.',
    mName: 'Nome',
    mLast: 'Sobrenome',
    mEmail: 'E-mail',
    mWpp: 'WhatsApp com DDD/Cód. País',
    mSubmit: 'Solicitar Orçamento',
  },
  br: {
    navServices: 'Serviços',
    navQuote: 'Orçamento',
    heroLead: 'A maioria da indústria foca apenas em lavar e entregar roupas...',
    heroT1: 'Nós focamos em ',
    heroTFreedom: 'liberdade',
    heroTAnd: ' e ',
    heroTTime: 'tempo',
    heroTFor: ' para ',
    heroYou: 'você',
    heroDesc: 'Da lavanderia tradicional e limpeza de tapetes à impermeabilização e tinturaria de alto nível. Um atendimento impecável para a sua empresa ou ',
    heroAcc: 'hospedagem local',
    heroBtn: 'Fazer Orçamento',
    servicesTitle: 'Tudo o que você precisa, num só lugar.',
    b2bTitle: 'Soluções sob medida para Empresas',
    b2bDesc: 'Restaurantes, hospedagens locais, clínicas, academias e salões. Coleta, lavagem premium e entrega com planos recorrentes.',
    b2bBtn: 'Fale Conosco',
    ctaDesc: 'Nós não limpamos apenas as suas peças. Nós restauramos o seu valor através de procedimentos premium B2B, B2C e self-service de vanguarda 7h-23h.',
    ctaBtn: 'Orçamento via Whatsapp',
    ctaHeadline1: 'Do Brasil para o Mundo',
    ctaHeadline2: 'a precisão encontra a comodidade.',
    footerDesc: 'Sua lavanderia para o mundo, focada em conforto, restauro têxtil avançado e extrema comodidade empresarial e residencial.',
    sysOp: 'Sistema Operacional 24/7',
    fRoutes: 'Rotas',
    fAgenda: 'Agendamento',
    fContact: 'Contatos',
    fLocation: 'Portugal & Brasil',
    mTitle1: 'O que precisa lavar?',
    mSub1: 'Selecione o serviço ideal para um orçamento rápido.',
    mBtn1: 'Continuar pedindo',
    mTitle2: 'Detalhes do Pedido',
    mSub2: 'Ajuda a gente a entender melhor seu pedido para um orçamento preciso.',
    mUpload: 'Opcional: Envie uma foto do tapete',
    mLength: 'Comprimento (m)',
    mWidth: 'Largura (m)',
    mCep: 'CEP',
    mDetails: 'Detalhes da Peça (Qtd, Tecido)',
    mDetailsPlaceholder: 'Descreva brevemente o que precisa...',
    mBack: 'Voltar',
    mNext: 'Continuar',
    mTitle3: 'Quase lá',
    mSub3: 'Precisamos dos seus dados para enviar o seu orçamento personalizado.',
    mName: 'Nome',
    mLast: 'Sobrenome',
    mEmail: 'E-mail',
    mWpp: 'WhatsApp com DDD',
    mSubmit: 'Solicitar Orçamento',
  },
  en: {
    navServices: 'Services',
    navQuote: 'Get a Quote',
    heroLead: 'Most of the industry focuses only on washing and delivering clothes...',
    heroT1: 'We focus on ',
    heroTFreedom: 'freedom',
    heroTAnd: ' and ',
    heroTTime: 'time',
    heroTFor: ' for ',
    heroYou: 'you',
    heroDesc: 'From traditional laundry and carpet cleaning to top-tier waterproofing and dyeing. Impeccable service for your business or ',
    heroAcc: 'vacation rental',
    heroBtn: 'Get a Quote',
    servicesTitle: 'Everything you need, in one place.',
    b2bTitle: 'Tailored Solutions for Businesses',
    b2bDesc: 'Restaurants, vacation rentals, clinics, gyms, and salons. Premium collection, washing, and delivery with recurring plans.',
    b2bBtn: 'Contact Us',
    ctaDesc: "We don't just clean your garments. We restore their value through premium B2B, B2C vanguard procedures and 7am-11pm self-service.",
    ctaBtn: 'Quote via WhatsApp',
    ctaHeadline1: 'From Portugal to the World',
    ctaHeadline2: 'precision meets convenience.',
    footerDesc: 'Your laundry service from Portugal to the world, focused on comfort, advanced textile restoration, and extreme convenience for businesses & homes.',
    sysOp: 'Operating System 24/7',
    fRoutes: 'Routes',
    fAgenda: 'Scheduling',
    fContact: 'Contact Us',
    fLocation: 'Worldwide',
    mTitle1: 'What do you need washed?',
    mSub1: 'Select the ideal service for a tailored quote.',
    mBtn1: 'Continue',
    mTitle2: 'Order Details',
    mSub2: 'Help us assess specifics for a 100% accurate quote.',
    mUpload: 'Optional: Upload a photo of the carpet',
    mLength: 'Length (m)',
    mWidth: 'Width (m)',
    mCep: 'Zip / Postal Code',
    mDetails: 'Item Details (Qty, Fabric)',
    mDetailsPlaceholder: 'Briefly describe what you need...',
    mBack: 'Back',
    mNext: 'Continue',
    mTitle3: 'Almost done',
    mSub3: 'We need your details to send the customized professional quote.',
    mName: 'First Name',
    mLast: 'Last Name',
    mEmail: 'Email',
    mWpp: 'WhatsApp with Country Code',
    mSubmit: 'Request Quote',
  },
};
